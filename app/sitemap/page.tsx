import { Metadata } from 'next';
import SitemapDirectoryView from '@/components/SitemapDirectoryView';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `HTML Sitemap | ${SITE_CONFIG.brandName} - Full Directory of Wheels & Tools`,
  description:
    `Browse all ${SITE_CONFIG.counts.totalToolsFormatted} decision wheels, classroom randomizers, 3D dice rollers, and guides on ${SITE_CONFIG.fullBrandName}.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/sitemap`
  },
  openGraph: {
    title: `HTML Sitemap - ${SITE_CONFIG.fullBrandName}`,
    description: `Complete catalog of all ${SITE_CONFIG.counts.totalToolsFormatted} interactive decision tools, games, and resources.`,
    url: `${SITE_CONFIG.baseUrl}/sitemap`,
    siteName: SITE_CONFIG.brandName,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `HTML Sitemap - ${SITE_CONFIG.fullBrandName}`,
    description: `Complete catalog of all ${SITE_CONFIG.counts.totalToolsFormatted} interactive decision tools, games, and resources.`
  }
};

export default function SitemapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `HTML Sitemap | ${SITE_CONFIG.brandName}`,
    description: `Complete index of all decision wheels, dice tools, and games on ${SITE_CONFIG.fullBrandName}`,
    url: `${SITE_CONFIG.baseUrl}/sitemap`,
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
      <SitemapDirectoryView activePath="/sitemap" />
    </>
  );
}
