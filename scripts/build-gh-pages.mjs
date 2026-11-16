import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const STAGING_DIR = path.join(ROOT, '.gh-pages-staging');
const OUT_DIR = path.join(ROOT, 'out');

// Routes/files incompatible with Next.js static export (output: 'export')
const SERVER_ONLY_ENTRIES = [
  { src: path.join(ROOT, 'app', 'api'), backup: path.join(STAGING_DIR, 'app_api') },
  { src: path.join(ROOT, 'app', 'w'), backup: path.join(STAGING_DIR, 'app_w') },
  { src: path.join(ROOT, 'middleware.ts'), backup: path.join(STAGING_DIR, 'middleware.ts') },
];

// Dynamic route files that need dynamicParams = false during static export
const DYNAMIC_PARAM_FILES = [
  path.join(ROOT, 'app', '[slug]', 'page.tsx'),
  path.join(ROOT, 'app', '[slug]', '[subslug]', 'page.tsx'),
  path.join(ROOT, 'app', 'category', '[slug]', 'page.tsx'),
  path.join(ROOT, 'app', 'dice', '[slug]', 'page.tsx'),
  path.join(ROOT, 'app', 'embed', '[tool]', 'page.tsx'),
  path.join(ROOT, 'app', 'embed', '[tool]', '[subslug]', 'page.tsx'),
];

// Legacy redirects to emit as static HTML meta-refresh pages in out/
const STATIC_REDIRECTS = {
  '/d2': '/dice/d2',
  '/d4': '/dice/d4',
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
  '/entertainment': '/movie-wheel',
  '/category/entertainment': '/movie-wheel',
  '/bingo-spin-wheel': '/bingo-wheel',
  '/food-wheel/dinner': '/dinner-wheel',
  '/food-wheel/breakfast': '/breakfast-wheel',
  '/pizza-topping-wheel': '/food-wheel/pizza',
  '/lunch-wheel': '/food-wheel/lunch',
  '/what-to-eat-wheel': '/what-should-i-eat',
  '/random-student-picker': '/classroom-wheel/random-student',
  '/student-picker': '/classroom-wheel/random-student',
  '/student-picker-wheel': '/classroom-wheel/random-student',
  '/random-team-generator': '/team-generator',
  '/team-maker': '/team-generator',
  '/random-number-wheel': '/number-wheel',
  '/1-20-wheel': '/number-wheel',
  '/number-wheel/1-10': '/1-10-wheel',
  '/number-wheel/1-50': '/1-50-wheel',
  '/number-wheel/1-100': '/1-100-wheel',
  '/winner-picker': '/giveaway-wheel',
  '/contest-picker': '/giveaway-wheel',
  '/raffle-wheel': '/giveaway-wheel',
  '/party-wheel/truth-or-dare': '/truth-or-dare-wheel',
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeRedirectHtml(outDir, sourcePath, targetPath, basePathPrefix) {
  const cleanSource = sourcePath.replace(/^\/+|\/+$/g, '');
  if (!cleanSource) return;

  const destination = `${basePathPrefix}${targetPath}`;
  const htmlFile = path.join(outDir, `${cleanSource}.html`);
  if (fs.existsSync(htmlFile)) return;

  ensureDir(path.dirname(htmlFile));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Redirecting...</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://spinwheelgames.org${targetPath}" />
  <meta http-equiv="refresh" content="0;url=${destination}" />
  <script>window.location.replace(${JSON.stringify(destination)} + window.location.search + window.location.hash);</script>
</head>
<body>
  <p>Redirecting to <a href="${destination}">${destination}</a>...</p>
</body>
</html>
`;
  fs.writeFileSync(htmlFile, html, 'utf8');
}

const originalContents = new Map();

function prepareStaticExport() {
  if (fs.existsSync(STAGING_DIR)) {
    fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  }
  ensureDir(STAGING_DIR);

  for (const entry of SERVER_ONLY_ENTRIES) {
    if (fs.existsSync(entry.src)) {
      fs.renameSync(entry.src, entry.backup);
    }
  }

  for (const filePath of DYNAMIC_PARAM_FILES) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      originalContents.set(filePath, content);
      const updated = content.replace(
        /export const dynamicParams\s*=\s*true\s*;/g,
        'export const dynamicParams = false;'
      );
      if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
      }
    }
  }
}

function restoreWorkspace() {
  for (const [filePath, content] of originalContents.entries()) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  originalContents.clear();

  for (const entry of SERVER_ONLY_ENTRIES) {
    if (fs.existsSync(entry.backup) && !fs.existsSync(entry.src)) {
      fs.renameSync(entry.backup, entry.src);
    }
  }

  if (fs.existsSync(STAGING_DIR)) {
    fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  }
}

try {
  console.log('[gh-pages] Preparing static export...');
  prepareStaticExport();

  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }

  const nextBuildCmd = fs.existsSync(path.join(ROOT, 'node_modules', '.bin', 'next'))
    ? path.join(ROOT, 'node_modules', '.bin', 'next') + ' build'
    : 'npx next build';

  console.log('[gh-pages] Running Next.js static export build...');
  execSync(nextBuildCmd, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      GITHUB_PAGES: 'true',
    },
  });

  // Ensure .nojekyll is present in out/
  fs.writeFileSync(path.join(OUT_DIR, '.nojekyll'), '', 'utf8');

  // Custom domain CNAME (defaults to spinwheelgames.org)
  const customDomain = (process.env.GH_PAGES_CUSTOM_DOMAIN ?? 'spinwheelgames.org').trim();
  if (customDomain) {
    fs.writeFileSync(path.join(OUT_DIR, 'CNAME'), `${customDomain}\n`, 'utf8');
    console.log(`[gh-pages] Wrote CNAME for ${customDomain}`);
  }

  // Emit static meta-refresh redirects for legacy URLs
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || '';
  const basePathPrefix =
    rawBasePath && rawBasePath !== '/'
      ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
      : '';

  for (const [src, dest] of Object.entries(STATIC_REDIRECTS)) {
    writeRedirectHtml(OUT_DIR, src, dest, basePathPrefix);
  }

  console.log('[gh-pages] Static export complete in ./out');
} finally {
  restoreWorkspace();
}
