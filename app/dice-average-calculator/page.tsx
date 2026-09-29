import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceAverageCalculatorComponent from '@/components/dice/DiceAverageCalculatorComponent';
import {

  Calculator,
  BookOpen,
  TrendingUp,
  Shield,
  Layers,
  Zap,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'Dice Average Calculator | Exact Expected Values, Standard Deviation & Bell Curves',
  description:
    'Free online dice average calculator. Calculate theoretical expected averages, standard deviation, discrete probability distributions, and bell curves for any tabletop RPG dice formula (e.g., 2d6, 3d6, 8d6 Fireball, 4d6dl1, 1d20 advantage).',
  keywords: [
    'dice average calculator',
    'average dice roll calculator',
    'dice expected value',
    'dice probability calculator',
    'dice average calc',
    'dnd dice average',
    '3d6 average',
    '8d6 average fireball',
    'd20 average advantage',
    '2d6 vs 1d12 average'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/dice-average-calculator'
  },
  openGraph: {
    title: 'Dice Average Calculator – Exact Expected Values & Bell Curves',
    description:
      'Determine theoretical averages, minimums, maximums, variance, and probability distributions for any tabletop RPG dice notation.',
    url: 'https://spinwheelgames.org/dice-average-calculator',
    type: 'website'
  }
};

const SPELL_BENCHMARK_TABLE = [
  { spell: 'Magic Missile (Level 1)', formula: '3 × (1d4 + 1)', minMax: '6 – 15', avg: '10.50', stdDev: '±1.94', type: 'Force' },
  { spell: 'Guiding Bolt (Level 1)', formula: '4d6', minMax: '4 – 24', avg: '14.00', stdDev: '±3.42', type: 'Radiant' },
  { spell: 'Scorching Ray (Level 2, 3 rays)', formula: '3 × 2d6', minMax: '6 – 36', avg: '21.00', stdDev: '±4.18', type: 'Fire' },
  { spell: 'Fireball (Level 3)', formula: '8d6', minMax: '8 – 48', avg: '28.00', stdDev: '±4.83', type: 'Fire' },
  { spell: 'Lightning Bolt (Level 3)', formula: '8d6', minMax: '8 – 48', avg: '28.00', stdDev: '±4.83', type: 'Lightning' },
  { spell: 'Cone of Cold (Level 5)', formula: '8d8', minMax: '8 – 64', avg: '36.00', stdDev: '±6.00', type: 'Cold' },
  { spell: 'Disintegrate (Level 6)', formula: '10d6 + 40', minMax: '50 – 100', avg: '75.00', stdDev: '±5.40', type: 'Force' },
  { spell: 'Meteor Swarm (Level 9)', formula: '40d6 (20 Fire + 20 Bludgeon)', minMax: '40 – 240', avg: '140.00', stdDev: '±10.80', type: 'Fire / Bludg' }
];

const CALC_FAQS = [
  {
    question: 'How do you calculate the expected average of any single die?',
    answer:
      'For a standard fair die numbered 1 through N, the expected mathematical average (mean) is E(X) = (N + 1) / 2. For example, 1d4 = 2.5, 1d6 = 3.5, 1d8 = 4.5, 1d10 = 5.5, 1d12 = 6.5, 1d20 = 10.5, and 1d100 = 50.5.'
  },
  {
    question: 'How do multiple dice add together mathematically (Linearity of Expectation)?',
    answer:
      'By the linearity of expectation, the expected value of rolling N dice with X sides each and adding modifier M is: E(NdX + M) = N × ((X + 1) / 2) + M. For instance, 3d6 + 5 averages 3 × 3.5 + 5 = 15.5.'
  },
  {
    question: 'Why does 2d6 feel more consistent than 1d12 in tabletop combat?',
    answer:
      'A single 1d12 has a uniform probability distribution (every number has an equal 8.33% chance, standard deviation ±3.45). In contrast, 2d6 creates a triangular bell curve where central numbers like 7 (16.67%) occur 6 times more frequently than extremes like 2 or 12 (2.78%), with a tighter standard deviation of ±2.42.'
  },
  {
    question: 'What is the average roll of a d20 with Advantage (2d20kh1)?',
    answer:
      'Rolling 1d20 with Advantage raises the expected average from 10.5 to 13.825 (+3.325 increase). It also elevates the chance of rolling a natural 20 critical hit from 5.0% to 9.75% and slashes the chance of a critical fumble (natural 1) to just 0.25%.'
  },
  {
    question: 'What is standard deviation in dice rolls?',
    answer:
      'Standard deviation measures how tightly roll outcomes cluster around the expected average. Approximately 68.2% of all rolls fall within ±1 standard deviation of the mean, and over 95.4% fall within ±2 standard deviations.'
  },
  {
    question: 'What is the average of 4d6 Drop Lowest (4d6dl1)?',
    answer:
      'Rolling 4d6 and dropping the lowest single die produces an expected mathematical average of 12.24 per attribute (compared to 10.5 for straight 3d6).'
  }
];

