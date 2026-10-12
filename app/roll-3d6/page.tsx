import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceRollerEngine from '@/components/dice/DiceRollerEngine';
import {

  BookOpen,
  TrendingUp,
  Shield,
  HelpCircle,
  ArrowRight,
  Calculator
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'Roll 3d6 Online | 3D Bell Curve Probability & Tabletop Roller',
  description:
    'Free online 3d6 dice roller with 3D WebGL physics. View symmetric bell curve probability tables (range 3 to 18, average 10.5) for GURPS, Dragon Age RPG, and classic D&D.',
  keywords: [
    'roll 3d6',
    '3d6 roller',
    '3d6 probability',
    '3d6 bell curve',
    '3d6 average',
    'roll 3d6 online',
    'gurps 3d6 roller'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/roll-3d6'
  },
  openGraph: {
    title: 'Roll 3d6 Online – 3D Bell Curve Dice Roller',
    description:
      'Free 3D 3d6 dice simulator and bell curve probability distribution for classic tabletop RPGs.',
    url: 'https://spinwheelgames.org/roll-3d6',
    type: 'website'
  }
};

const PROBABILITY_3D6 = [
  { score: 3, ways: 1, probability: '0.46%', cumulative: '0.46%' },
  { score: 4, ways: 3, probability: '1.39%', cumulative: '1.85%' },
  { score: 5, ways: 6, probability: '2.78%', cumulative: '4.63%' },
  { score: 6, ways: 10, probability: '4.63%', cumulative: '9.26%' },
  { score: 7, ways: 15, probability: '6.94%', cumulative: '16.20%' },
  { score: 8, ways: 21, probability: '9.72%', cumulative: '25.93%' },
  { score: 9, ways: 25, probability: '11.57%', cumulative: '37.50%' },
  { score: 10, ways: 27, probability: '12.50%', cumulative: '50.00%' },
  { score: 11, ways: 27, probability: '12.50%', cumulative: '62.50%' },
  { score: 12, ways: 25, probability: '11.57%', cumulative: '74.07%' },
  { score: 13, ways: 21, probability: '9.72%', cumulative: '83.80%' },
  { score: 14, ways: 15, probability: '6.94%', cumulative: '90.74%' },
  { score: 15, ways: 10, probability: '4.63%', cumulative: '95.37%' },
  { score: 16, ways: 6, probability: '2.78%', cumulative: '98.15%' },
  { score: 17, ways: 3, probability: '1.39%', cumulative: '99.54%' },
  { score: 18, ways: 1, probability: '0.46%', cumulative: '100.0%' }
];

const FAQS_3D6 = [
  {
    question: 'What is the average roll of 3d6?',
    answer:
      'The expected mathematical average (mean) of 3d6 is 3 × 3.5 = 10.5. The sums range from a minimum of 3 (1+1+1) to a maximum of 18 (6+6+6).'
  },
  {
    question: 'What are the most likely results on 3d6?',
    answer:
      'The most likely outcomes are 10 and 11, each with a 12.50% probability (27 out of 216 combinations). Together, scores between 9 and 12 account for nearly 48.14% of all rolls.'
  },
  {
    question: 'Why do tabletop RPGs like GURPS use 3d6 instead of 1d20?',
    answer:
      'A 1d20 has a flat, uniform distribution where extreme critical successes and fumbles happen 5% of the time each. In contrast, 3d6 produces a tight normal bell curve where characters consistently perform near their average skill level, making wild swings rare.'
  }
];

export default function Roll3d6Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll 3d6 Online - 3D Bell Curve Dice Simulator',
        url: 'https://spinwheelgames.org/roll-3d6',
        description: 'Interactive 3D WebGL 3d6 dice simulator and bell curve probability table.',
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
            name: 'Roll 3d6',
            item: 'https://spinwheelgames.org/roll-3d6'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_3D6.map((faq) => ({
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
            { label: 'Roll 3d6' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono uppercase tracking-wider">
              Bell Curve Standard
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono uppercase tracking-wider">
              Avg: 10.5 (Range 3–18)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll 3 D6 Online - 3D Multi-Dice Roller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll three 6-sided dice with 3D physics. Used extensively in GURPS, Fantasy AGE, Dragon Age RPG, and classic D&amp;D attribute generation.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={3}
          initialSides={6}
          suggestedPresets={[
            { label: 'Standard 3d6 (Sum 3–18)', count: 3, sides: 6 },
            { label: '3d6 + 2 Modifier', count: 3, sides: 6, modifier: 2 },
            { label: '3d6 - 1 Modifier', count: 3, sides: 6, modifier: -1 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-6 border-t border-slate-200 dark:border-[#1e2030] pt-6">
          <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-3.5 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>3d6 Bell Curve Probability Distribution (216 Total Combinations)</span>
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1e202c]">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#151622] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c]">
                    <th className="py-2 px-3 font-bold">Sum Result</th>
                    <th className="py-2 px-3 font-bold">Combinations / 216</th>
                    <th className="py-2 px-3 font-bold">Exact Probability</th>
                    <th className="py-2 px-3 font-bold">Cumulative (≤ X)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171824]">
                  {PROBABILITY_3D6.map((row) => (
                    <tr key={row.score} className="hover:bg-slate-50 dark:hover:bg-[#141520]">
                      <td className="py-1.5 px-3 font-bold text-slate-900 dark:text-white">{row.score}</td>
                      <td className="py-1.5 px-3 text-slate-600 dark:text-slate-400">{row.ways}</td>
                      <td className="py-1.5 px-3 font-bold text-indigo-600 dark:text-indigo-400">{row.probability}</td>
                      <td className="py-1.5 px-3 text-slate-500 dark:text-slate-400">{row.cumulative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-3.5 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Frequently Asked Questions (Roll 3d6)</span>
            </h2>
            <div className="space-y-3">
              {FAQS_3D6.map((faq, idx) => (
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
        <DiceNavigation currentPath="/roll-3d6" />
      </main>

      <Footer />
    </div>
  );
}
