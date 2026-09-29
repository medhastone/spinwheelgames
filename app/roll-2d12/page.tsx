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
  Zap,
  Calculator
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'Roll 2d12 Online | 3D Two 12-Sided Dice Roller & Odds',
  description:
    'Roll 2d12 online with realistic 3D WebGL physics. View two 12-sided dodecahedron dice sums (2 to 24), triangular probability distributions, and expected averages.',
  keywords: [
    'roll 2d12',
    '2d12 dice roller',
    'two 12 sided dice',
    '2d12 average',
    '2d12 probability',
    'roll 2d12 online',
    'd12 dice roller'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/roll-2d12'
  },
  openGraph: {
    title: 'Roll 2d12 Online – 3D Two 12-Sided Dice Roller',
    description:
      'Free interactive 3D 2d12 dice roller with triangular probability distributions and damage averages.',
    url: 'https://spinwheelgames.org/roll-2d12',
    type: 'website'
  }
};

const FAQS_2D12 = [
  {
    question: 'What is the sum range and average of 2d12?',
    answer:
      'Rolling 2d12 produces a total sum ranging from 2 (1+1) to 24 (12+12). The expected mathematical average (mean) is 2 × 6.5 = 13.0.'
  },
  {
    question: 'What is the most likely outcome on 2d12?',
    answer:
      'The most likely outcome is 13, which occurs in 12 out of 144 possible combinations (8.33% chance). The distribution forms a symmetric triangle centered at 13.'
  },
  {
    question: 'How does 2d12 compare to 1d20 + 2 in tabletop games?',
    answer:
      'A 1d20 has a flat, uniform distribution where every single number has an equal 5.0% chance. In contrast, 2d12 produces a triangular curve heavily favoring values near 13 (8.33%) while making extreme highs (24) and extreme lows (2) very rare (0.69% each).'
  }
];

export default function Roll2d12Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll 2d12 Online - 3D Two 12-Sided Dice Roller',
        url: 'https://spinwheelgames.org/roll-2d12',
        description:
          'Free 3D WebGL two 12-sided dodecahedron dice roller with triangular probability curve and average sums.',
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
            name: 'Roll 2d12',
            item: 'https://spinwheelgames.org/roll-2d12'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_2D12.map((faq) => ({
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 space-y-10">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Roll 2d12' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono font-bold uppercase tracking-wider">
              Dodecahedrons (Two 12-Sided Dice)
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
              Expected Average: 13.0 (Range 2–24)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll 2 D12 Online - 3D Multi-Dice Roller
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll two 12-sided dodecahedron dice simultaneously with 3D physics. See individual faces, subtotal sums, arithmetic averages, and triangular probability charts.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={2}
          initialSides={12}
          pageTitle="2d12 3D Dice Roller"
          pageSubtitle="Interactive 3D WebGL simulator for two 12-sided dodecahedron dice."
          suggestedPresets={[
            { label: 'Standard 2d12 (Sum 2–24)', count: 2, sides: 12 },
            { label: '1d12 Single Greataxe', count: 1, sides: 12 },
            { label: '3d12 Mega Attack', count: 3, sides: 12 },
            { label: '2d12 + 5 Modifier', count: 2, sides: 12, modifier: 5 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-10 border-t border-slate-200 dark:border-[#1e2030] pt-10">
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>2d12 Triangular Probability Mechanics</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                When rolling two 12-sided dice (<strong>2d12</strong>), there are $12 \times 12 = 144$ possible outcomes. Unlike a single 1d12 or 1d24 which has uniform probabilities across all numbers, 2d12 creates a triangular bell curve where central numbers occur much more frequently than the outer extremes.
              </p>
              <p>
                The minimum roll of 2 (1+1) occurs in only 1 out of 144 cases (<strong>0.69%</strong>), and the maximum roll of 24 (12+12) likewise occurs in only 1 out of 144 cases (<strong>0.69%</strong>). The most probable single outcome is <strong>13</strong> (occurring 12 times out of 144, or <strong>8.33%</strong>).
              </p>
            </div>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Frequently Asked Questions (Roll 2d12)</span>
            </h2>
            <div className="space-y-3">
              {FAQS_2D12.map((faq, idx) => (
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
        <DiceNavigation currentPath="/roll-2d12" />
      </main>

      <Footer />
    </div>
  );
}
