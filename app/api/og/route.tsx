import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function formatSlugFallback(slug: string): string {
  if (!slug) return 'Spin the Wheel & See What Happens';
  return slug
    .split('/')
    .pop()!
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawPath = searchParams.get('path') || '/';
  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const slug = cleanPath.replace(/^\/+|\/+$/g, '');

  const title =
    searchParams.get('title') ||
    `${formatSlugFallback(slug)} | SpinWheelGames`;

  const description =
    searchParams.get('desc') ||
    searchParams.get('description') ||
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
            position: 'relative'
          }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320">
            <circle cx="160" cy="160" r="154" fill="#ffffff" />
            <path d="M160,160 L160,14 A146,146 0 0,1 286.4,87 Z" fill="#4648d4" />
            <path d="M160,160 L286.4,87 A146,146 0 0,1 286.4,233 Z" fill="#10b981" />
            <path d="M160,160 L286.4,233 A146,146 0 0,1 160,306 Z" fill="#f59e0b" />
            <path d="M160,160 L160,306 A146,146 0 0,1 33.6,233 Z" fill="#ec4899" />
            <path d="M160,160 L33.6,233 A146,146 0 0,1 33.6,87 Z" fill="#3b82f6" />
            <path d="M160,160 L33.6,87 A146,146 0 0,1 160,14 Z" fill="#8b5cf6" />
            <circle cx="160" cy="160" r="52" fill="#12131a" stroke="#ffffff" strokeWidth="8" />
          </svg>
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
        'CDN-Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=604800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=31536000, immutable'
      }
    }
  );
}
