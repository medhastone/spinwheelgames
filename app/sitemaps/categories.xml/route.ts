import { NextResponse } from 'next/server';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

export const dynamic = 'force-static';

export async function GET() {
  const lastmod = '2026-11-20';

  const categoryPages = ALL_SEO_PAGES_LIST.filter(
    (p) => p.pageType === 'category'
  );

  const urlsXml = categoryPages
    .map((page) => {
      return `  <url>
    <loc>https://spinwheelgames.org${page.fullPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
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
