import { Metadata } from 'next';
import SitemapDirectoryView from '@/components/SitemapDirectoryView';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Complete Wheel & Tool Directory | SpinWheelGames',
  description: 'Interactive random wheel and decision tool on SpinWheelGames.',
  alternates: {
    canonical: 'https://spinwheelgames.org/sitemap-directory'
  },
  openGraph: {
    title: 'Complete Wheel & Tool Directory | SpinWheelGames',
    description: 'Interactive random wheel and decision tool on SpinWheelGames.',
    url: 'https://spinwheelgames.org/sitemap-directory',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Complete Wheel & Tool Directory | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Wheel & Tool Directory | SpinWheelGames',
    description: 'Interactive random wheel and decision tool on SpinWheelGames.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

export default function SitemapDirectoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Sitemap Directory | ${SITE_CONFIG.brandName}`,
    description: `Complete index of all decision wheels, dice tools, and games on ${SITE_CONFIG.fullBrandName}`,
    url: `${SITE_CONFIG.baseUrl}/sitemap-directory`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SitemapDirectoryView activePath="/sitemap-directory" />
    </>
  );
}
