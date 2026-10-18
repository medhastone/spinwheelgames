import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'spinwheelgames.org';

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
  const host = rawHost.split(',')[0].trim().toLowerCase();
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

  // 2. Enforce non-www and HTTPS on production domain in a single hop
  if (!isLocalOrPreviewHost(host)) {
    if (host === `www.${CANONICAL_HOST}` || proto === 'http') {
      needsRedirect = true;
    }
  }

  if (needsRedirect) {
    const finalHost = isLocalOrPreviewHost(host) ? host : CANONICAL_HOST;
    const finalProto = isLocalOrPreviewHost(host) ? proto : 'https';
    const destination = `${finalProto}://${finalHost}${targetPath}${search}`;
    return NextResponse.redirect(destination, 308);
  }

  const res = NextResponse.next();

  // 3. SEO & Indexing Safety: Enforce X-Robots-Tag: noindex, nofollow on stream overlays, remote control, embeds, and shared shortcodes
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?)$).*)'
  ]
};
