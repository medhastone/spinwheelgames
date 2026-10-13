import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const REDIRECT_MAP: Record<string, string> = {
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

const staticRoutes = [
  '',
  '/challenges',
  '/games',
  '/movie-wheel',
  '/food-wheel',
  '/number-wheel',
  '/bingo-wheel',
  '/animal-wheel',
  '/pokemon-wheel',
  '/classroom-wheel',
  '/drawing-wheel',
  '/random-game-picker',
  '/random-app-picker',
  '/comment-picker',
  '/birthday-wheel',
  '/question-wheel',
  '/random-object-generator',
  '/random-category-generator',
  '/word-spinner',
  '/song-wheel',
  '/team-generator',
  '/theme-wheel',
  '/dice-roller',
  '/dice-collection',
  '/dice/d2',
  '/dice/d6',
  '/dice/d8',
  '/dice/d10',
  '/dice/d12',
  '/dice/d20',
  '/dice/d100',
  '/roll-4d6',
  '/roll-1d4',
  '/roll-3d6',
  '/roll-5d6',
  '/roll-2d12',
  '/roll-d3',
  '/dnd-stat-roller',
  '/dice-average-calculator',
  '/unusual-dice',
  '/categories',
  '/about',
  '/fairness',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/sitemap',
  '/sitemap-directory',
];

let failed = false;

// 1. Check static routes in sitemap
for (const path of staticRoutes) {
  if (REDIRECT_MAP[path]) {
    console.error(`ERROR: Static route in sitemap redirects: ${path} -> ${REDIRECT_MAP[path]}`);
    failed = true;
  }
}

// 2. Check dynamic pages in sitemap
for (const p of ALL_SEO_PAGES_LIST) {
  if (REDIRECT_MAP[p.fullPath]) {
    console.error(`ERROR: Dynamic SEO page in sitemap redirects: ${p.fullPath} -> ${REDIRECT_MAP[p.fullPath]}`);
    failed = true;
  }
}

if (failed) {
  console.error('Sitemap verification FAILED!');
  process.exit(1);
} else {
  console.log('Sitemap verification PASSED: 0 redirecting URLs found in sitemaps!');
}
