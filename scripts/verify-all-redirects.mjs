import http from 'http';

const testCases = [
  // Short die URLs on canonical host
  { name: 'https://spinwheelgames.org/d2', host: 'spinwheelgames.org', proto: 'https', path: '/d2' },
  { name: 'https://spinwheelgames.org/d4', host: 'spinwheelgames.org', proto: 'https', path: '/d4' },
  { name: 'https://spinwheelgames.org/roll-1d4', host: 'spinwheelgames.org', proto: 'https', path: '/roll-1d4' },
  { name: 'https://spinwheelgames.org/d6', host: 'spinwheelgames.org', proto: 'https', path: '/d6' },
  { name: 'https://spinwheelgames.org/d8', host: 'spinwheelgames.org', proto: 'https', path: '/d8' },
  { name: 'https://spinwheelgames.org/d10', host: 'spinwheelgames.org', proto: 'https', path: '/d10' },
  { name: 'https://spinwheelgames.org/d12', host: 'spinwheelgames.org', proto: 'https', path: '/d12' },
  { name: 'https://spinwheelgames.org/d20', host: 'spinwheelgames.org', proto: 'https', path: '/d20' },
  { name: 'https://spinwheelgames.org/d100', host: 'spinwheelgames.org', proto: 'https', path: '/d100' },
  { name: 'https://spinwheelgames.org/4d6', host: 'spinwheelgames.org', proto: 'https', path: '/4d6' },
  { name: 'https://spinwheelgames.org/dice/4d6', host: 'spinwheelgames.org', proto: 'https', path: '/dice/4d6' },
  { name: 'https://spinwheelgames.org/dice-average', host: 'spinwheelgames.org', proto: 'https', path: '/dice-average' },

  // HTTP and WWW non-canonical variants
  { name: 'http://spinwheelgames.org/d10', host: 'spinwheelgames.org', proto: 'http', path: '/d10' },
  { name: 'http://www.spinwheelgames.org/d10', host: 'www.spinwheelgames.org', proto: 'http', path: '/d10' },
  { name: 'https://www.spinwheelgames.org/d10', host: 'www.spinwheelgames.org', proto: 'https', path: '/d10' },
  { name: 'http://www.spinwheelgames.org/d4', host: 'www.spinwheelgames.org', proto: 'http', path: '/d4' },
  { name: 'http://www.spinwheelgames.org/roll-1d4', host: 'www.spinwheelgames.org', proto: 'http', path: '/roll-1d4' },
  { name: 'http://www.spinwheelgames.org/4d6', host: 'www.spinwheelgames.org', proto: 'http', path: '/4d6' },
  { name: 'http://www.spinwheelgames.org/dice-average', host: 'www.spinwheelgames.org', proto: 'http', path: '/dice-average' },
  { name: 'http://www.spinwheelgames.org/dice/d20', host: 'www.spinwheelgames.org', proto: 'http', path: '/dice/d20' },
  { name: 'https://www.spinwheelgames.org/dice/d20', host: 'www.spinwheelgames.org', proto: 'https', path: '/dice/d20' },
];

function requestSingle(host, proto, path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: 'GET',
        headers: {
          'Host': host,
          'x-forwarded-host': host,
          'x-forwarded-proto': proto,
          'User-Agent': 'curl/8.5.0'
        }
      },
      (res) => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location || null
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function traceChain(initial) {
  let curHost = initial.host;
  let curProto = initial.proto;
  let curPath = initial.path;
  const statusCodes = [];
  let hops = 0;
  let finalUrl = initial.name;

  while (hops < 6) {
    const res = await requestSingle(curHost, curProto, curPath);
    statusCodes.push(res.statusCode);

    if (res.statusCode >= 300 && res.statusCode < 400 && res.location) {
      hops++;
      finalUrl = res.location;
      // Parse location for next hop
      if (res.location.startsWith('http')) {
        const u = new URL(res.location);
        curHost = u.host;
        curProto = u.protocol.replace(':', '');
        curPath = u.pathname + u.search;
      } else {
        curPath = res.location;
      }
    } else {
      break;
    }
  }

  return {
    url: initial.name,
    statusChain: statusCodes.join(' -> '),
    finalUrl,
    hops
  };
}

console.log('| URL | Status Chain | Final URL | Hops |');
console.log('|---|---|---|:---:|');

for (const tc of testCases) {
  const result = await traceChain(tc);
  console.log(`| \`${result.url}\` | \`${result.statusChain}\` | \`${result.finalUrl}\` | **${result.hops}** |`);
}
