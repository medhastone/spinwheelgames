import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Robots.txt for SpinWheelGames.org
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /

# Prevent duplicate indexing of search filters and tracking parameters
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*utm_*
Disallow: /*?*ref=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=
Disallow: /*?*session=
Disallow: /api/

# Master Sitemap Index
Sitemap: https://spinwheelgames.org/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
