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
  Sparkles
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  "title": "Roll d3 Online | SpinWheelGames",
  "description": "Free online 3D d3 dice roller. Roll a 3-sided die with realistic physics for Warhammer, tabletop RPG damage, 3-way choices, and random table lookups.",
  "keywords": [
    "roll d3",
    "d3 dice roller",
    "3 sided die",
    "roll d3 online",
    "d3 randomizer",
    "virtual d3",
    "dnd d3 roller"
  ],
  "alternates": {
    "canonical": "https://spinwheelgames.org/roll-d3"
  },
  "openGraph": {
    "title": "Roll d3 Online | SpinWheelGames",
    "description": "Free online 3D d3 dice roller. Roll a 3-sided die with realistic physics for Warhammer, tabletop RPG damage, 3-way choices, and random table lookups.",
    "url": "https://spinwheelgames.org/roll-d3",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Froll-d3&title=Roll+d3+Online+%7C+SpinWheelGames&desc=Free+online+3D+d3+dice+roller.+Roll+a+3-sided+die+with+realistic+physics+for+Warhammer%2C+tabletop+RPG+damage%2C+3-way+choices%2C+and+random+table+lookups.",
        "width": 1200,
        "height": 630,
        "alt": "Roll d3 Online | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Roll d3 Online | SpinWheelGames",
    "description": "Free online 3D d3 dice roller. Roll a 3-sided die with realistic physics for Warhammer, tabletop RPG damage, 3-way choices, and random table lookups.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Froll-d3&title=Roll+d3+Online+%7C+SpinWheelGames&desc=Free+online+3D+d3+dice+roller.+Roll+a+3-sided+die+with+realistic+physics+for+Warhammer%2C+tabletop+RPG+damage%2C+3-way+choices%2C+and+random+table+lookups."
    ]
  }
};

const FAQS_D3 = [
  {
    question: 'What is a d3 die?',
    answer:
      'A d3 is a three-sided randomizer with outcomes 1, 2, and 3, each with an exact 33.33% chance. In physical gaming, a d3 is commonly simulated by rolling a standard 6-sided die (d6) and dividing by 2 (rounding up): 1-2 = 1, 3-4 = 2, 5-6 = 3.'
  },
  {
    question: 'What is the average roll of a d3?',
    answer:
      'The expected mathematical average (mean) of a 1d3 is (1 + 2 + 3) / 3 = 2.0. Rolling 2d3 has an expected average of 4.0 (range 2–6), and 3d3 averages 6.0 (range 3–9).'
  },
  {
    question: 'Where is a d3 used in tabletop gaming?',
    answer:
      'A d3 is widely used in Warhammer 40k and Age of Sigmar for determining random damage, mortal wounds, and movement distances, as well as in D&D for short unarmed strikes and minor magical hazards.'
  }
];

export default function RollD3Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll d3 Online - 3D 3-Sided Die Randomizer',
        url: 'https://spinwheelgames.org/roll-d3',
        description:
          'Free 3D WebGL 3-sided dice roller with realistic physics, custom modifiers, and fair 33.33% distribution.',
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
            name: 'Roll d3',
            item: 'https://spinwheelgames.org/roll-d3'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_D3.map((faq) => ({
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Roll d3' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono uppercase tracking-wider">
              3-Sided Randomizer
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono uppercase tracking-wider">
              Expected Average: 2.0
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll D3 Online - 3D Dice Roller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll a 3-sided virtual die with 3D physics. Perfect for Warhammer damage charts, 3-option decision making, and tabletop RPG weapon profiles.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={1}
          initialSides={3}
          suggestedPresets={[
            { label: '1d3 (Single 3-Sided Die)', count: 1, sides: 3 },
            { label: '2d3 (Sum 2–6, Avg 4.0)', count: 2, sides: 3 },
            { label: '3d3 (Sum 3–9, Avg 6.0)', count: 3, sides: 3 },
            { label: '1d3 + 1 (Damage / Modifier)', count: 1, sides: 3, modifier: 1 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-6 border-t border-slate-200 dark:border-[#1e2030] pt-6">
          <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-3 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>How a 3-Sided Die (d3) Works</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                In tabletop gaming, a <strong>d3</strong> delivers a fair 1-in-3 chance (33.33% per result) across the numbers 1, 2, and 3. In physical tabletop games like Warhammer, players roll a standard 6-sided die and map rolls 1-2 to 1, 3-4 to 2, and 5-6 to 3.
              </p>
              <p>
                Our digital d3 roller eliminates manual conversions by directly simulating a 3-sided randomizer with full 3D physics and instant mathematical summaries.
              </p>
            </div>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Frequently Asked Questions (Roll d3)</span>
            </h2>
            <div className="space-y-3">
              {FAQS_D3.map((faq, idx) => (
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
        <DiceNavigation currentPath="/roll-d3" />
      </main>

      <Footer />
    </div>
  );
}
