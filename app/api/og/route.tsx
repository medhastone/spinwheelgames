import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getSeoPageByPath, ALL_SEO_PAGES_MAP } from '@/lib/seoData';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawPath = searchParams.get('path') || '/';
  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const slug = cleanPath.replace(/^\/+|\/+$/g, '');

  const seoPage = getSeoPageByPath(cleanPath) || (slug ? ALL_SEO_PAGES_MAP[slug] : undefined);

  const title =
    searchParams.get('title') ||
    seoPage?.title ||
    'Spin the Wheel & See What Happens | SpinWheelGames';

  const description =
    searchParams.get('desc') ||
    searchParams.get('description') ||
    seoPage?.metaDescription ||
    'Free interactive wheel games, random pickers, and cryptographically fair decision tools.';

  const displayTitle = title.replace(/\s*\|\s*SpinWheelGames(\.org)?$/i, '').trim();
  const badgeText = cleanPath === '/' ? 'spinwheelgames.org' : `spinwheelgames.org${cleanPath}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0c0d14 0%, #171829 55%, #1e1b4b 100%)',
          color: '#ffffff',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Left Column: Page-Specific Title, Description & Domain Badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '720px',
            height: '100%'
          }}
        >
          {/* Top Brand Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 18px',
                borderRadius: '999px',
                background: 'rgba(99, 102, 241, 0.22)',
                border: '1px solid rgba(129, 140, 248, 0.45)',
                color: '#a5b4fc',
                fontSize: '20px',
                fontWeight: 700
              }}
            >
              {badgeText}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.16)',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                color: '#6ee7b7',
                fontSize: '18px',
                fontWeight: 700
              }}
            >
              Web Crypto CSPRNG
            </div>
          </div>

          {/* Center Main Title & Description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '12px',
              marginBottom: '12px'
            }}
          >
            <div
              style={{
                fontSize: displayTitle.length > 42 ? '50px' : '60px',
                fontWeight: 900,
                lineHeight: 1.12,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                display: 'flex'
              }}
            >
              {displayTitle}
            </div>
            <div
              style={{
                fontSize: '25px',
                lineHeight: 1.45,
                color: '#cbd5e1',
                fontWeight: 500,
                display: 'flex'
              }}
            >
              {description.length > 155 ? `${description.slice(0, 152)}...` : description}
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '20px',
              color: '#94a3b8',
              fontWeight: 600
            }}
          >
            <span style={{ color: '#818cf8', fontWeight: 800 }}>SpinWheelGames.org</span>
            <span>•</span>
            <span>Free Interactive Randomizer</span>
            <span>•</span>
            <span>100% Client-Side</span>
          </div>
        </div>

        {/* Right Column: Decorative Multi-Slice Wheel Graphic */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '320px',
            borderRadius: '160px',
            border: '10px solid #ffffff',
            background: 'conic-gradient(#4648d4 0deg 60deg, #10b981 60deg 120deg, #f59e0b 120deg 180deg, #ec4899 180deg 240deg, #3b82f6 240deg 300deg, #8b5cf6 300deg 360deg)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.65)',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '104px',
              height: '104px',
              borderRadius: '52px',
              background: '#12131a',
              border: '6px solid #ffffff',
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '0.06em'
            }}
          >
            SPIN
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
