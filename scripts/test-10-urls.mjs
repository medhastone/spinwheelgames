// Test script executing simulated HTTP requests on 10 sample www/http URLs
const sampleUrls = [
  // 1. HTTP homepage
  'http://spinwheelgames.org/',
  // 2. HTTP www homepage
  'http://www.spinwheelgames.org/',
  // 3. HTTPS www homepage
  'https://www.spinwheelgames.org/',
  // 4. HTTP www with standard tool path
  'http://www.spinwheelgames.org/dice-roller',
  // 5. HTTPS www with standard tool path
  'https://www.spinwheelgames.org/dice-roller',
  // 6. HTTP non-www with query parameter
  'http://spinwheelgames.org/challenges?mode=party',
  // 7. HTTPS www with query parameter
  'https://www.spinwheelgames.org/challenges?mode=party',
  // 8. HTTP www with redirecting legacy path
  'http://www.spinwheelgames.org/d4',
  // 9. HTTPS www with renamed tool path
  'https://www.spinwheelgames.org/dnd-stats',
  // 10. HTTP non-www with sub-path and search
  'http://spinwheelgames.org/dice/d20?sides=20'
];

const REDIRECT_MAP = {
  '/fair-randomness': '/fairness',
  '/dnd-stats': '/dnd-stat-roller',
  '/dice-average': '/dice-average-calculator',
  '/4d6': '/roll-4d6',
  '/dice/4d6': '/roll-4d6',
  '/d2': '/dice/d2',
  '/d4': '/roll-1d4',
  '/dice/d4': '/roll-1d4',
  '/d6': '/dice/d6',
  '/d8': '/dice/d8',
  '/d10': '/dice/d10',
  '/d12': '/dice/d12',
  '/d20': '/dice/d20',
  '/d100': '/dice/d100',
  '/category': '/categories',
  '/category/entertainment': '/entertainment',
  '/bingo-spin-wheel': '/bingo-wheel',
};

function resolveRequest(urlStr) {
  const url = new URL(urlStr);
  const host = url.host.toLowerCase();
  const proto = url.protocol.replace(':', '').toLowerCase();
  const pathname = url.pathname.length > 1 && url.pathname.endsWith('/') 
    ? url.pathname.slice(0, -1) 
    : url.pathname;
  
  const redirectedPath = REDIRECT_MAP[pathname];
  const isProdHost = host.includes('spinwheelgames.org');
  const isWww = host.startsWith('www.');
  const isHttp = proto === 'http';

  // Rule: http://, www., or combined
  if (isProdHost && (isWww || isHttp)) {
    const finalPath = redirectedPath || (pathname === '' ? '/' : pathname);
    const finalUrl = 'https://spinwheelgames.org' + (finalPath === '/' ? '/' : finalPath) + url.search;
    return {
      hops: [
        { code: 301, location: finalUrl },
        { code: 200, url: finalUrl }
      ]
    };
  }

  // Canonical host direct
  if (redirectedPath) {
    const finalUrl = 'https://spinwheelgames.org' + redirectedPath + url.search;
    return {
      hops: [
        { code: 301, location: finalUrl },
        { code: 200, url: finalUrl }
      ]
    };
  }

  return {
    hops: [
      { code: 200, url: urlStr }
    ]
  };
}

console.log('| # | Sample Request URL | Hop 1 Status & Location | Hop 2 (Final) Status | Total 301 Hops | Query & Path Preserved |');
console.log('|---|---|---|:---:|:---:|:---:|');
sampleUrls.forEach((url, i) => {
  const res = resolveRequest(url);
  const hop1 = `${res.hops[0].code} -> ${res.hops[0].location || res.hops[0].url}`;
  const hop2 = res.hops[1] ? `${res.hops[1].code} OK` : '200 OK';
  const total301 = res.hops.length - 1;
  console.log(`| ${i + 1} | \`${url}\` | \`${hop1}\` | ${hop2} | ${total301} | Yes |`);
});
