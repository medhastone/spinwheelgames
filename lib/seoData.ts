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

// Exclude consolidated duplicate URLs and legacy URL forms that should not appear in sitemap or internal links
const CONSOLIDATED_REDIRECT_KEYS = new Set([
  'food-wheel/dinner',
  'food-wheel/breakfast',
  'pizza-topping-wheel',
  'lunch-wheel',
  'what-to-eat-wheel',
  'random-student-picker',
  'student-picker',
  'student-picker-wheel',
  'random-team-generator',
  'team-maker',
  'random-number-wheel',
  '1-20-wheel',
  'number-wheel/1-10',
  'number-wheel/1-50',
  'number-wheel/1-100',
  'winner-picker',
  'contest-picker',
  'raffle-wheel',
  'party-wheel/truth-or-dare',
  'team-generator',
  'entertainment',
  'sitemap-directory'
]);

const LEGACY_PATH_REPLACEMENTS: Record<string, string> = {
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
  '/entertainment': '/movie-wheel',
  '/category/entertainment': '/movie-wheel',
  '/fair-randomness': '/fairness',
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
  '/category': '/categories',
  '/bingo-spin-wheel': '/bingo-wheel',
  '/sitemap-directory': '/sitemap'
};

function sanitizePath(p: string): string {
  return LEGACY_PATH_REPLACEMENTS[p] || p;
}

function sanitizeFullUrl(url: string): string {
  if (!url.startsWith('https://spinwheelgames.org/')) return url;
  const pathPart = url.slice('https://spinwheelgames.org'.length).replace(/\/+$/, '') || '/';
  const mapped = sanitizePath(pathPart);
  return mapped === '/' ? 'https://spinwheelgames.org' : `https://spinwheelgames.org${mapped}`;
}

/**
 * Formats page titles to "<Primary keyword> | SpinWheelGames" under 60 characters
 * with no duplicate brand suffixes.
 */
export function formatSeoTitle(rawTitle: string, fallbackH1?: string): string {
  const suffix = ' | SpinWheelGames';
  const maxKeywordLen = 59 - suffix.length; // 42 chars max so total <= 59 (< 60)

  let cleaned = rawTitle
    .replace(/\s*\|\s*SpinWheelGames(\.org)?/gi, '')
    .replace(/\s*\|\s*SpinWheel/gi, '')
    .replace(/\s*[-–—]\s*Spin\s*Wheel\s*Games(\.org)?/gi, '')
    .replace(/\s*[-–—]\s*SpinWheelGames(\.org)?/gi, '')
    .trim();

  if (cleaned.length > maxKeywordLen) {
    const splitParts = cleaned.split(/\s*[-–—:|]\s*/);
    if (splitParts[0] && splitParts[0].trim().length >= 8 && splitParts[0].trim().length <= maxKeywordLen) {
      cleaned = splitParts[0].trim();
    } else if (fallbackH1) {
      const h1Short = fallbackH1.split(/\s*[-–—:|]\s*/)[0].trim();
      if (h1Short.length >= 6 && h1Short.length <= maxKeywordLen) {
        cleaned = h1Short;
      }
    }
  }

  if (cleaned.length > maxKeywordLen) {
    const truncated = cleaned.slice(0, maxKeywordLen);
    const lastSpace = truncated.lastIndexOf(' ');
    cleaned = (lastSpace > 15 ? truncated.slice(0, lastSpace) : truncated).replace(/[,;&–—-]+$/, '').trim();
  }

  return `${cleaned}${suffix}`;
}

function normalizeSeoPage(page: SeoPageData): SeoPageData {
  return {
    ...page,
    title: formatSeoTitle(page.title, page.h1),
    parentCategoryPath: page.parentCategoryPath ? sanitizePath(page.parentCategoryPath) : page.parentCategoryPath,
    relatedTools: page.relatedTools?.map((t) => ({ ...t, path: sanitizePath(t.path) })),
    relatedWheels: page.relatedWheels?.map((w) => ({ ...w, path: sanitizePath(w.path) })),
    relatedGuides: page.relatedGuides?.map((g) => ({ ...g, path: sanitizePath(g.path) })),
    internalLinks: page.internalLinks?.map((l) => ({ ...l, href: sanitizePath(l.href) })),
    breadcrumbs: page.breadcrumbs?.map((b) => ({ ...b, item: sanitizeFullUrl(b.item) }))
  };
}

export const ALL_SEO_PAGES_MAP: Record<string, SeoPageData> = Object.fromEntries(
  Object.entries(RAW_PAGES_MAP)
    .filter(([key]) => !CONSOLIDATED_REDIRECT_KEYS.has(key))
    .map(([key, page]) => [key, normalizeSeoPage(page)])
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
