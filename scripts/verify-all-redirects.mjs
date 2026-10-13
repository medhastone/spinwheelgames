import http from 'http';

const testCases = [
  // Old /dX URLs
  { path: '/d2', name: '/d2' },
  { path: '/d4', name: '/d4' },
  { path: '/roll-1d4', name: '/roll-1d4' },
  { path: '/d6', name: '/d6' },
  { path: '/d8', name: '/d8' },
  { path: '/d10', name: '/d10' },
  { path: '/d12', name: '/d12' },
  { path: '/d20', name: '/d20' },
  { path: '/d100', name: '/d100' },
  // 4d6 duplicate URLs
  { path: '/4d6', name: '/4d6' },
  { path: '/dice/4d6', name: '/dice/4d6' },
  // Dice average duplicate URLs
  { path: '/dice-average', name: '/dice-average' },
  // Canonical URLs (should be 200 directly)
  { path: '/dice/d2', name: '/dice/d2' },
  { path: '/dice/d4', name: '/dice/d4' },
  { path: '/dice/d6', name: '/dice/d6' },
  { path: '/dice/d8', name: '/dice/d8' },
  { path: '/dice/d10', name: '/dice/d10' },
  { path: '/dice/d12', name: '/dice/d12' },
  { path: '/dice/d20', name: '/dice/d20' },
  { path: '/dice/d100', name: '/dice/d100' },
  { path: '/roll-4d6', name: '/roll-4d6' },
  { path: '/dice-average-calculator', name: '/dice-average-calculator' }
];

const hostVariants = [
  { proto: 'https', host: 'spinwheelgames.org', label: 'https://spinwheelgames.org' },
  { proto: 'http', host: 'spinwheelgames.org', label: 'http://spinwheelgames.org' },
  { proto: 'https', host: 'www.spinwheelgames.org', label: 'https://www.spinwheelgames.org' },
  { proto: 'http', host: 'www.spinwheelgames.org', label: 'http://www.spinwheelgames.org' }
];

function fetchStep(urlStr, hostHeader, protoHeader) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Host': hostHeader,
        'x-forwarded-proto': protoHeader,
        'x-forwarded-host': hostHeader
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers['location'],
          body: data
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function traceUrl(initialUrl, hostHeader, protoHeader) {
  const chain = [];
  let currentUrl = initialUrl;
  let currentHost = hostHeader;
  let currentProto = protoHeader;
  let hops = 0;
  const maxHops = 10;

  while (hops < maxHops) {
    const res = await fetchStep(currentUrl, currentHost, currentProto);
    chain.push(res.statusCode);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.location) {
      hops++;
      const nextLocation = res.location;
      if (nextLocation.startsWith('http://') || nextLocation.startsWith('https://')) {
        const parsed = new URL(nextLocation);
        currentHost = parsed.host;
        currentProto = parsed.protocol.replace(':', '');
        currentUrl = nextLocation;
      } else {
        currentUrl = `${currentProto}://${currentHost}${nextLocation}`;
      }
    } else {
      currentUrl = currentUrl;
      return {
        chain: chain.join(' -> '),
        finalUrl: currentUrl,
        hops,
        statusCode: res.statusCode,
        body: res.body
      };
    }
  }
  return { chain: chain.join(' -> '), finalUrl: currentUrl, hops, error: 'Too many hops' };
}

async function run() {
  console.log('Testing old duplicate URLs across all host/protocol variants:\n');
  const results = [];

  for (const tc of testCases) {
    for (const hv of hostVariants) {
      const fullUrl = `${hv.label}${tc.path}`;
      const trace = await traceUrl(fullUrl, hv.host, hv.proto);
      results.push({
        requestedUrl: fullUrl,
        chain: trace.chain,
        finalUrl: trace.finalUrl,
        hops: trace.hops,
        statusCode: trace.statusCode
      });
    }
  }

  // Print results table
  console.log('| Requested URL | Status Chain | Final URL | Hops |');
  console.log('|---|---|---|:---:|');
  for (const r of results) {
    console.log(`| \`${r.requestedUrl}\` | ${r.chain} | \`${r.finalUrl}\` | ${r.hops} |`);
  }
}

run();
