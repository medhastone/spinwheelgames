import { NextResponse } from 'next/server';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

export const dynamic = 'force-static';

const EXCLUDED_PATHS = new Set([
  '/privacy',
  '/terms',
  '/contact',
  '/accessibility',
  '/d2',
  '/d4',
  '/d6',
  '/d8',
  '/d10',
  '/d12',
  '/d20',
  '/d100',
  '/4d6',
  '/dice/4d6',
  '/roll-1d4',
  '/dice-average',
  '/dnd-stats',
  '/entertainment',
  '/category',
  '/category/entertainment',
  '/fair-randomness',
  '/food-wheel/dinner',
  '/food-wheel/breakfast',
  '/random-student-picker',
  '/winner-picker',
  '/contest-picker',
  '/raffle-wheel',
  '/party-wheel/truth-or-dare',
  '/bingo-spin-wheel'
]);

const STATIC_CANONICAL_PATHS = [
  '/',
  '/games',
  '/categories',
  '/challenges',
  '/fairness',
  '/about',
  '/sitemap',
  '/sitemap-directory',
  '/wheel-of-names',
  '/food-wheel',
  '/movie-wheel',
  '/number-wheel',
  '/random-number-wheel',
  '/team-generator',
  '/bingo-wheel',
  '/animal-wheel',
  '/classroom-wheel',
  '/drawing-wheel',
  '/question-wheel',
  '/random-object-generator',
  '/song-wheel',
  '/theme-wheel',
  '/color-wheel',
  '/truth-or-dare-wheel',
  '/comment-picker',
  '/random-game-picker',
  '/birthday-wheel',
  '/random-category-generator',
  '/word-spinner',
  '/pokemon-wheel',
  '/random-app-picker',
  '/dice-roller',
  '/dice-collection',
  '/unusual-dice',
  '/dnd-stat-roller',
  '/dice-average-calculator',
  '/roll-4d6',
  '/roll-3d6',
  '/roll-5d6',
  '/roll-2d12',
  '/roll-d3',
  '/dice/d2',
  '/dice/d4',
  '/dice/d6',
  '/dice/d8',
  '/dice/d10',
  '/dice/d12',
  '/dice/d20',
  '/dice/d100'
];

export async function GET() {
  const lastmod = '2026-10-17';
  const uniquePaths = new Set<string>();

  for (const p of STATIC_CANONICAL_PATHS) {
    if (!EXCLUDED_PATHS.has(p)) {
      uniquePaths.add(p);
    }
  }

  for (const page of ALL_SEO_PAGES_LIST) {
    const cleanPath = page.fullPath.startsWith('/') ? page.fullPath : `/${page.fullPath}`;
    if (!EXCLUDED_PATHS.has(cleanPath)) {
      uniquePaths.add(cleanPath);
    }
  }

  const urlEntries = Array.from(uniquePaths).map((path) => {
    const loc = path === '/' ? 'https://spinwheelgames.org/' : `https://spinwheelgames.org${path}`;
    const priority = path === '/' ? '1.0' : path.startsWith('/dice') || path.startsWith('/roll-') ? '0.9' : '0.85';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
