import { NextResponse } from 'next/server';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

export const dynamic = 'force-static';

export async function GET() {
  const lastmod = '2026-10-17';

  const staticRoutes: { path: string; changefreq: string; priority: string }[] = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/challenges', changefreq: 'daily', priority: '0.95' },
    { path: '/games', changefreq: 'daily', priority: '0.95' },
    { path: '/movie-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/food-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/number-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/team-generator', changefreq: 'daily', priority: '0.95' },
    { path: '/bingo-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/animal-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/pokemon-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/classroom-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/drawing-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/random-game-picker', changefreq: 'daily', priority: '0.95' },
    { path: '/random-app-picker', changefreq: 'daily', priority: '0.95' },
    { path: '/comment-picker', changefreq: 'daily', priority: '0.95' },
    { path: '/birthday-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/question-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/random-object-generator', changefreq: 'daily', priority: '0.95' },
    { path: '/random-category-generator', changefreq: 'daily', priority: '0.95' },
    { path: '/word-spinner', changefreq: 'daily', priority: '0.95' },
    { path: '/song-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/theme-wheel', changefreq: 'daily', priority: '0.95' },
    { path: '/dice-roller', changefreq: 'daily', priority: '0.95' },
    { path: '/dice-collection', changefreq: 'daily', priority: '0.95' },
    { path: '/dice/d2', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d6', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d8', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d10', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d12', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d20', changefreq: 'daily', priority: '0.95' },
    { path: '/dice/d100', changefreq: 'daily', priority: '0.92' },
    { path: '/roll-4d6', changefreq: 'daily', priority: '0.92' },
    { path: '/dice/d4', changefreq: 'daily', priority: '0.90' },
    { path: '/roll-3d6', changefreq: 'daily', priority: '0.90' },
    { path: '/roll-5d6', changefreq: 'daily', priority: '0.90' },
    { path: '/roll-2d12', changefreq: 'daily', priority: '0.90' },
    { path: '/roll-d3', changefreq: 'daily', priority: '0.90' },
    { path: '/dnd-stat-roller', changefreq: 'daily', priority: '0.92' },
    { path: '/dice-average-calculator', changefreq: 'daily', priority: '0.90' },
    { path: '/unusual-dice', changefreq: 'daily', priority: '0.90' },
    { path: '/categories', changefreq: 'weekly', priority: '0.85' },
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/fairness', changefreq: 'monthly', priority: '0.7' },
    { path: '/stream-wheel', changefreq: 'weekly', priority: '0.88' },
    { path: '/sitemap', changefreq: 'weekly', priority: '0.6' },
  ];

  const existingPaths = new Set(staticRoutes.map((r) => r.path));

  const toolPages = ALL_SEO_PAGES_LIST.filter(
    (p) => p.pageType === 'tool' || p.pageType === 'subtool'
  );

  const staticXml = staticRoutes
    .map(
      (r) => `  <url>
    <loc>https://spinwheelgames.org${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  const toolXml = toolPages
    .filter((page) => !existingPaths.has(page.fullPath))
    .map((page) => {
      const priority = page.pageType === 'tool' ? '0.9' : '0.85';
      return `  <url>
    <loc>https://spinwheelgames.org${page.fullPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${toolXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
