import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

// Map of categories
const categoryPages = ALL_SEO_PAGES_LIST.filter(p => p.pageType === 'category');
const toolPages = ALL_SEO_PAGES_LIST.filter(p => p.pageType === 'tool' || p.pageType === 'subtool');

console.log(`Total categories: ${categoryPages.length}`);
console.log(`Total tools: ${toolPages.length}`);

// Check category mappings
const catToolsMap = new Map<string, typeof ALL_SEO_PAGES_LIST>();

toolPages.forEach(tool => {
  const cat = tool.category || 'uncategorized';
  const list = catToolsMap.get(cat) || [];
  list.push(tool);
  catToolsMap.set(cat, list);
});

console.log('\n--- TOOLS PER CATEGORY ---');
for (const [cat, tools] of catToolsMap.entries()) {
  console.log(`Category "${cat}": ${tools.length} tools`);
}

console.log('\n--- CATEGORY HUB RELATED TOOLS ---');
categoryPages.forEach(cat => {
  const linkedPaths = cat.relatedTools?.map(t => t.path) || [];
  console.log(`Hub ${cat.fullPath} has ${linkedPaths.length} relatedTools links`);
});

