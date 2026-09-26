import { Metadata } from 'next';
import DiceAverageCalculatorComponent from '@/components/dice/DiceAverageCalculatorComponent';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavHeader from '@/components/navigation/DiceNavHeader';
import DiceFooter from '@/components/navigation/DiceFooter';
import Link from 'next/link';
import {
  Calculator,
  Sparkles,
  HelpCircle,
  Home,
  ChevronRight,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Shield,
  Layers,
  BarChart2,
  Zap,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dice Average Calculator (Exact Probabilities, Bell Curves & Expected Values)',
  description:
    'Free online dice average calculator. Calculate exact expected values, standard deviation, probability distributions, and bell curves for any tabletop RPG dice notation (2d6, 3d6, 8d6 Fireball, 4d6dl1, 1d20 advantage).',
  keywords: [
    'dice average calculator',
    'average dice calculator',
    'average dice roll calculator',
    'dice average calc',
    'dnd dice average calculator',
    'dice expected value calculator',
    'dice probability calculator',
    'die rolling probability calculator',
    'dice analyzer',
    '3d6 average',
    '2d6 average',
    '4d6 average',
    '8d6 fireball average',
    'd20 average advantage',
    'd12 vs 2d6 average'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/dice-average'
  },
  openGraph: {
    title: 'Dice Average Calculator – Exact Probabilities & Odds',
    description:
      'Calculate average damage, standard deviation, and full bell curves for any D&D or tabletop dice combination.',
    url: 'https://spinwheelgames.org/dice-average',
    type: 'website'
  }
};

const calcFaqs = [
  {
    question: 'How do you calculate the average of any die roll?',
    answer:
      'The theoretical average (expected value) of a single standard fair die with N sides is (N + 1) / 2. For multiple identical dice (NdX), multiply the die count by the single die average: N × (X + 1) / 2. Finally, add or subtract any flat modifier.'
  },
  {
    question: 'Why does 2d6 feel more reliable than 1d12 in tabletop combat?',
    answer:
      'A single 1d12 has a uniform probability distribution (every outcome from 1 to 12 has an identical 8.33% chance). In contrast, 2d6 produces a triangular bell curve where central numbers like 7 (16.67%) occur 6 times more often than extremes like 2 or 12 (2.78%), guaranteeing consistent baseline damage.'
  },
  {
    question: 'What is the average damage of 8d6 (D&D 5e Fireball)?',
    answer:
      '8d6 averages 8 × 3.5 = 28.0 fire damage. The damage range is 8 to 48, with more than 68% of rolls landing between 23 and 33 damage due to standard deviation (±4.83).'
  },
  {
    question: 'What is the average of rolling with Advantage on a d20 (2d20kh1)?',
    answer:
      'Rolling 1d20 with Advantage increases the expected average from 10.5 to approximately 13.825 (+3.325 bump). It also raises the chance of rolling a natural 20 (critical hit) from 5.0% to 9.75% while slashing the chance of a critical failure (natural 1) to just 0.25%.'
  },
  {
    question: 'What is the average of 4d6 Drop Lowest (4d6dl1) for character stats?',
    answer:
      'Rolling 4d6 and dropping the lowest die produces an expected average of 12.24 per attribute, significantly higher than the 10.5 average of standard 3d6. It also gives a 56.8% chance of scoring 13 or higher.'
  },
  {
    question: 'What is standard deviation in dice rolls?',
    answer:
      'Standard deviation measures how closely roll outcomes cluster around the average. A low standard deviation means predictable rolls, while a high standard deviation means wide swings and swingy results.'
  }
];

