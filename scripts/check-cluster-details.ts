import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const clusterKeywords = [
  ['random-picker', 'random-wheel', 'random-name-picker', 'winner-picker', 'raffle-wheel', 'giveaway-wheel', 'contest-picker'],
  ['food-wheel', 'dinner-wheel', 'restaurant-wheel', 'what-should-i-eat', 'food'],
  ['classroom-wheel', 'random-student', 'random-student-picker', 'classroom'],
  ['number-wheel', 'random-number-wheel', '1-50-wheel', 'numbers']
];

for (let i = 0; i < clusterKeywords.length; i++) {
  const kwList = clusterKeywords[i];
  console.log(`\n=== CLUSTER ${i + 1} (${kwList.join(', ')}) ===`);
  const matching = ALL_SEO_PAGES_LIST.filter(p => 
    kwList.some(kw => p.slug.includes(kw) || p.fullPath.includes(kw))
  );
  matching.forEach(p => {
    console.log(`- Path: ${p.fullPath}`);
    console.log(`  Title: ${p.title}`);
    console.log(`  H1: ${p.h1}`);
    console.log(`  Category: ${p.category || 'N/A'}, PageType: ${p.pageType}`);
    console.log(`  WordCount approx: ${(p.introduction + ' ' + (p.resultExplanation || '') + ' ' + (p.instructions || []).join(' ')).split(' ').length}`);
  });
}
