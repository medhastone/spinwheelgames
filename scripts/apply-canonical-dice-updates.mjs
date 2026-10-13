import fs from 'fs';
import path from 'path';

// 1. app/dice/[slug]/page.tsx
const diceSlugPath = 'app/dice/[slug]/page.tsx';
let diceSlugContent = fs.readFileSync(diceSlugPath, 'utf8');

// Add d4 to SUPPORTED_DICE
diceSlugContent = diceSlugContent.replace(
  "const SUPPORTED_DICE = ['d2', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];",
  "const SUPPORTED_DICE = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];"
);

// Remove d4 redirect from generateMetadata
diceSlugContent = diceSlugContent.replace(
  `  if (normalizedSlug === 'd4') {\n    return {\n      alternates: {\n        canonical: 'https://spinwheelgames.org/roll-1d4'\n      }\n    };\n  }\n`,
  ''
);

// Remove d4 permanentRedirect from DiceSlugPage
diceSlugContent = diceSlugContent.replace(
  `  if (normalizedSlug === 'd4') {\n    permanentRedirect('/roll-1d4');\n  }\n`,
  ''
);
fs.writeFileSync(diceSlugPath, diceSlugContent, 'utf8');
console.log('Updated app/dice/[slug]/page.tsx');

// 2. app/roll-1d4/page.tsx -> Redirect to /dice/d4
const roll1d4Path = 'app/roll-1d4/page.tsx';
const roll1d4New = `import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function Roll1d4Page() {
  permanentRedirect('/dice/d4');
}
`;
fs.writeFileSync(roll1d4Path, roll1d4New, 'utf8');
console.log('Updated app/roll-1d4/page.tsx to permanentRedirect to /dice/d4');

// 3. components/dice/DedicatedDiePageComponent.tsx
const dedicatedCompPath = 'components/dice/DedicatedDiePageComponent.tsx';
let dedicatedCompContent = fs.readFileSync(dedicatedCompPath, 'utf8');

dedicatedCompContent = dedicatedCompContent.replace(
  `    const canonicalPath =\n      config.dieType === 'd4'\n        ? '/roll-1d4'\n        : config.dieType === '4d6'\n        ? '/roll-4d6'\n        : \`/dice/\${config.dieType}\`;`,
  `    const canonicalPath =\n      config.dieType === '4d6'\n        ? '/roll-4d6'\n        : \`/dice/\${config.dieType}\`;`
);

dedicatedCompContent = dedicatedCompContent.replace(
  `{ type: 'd4', label: 'D4 (Tetrahedron)', href: '/roll-1d4' }`,
  `{ type: 'd4', label: 'D4 (Tetrahedron)', href: '/dice/d4' }`
);
fs.writeFileSync(dedicatedCompPath, dedicatedCompContent, 'utf8');
console.log('Updated components/dice/DedicatedDiePageComponent.tsx');

// 4. components/dice/DiceNavigation.tsx
const diceNavPath = 'components/dice/DiceNavigation.tsx';
let diceNavContent = fs.readFileSync(diceNavPath, 'utf8');
diceNavContent = diceNavContent.replace(
  `{ href: '/roll-1d4', label: 'Roll 1d4', icon: Dices, description: '4-sided tetrahedron die' }`,
  `{ href: '/dice/d4', label: 'Roll d4', icon: Dices, description: '4-sided tetrahedron die' }`
);
fs.writeFileSync(diceNavPath, diceNavContent, 'utf8');
console.log('Updated components/dice/DiceNavigation.tsx');

// 5. components/navigation/DiceNavHeader.tsx
const diceNavHeaderPath = 'components/navigation/DiceNavHeader.tsx';
let diceNavHeaderContent = fs.readFileSync(diceNavHeaderPath, 'utf8');
diceNavHeaderContent = diceNavHeaderContent.replace(
  `{ href: '/roll-1d4', label: 'd4', short: 'd4', sides: 4 }`,
  `{ href: '/dice/d4', label: 'd4', short: 'd4', sides: 4 }`
);
fs.writeFileSync(diceNavHeaderPath, diceNavHeaderContent, 'utf8');
console.log('Updated components/navigation/DiceNavHeader.tsx');

// 6. components/navigation/DiceFooter.tsx
const diceFooterPath = 'components/navigation/DiceFooter.tsx';
let diceFooterContent = fs.readFileSync(diceFooterPath, 'utf8');
diceFooterContent = diceFooterContent.replace(
  `<Link href="/roll-1d4" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">\n                  Roll 1d4 / d4 Roller\n                </Link>`,
  `<Link href="/dice/d4" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">\n                  Roll a d4 (Tetrahedron)\n                </Link>`
);
diceFooterContent = diceFooterContent.replace(
  `{ label: 'd4 roller', href: '/roll-1d4' }`,
  `{ label: 'd4 roller', href: '/dice/d4' }`
);
fs.writeFileSync(diceFooterPath, diceFooterContent, 'utf8');
console.log('Updated components/navigation/DiceFooter.tsx');

// 7. components/SitemapDirectoryView.tsx
const sitemapDirPath = 'components/SitemapDirectoryView.tsx';
let sitemapDirContent = fs.readFileSync(sitemapDirPath, 'utf8');
sitemapDirContent = sitemapDirContent.replace(
  `{ href: '/roll-1d4', label: 'Roll 1d4 (4-Sided Die)', desc: 'Tetrahedron die roller for weapons, spells, and guidance' }`,
  `{ href: '/dice/d4', label: 'Roll d4 (4-Sided Die)', desc: 'Tetrahedron die roller for weapons, spells, and guidance' }`
);
fs.writeFileSync(sitemapDirPath, sitemapDirContent, 'utf8');
console.log('Updated components/SitemapDirectoryView.tsx');

