import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'spinwheelgames.org';

export const REDIRECT_MAP: Record<string, string> = {
  '/d2': '/dice/d2',
  '/d4': '/dice/d4',
  '/roll-1d4': '/dice/d4',
  '/d6': '/dice/d6',
  '/d8': '/dice/d8',
  '/d10': '/dice/d10',
  '/d12': '/dice/d12',
  '/d20': '/dice/d20',
  '/d100': '/dice/d100',
  '/4d6': '/roll-4d6',
  '/dice/4d6': '/roll-4d6',
  '/dice-average': '/dice-average-calculator',
  '/dnd-stats': '/dnd-stat-roller',
  '/fair-randomness': '/fairness',
  '/category': '/categories',
  '/entertainment': '/movie-wheel',
  '/category/entertainment': '/movie-wheel',
  '/bingo-spin-wheel': '/bingo-wheel',
  '/food-wheel/dinner': '/dinner-wheel',
  '/food-wheel/breakfast': '/breakfast-wheel',
  '/pizza-topping-wheel': '/food-wheel/pizza',
  '/lunch-wheel': '/food-wheel/lunch',
  '/what-to-eat-wheel': '/what-should-i-eat',
  '/random-student-picker': '/classroom-wheel/random-student',
  '/student-picker': '/classroom-wheel/random-student',
  '/student-picker-wheel': '/classroom-wheel/random-student',
  '/random-team-generator': '/team-generator',
  '/team-maker': '/team-generator',
  '/random-number-wheel': '/number-wheel',
  '/1-20-wheel': '/number-wheel',
  '/number-wheel/1-10': '/1-10-wheel',
  '/number-wheel/1-50': '/1-50-wheel',
  '/number-wheel/1-100': '/1-100-wheel',
  '/winner-picker': '/giveaway-wheel',
  '/contest-picker': '/giveaway-wheel',
  '/raffle-wheel': '/giveaway-wheel',
  '/party-wheel/truth-or-dare': '/truth-or-dare-wheel',
  '/sitemap-directory': '/sitemap'
};

function isLocalOrPreviewHost(host: string): boolean {
  return (
    !host ||
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.endsWith('.run.app') ||
    host.endsWith('.vercel.app')
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search, searchParams } = req.nextUrl;
  const rawHost =
    req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const host = rawHost.split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
  const proto = (req.headers.get('x-forwarded-proto') || 'https')
    .split(',')[0]
    .trim()
    .toLowerCase();

  let targetPath = pathname;
  let needsRedirect = false;

  // 1. Strip trailing slash (except root '/')
  if (targetPath.length > 1 && targetPath.endsWith('/')) {
    targetPath = targetPath.replace(/\/+$/, '');
    needsRedirect = true;
  }

  // 2. Resolve legacy/alternate path redirects in the same single hop
  if (REDIRECT_MAP[targetPath]) {
    targetPath = REDIRECT_MAP[targetPath];
    needsRedirect = true;
  } else if (targetPath.startsWith('/category/')) {
    const slug = targetPath.slice('/category/'.length);
    targetPath = slug === 'entertainment' ? '/movie-wheel' : `/${slug}`;
    needsRedirect = true;
  }

  // 3. Enforce non-www and HTTPS on production domain in the same single 301 hop
  if (!isLocalOrPreviewHost(host)) {
    if (host !== CANONICAL_HOST || proto === 'http') {
      needsRedirect = true;
    }
  }

  if (needsRedirect) {
    const finalHost = isLocalOrPreviewHost(host)
      ? rawHost.split(',')[0].trim() || 'localhost:3000'
      : CANONICAL_HOST;
    const finalProto = isLocalOrPreviewHost(host) ? proto : 'https';
    const destination = `${finalProto}://${finalHost}${targetPath}${search}`;
    return NextResponse.redirect(destination, 301);
  }

  const res = NextResponse.next();

  // 4. Enable HSTS on canonical HTTPS responses
  if (!isLocalOrPreviewHost(host) && proto === 'https') {
    res.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // 5. SEO & Indexing Safety: Enforce X-Robots-Tag: noindex, nofollow ONLY on stream overlays, remote control, embeds, and shared shortcodes
  const isStreamOverlay =
    searchParams.get('stream') === '1' || searchParams.get('stream') === 'true';
  const isNoIndexRoute =
    isStreamOverlay ||
    pathname.startsWith('/stream-control') ||
    pathname.startsWith('/embed') ||
    pathname.startsWith('/w/') ||
    pathname.startsWith('/r/');

  if (isNoIndexRoute) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|json|css|js|map|woff2?|ttf|eot|webmanifest)$).*)'
  ]
};
