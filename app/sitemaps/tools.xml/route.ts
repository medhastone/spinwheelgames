import { NextResponse } from 'next/server';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const toolPages = ALL_SEO_PAGES_LIST.filter(
    (p) => p.pageType === 'tool' || p.pageType === 'subtool'
  );

  const homeEntry = `  <url>
    <loc>https://spinwheelgames.org/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  const urlsXml = toolPages
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
${homeEntry}
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
