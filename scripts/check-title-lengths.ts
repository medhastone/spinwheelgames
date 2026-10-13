import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

console.log('Checking title lengths (should be <= 60 chars)...');
let overCount = 0;
ALL_SEO_PAGES_LIST.forEach(p => {
  if (p.title.length > 60) {
    overCount++;
    console.log(`[${p.title.length} chars] ${p.fullPath}: "${p.title}"`);
  }
});
console.log(`\nTotal titles over 60 chars: ${overCount} / ${ALL_SEO_PAGES_LIST.length}`);
