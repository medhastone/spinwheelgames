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
  title: 'Roll 5d6 Online | Yahtzee, Farkle & Tabletop Dice Simulator',
  description:
    'Free online 5d6 dice roller. Roll 5 six-sided dice in realistic 3D WebGL physics. View totals (5 to 30), averages (17.5), and outcome probabilities for Yahtzee, Farkle, and Shadowrun.',
  keywords: [
    'roll 5d6',
    '5d6 roller',
    'yahtzee dice roller',
    '5d6 probability',
    'roll 5d6 online',
    'five dice roller'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/roll-5d6'
  },
  openGraph: {
    title: 'Roll 5d6 Online – Yahtzee & Board Game Simulator',
    description:
      'Roll 5 six-sided dice online with 3D physics. Perfect for Yahtzee, Farkle, Shadowrun pools, and board games.',
    url: 'https://spinwheelgames.org/roll-5d6',
    type: 'website'
  }
};

const FAQS_5D6 = [
  {
    question: 'What is the sum range and expected average of 5d6?',
    answer:
      'Rolling 5 six-sided dice yields a sum ranging from a minimum of 5 (1+1+1+1+1) to a maximum of 30 (6+6+6+6+6). The expected mathematical average is 5 × 3.5 = 17.5.'
  },
  {
    question: 'What are the odds of rolling a Yahtzee (all five dice identical) on the first roll?',
    answer:
      'The odds of rolling five-of-a-kind on a single throw of 5d6 is 6 / 6^5 = 6 / 7,776 = 1 / 1,296, which is approximately 0.077% (or about 1 in 1,296).'
  },
  {
    question: 'What are common board games and TTRPGs that roll 5d6?',
    answer:
      'Popular games include Yahtzee, Farkle, Liar\'s Dice, King of Tokyo, Champions / HERO System, and Shadowrun small dice pools.'
  }
];

export default function Roll5d6Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll 5d6 Online - 3D Yahtzee & Tabletop Dice Simulator',
        url: 'https://spinwheelgames.org/roll-5d6',
        description: 'Interactive 3D WebGL 5d6 dice simulator for Yahtzee, Farkle, and tabletop games.',
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
            name: 'Roll 5d6',
            item: 'https://spinwheelgames.org/roll-5d6'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_5D6.map((faq) => ({
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
            { label: 'Roll 5d6' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono font-bold uppercase tracking-wider">
              Yahtzee &amp; Board Game Standard
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
              Average: 17.5 (Range 5–30)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll 5 D6 Online - 3D Multi-Dice Roller
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll 5 six-sided dice online with 3D physics. Perfect for Yahtzee, Farkle, Liar's Dice, and Shadowrun dice pools.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={5}
          initialSides={6}
          pageTitle="5d6 3D Dice Roller"
          pageSubtitle="3D WebGL simulator for 5 six-sided dice."
          suggestedPresets={[
            { label: 'Standard 5d6 (Sum 5–30)', count: 5, sides: 6 },
            { label: '5d6 Drop Lowest 1', count: 5, sides: 6, dropLowest: 1 },
            { label: '5d6 Drop Lowest 2', count: 5, sides: 6, dropLowest: 2 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-10 border-t border-slate-200 dark:border-[#1e2030] pt-10">
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>5d6 Dice Combinations and Yahtzee Odds</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Rolling 5 standard 6-sided dice produces $6^5 = 7,776$ possible distinct permutations. The sums range from a minimum of 5 up to 30, forming a symmetric bell curve centered at the expected mean of <strong>17.5</strong>.
              </p>
              <p>
                In games like Yahtzee and Farkle, players look for specific poker-style patterns: Pairs, Three of a Kind, Full Houses, Small Straights, Large Straights, and Five of a Kind (Yahtzee).
              </p>
            </div>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Frequently Asked Questions (Roll 5d6)</span>
            </h2>
            <div className="space-y-3">
              {FAQS_5D6.map((faq, idx) => (
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
        <DiceNavigation currentPath="/roll-5d6" />
      </main>

      <Footer />
    </div>
  );
}
