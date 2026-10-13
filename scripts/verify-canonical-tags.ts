import { ALL_SEO_PAGES_LIST } from '../lib/seoData';
import fs from 'fs';
import path from 'path';

console.log('Verifying canonical tags across all static and dynamic SEO pages...');

let errors: string[] = [];

// 1. Check all pages defined in ALL_SEO_PAGES_LIST
for (const page of ALL_SEO_PAGES_LIST) {
  if (!page.canonical) {
    errors.push(`Page missing canonical: ${page.fullPath}`);
  } else if (!page.canonical.startsWith('https://spinwheelgames.org/')) {
    errors.push(`Page has non-canonical host in canonical tag: ${page.fullPath} -> ${page.canonical}`);
  } else if (page.canonical.includes('www.')) {
    errors.push(`Page has www. in canonical tag: ${page.fullPath} -> ${page.canonical}`);
  }
}

// 2. Check layout.tsx metadataBase
const layoutContent = fs.readFileSync(path.resolve(__dirname, '../app/layout.tsx'), 'utf8');
if (!layoutContent.includes("metadataBase: new URL('https://spinwheelgames.org')")) {
  errors.push("layout.tsx does not have metadataBase set to https://spinwheelgames.org");
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} canonical errors:`, errors);
  process.exit(1);
} else {
  console.log(`All ${ALL_SEO_PAGES_LIST.length} SEO pages and layout metadataBase have pristine canonical URLs!`);
}
