import http from 'http';

const canonicalUrls = [
  '/dice/d2',
  '/dice/d4',
  '/dice/d6',
  '/dice/d8',
  '/dice/d10',
  '/dice/d12',
  '/dice/d20',
  '/dice/d100',
  '/roll-4d6',
  '/dice-average-calculator'
];

function fetchHtml(pathname) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: pathname,
      method: 'GET',
      headers: {
        'Host': 'spinwheelgames.org',
        'x-forwarded-proto': 'https'
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, html: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function verify() {
  console.log('Verifying HTML canonical tags, og:url, and Schema URLs:\n');
  for (const path of canonicalUrls) {
    const res = await fetchHtml(path);
    const expectedCanonical = `https://spinwheelgames.org${path}`;
    const canonicalMatch = res.html.match(/<link rel="canonical" href="([^"]+)"/i);
    const ogUrlMatch = res.html.match(/<meta property="og:url" content="([^"]+)"/i);
    const canonicalFound = canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';
    const ogUrlFound = ogUrlMatch ? ogUrlMatch[1] : 'NOT FOUND';
    const status = res.statusCode;
    const ok = canonicalFound === expectedCanonical && status === 200;
    console.log(`${ok ? '✓' : '✗'} ${path}: Status ${status} | Canonical: ${canonicalFound} | og:url: ${ogUrlFound}`);
  }
}

verify();
