import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavHeader from '@/components/navigation/DiceNavHeader';
import DiceFooter from '@/components/navigation/DiceFooter';
import DndStatRollerComponent from '@/components/dice/DndStatRollerComponent';
import { Shield, Sparkles, HelpCircle, CheckCircle2, ChevronDown, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'D&D Stat Roller (4d6 Drop Lowest, Point Buy & Standard Array)',
  description: 'Roll 6 D&D ability scores online with 3D dice. Features 4d6 drop lowest, 27 point buy calculator, standard array, and probability averages.',
  keywords: [
    'dnd stat roller',
    '4d6 drop lowest',
    'dnd ability score generator',
    'd&d point buy calculator',
    'standard array dnd 5e',
    'roll dnd stats',
    'character stat roller'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/dnd-stats'
  },
  openGraph: {
    title: 'D&D Stat Roller (4d6 Drop Lowest, Point Buy & Standard Array)',
    description: 'Roll 6 D&D ability scores online with 3D dice. Features 4d6 drop lowest, 27 point buy calculator, standard array, and probability averages.',
    url: 'https://spinwheelgames.org/dnd-stats',
    type: 'website'
  }
};

const dndFaqs = [
  {
    question: 'How does 4d6 Drop Lowest work?',
    answer: 'You roll four 6-sided dice, discard the die with the lowest number, and add the remaining 3 dice together. This produces an ability score between 3 and 18 with an expected average of 12.24.'
  },
  {
    question: 'What is the standard array in D&D 5e?',
    answer: 'The standard array is a fixed set of six numbers: 15, 14, 13, 12, 10, 8. You assign each number to one of the six ability scores (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma).'
  },
  {
    question: 'How does the 27 Point Buy system work?',
    answer: 'Each character begins with base scores of 8 in all six abilities and has 27 points to spend. Scores cost 1 point each up to 13 (8->9 costs 1, 12->13 costs 1), and cost 2 points each for 14 and 15 (13->14 costs 2, 14->15 costs 2).'
  },
  {
    question: 'What is the highest possible starting stat?',
    answer: 'On 4d6 drop lowest, the maximum rolled base score is 18 (rolling 6, 6, 6, 6). With racial ability score increases (+2), your starting score can reach 20.'
  },
  {
    question: 'What is the average total score for 4d6 drop lowest?',
    answer: 'The average sum of all 6 rolled abilities under 4d6dl1 is approximately 73.44 points, compared to 72 points for the standard array and 63 for straight 3d6.'
  }
];

export default function DndStatsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'D&D Stat Roller - 4d6 Drop Lowest 3D Dice',
        url: 'https://spinwheelgames.org/dnd-stats',
        applicationCategory: 'GameApplication',
        description: 'Online D&D 5e ability score generator with 3D dice, 4d6 drop lowest, 27 point buy calculator, and standard array.',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: dndFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
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
            name: 'D&D Stat Roller',
            item: 'https://spinwheelgames.org/dnd-stats'
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DiceNavHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 space-y-10 flex-1">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'D&D Stat Roller & Ability Score Generator' }
          ]}
        />

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold border border-indigo-200 dark:border-indigo-500/30 uppercase">
              D&amp;D 5e OFFICIAL RULES
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-200 dark:border-emerald-500/30">
              4d6 DROP 1 • POINT BUY • STANDARD ARRAY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll D&amp;D Stats Online - 4d6 Drop Lowest &amp; Point Buy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Generate your Dungeons &amp; Dragons 5th Edition ability scores (STR, DEX, CON, INT, WIS, CHA) using 3D dice rolls, standard array assignment, or the official 27-point buy system.
          </p>
        </div>

        {/* The Interactive Stat Roller Tool */}
        <DndStatRollerComponent />

        {/* Educational Content Section */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                How to Roll Ability Scores in D&amp;D 5e
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed comparison of rolling methods, probability curves, and modifier math.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. 4d6 Drop Lowest (Heroic)</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Roll four 6-sided dice and discard the lowest number. Produces a skewed curve favoring 12–16, with an expected average of <strong>12.24</strong> per stat.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Standard Array (Balanced)</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Assign the preset values: <strong>15, 14, 13, 12, 10, 8</strong> across your six stats. Guarantees party balance with a +2, +2, +1, +1, +0, -1 modifier spread.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">3. 27-Point Buy (Tactical)</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Spend 27 points to customize your base scores between 8 and 15. Perfect for configuring primary stats without risking low survivability rolls.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions About D&amp;D Stats
          </h2>
          <div className="space-y-3">
            {dndFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{faq.question}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <DiceFooter />
    </main>
  );
}
