import { SeoPageData, PageCategoryType } from './seoArchitecture';
import { CORE_TOOLS_SEO } from './seoDataCoreTools';
import { USE_CASES_SEO } from './seoDataUseCases';
import { CATEGORIES_AND_GUIDES_SEO } from './seoDataCategoriesAndGuides';
import { EXTENDED_PILLARS_SEO } from './seoDataExtendedPillars';
import { WHEEL_EXPERIENCES_SEO } from './seoDataWheelExperiences';
import { SITE_CONFIG } from './siteConfig';

const RAW_PAGES_MAP: Record<string, SeoPageData> = {
  ...WHEEL_EXPERIENCES_SEO,
  ...CORE_TOOLS_SEO,
  ...USE_CASES_SEO,
  ...CATEGORIES_AND_GUIDES_SEO,
  ...EXTENDED_PILLARS_SEO
};

// Exclude consolidated duplicate URLs that 301 redirect to primary canonical targets
const CONSOLIDATED_REDIRECT_KEYS = new Set([
  'food-wheel/dinner',
  'food-wheel/breakfast',
  'random-student-picker',
  'random-number-wheel',
  'winner-picker',
  'contest-picker',
  'raffle-wheel',
  'party-wheel/truth-or-dare',
  'team-generator'
]);

export const ALL_SEO_PAGES_MAP: Record<string, SeoPageData> = Object.fromEntries(
  Object.entries(RAW_PAGES_MAP).filter(([key]) => !CONSOLIDATED_REDIRECT_KEYS.has(key))
);

export const ALL_SEO_PAGES_LIST: SeoPageData[] = Object.values(ALL_SEO_PAGES_MAP);

export function getSeoPageByPath(path: string): SeoPageData | undefined {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return ALL_SEO_PAGES_LIST.find((p) => p.fullPath === cleanPath);
}

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return ALL_SEO_PAGES_MAP[slug];
}

export function getSeoPagesByType(type: PageCategoryType): SeoPageData[] {
  return ALL_SEO_PAGES_LIST.filter((p) => p.pageType === type);
}

export function getSeoPagesByCategory(categoryKey: string): SeoPageData[] {
  return ALL_SEO_PAGES_LIST.filter((p) => p.categoryKey === categoryKey);
}

/**
 * Generates valid, schema-compliant JSON-LD structured data using SITE_CONFIG metadata.
 */
export function generatePageJsonLd(page: SeoPageData): object[] {
  const schemas: object[] = [];

  // 1. WebPage / Article Schema
  const webPageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': page.pageType === 'guide' ? 'TechArticle' : 'WebPage',
    name: page.title,
    headline: page.h1,
    description: page.metaDescription,
    url: `${SITE_CONFIG.baseUrl}${page.fullPath}`,
    inLanguage: 'en-US',
    datePublished: '2026-01-15T08:00:00Z',
    dateModified: '2026-09-22T08:00:00Z',
    author: {
      '@type': 'Organization',
      name: page.eeatMeta?.authorName || `${SITE_CONFIG.brandName} Editorial Team`,
      url: SITE_CONFIG.baseUrl,
      email: SITE_CONFIG.supportEmail,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.baseUrl,
      email: SITE_CONFIG.supportEmail,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.baseUrl}/spinwheel-logo.webp`
      }
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.baseUrl
    }
  };

  if (page.eeatMeta?.reviewedBy) {
    webPageSchema.reviewedBy = {
      '@type': 'Person',
      name: page.eeatMeta.reviewedBy,
      jobTitle: page.eeatMeta.reviewedRole
    };
  }

  if (page.externalCitations && page.externalCitations.length > 0) {
    webPageSchema.citation = page.externalCitations.map((c) => c.sourceUrl);
  }

  schemas.push(webPageSchema);

  // 2. BreadcrumbList Schema
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.item
      }))
    };
    schemas.push(breadcrumbSchema);
  }

  // 3. SoftwareApplication Schema (for interactive tools and subtools)
  if (page.pageType === 'tool' || page.pageType === 'subtool') {
    const appSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: page.h1,
      description: page.metaDescription,
      url: `${SITE_CONFIG.baseUrl}${page.fullPath}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      browserRequirements: 'Requires JavaScript and HTML5 Canvas support'
    };
    schemas.push(appSchema);
  }

  // 4. ItemList Schema (for default entries list)
  if (page.defaultWheelData && page.defaultWheelData.items.length > 0) {
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: page.defaultWheelData.title,
      description: page.defaultWheelData.description,
      numberOfItems: page.defaultWheelData.items.length,
      itemListElement: page.defaultWheelData.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.text
      }))
    };
    schemas.push(itemListSchema);
  }

  // 5. FAQPage Schema (only where genuine FAQs exist)
  if (page.faqs && page.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  return schemas;
}
