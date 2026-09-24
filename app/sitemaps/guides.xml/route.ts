import { NextResponse } from 'next/server';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const guidePages = ALL_SEO_PAGES_LIST.filter(
    (p) => p.pageType === 'guide'
  );

  const urlsXml = guidePages
    .map((page) => {
      return `  <url>
    <loc>https://spinwheelgames.org${page.fullPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
