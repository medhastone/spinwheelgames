import { NextRequest, NextResponse } from 'next/server';

// Common automated vulnerability scanner and probe signatures
const MALICIOUS_PATTERNS = [
  /\.php($|\?)/i,
  /\.asp($|\?)/i,
  /\.aspx($|\?)/i,
  /\.jsp($|\?)/i,
  /\.env($|\?)/i,
  /\.git($|\?)/i,
  /\.sql($|\?)/i,
  /\.bak($|\?)/i,
  /\.zip($|\?)/i,
  /\.tar($|\?)/i,
  /\.gz($|\?)/i,
  /wp-admin/i,
  /wp-login/i,
  /wp-content/i,
  /wp-includes/i,
  /xmlrpc/i,
  /cgi-bin/i,
  /phpmyadmin/i,
  /phpunit/i,
];

// Instant edge redirects (resolved in < 0.2ms CPU time)
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
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Ultra-fast Bot & Scanner shield: Immediately return 404 in < 0.1ms without React SSR
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(req.nextUrl.search)) {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  // 2. Instant Edge Redirects: avoid executing heavy Node/Edge Next.js redirect runtime
  const target = REDIRECT_MAP[pathname];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    const res = NextResponse.redirect(url, 301);
    res.headers.set(
      'Cache-Control',
      'public, max-age=31536000, s-maxage=31536000, immutable'
    );
    return res;
  }

  // 3. Normal Request Pipeline with Cloudflare Edge Cache headers
  const response = NextResponse.next();

  if (req.method === 'GET' && !pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
