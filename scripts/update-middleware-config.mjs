import fs from 'fs';

// 1. Update middleware.ts
const middlewarePath = 'middleware.ts';
let middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

// Replace /d4 and /dice/d4 in REDIRECT_MAP
middlewareContent = middlewareContent.replace(
  "  '/d4': '/roll-1d4',\n  '/dice/d4': '/roll-1d4',",
  "  '/d4': '/dice/d4',\n  '/roll-1d4': '/dice/d4',"
);

// Update step 3 in middleware to use targetBase ensuring absolute canonical URL
middlewareContent = middlewareContent.replace(
  `  // 3. Instant Edge 301 Redirects: Single-hop permanent redirect\n  if (redirectedPath) {\n    const targetUrl = req.nextUrl.clone();\n    targetUrl.pathname = redirectedPath;\n    const res = NextResponse.redirect(targetUrl, 301);`,
  `  // 3. Instant Edge 301 Redirects: Single-hop permanent redirect\n  if (redirectedPath) {\n    const targetBase = isProdHost ? 'https://spinwheelgames.org' : req.nextUrl.origin;\n    const targetUrl = new URL(redirectedPath + req.nextUrl.search, targetBase);\n    const res = NextResponse.redirect(targetUrl, 301);`
);

fs.writeFileSync(middlewarePath, middlewareContent, 'utf8');
console.log('Successfully updated middleware.ts');

// 2. Update next.config.ts
const nextConfigPath = 'next.config.ts';
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

// Replace async redirects() with empty list or clean definition
const redirectsRegex = /async redirects\(\) \{[\s\S]*?return \[[\s\S]*?\];\s*\},/;
nextConfigContent = nextConfigContent.replace(
  redirectsRegex,
  `async redirects() {\n    return [];\n  },`
);
fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
console.log('Successfully updated next.config.ts');

// 3. Update vercel.json
const vercelJsonPath = 'vercel.json';
const vercelJsonObj = {
  redirects: [
    { source: '/d2', destination: 'https://spinwheelgames.org/dice/d2', permanent: true },
    { source: '/d4', destination: 'https://spinwheelgames.org/dice/d4', permanent: true },
    { source: '/roll-1d4', destination: 'https://spinwheelgames.org/dice/d4', permanent: true },
    { source: '/d6', destination: 'https://spinwheelgames.org/dice/d6', permanent: true },
    { source: '/d8', destination: 'https://spinwheelgames.org/dice/d8', permanent: true },
    { source: '/d10', destination: 'https://spinwheelgames.org/dice/d10', permanent: true },
    { source: '/d12', destination: 'https://spinwheelgames.org/dice/d12', permanent: true },
    { source: '/d20', destination: 'https://spinwheelgames.org/dice/d20', permanent: true },
    { source: '/d100', destination: 'https://spinwheelgames.org/dice/d100', permanent: true },
    { source: '/4d6', destination: 'https://spinwheelgames.org/roll-4d6', permanent: true },
    { source: '/dice/4d6', destination: 'https://spinwheelgames.org/roll-4d6', permanent: true },
    { source: '/dice-average', destination: 'https://spinwheelgames.org/dice-average-calculator', permanent: true },
    {
      source: '/(.*)',
      has: [
        {
          type: 'host',
          value: 'www.spinwheelgames.org'
        }
      ],
      destination: 'https://spinwheelgames.org/$1',
      permanent: true
    }
  ]
};
fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelJsonObj, null, 2) + '\n', 'utf8');
console.log('Successfully updated vercel.json');

