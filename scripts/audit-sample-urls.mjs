import http from 'http';

const sampleUrls = [
  '/random-name-picker',
  '/dinner-wheel',
  '/food',
  '/sports',
  '/nba-team-wheel',
  '/classroom-wheel/random-student',
  '/food-wheel/pizza',
  '/privacy',
  '/number-wheel',
  '/yes-or-no-wheel'
];

async function checkUrl(path) {
  const start = Date.now();
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'host': 'spinwheelgames.org',
        'x-forwarded-proto': 'https',
        'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
        'accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const time = Date.now() - start;
        const statusCode = res.statusCode;
        const location = res.headers['location'] || '';
        
        // Extract title
        const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/is);
        const title = titleMatch ? titleMatch[1].trim() : '';

        // Extract meta description
        const metaMatch = data.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) ||
                          data.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/is);
        const metaDesc = metaMatch ? metaMatch[1].trim() : '';

        // Extract h1
        const h1Match = data.match(/<h1[^>]*>(.*?)<\/h1>/is);
        // clean any internal tags inside h1
        const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

        // Extract canonical
        const canMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) ||
                         data.match(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/is);
        const canonical = canMatch ? canMatch[1].trim() : '';

        // Calculate visible text word count
        // Strip script, style, svg, noscript, header/footer boilerplate if needed, but plain visible text:
        let cleanText = data
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
          .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&[a-z0-9#]+;/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        const words = cleanText ? cleanText.split(/\s+/).length : 0;
        const payloadBytes = Buffer.byteLength(data, 'utf8');

        resolve({
          path,
          statusCode,
          location,
          time,
          payloadBytes,
          words,
          title,
          metaDesc,
          h1,
          canonical
        });
      });
    });
    req.on('error', (e) => resolve({ path, error: e.message }));
    req.end();
  });
}

async function run() {
  console.log('Auditing 10 sample URLs against local dev server...');
  const results = [];
  for (const url of sampleUrls) {
    const res = await checkUrl(url);
    results.push(res);
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
