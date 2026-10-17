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
  '/d4': '/dice/d4',
  '/roll-1d4': '/dice/d4',
  '/d6': '/dice/d6',
  '/d8': '/dice/d8',
  '/d10': '/dice/d10',
  '/d12': '/dice/d12',
  '/d20': '/dice/d20',
  '/d100': '/dice/d100',
  '/category': '/categories',
  '/entertainment': '/movie-wheel',
  '/category/entertainment': '/movie-wheel',
  '/bingo-spin-wheel': '/bingo-wheel',
  // Duplicate clusters consolidation redirects (301)
  '/food-wheel/dinner': '/dinner-wheel',
  '/food-wheel/breakfast': '/breakfast-wheel',
  '/random-student-picker': '/classroom-wheel/random-student',
  '/random-number-wheel': '/number-wheel',
  '/winner-picker': '/giveaway-wheel',
  '/contest-picker': '/giveaway-wheel',
  '/raffle-wheel': '/giveaway-wheel',
  '/party-wheel/truth-or-dare': '/truth-or-dare-wheel',
  '/team-generator': '/team-picker',
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const host = (
    req.headers.get('x-forwarded-host') ||
    req.headers.get('host') ||
    req.nextUrl.host ||
    ''
  ).toLowerCase();

  // Parse protocol taking into account edge proxy headers (Cloudflare, AWS, Nginx, GCP)
  let proto = (req.headers.get('x-forwarded-proto') || '').toLowerCase();
  if (!proto) {
    const cfVisitor = req.headers.get('cf-visitor');
    if (cfVisitor) {
      try {
        const parsed = JSON.parse(cfVisitor);
        if (parsed.scheme) proto = parsed.scheme.toLowerCase();
      } catch {
        // ignore parse error
      }
    }
  }
  if (!proto) {
    proto = req.nextUrl.protocol.replace(':', '').toLowerCase();
  }

  // 1. Ultra-fast Bot & Scanner shield: Immediately return 404 in < 0.1ms without React SSR
  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(req.nextUrl.search)) {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=31536000',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  // Normalize path without trailing slash (except root '/')
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const redirectedPath = REDIRECT_MAP[normalizedPath];

  // 2. Canonical Host Enforcement: Single-hop 301 for http://, www., and any non-canonical host variants
  const isProdHost = host.includes('spinwheelgames.org');
  const isWww = host.startsWith('www.');
  const isHttp = proto === 'http';

  if (isProdHost && (isWww || isHttp)) {
    // Determine the absolute final target path to guarantee 1 hop
    const finalPath = redirectedPath || normalizedPath;
    const finalUrl = new URL(finalPath + req.nextUrl.search, 'https://spinwheelgames.org');
    const res = NextResponse.redirect(finalUrl, 301);
    res.headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    return res;
  }

  // Fast shortcode redirect for /w/[id]
  if (pathname.startsWith('/w/')) {
    const shortCode = pathname.substring(3);
    if (shortCode) {
      const targetPath = REDIRECT_MAP['/' + shortCode] || (shortCode.length > 20 ? '/categories' : '/?s=' + encodeURIComponent(shortCode));
      const res = NextResponse.redirect(new URL(targetPath, req.url), 302);
      res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      return res;
    }
  }

  // 3. Instant Edge 301 Redirects: Single-hop permanent redirect
  if (redirectedPath) {
    const targetUrl = isProdHost
      ? new URL(redirectedPath + req.nextUrl.search, 'https://spinwheelgames.org')
      : new URL(redirectedPath + req.nextUrl.search, req.url);
    const res = NextResponse.redirect(targetUrl, 301);
    res.headers.set(
      'Cache-Control',
      'public, max-age=31536000, s-maxage=31536000, immutable'
    );
    return res;
  }

  // 4. Normal Request Pipeline with Edge Cache headers
  const response = NextResponse.next();
  if (req.method === 'GET' && !pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400'
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
