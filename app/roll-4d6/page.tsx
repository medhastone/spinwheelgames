import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceRollerEngine from '@/components/dice/DiceRollerEngine';
import {

  Shield,
  Calculator,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Dices,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'Roll 4d6 (Drop Lowest) Online | 3D D&D Ability Score Roller',
  description:
    'Roll 4d6 online with realistic 3D WebGL physics. Automatically calculates 4d6 Drop Lowest for D&D character stats, discrete probability distributions, and expected averages.',
  keywords: [
    'roll 4d6',
    'roll 4d6 drop lowest',
    '4d6 drop lowest online',
    '4d6 roller',
    'dnd stat dice roller',
    '4d6 dice roller',
    'dnd 5e 4d6 drop lowest',
    'character stat roller 4d6'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/roll-4d6'
  },
  openGraph: {
    title: 'Roll 4d6 (Drop Lowest) Online – 3D Dice Roller',
    description:
      'Interactive 3D WebGL 4d6 dice roller with automatic Drop Lowest calculation for D&D 5e character ability score generation.',
    url: 'https://spinwheelgames.org/roll-4d6',
    type: 'website'
  }
};

const PROBABILITY_TABLE_4D6_DL1 = [
  { score: 18, combinations: 21, probability: 1.62, cumulative: 100.0, modifier: '+4' },
  { score: 17, combinations: 54, probability: 4.17, cumulative: 98.38, modifier: '+3' },
  { score: 16, combinations: 94, probability: 7.25, cumulative: 94.21, modifier: '+3' },
  { score: 15, combinations: 131, probability: 10.11, cumulative: 86.96, modifier: '+2' },
  { score: 14, combinations: 160, probability: 12.35, cumulative: 76.85, modifier: '+2' },
  { score: 13, combinations: 172, probability: 13.27, cumulative: 64.50, modifier: '+1' },
  { score: 12, combinations: 167, probability: 12.89, cumulative: 51.23, modifier: '+1' },
  { score: 11, combinations: 148, probability: 11.42, cumulative: 38.34, modifier: '+0' },
  { score: 10, combinations: 122, probability: 9.41, cumulative: 26.92, modifier: '+0' },
  { score: 9, combinations: 91, probability: 7.02, cumulative: 17.51, modifier: '-1' },
  { score: 8, combinations: 62, probability: 4.78, cumulative: 10.49, modifier: '-1' },
  { score: 7, combinations: 38, probability: 2.93, cumulative: 5.71, modifier: '-2' },
  { score: 6, combinations: 21, probability: 1.62, cumulative: 2.78, modifier: '-2' },
  { score: 5, combinations: 10, probability: 0.77, cumulative: 1.16, modifier: '-3' },
  { score: 4, combinations: 4, probability: 0.31, cumulative: 0.39, modifier: '-3' },
  { score: 3, combinations: 1, probability: 0.08, cumulative: 0.08, modifier: '-4' }
];

const FAQS = [
  {
    question: 'What does "Roll 4d6 Drop Lowest" mean?',
    answer:
      'In tabletop roleplaying games like D&D 5e, "4d6 Drop Lowest" (abbreviated 4d6dl1 or 4d6kh3) means you roll four six-sided dice at the same time, identify the single die showing the smallest number, discard it, and add the remaining three dice together. This produces an ability score between 3 and 18.'
  },
  {
    question: 'What is the average roll of 4d6 Drop Lowest?',
    answer:
      'The expected mathematical average of 4d6 Drop Lowest is 12.24 per attribute. By contrast, straight 3d6 has an average of 10.5. Discarding the lowest roll raises the average score by +1.74 points and drastically reduces the odds of crippling scores (scores below 8 occur in only 5.7% of rolls).'
  },
  {
    question: 'What are the odds of rolling an 18 on 4d6 Drop Lowest?',
    answer:
      'The probability of rolling an 18 (e.g. 6-6-6-6, 6-6-6-5, 6-6-6-4, 6-6-6-3, 6-6-6-2, or 6-6-6-1) is 21 out of 1,296 possible outcomes, which is exactly 1.62% (roughly 1 in every 61.7 rolls). On straight 3d6, the odds of an 18 are only 0.46% (1 in 216).'
  },
  {
    question: 'How do you roll a complete D&D character stat block with 4d6 Drop Lowest?',
    answer:
      'Repeat the 4d6 Drop Lowest process 6 times to generate 6 individual scores. You then assign these 6 numbers to your character\'s core ability scores: Strength (STR), Dexterity (DEX), Constitution (CON), Intelligence (INT), Wisdom (WIS), and Charisma (CHA), prioritizing the highest scores in your class\'s primary attributes.'
  },
  {
    question: 'Is 4d6 Drop Lowest better than the Standard Array (15, 14, 13, 12, 10, 8)?',
    answer:
      'The Standard Array totals 72 points with an average score of 12.0. Rolling 6 stats with 4d6 Drop Lowest totals an average of 73.44 points (average stat 12.24). While 4d6dl1 yields slightly stronger characters on average and allows for starting 18s, it carries the risk of rolling lower scores or imbalanced parties.'
  },
  {
    question: 'What is the difference between 4d6dl1 and 4d6kh3 in dice notation?',
    answer:
      'They mean the exact same mechanic: "4d6dl1" means "roll 4d6 and drop lowest 1", while "4d6kh3" means "roll 4d6 and keep highest 3". Both instructions yield the sum of the top 3 dice.'
  }
];

