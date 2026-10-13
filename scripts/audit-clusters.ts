import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

// Analyze similarities in titles and h1s
const titles = ALL_SEO_PAGES_LIST.map(p => ({
  path: p.fullPath,
  title: p.title,
  h1: p.h1,
  meta: p.metaDescription,
  slug: p.slug
}));

console.log('Total indexed candidate pages:', titles.length);

// Check duplicate titles
const titleMap = new Map<string, string[]>();
titles.forEach(t => {
  const list = titleMap.get(t.title) || [];
  list.push(t.path);
  titleMap.set(t.title, list);
});
for (const [title, paths] of titleMap.entries()) {
  if (paths.length > 1) {
    console.log('DUPLICATE TITLE:', title, paths);
  }
}

// Check duplicate h1
const h1Map = new Map<string, string[]>();
titles.forEach(t => {
  const list = h1Map.get(t.h1) || [];
  list.push(t.path);
  h1Map.set(t.h1, list);
});
for (const [h1, paths] of h1Map.entries()) {
  if (paths.length > 1) {
    console.log('DUPLICATE H1:', h1, paths);
  }
}
