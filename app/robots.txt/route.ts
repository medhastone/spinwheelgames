import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# Robots.txt for SpinWheelGames.org
User-agent: *
Allow: /
Allow: /_next/static/
Allow: /_next/image

Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*utm_*
Disallow: /*?*ref=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=
Disallow: /*?*session=
Disallow: /api/

Sitemap: https://spinwheelgames.org/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
