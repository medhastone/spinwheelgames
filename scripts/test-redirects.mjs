// Test script to verify all Search Console URLs and internal links
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
  '/fair-randomness': '/fairness',
  '/dnd-stats': '/dnd-stat-roller',
  '/category': '/categories',
  '/category/entertainment': '/entertainment',
  '/bingo-spin-wheel': '/bingo-wheel',
};

function simulateRedirect(urlStr) {
  const url = new URL(urlStr);
  const host = url.host.toLowerCase();
  const proto = url.protocol.replace(':', '').toLowerCase();
  const pathname = url.pathname.length > 1 && url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;

  const redirectedPath = REDIRECT_MAP[pathname];
  const isProdHost = host.includes('spinwheelgames.org');
  const isWww = host.startsWith('www.');
  const isHttp = proto === 'http';

  if (isProdHost && (isWww || isHttp)) {
    const finalPath = redirectedPath || pathname;
    return `https://spinwheelgames.org${finalPath}${url.search}`;
  }

  if (redirectedPath) {
    const targetBase = isProdHost ? 'https://spinwheelgames.org' : url.origin;
    return `${targetBase}${redirectedPath}${url.search}`;
  }

  return urlStr;
}

const testUrls = [
  // Short URL variants
  'https://spinwheelgames.org/d2',
  'https://spinwheelgames.org/d4',
  'https://spinwheelgames.org/roll-1d4',
  'https://spinwheelgames.org/d6',
  'https://spinwheelgames.org/d8',
  'https://spinwheelgames.org/d10',
  'https://spinwheelgames.org/d12',
  'https://spinwheelgames.org/d20',
  'https://spinwheelgames.org/d100',
  'https://spinwheelgames.org/4d6',
  'https://spinwheelgames.org/dice/4d6',
  'https://spinwheelgames.org/dice-average',
  // HTTP variants
  'http://spinwheelgames.org/d10',
  'http://spinwheelgames.org/dice/d10',
  // WWW HTTP variants
  'http://www.spinwheelgames.org/d10',
  'http://www.spinwheelgames.org/dice/d10',
  // WWW HTTPS variants
  'https://www.spinwheelgames.org/d10',
  'https://www.spinwheelgames.org/dice/d10',
];

console.log('Testing simulation of all redirect rules:');
for (const u of testUrls) {
  console.log(`${u} -> ${simulateRedirect(u)}`);
}