export default function Roll4d6Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll 4d6 Online (Drop Lowest) - 3D Dice Roller',
        url: 'https://spinwheelgames.org/roll-4d6',
        description:
          'Interactive 3D WebGL 4d6 dice roller with automatic Drop Lowest calculation, probability charts, and character stat generation.',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://spinwheelgames.org'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Dice Roller',
            item: 'https://spinwheelgames.org/dice-roller'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Roll 4d6 (Drop Lowest)',
            item: 'https://spinwheelgames.org/roll-4d6'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0c10] text-slate-900 dark:text-[#e0e1eb] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 space-y-6">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Roll 4d6 (Drop Lowest)' }
          ]}
        />

        {/* Hero Section */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono uppercase tracking-wider">
              D&amp;D 5e Character Creation Standard
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono uppercase tracking-wider">
              Average: 12.24 / Stat
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll 4 D6 Online - 3D Multi-Dice Roller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll 4 six-sided dice with 3D physics. Automatically drops the lowest individual die and computes active subtotal, expected averages, modifier values, and score probability curves.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={4}
          initialSides={6}
          initialDropLowest={1}
          suggestedPresets={[
            { label: '4d6 Drop Lowest (D&D Stat)', count: 4, sides: 6, dropLowest: 1 },
            { label: 'Straight 4d6 Sum (4–24)', count: 4, sides: 6, dropLowest: 0 },
            { label: 'Classic 3d6 (3–18)', count: 3, sides: 6, dropLowest: 0 },
            { label: '5d6 Drop Lowest 2', count: 5, sides: 6, dropLowest: 2 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-6 border-t border-slate-200 dark:border-[#1e2030] pt-6">
          
          {/* Section 1: Overview & Explanation */}
          <section className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  What is 4d6 Drop Lowest &amp; How Does It Work?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  The official heroic method for generating player character ability scores in Dungeons &amp; Dragons 5th Edition.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                In the <strong>Dungeons &amp; Dragons 5th Edition Player’s Handbook</strong> (Chapter 1: Step-by-Step Characters), the primary recommended method for determining ability scores is rolling four 6-sided dice (written in dice notation as <strong>4d6</strong>) and discarding the single lowest value (written as <strong>dl1</strong> or <strong>drop lowest 1</strong>).
              </p>
              <p>
                For example, if your 4d6 roll yields <strong>[6, 5, 4, 1]</strong>:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d29] font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
                <p><span className="text-slate-500">Rolls:</span> 6, 5, 4, <span className="line-through text-rose-500 font-bold">1 (Dropped)</span></p>
                <p><span className="text-slate-500">Calculation:</span> 6 + 5 + 4 = <strong className="text-indigo-600 dark:text-indigo-400 text-base">15</strong> (Ability Score Modifier: +2)</p>
              </div>
              <p>
                You repeat this roll <strong>6 times</strong> to establish your character’s six foundational abilities: <strong>Strength (STR)</strong>, <strong>Dexterity (DEX)</strong>, <strong>Constitution (CON)</strong>, <strong>Intelligence (INT)</strong>, <strong>Wisdom (WIS)</strong>, and <strong>Charisma (CHA)</strong>.
              </p>
            </div>
          </section>

          {/* Section 2: Mathematical Probability Table */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  4d6 Drop Lowest Exact Probability Distribution Table
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exact mathematical frequencies, percentage odds, and cumulative probabilities across all 1,296 possible outcomes ($6^4$).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1e202c]">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#151622] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c]">
                    <th className="py-3 px-4 font-bold">Score (3–18)</th>
                    <th className="py-3 px-4 font-bold">5e Modifier</th>
                    <th className="py-3 px-4 font-bold">Combinations / 1,296</th>
                    <th className="py-3 px-4 font-bold">Exact Odds</th>
                    <th className="py-3 px-4 font-bold">Chance of ≥ Score</th>
                    <th className="py-3 px-4 font-bold">Bell Curve Visual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171824]">
                  {PROBABILITY_TABLE_4D6_DL1.map((row) => (
                    <tr
                      key={row.score}
                      className="hover:bg-slate-50 dark:hover:bg-[#141520] transition-colors"
                    >
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{row.score}</td>
                      <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{row.modifier}</td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">{row.combinations}</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">{row.probability}%</td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">{row.cumulative}%</td>
                      <td className="py-2.5 px-4 w-1/4">
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#1c1d2a] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(3, row.probability * 7))}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">Scores 13 or Higher:</span>
                <p className="text-emerald-600 dark:text-emerald-400 text-lg font-bold font-mono">56.76%</p>
                <p>Over half of all rolls yield a +1 modifier or higher.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">Scores 16, 17, or 18:</span>
                <p className="text-indigo-600 dark:text-indigo-400 text-lg font-bold font-mono">13.04%</p>
                <p>Approximately 1 in 8 rolls yields an elite primary stat.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">Scores Below 8 (Negative Mod):</span>
                <p className="text-rose-600 dark:text-rose-400 text-lg font-bold font-mono">5.71%</p>
                <p>Severe penalties (-2 or worse) are kept rare.</p>
              </div>
            </div>
          </section>

          {/* Section 3: 4d6 Drop Lowest vs Other Generation Methods */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Comparing D&amp;D Stat Generation Methods
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How 4d6 Drop Lowest compares against Standard Array, 27-Point Buy, and Classic 3d6.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs leading-relaxed">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold font-mono">
                  4d6 Drop Lowest
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Heroic &amp; Dynamic</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Average stat is <strong>12.24</strong> (Total ~73.4). Allows starting with high 16s–18s. Produces organic flaws and strengths.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold font-mono">
                  Standard Array
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Guaranteed Balance</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Fixed set: <strong>15, 14, 13, 12, 10, 8</strong> (Total 72.0, Average 12.0). Ensures equal power across all party members.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold font-mono">
                  27-Point Buy
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tactical Customization</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Spend 27 points from base 8s up to 15s. Maximum control for multi-ability score dependent (MAD) builds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold font-mono">
                  Classic 3d6
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Gritty / OSR Survival</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Straight 3d6 per stat. Average is <strong>10.5</strong> (Total 63.0). High mortality, retro dungeon crawl feel.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Class Stat Priority Guide */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Where to Assign Your 4d6 Rolls: D&amp;D 5e Class Priority Guide
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick recommendations for placing your top rolled scores based on your character's class.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {[
                { name: 'Barbarian', primary: 'Strength, Constitution', secondary: 'Dexterity', dump: 'Intelligence / Charisma' },
                { name: 'Bard', primary: 'Charisma', secondary: 'Dexterity, Constitution', dump: 'Strength' },
                { name: 'Cleric', primary: 'Wisdom', secondary: 'Constitution, Strength (heavy armor)', dump: 'Intelligence' },
                { name: 'Druid', primary: 'Wisdom', secondary: 'Constitution, Dexterity', dump: 'Strength / Intelligence' },
                { name: 'Fighter', primary: 'Strength or Dexterity', secondary: 'Constitution', dump: 'Intelligence / Charisma' },
                { name: 'Monk', primary: 'Dexterity, Wisdom', secondary: 'Constitution', dump: 'Intelligence / Strength' },
                { name: 'Paladin', primary: 'Strength, Charisma', secondary: 'Constitution', dump: 'Intelligence / Dexterity' },
                { name: 'Ranger', primary: 'Dexterity, Wisdom', secondary: 'Constitution', dump: 'Intelligence / Strength' },
                { name: 'Rogue', primary: 'Dexterity', secondary: 'Constitution, Intelligence / Charisma', dump: 'Strength' },
                { name: 'Sorcerer', primary: 'Charisma', secondary: 'Constitution, Dexterity', dump: 'Strength' },
                { name: 'Warlock', primary: 'Charisma', secondary: 'Constitution, Dexterity', dump: 'Strength' },
                { name: 'Wizard', primary: 'Intelligence', secondary: 'Constitution, Dexterity', dump: 'Strength' }
              ].map((c) => (
                <div key={c.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5">
                  <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{c.name}</h3>
                  <p className="text-slate-700 dark:text-slate-300"><strong>Primary:</strong> {c.primary}</p>
                  <p className="text-slate-500 dark:text-slate-400"><strong>Secondary:</strong> {c.secondary}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-[11px]"><strong>Lowest (Dump):</strong> {c.dump}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: FAQs */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Frequently Asked Questions (Roll 4d6 Drop Lowest)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct answers to common questions about rolling ability scores and 4d6 mathematics.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">{faq.question}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Related Tools */}
          <section className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-white dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-[#0c0d14] border border-indigo-200 dark:border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Related Tabletop Dice &amp; Stat Tools</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore specialized calculators, polyhedral rollers, and complete stat generators.
                </p>
              </div>
              <Link
                href="/dice-roller"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View Full Dice Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { href: '/dnd-stat-roller', label: 'Full D&D Stat Roller' },
                { href: '/dice-average-calculator', label: 'Dice Average Calculator' },
                { href: '/d6', label: '1D6 Roller' },
                { href: '/roll-3d6', label: 'Roll 3d6' },
                { href: '/roll-5d6', label: 'Roll 5d6' },
                { href: '/d20', label: 'D20 Roller' },
                { href: '/dice-collection', label: '3D Dice Collection' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#13141e] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#222435] transition-all shadow-2xs"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        {/* Cross Navigation */}
        <DiceNavigation currentPath="/roll-4d6" />
      </main>

      <Footer />
    </div>
  );
}
