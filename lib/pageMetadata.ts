import type { Metadata } from 'next';

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imageAlt?: string;
}

export function buildPageOgImageUrl(path: string, title: string, description?: string): string {
  if (process.env.GITHUB_PAGES === 'true') {
    return 'https://spinwheelgames.org/spinwheel-logo.webp';
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const params = new URLSearchParams();
  params.set('path', cleanPath);
  params.set('title', title);
  if (description) {
    params.set('desc', description.slice(0, 180));
  }
  return `https://spinwheelgames.org/api/og?${params.toString()}`;
}

/**
 * Generates page-specific Metadata ensuring twitter:title, twitter:description,
 * openGraph:title, openGraph:description, and og:image / twitter:image all come
 * directly from the page itself with zero homepage fallback.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  imageAlt
}: PageMetadataInput): Metadata {
  const cleanPath = path === '/' ? '/' : path.startsWith('/') ? path.replace(/\/+$/, '') : `/${path.replace(/\/+$/, '')}`;
  const canonicalUrl = `https://spinwheelgames.org${cleanPath}`;
  const ogImageUrl = buildPageOgImageUrl(cleanPath, title, description);
  const resolvedAlt = imageAlt || title;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'SpinWheelGames',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: resolvedAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl]
    }
  };
}