// 8. components/HomeDicePromo.tsx
const homeDicePromoPath = 'components/HomeDicePromo.tsx';
let homeDicePromoContent = fs.readFileSync(homeDicePromoPath, 'utf8');
homeDicePromoContent = homeDicePromoContent.replace(
  `{ name: 'Roll 1d4 (Tetrahedron)', href: '/roll-1d4', desc: 'Magic Missile, Heals' }`,
  `{ name: 'Roll d4 (Tetrahedron)', href: '/dice/d4', desc: 'Magic Missile, Heals' }`
);
fs.writeFileSync(homeDicePromoPath, homeDicePromoContent, 'utf8');
console.log('Updated components/HomeDicePromo.tsx');

// 9. app/dice-roller/page.tsx
const diceRollerPath = 'app/dice-roller/page.tsx';
let diceRollerContent = fs.readFileSync(diceRollerPath, 'utf8');
diceRollerContent = diceRollerContent.replace(
  `              <Link\n                href="/roll-1d4"\n                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"\n              >\n                <div className="flex items-center justify-between">\n                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">\n                    Roll 1d4 Online`,
  `              <Link\n                href="/dice/d4"\n                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"\n              >\n                <div className="flex items-center justify-between">\n                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">\n                    Roll d4 Online`
);
fs.writeFileSync(diceRollerPath, diceRollerContent, 'utf8');
console.log('Updated app/dice-roller/page.tsx');

// 10. app/dice-average-calculator/page.tsx
const diceAvgCalcPath = 'app/dice-average-calculator/page.tsx';
let diceAvgCalcContent = fs.readFileSync(diceAvgCalcPath, 'utf8');
diceAvgCalcContent = diceAvgCalcContent.replace(
  `{ die: 'd4', shape: 'Tetrahedron', single: '2.5', d2: '5.0', d3: '7.5', link: '/roll-1d4' }`,
  `{ die: 'd4', shape: 'Tetrahedron', single: '2.5', d2: '5.0', d3: '7.5', link: '/dice/d4' }`
);
fs.writeFileSync(diceAvgCalcPath, diceAvgCalcContent, 'utf8');
console.log('Updated app/dice-average-calculator/page.tsx');

// 11. app/llms.txt/route.ts
const llmsPath = 'app/llms.txt/route.ts';
let llmsContent = fs.readFileSync(llmsPath, 'utf8');
llmsContent = llmsContent.replace(
  `- [Roll 1d4 Pyramid Die](https://spinwheelgames.org/roll-1d4): 3D 4-sided pyramid die roller.`,
  `- [Roll d4 Pyramid Die](https://spinwheelgames.org/dice/d4): 3D 4-sided pyramid die roller.`
);
fs.writeFileSync(llmsPath, llmsContent, 'utf8');
console.log('Updated app/llms.txt/route.ts');

// 12. lib/searchIndex.ts
const searchIndexPath = 'lib/searchIndex.ts';
let searchIndexContent = fs.readFileSync(searchIndexPath, 'utf8');
searchIndexContent = searchIndexContent.replace(
  `    {\n      id: 'roll-1d4',\n      name: 'Roll 1d4 Dice Roller (3D)',\n      category: 'Dice & RPG Tools',\n      purpose: 'Roll 4-sided tetrahedral dice in 3D for D&D daggers, healing potions, and magic missiles.',\n      uvp: 'Calibrated tetrahedral physics for standard 4-sided gaming dice.',\n      fullPath: '/roll-1d4',`,
  `    {\n      id: 'dice-d4',\n      name: 'Roll d4 Dice Roller (3D)',\n      category: 'Dice & RPG Tools',\n      purpose: 'Roll 4-sided tetrahedral dice in 3D for D&D daggers, healing potions, and magic missiles.',\n      uvp: 'Calibrated tetrahedral physics for standard 4-sided gaming dice.',\n      fullPath: '/dice/d4',`
);
fs.writeFileSync(searchIndexPath, searchIndexContent, 'utf8');
console.log('Updated lib/searchIndex.ts');

// 13. app/sitemaps/tools.xml/route.ts
const sitemapToolsPath = 'app/sitemaps/tools.xml/route.ts';
let sitemapToolsContent = fs.readFileSync(sitemapToolsPath, 'utf8');
sitemapToolsContent = sitemapToolsContent.replace(
  `{ path: '/roll-1d4', changefreq: 'daily', priority: '0.90' }`,
  `{ path: '/dice/d4', changefreq: 'daily', priority: '0.92' }`
);
fs.writeFileSync(sitemapToolsPath, sitemapToolsContent, 'utf8');
console.log('Updated app/sitemaps/tools.xml/route.ts');

// 14. scripts/generate-sitemap.ts
const genSitemapPath = 'scripts/generate-sitemap.ts';
let genSitemapContent = fs.readFileSync(genSitemapPath, 'utf8');
genSitemapContent = genSitemapContent.replace(
  `{ path: '/roll-1d4', changefreq: 'daily', priority: '0.90' }`,
  `{ path: '/dice/d4', changefreq: 'daily', priority: '0.92' }`
);
fs.writeFileSync(genSitemapPath, genSitemapContent, 'utf8');
console.log('Updated scripts/generate-sitemap.ts');

