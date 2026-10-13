import { WHEEL_LIBRARY_PART1 } from '../lib/wheelLibraryPart1';
import { WHEEL_LIBRARY_PART2 } from '../lib/wheelLibraryPart2';
import { WHEEL_LIBRARY_PART3 } from '../lib/wheelLibraryPart3';
import { WHEEL_LIBRARY_PART4 } from '../lib/wheelLibraryPart4';
import { WHEEL_LIBRARY_PART5 } from '../lib/wheelLibraryPart5';
import { WHEEL_LIBRARY_PART6 } from '../lib/wheelLibraryPart6';
import { WHEEL_LIBRARY_PART7 } from '../lib/wheelLibraryPart7';
import { WHEEL_LIBRARY_PART8 } from '../lib/wheelLibraryPart8';
import { WHEEL_LIBRARY_PART9 } from '../lib/wheelLibraryPart9';
import { CATEGORY_METADATA } from '../lib/seoDataWheelExperiences';

const all = [
  ...WHEEL_LIBRARY_PART1, ...WHEEL_LIBRARY_PART2, ...WHEEL_LIBRARY_PART3,
  ...WHEEL_LIBRARY_PART4, ...WHEEL_LIBRARY_PART5, ...WHEEL_LIBRARY_PART6,
  ...WHEEL_LIBRARY_PART7, ...WHEEL_LIBRARY_PART8, ...WHEEL_LIBRARY_PART9
];

function generateTitle(exp: typeof all[0], meta: any) {
  const baseWheelTitle = exp.name.toLowerCase().includes('wheel') || exp.name.toLowerCase().includes('picker')
    ? exp.name
    : `${exp.name} Wheel`;

  // Try specific patterns under 60 chars
  const candidate1 = `${baseWheelTitle} – Free Online Spinner`;
  if (candidate1.length <= 60) return candidate1;

  const candidate2 = `${baseWheelTitle} – Free Picker`;
  if (candidate2.length <= 60) return candidate2;

  const candidate3 = `${baseWheelTitle} Spinner`;
  if (candidate3.length <= 60) return candidate3;

  return baseWheelTitle.slice(0, 60);
}

let bad = 0;
all.forEach(exp => {
  const meta = CATEGORY_METADATA[exp.category] || CATEGORY_METADATA.DECISIONS;
  const t = generateTitle(exp, meta);
  if (t.length > 60) {
    bad++;
    console.log(`Still bad (${t.length}):`, t);
  }
});
console.log('Total tested:', all.length, 'Bad titles:', bad);
