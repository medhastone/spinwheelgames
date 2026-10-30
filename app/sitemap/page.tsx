import { Metadata } from 'next';
import SitemapDirectoryView from '@/components/SitemapDirectoryView';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "HTML Sitemap & Directory | SpinWheelGames",
  "description": "Complete HTML sitemap and categorized directory of all interactive spin wheels, 3D RPG dice rollers, classroom randomizers, and guides on SpinWheelGames.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/sitemap"
  },
  "openGraph": {
    "title": "HTML Sitemap & Directory | SpinWheelGames",
    "description": "Complete HTML sitemap and categorized directory of all interactive spin wheels, 3D RPG dice rollers, classroom randomizers, and guides on SpinWheelGames.",
    "url": "https://spinwheelgames.org/sitemap",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fsitemap&title=HTML+Sitemap+%26+Directory+%7C+SpinWheelGames&desc=Complete+HTML+sitemap+and+categorized+directory+of+all+interactive+spin+wheels%2C+3D+RPG+dice+rollers%2C+and+classroom+randomizers.",
        "width": 1200,
        "height": 630,
        "alt": "HTML Sitemap & Directory | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "HTML Sitemap & Directory | SpinWheelGames",
    "description": "Complete HTML sitemap and categorized directory of all interactive spin wheels, 3D RPG dice rollers, classroom randomizers, and guides on SpinWheelGames.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fsitemap&title=HTML+Sitemap+%26+Directory+%7C+SpinWheelGames&desc=Complete+HTML+sitemap+and+categorized+directory+of+all+interactive+spin+wheels%2C+3D+RPG+dice+rollers%2C+and+classroom+randomizers."
    ]
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
