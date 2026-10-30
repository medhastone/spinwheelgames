import http from 'node:http';

const REDIRECT_MAP = {
  '/d2': '/dice/d2',
  '/d4': '/dice/d4',
  '/roll-1d4': '/dice/d4',
  '/d6': '/dice/d6',
  '/d8': '/dice/d8',
  '/d10': '/dice/d10',
  '/d12': '/dice/d12',
  '/d20': '/dice/d20',
  '/d100': '/dice/d100',
  '/4d6': '/roll-4d6',
  '/dice/4d6': '/roll-4d6',
  '/dice-average': '/dice-average-calculator',
  '/dnd-stats': '/dnd-stat-roller',
  '/fair-randomness': '/fairness',
  '/category': '/categories',
  '/entertainment': '/movie-wheel',
  '/category/entertainment': '/movie-wheel',
  '/bingo-spin-wheel': '/bingo-wheel',
  '/food-wheel/dinner': '/dinner-wheel',
  '/food-wheel/breakfast': '/breakfast-wheel',
  '/random-student-picker': '/classroom-wheel/random-student',
  '/winner-picker': '/giveaway-wheel',
  '/contest-picker': '/giveaway-wheel',
  '/raffle-wheel': '/giveaway-wheel',
  '/party-wheel/truth-or-dare': '/truth-or-dare-wheel'
};

const PATHS_TO_CHECK = [
  '/',
  '/d8',
  '/4d6',
  '/d10',
  '/d20',
  '/d2',
  '/dnd-stats',
  '/dice-average',
  '/roll-4d6',
  '/roll-2d12',
  '/roll-d3',
  '/roll-3d6',
  '/roll-5d6',
  '/number-wheel',
  '/entertainment',
  '/question-wheel',
  '/how-to-make-a-classroom-wheel',
  '/fairness',
  '/team-generator',
  '/self-care-wheel',
  '/drawing-wheel',
  '/song-wheel',
  '/terms',
  '/unusual-dice',
  '/dice/d6',
  '/dice/d8',
  '/dnd-stat-roller',
  '/dice-average-calculator'
];

function reqSingle(host, proto, path) {
  return new Promise((resolve, reject) => {
    const r = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method: 'HEAD',
        headers: {
          Host: host,
          'x-forwarded-host': host,
          'x-forwarded-proto': proto,
          'User-Agent': 'Googlebot/2.1'
        }
      },
      (res) => {
        res.resume();
        resolve({
          status: res.statusCode,
          location: res.headers.location || null,
          hsts: res.headers['strict-transport-security'] || null,
          xRobots: res.headers['x-robots-tag'] || null
        });
      }
    );
    r.on('error', reject);
    r.end();
  });
}

async function traceHopChain(host, proto, path) {
  let curHost = host;
  let curProto = proto;
  let curPath = path;
  const statuses = [];
  let hops = 0;
  let finalUrl = `${proto}://${host}${path}`;
  let hsts = null;
  let xRobots = null;

  while (hops < 5) {
    const res = await reqSingle(curHost, curProto, curPath);
    statuses.push(res.status);
    hsts = res.hsts;
    xRobots = res.xRobots;

    if (res.status >= 300 && res.status < 400 && res.location) {
      hops++;
      finalUrl = res.location;
      const u = new URL(res.location, `${curProto}://${curHost}`);
      curHost = u.host;
      curProto = u.protocol.replace(':', '');
      curPath = u.pathname + u.search;
    } else {
      break;
    }
  }

  return {
    sourceUrl: `${proto}://${host}${path}`,
    statusChain: statuses.join(' -> '),
    finalUrl,
    hops,
    hsts,
    xRobots
  };
}

async function main() {
  // Wait for server warmup
  await reqSingle('spinwheelgames.org', 'https', '/');

  let failures = 0;
  const variants = [
    { host: 'spinwheelgames.org', proto: 'https' },
    { host: 'spinwheelgames.org', proto: 'http' },
    { host: 'www.spinwheelgames.org', proto: 'https' },
    { host: 'www.spinwheelgames.org', proto: 'http' }
  ];

  for (const p of PATHS_TO_CHECK) {
    for (const v of variants) {
      const trace = await traceHopChain(v.host, v.proto, p);
      const isCanonicalInput =
        v.host === 'spinwheelgames.org' &&
        v.proto === 'https' &&
        !REDIRECT_MAP[p];

      if (isCanonicalInput) {
        if (trace.hops !== 0 || trace.statusChain !== '200') {
          console.error('FAIL canonical:', trace);
          failures++;
        }
      } else {
        if (trace.hops !== 1 || !trace.statusChain.startsWith('301 ->')) {
          console.error('FAIL redirect:', trace);
          failures++;
        }
      }
    }
  }

  // Verify sitemap.xml
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  let sitemapRedirects = 0;
  let sitemapNonCanonical = 0;

  for (const loc of locs) {
    if (!loc.startsWith('https://spinwheelgames.org/')) {
      sitemapNonCanonical++;
    }
    const u = new URL(loc);
    if (REDIRECT_MAP[u.pathname] || (u.pathname.length > 1 && u.pathname.endsWith('/'))) {
      sitemapRedirects++;
    }
  }

  console.log(`Checked ${PATHS_TO_CHECK.length * variants.length} URL variants.`);
  console.log(`Redirect/Canonical Failures: ${failures}`);
  console.log(`Sitemap total URLs: ${locs.length} | Redirecting in sitemap: ${sitemapRedirects} | Non-canonical in sitemap: ${sitemapNonCanonical}`);

  if (failures > 0 || sitemapRedirects > 0 || sitemapNonCanonical > 0) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
