import fs from 'fs';
import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const files = [
  'lib/seoDataCoreTools.ts',
  'lib/seoDataExtendedPillars.ts',
  'lib/seoDataUseCases.ts',
  'lib/seoDataWheelExperiences.ts',
  'lib/seoDataCategoriesAndGuides.ts'
];

const fileContents = files.map(f => ({
  file: f,
  content: fs.readFileSync(f, 'utf-8')
}));

const longTitles = ALL_SEO_PAGES_LIST.filter(p => p.title.length > 60);
console.log(`Total titles > 60 chars: ${longTitles.length}`);

longTitles.slice(0, 10).forEach(p => {
  for (const f of fileContents) {
    if (f.content.includes(`'${p.slug}':`) || f.content.includes(`"${p.slug}":`)) {
      console.log(`${p.slug} (${p.title.length} chars) in ${f.file}`);
      break;
    }
  }
});