export default function DiceAveragePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Dice Average & Probability Distribution Calculator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        description:
          'Calculate exact discrete probability, standard deviation, and average outcomes for any dice formula.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: calcFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
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
            name: 'Dice Average Calculator',
            item: 'https://spinwheelgames.org/dice-average'
          }
        ]
      },
      {
        '@type': 'Article',
        headline: 'The Complete Guide to Dice Averages, Probability Distributions & Tabletop Mathematics',
        description:
          'Master dice probability, expected values, standard deviation, and bell curve mechanics for D&D, Pathfinder, Warhammer, and tabletop RPGs.',
        author: {
          '@type': 'Organization',
          name: 'SpinWheelGames'
        },
        publisher: {
          '@type': 'Organization',
          name: 'SpinWheelGames'
        }
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

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-8 space-y-8 flex-1">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Dice Average Calculator' }
          ]}
        />

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold border border-indigo-200 dark:border-indigo-500/30 uppercase tracking-wide">
              Exact Mathematics Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-200 dark:border-emerald-500/30">
              Discrete Probability &amp; Standard Deviation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Dice Average Calculator Online - Probability &amp; Expected Value
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Analyze any tabletop RPG dice formula (such as <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-[#1f2133] text-indigo-600 dark:text-amber-300 font-mono font-bold">2d6+3</code>, <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-[#1f2133] text-indigo-600 dark:text-amber-300 font-mono font-bold">8d6</code>, <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-[#1f2133] text-indigo-600 dark:text-amber-300 font-mono font-bold">4d6dl1</code>, or <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-[#1f2133] text-indigo-600 dark:text-amber-300 font-mono font-bold">1d12</code>) to compute exact mathematical averages, variance, standard deviation, and complete discrete probability tables.
          </p>
        </div>

        {/* The Calculator Tool Component */}
        <DiceAverageCalculatorComponent />

        {/* Deep Dive Educational Blogpost Section */}
        <article className="space-y-10 pt-6 border-t border-slate-200 dark:border-[#1e2030]">
          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Comprehensive Tabletop Probability Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Understanding Dice Math: From Single Die Rolls to Complex Bell Curves
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
              Whether you are optimizing a character build in Dungeons &amp; Dragons 5e, calculating spell slot efficiency in Pathfinder 2e, or designing your own tabletop wargame, understanding dice averages and probability distribution is key to making informed strategic decisions.
            </p>
          </div>

          {/* Core Mathematical Formulas Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Single Die Expected Value (Mean)
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The expected value $E(X)$ of a standard fair die numbered 1 to $N$ is calculated by averaging all possible outcomes:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#1f2130] font-mono text-sm text-indigo-700 dark:text-indigo-300 text-center font-bold">
                E(X) = (N + 1) / 2
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 font-mono">
                <li>• <strong>1d4:</strong> (4 + 1) / 2 = <strong>2.5</strong></li>
                <li>• <strong>1d6:</strong> (6 + 1) / 2 = <strong>3.5</strong></li>
                <li>• <strong>1d8:</strong> (8 + 1) / 2 = <strong>4.5</strong></li>
                <li>• <strong>1d10:</strong> (10 + 1) / 2 = <strong>5.5</strong></li>
                <li>• <strong>1d12:</strong> (12 + 1) / 2 = <strong>6.5</strong></li>
                <li>• <strong>1d20:</strong> (20 + 1) / 2 = <strong>10.5</strong></li>
                <li>• <strong>1d100:</strong> (100 + 1) / 2 = <strong>50.5</strong></li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Linearity of Expectation for Multiple Dice
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                By linearity of expectation, rolling multiple independent dice simply adds their individual averages together, regardless of dependencies:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#1f2130] font-mono text-sm text-purple-700 dark:text-purple-300 text-center font-bold">
                E(N d X ± M) = N × ((X + 1) / 2) ± M
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 font-mono">
                <li>• <strong>2d6 Greatsword:</strong> 2 × 3.5 = <strong>7.0</strong></li>
                <li>• <strong>3d6 Stat Roll:</strong> 3 × 3.5 = <strong>10.5</strong></li>
                <li>• <strong>8d6 Fireball:</strong> 8 × 3.5 = <strong>28.0</strong></li>
                <li>• <strong>1d8 + 3 Cure Wounds:</strong> 4.5 + 3 = <strong>7.5</strong></li>
                <li>• <strong>2d12 Dual Halberd:</strong> 2 × 6.5 = <strong>13.0</strong></li>
                <li>• <strong>40d6 Meteor Swarm:</strong> 40 × 3.5 = <strong>140.0</strong></li>
              </ul>
            </div>
          </div>

          {/* Real-World Case Studies */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] shadow-sm space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Greatsword (2d6) vs. Greataxe (1d12): The Variance Dilemma</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Why 2d6 Outperforms on Average</h4>
                <p>
                  A common question among martial players is whether to choose a <strong>Greatsword (2d6)</strong> or a <strong>Greataxe (1d12)</strong>.
                </p>
                <p>
                  The Greatsword has a minimum roll of 2 and an average of <strong>7.0</strong>. The Greataxe has a minimum roll of 1 and an average of <strong>6.5</strong>. Mathematically, 2d6 provides an extra +0.5 average damage on every normal hit.
                </p>
                <p>
                  More importantly, 2d6 has a standard deviation of <strong>±2.42</strong> compared to 1d12's <strong>±3.45</strong>, making 2d6 vastly more reliable.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">When Greataxe (1d12) Shines: Critical Hits</h4>
                <p>
                  The Greataxe has a flat <strong>8.33%</strong> chance to roll maximum damage (12). The Greatsword only has a <strong>2.78%</strong> chance (1 in 36) to roll 12.
                </p>
                <p>
                  Furthermore, barbarian features like <em>Brutal Critical</em> add only 1 additional weapon die on a critical hit. With a Greataxe, Brutal Critical adds +1d12 (average +6.5), whereas with a Greatsword, it adds only +1d6 (average +3.5).
                </p>
              </div>
            </div>

            {/* Quick comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#222436]">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#161826] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222436]">
                    <th className="py-2.5 px-4 text-left font-bold">Weapon / Notation</th>
                    <th className="py-2.5 px-4 text-left font-bold">Min / Max</th>
                    <th className="py-2.5 px-4 text-left font-bold">Expected Mean</th>
                    <th className="py-2.5 px-4 text-left font-bold">Std Deviation</th>
                    <th className="py-2.5 px-4 text-left font-bold">Max Damage Odds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1b1c28]">
                  <tr className="hover:bg-slate-50 dark:hover:bg-[#181924]">
                    <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">Greatsword (2d6)</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">2 – 12</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">7.00</td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">±2.42</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">2.78% (1/36)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-[#181924]">
                    <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">Greataxe (1d12)</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">1 – 12</td>
                    <td className="py-2.5 px-4 font-bold text-amber-600 dark:text-amber-400">6.50</td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">±3.45</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">8.33% (1/12)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-[#181924]">
                    <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">Maul (2d6)</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">2 – 12</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">7.00</td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">±2.42</td>
                    <td className="py-2.5 px-4 text-slate-800 dark:text-slate-200">2.78% (1/36)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* D&D 5e Advantage & Disadvantage Probability */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] shadow-sm space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>D&amp;D 5e Advantage &amp; Disadvantage Mathematical Impact</span>
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              In 5th Edition D&amp;D, rolling with Advantage means rolling two 20-sided dice and taking the higher result (2d20kh1). Disadvantage takes the lower result (2d20kl1).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#1f2130] text-center space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Standard 1d20</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">10.50</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Crit Chance: 5.0%</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Advantage (2d20kh1)</span>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">13.825</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-300">Crit Chance: 9.75% (+4.75%)</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 text-center space-y-1">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Disadvantage (2d20kl1)</span>
                <p className="text-2xl font-black text-rose-700 dark:text-rose-400 font-mono">7.175</p>
                <p className="text-[11px] text-rose-600 dark:text-rose-300">Crit Chance: 0.25% (-4.75%)</p>
              </div>
            </div>
          </div>

          {/* Quick Polyhedral Dice Reference Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Tabletop Polyhedral Dice Quick Reference Chart</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#222436]">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#161826] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222436]">
                    <th className="py-3 px-4 text-left font-bold">Die Type</th>
                    <th className="py-3 px-4 text-left font-bold">Geometry</th>
                    <th className="py-3 px-4 text-left font-bold">Single Die Mean</th>
                    <th className="py-3 px-4 text-left font-bold">2 Dice Mean</th>
                    <th className="py-3 px-4 text-left font-bold">3 Dice Mean</th>
                    <th className="py-3 px-4 text-left font-bold">Explore Tool</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1b1c28]">
                  {[
                    { die: 'd4', shape: 'Tetrahedron (4 sides)', single: '2.5', d2: '5.0', d3: '7.5', link: '/d4' },
                    { die: 'd6', shape: 'Cube (6 sides)', single: '3.5', d2: '7.0', d3: '10.5', link: '/d6' },
                    { die: 'd8', shape: 'Octahedron (8 sides)', single: '4.5', d2: '9.0', d3: '13.5', link: '/d8' },
                    { die: 'd10', shape: 'Pentagonal Trapezohedron', single: '5.5', d2: '11.0', d3: '16.5', link: '/d10' },
                    { die: 'd12', shape: 'Dodecahedron (12 sides)', single: '6.5', d2: '13.0', d3: '19.5', link: '/d12' },
                    { die: 'd20', shape: 'Icosahedron (20 sides)', single: '10.5', d2: '21.0', d3: '31.5', link: '/d20' },
                    { die: 'd100', shape: 'Zocchihedron / Percentile', single: '50.5', d2: '101.0', d3: '151.5', link: '/d100' }
                  ].map((row) => (
                    <tr key={row.die} className="hover:bg-slate-50 dark:hover:bg-[#181924] transition-colors">
                      <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400 uppercase">{row.die}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-sans">{row.shape}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{row.single}</td>
                      <td className="py-3 px-4 text-slate-800 dark:text-slate-200">{row.d2}</td>
                      <td className="py-3 px-4 text-slate-800 dark:text-slate-200">{row.d3}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={row.link}
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                        >
                          <span>Roll 3D {row.die}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions About Dice Averages
            </h2>
          </div>
          <div className="space-y-3">
            {calcFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5 transition-colors"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">{faq.question}</h3>
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
