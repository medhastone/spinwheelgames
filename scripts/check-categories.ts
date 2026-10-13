import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const categories = ALL_SEO_PAGES_LIST.filter(p => p.pageType === 'category');
console.log('Category pages count:', categories.length);
categories.forEach(c => {
  console.log(`- ${c.fullPath} (slug: ${c.slug})`);
  console.log(`  Title: ${c.title}`);
  console.log(`  Related Tools count: ${c.relatedTools?.length || 0}`);
  if (c.relatedTools?.length > 0) {
    console.log(`  First 3 child tools:`, c.relatedTools.slice(0, 3).map(t => t.path));
  }
});
