import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

console.log('Total pages:', ALL_SEO_PAGES_LIST.length);

// Group by slug or title patterns
const groupings = new Map<string, typeof ALL_SEO_PAGES_LIST>();

ALL_SEO_PAGES_LIST.forEach(page => {
  // simplify keywords
  const norm = page.slug
    .replace(/^(the|a|an)-/, '')
    .replace(/-(wheel|spinner|picker|decider|roller|generator)$/, '');
  const list = groupings.get(norm) || [];
  list.push(page);
  groupings.set(norm, list);
});

console.log('\n--- POTENTIAL SLUG-STEM OVERLAPS ---');
for (const [stem, pages] of groupings.entries()) {
  if (pages.length > 1) {
    console.log(`Stem: "${stem}" (${pages.length} pages):`);
    pages.forEach(p => console.log(`  - ${p.fullPath} (Title: ${p.title})`));
  }
}
