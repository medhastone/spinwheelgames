/**
 * Single Centralized Source of Truth for SpinWheelGames counts and business metadata.
 * Pure leaf configuration module without heavy circular imports.
 */
const interactiveWheelsCount = 136;
const wheelExperiencesCount = 118;
const diceToolsCount = 9;
const totalToolsCount = interactiveWheelsCount + diceToolsCount;
const categoriesCount = 19;
const guidesCount = 5;
const totalPagesCount = 159;

export const SITE_COUNTS = {
  interactiveWheels: interactiveWheelsCount, // 136
  wheelExperiences: wheelExperiencesCount, // 118
  diceTools: diceToolsCount, // 9
  totalTools: totalToolsCount, // 145
  categories: categoriesCount, // 19
  guides: guidesCount, // 5
  totalPages: totalPagesCount, // 159

  // Standardized formatted strings
  wheelsFormatted: `${interactiveWheelsCount}+`, // "136+"
  totalToolsFormatted: `${totalToolsCount}+`, // "145+"
  categoriesFormatted: `${categoriesCount}`, // "19"
};

export const SITE_CONFIG = {
  brandName: 'SpinWheelGames',
  fullBrandName: 'SpinWheelGames.org',
  domain: 'spinwheelgames.org',
  baseUrl: 'https://spinwheelgames.org',

  // Official Support Contact Email
  supportEmail: 'info@spinwheelgames.org',

  // Dynamic Calculated Counts
  counts: SITE_COUNTS,

  // Support Wording
  support: {
    responseTime: '24–48 hours',
    wording: 'Our team reviews all inquiries and responds within 24–48 hours.',
    privacyNotice: 'Designed to minimize collection of user-provided wheel data with local browser processing.',
  },

  // Core Feature Names
  features: {
    cryptoRng: 'Web Cryptography API (crypto.getRandomValues)',
    renderingEngine: 'HTML5 Canvas & Vector Deceleration Physics',
    storageMode: 'Local Browser Processing (localStorage & URL hash)',
  },

  // Navigation Links
  links: {
    home: '/',
    about: '/about',
    privacy: '/privacy',
    terms: '/terms',
    accessibility: '/accessibility',
    contact: '/contact',    fairness: '/fairness',
    games: '/games',
    categories: '/categories',
    diceRoller: '/dice-roller',
    sitemap: '/sitemap',
  }
} as const;

export type SiteConfig = typeof SITE_CONFIG;
