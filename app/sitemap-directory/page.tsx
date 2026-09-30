import { Metadata } from 'next';
import SitemapDirectoryView from '@/components/SitemapDirectoryView';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Sitemap Directory | All Spin Wheels, Random Pickers & Tools - ${SITE_CONFIG.brandName}`,
  description:
    `Explore the comprehensive directory of ${SITE_CONFIG.counts.totalToolsFormatted} custom spin wheels, 3D RPG dice rollers, classroom randomizers, giveaway pickers, and guides on ${SITE_CONFIG.fullBrandName}.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/sitemap-directory`
  },
  openGraph: {
    title: `Sitemap Directory - ${SITE_CONFIG.fullBrandName}`,
    description: `Complete catalog of all ${SITE_CONFIG.counts.totalToolsFormatted} interactive decision tools, games, and resources.`,
    url: `${SITE_CONFIG.baseUrl}/sitemap-directory`,
    siteName: SITE_CONFIG.brandName,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sitemap Directory - ${SITE_CONFIG.fullBrandName}`,
    description: `Complete catalog of all ${SITE_CONFIG.counts.totalToolsFormatted} interactive decision tools, games, and resources.`
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
