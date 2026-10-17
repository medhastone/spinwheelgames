import fs from 'fs';
import path from 'path';
import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const BASE_URL = 'https://spinwheelgames.org';
const lastmod = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const staticRoutes: { path: string; changefreq: SitemapEntry['changefreq']; priority: string }[] = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/sitemap-directory', changefreq: 'weekly', priority: '0.8' },
  { path: '/sitemap', changefreq: 'weekly', priority: '0.8' },
  { path: '/categories', changefreq: 'weekly', priority: '0.9' },
  { path: '/games', changefreq: 'daily', priority: '0.95' },
  { path: '/challenges', changefreq: 'daily', priority: '0.95' },
  { path: '/movie-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/food-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/number-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/bingo-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/animal-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/classroom-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/drawing-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/question-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/random-object-generator', changefreq: 'daily', priority: '0.95' },
  { path: '/song-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/theme-wheel', changefreq: 'daily', priority: '0.95' },
  { path: '/dice-roller', changefreq: 'daily', priority: '0.95' },
  { path: '/dice-collection', changefreq: 'daily', priority: '0.95' },
  { path: '/dice/d2', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d6', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d8', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d10', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d12', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d20', changefreq: 'daily', priority: '0.95' },
  { path: '/dice/d100', changefreq: 'daily', priority: '0.92' },
  { path: '/roll-4d6', changefreq: 'daily', priority: '0.92' },
  { path: '/dice/d4', changefreq: 'daily', priority: '0.90' },
  { path: '/roll-3d6', changefreq: 'daily', priority: '0.92' },
  { path: '/roll-5d6', changefreq: 'daily', priority: '0.92' },
  { path: '/roll-d3', changefreq: 'daily', priority: '0.90' },
  { path: '/roll-2d12', changefreq: 'daily', priority: '0.92' },
  { path: '/dnd-stat-roller', changefreq: 'daily', priority: '0.92' },
  { path: '/dice-average-calculator', changefreq: 'daily', priority: '0.90' },
  { path: '/unusual-dice', changefreq: 'daily', priority: '0.90' },
  { path: '/about', changefreq: 'monthly', priority: '0.6' },
  { path: '/fairness', changefreq: 'monthly', priority: '0.7' },
];

const urlMap = new Map<string, SitemapEntry>();

// Add static routes first
for (const r of staticRoutes) {
  const fullUrl = `${BASE_URL}${r.path}`;
  urlMap.set(fullUrl, {
    url: fullUrl,
    changefreq: r.changefreq,
    priority: r.priority
  });
}

// Add all dynamic SEO pages
for (const page of ALL_SEO_PAGES_LIST) {
  const fullUrl = `${BASE_URL}${page.fullPath}`;
  if (!urlMap.has(fullUrl)) {
    let changefreq: SitemapEntry['changefreq'] = 'weekly';
    let priority = '0.85';

    if (page.pageType === 'tool') {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (page.pageType === 'subtool') {
      priority = '0.85';
      changefreq = 'weekly';
    } else if (page.pageType === 'category') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (page.pageType === 'guide') {
      priority = '0.75';
      changefreq = 'monthly';
    }

    urlMap.set(fullUrl, {
      url: fullUrl,
      changefreq,
      priority
    });
  }
}

const entries = Array.from(urlMap.values());

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf-8');

console.log(`Successfully generated public/sitemap.xml with ${entries.length} URLs at ${outputPath}`);