export default function DiceAverageCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Dice Average & Probability Calculator',
        url: 'https://spinwheelgames.org/dice-average-calculator',
        description:
          'Calculates expected averages, probability distribution curves, standard deviation, and discrete outcome tables for custom dice formulas.',
        applicationCategory: 'UtilityApplication',
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
            name: 'Dice Average Calculator',
            item: 'https://spinwheelgames.org/dice-average-calculator'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: CALC_FAQS.map((faq) => ({
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-8 space-y-8">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Dice Average Calculator' }
          ]}
        />

        {/* Hero */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 font-mono font-bold uppercase tracking-wider">
              Exact Mathematics Engine
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
              Discrete Probability &amp; Standard Deviation
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Dice Average Calculator Online - Probability &amp; Expected Value
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Determine exact mathematical averages, expected damage values, standard deviation, and full discrete probability distribution curves for any tabletop RPG dice combination.
          </p>
        </div>

        {/* Primary Interactive Calculator */}
        <DiceAverageCalculatorComponent />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-12 border-t border-slate-200 dark:border-[#1e2030] pt-10">
          
          {/* Section 1: Core Mathematical Formulas */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  How Dice Averages and Expected Values are Derived
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Step-by-step mathematical proofs from single die means to multi-die sums and modifiers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a]">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400">1. Single Die Expected Value Formula</h3>
                <p>
                  For any fair die numbered sequentially from 1 to $N$, the arithmetic mean is the average of all outcomes:
                </p>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#12131c] border border-slate-200 dark:border-[#202230] font-mono text-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                  E(X) = (N + 1) / 2
                </div>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-600 dark:text-slate-400">
                  <li>1d4: (4 + 1) / 2 = <strong>2.5</strong></li>
                  <li>1d6: (6 + 1) / 2 = <strong>3.5</strong></li>
                  <li>1d8: (8 + 1) / 2 = <strong>4.5</strong></li>
                  <li>1d10: (10 + 1) / 2 = <strong>5.5</strong></li>
                  <li>1d12: (12 + 1) / 2 = <strong>6.5</strong></li>
                  <li>1d20: (20 + 1) / 2 = <strong>10.5</strong></li>
                  <li>1d100: (100 + 1) / 2 = <strong>50.5</strong></li>
                </ul>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a]">
                <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400">2. Linearity of Expectation for Multiple Dice</h3>
                <p>
                  By linearity of expectation, rolling multiple independent dice simply adds their expected values together:
                </p>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#12131c] border border-slate-200 dark:border-[#202230] font-mono text-center text-purple-700 dark:text-purple-300 font-bold text-sm">
                  E(N d X ± M) = N × ((X + 1) / 2) ± M
                </div>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-600 dark:text-slate-400">
                  <li>2d6 Greatsword: 2 × 3.5 = <strong>7.0</strong></li>
                  <li>3d6 Stat Roll: 3 × 3.5 = <strong>10.5</strong></li>
                  <li>8d6 Fireball: 8 × 3.5 = <strong>28.0</strong></li>
                  <li>1d8 + 3 Cure Wounds: 4.5 + 3 = <strong>7.5</strong></li>
                  <li>10d6 + 40 Disintegrate: 35 + 40 = <strong>75.0</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: D&D 5e Spell Damage Benchmark Table */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  D&amp;D 5e Spell &amp; Ability Damage Benchmark Table
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Expected averages, minimums, maximums, and standard deviation across iconic spells.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1e202c]">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#151622] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c]">
                    <th className="py-2.5 px-4 font-bold">Spell / Ability</th>
                    <th className="py-2.5 px-4 font-bold">Dice Formula</th>
                    <th className="py-2.5 px-4 font-bold">Min – Max Range</th>
                    <th className="py-2.5 px-4 font-bold">Expected Mean</th>
                    <th className="py-2.5 px-4 font-bold">Std Deviation</th>
                    <th className="py-2.5 px-4 font-bold">Damage Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171824]">
                  {SPELL_BENCHMARK_TABLE.map((s) => (
                    <tr key={s.spell} className="hover:bg-slate-50 dark:hover:bg-[#141520]">
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white font-sans">{s.spell}</td>
                      <td className="py-2.5 px-4 text-indigo-600 dark:text-indigo-400 font-bold">{s.formula}</td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">{s.minMax}</td>
                      <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{s.avg}</td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">{s.stdDev}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">{s.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Advantage vs Disadvantage Mechanics */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Advantage &amp; Disadvantage Mathematical Impact
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How rolling two d20s and taking the highest (2d20kh1) or lowest (2d20kl1) shifts success rates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Standard 1d20</span>
                <p className="text-3xl font-black font-mono text-slate-900 dark:text-white">10.50</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Crit Rate: 5.00% (1/20)</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Advantage (2d20kh1)</span>
                <p className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">13.825</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-300">Crit Rate: 9.75% (+4.75%)</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-1">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Disadvantage (2d20kl1)</span>
                <p className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400">7.175</p>
                <p className="text-xs text-rose-600 dark:text-rose-300">Crit Rate: 0.25% (-4.75%)</p>
              </div>
            </div>
          </section>

          {/* Section 4: Polyhedral Dice Quick Reference */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Tabletop Polyhedral Dice Quick Reference Chart
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Single, double, and triple die averages across all standard gaming dice.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1e202c]">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#151622] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c]">
                    <th className="py-2.5 px-4 font-bold">Die Type</th>
                    <th className="py-2.5 px-4 font-bold">Geometry</th>
                    <th className="py-2.5 px-4 font-bold">1 Die Average</th>
                    <th className="py-2.5 px-4 font-bold">2 Dice Average</th>
                    <th className="py-2.5 px-4 font-bold">3 Dice Average</th>
                    <th className="py-2.5 px-4 font-bold">3D Roller Tool</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171824]">
                  {[
                    { die: 'd4', shape: 'Tetrahedron', single: '2.5', d2: '5.0', d3: '7.5', link: '/roll-1d4' },
                    { die: 'd6', shape: 'Cube', single: '3.5', d2: '7.0', d3: '10.5', link: '/dice/d6' },
                    { die: 'd8', shape: 'Octahedron', single: '4.5', d2: '9.0', d3: '13.5', link: '/dice/d8' },
                    { die: 'd10', shape: 'Trapezohedron', single: '5.5', d2: '11.0', d3: '16.5', link: '/dice/d10' },
                    { die: 'd12', shape: 'Dodecahedron', single: '6.5', d2: '13.0', d3: '19.5', link: '/dice/d12' },
                    { die: 'd20', shape: 'Icosahedron', single: '10.5', d2: '21.0', d3: '31.5', link: '/dice/d20' },
                    { die: 'd100', shape: 'Percentile', single: '50.5', d2: '101.0', d3: '151.5', link: '/dice/d100' }
                  ].map((row) => (
                    <tr key={row.die} className="hover:bg-slate-50 dark:hover:bg-[#141520]">
                      <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400 uppercase">{row.die}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-600 dark:text-slate-400">{row.shape}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{row.single}</td>
                      <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">{row.d2}</td>
                      <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">{row.d3}</td>
                      <td className="py-2.5 px-4">
                        <Link
                          href={row.link}
                          className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-bold font-sans"
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
          </section>

          {/* Section 5: FAQs */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Frequently Asked Questions About Dice Averages
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clear explanations of expected values, standard deviation, and tabletop math.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {CALC_FAQS.map((faq, idx) => (
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
        </article>

        {/* Cross Navigation */}
        <DiceNavigation currentPath="/dice-average-calculator" />
      </main>

      <Footer />
    </div>
  );
}
