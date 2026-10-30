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
  "title": "Roll 5d6 Online | SpinWheelGames",
  "description": "Free online 5d6 dice roller. Roll 5 six-sided dice in realistic 3D WebGL physics. View totals (5 to 30), averages (17.5), and outcome probabilities for Yahtzee and Farkle.",
  "keywords": [
    "roll 5d6",
    "5d6 roller",
    "yahtzee dice roller",
    "5d6 probability",
    "roll 5d6 online",
    "five dice roller"
  ],
  "alternates": {
    "canonical": "https://spinwheelgames.org/roll-5d6"
  },
  "openGraph": {
    "title": "Roll 5d6 Online | SpinWheelGames",
    "description": "Free online 5d6 dice roller. Roll 5 six-sided dice in realistic 3D WebGL physics. View totals (5 to 30), averages (17.5), and outcome probabilities for Yahtzee and Farkle.",
    "url": "https://spinwheelgames.org/roll-5d6",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Froll-5d6&title=Roll+5d6+Online+%7C+SpinWheelGames&desc=Free+online+5d6+dice+roller.+Roll+5+six-sided+dice+in+realistic+3D+WebGL+physics.+View+totals+%285+to+30%29%2C+averages+%2817.5%29%2C+and+outcome+probabilities+for+Yahtzee+and+Farkle.",
        "width": 1200,
        "height": 630,
        "alt": "Roll 5d6 Online | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Roll 5d6 Online | SpinWheelGames",
    "description": "Free online 5d6 dice roller. Roll 5 six-sided dice in realistic 3D WebGL physics. View totals (5 to 30), averages (17.5), and outcome probabilities for Yahtzee and Farkle.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Froll-5d6&title=Roll+5d6+Online+%7C+SpinWheelGames&desc=Free+online+5d6+dice+roller.+Roll+5+six-sided+dice+in+realistic+3D+WebGL+physics.+View+totals+%285+to+30%29%2C+averages+%2817.5%29%2C+and+outcome+probabilities+for+Yahtzee+and+Farkle."
    ]
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-8 space-y-6">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Roll 5d6' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono uppercase tracking-wider">
              Yahtzee &amp; Board Game Standard
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono uppercase tracking-wider">
              Average: 17.5 (Range 5–30)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll 5 D6 Online - 3D Multi-Dice Roller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll 5 six-sided dice online with 3D physics. Perfect for Yahtzee, Farkle, Liar's Dice, and Shadowrun dice pools.
          </p>
        </div>

        {/* Primary Interactive Engine */}
        <DiceRollerEngine
          initialCount={5}
          initialSides={6}
          suggestedPresets={[
            { label: 'Standard 5d6 (Sum 5–30)', count: 5, sides: 6 },
            { label: '5d6 Drop Lowest 1', count: 5, sides: 6, dropLowest: 1 },
            { label: '5d6 Drop Lowest 2', count: 5, sides: 6, dropLowest: 2 }
          ]}
        />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-6 border-t border-slate-200 dark:border-[#1e2030] pt-6">
          <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-3 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>5d6 Dice Combinations and Yahtzee Odds</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Rolling 5 standard 6-sided dice (<Link href="/dice/d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d6</Link>) produces $6^5 = 7,776$ possible distinct permutations. The sums range from a minimum of 5 up to 30, forming a symmetric normal bell curve centered at the expected mean of <strong>17.5</strong>—where sums of 17 and 18 each occur in 780 out of 7,776 throws (10.03% each).
              </p>
              <p>
                In dice-matching parlor games like <em>Yahtzee</em>, <em>Farkle</em>, and <em>Liar&apos;s Dice</em>, players evaluate poker-style combinations on a single 5d6 throw: One Pair occurs 46.30% of the time (3,600 ways), Two Pair 23.15% (1,800 ways), Three of a Kind 15.43% (1,200 ways), a Full House 3.86% (300 ways), a Large Straight 3.09% (240 ways), Four of a Kind 1.93% (150 ways), and a natural Five of a Kind (Yahtzee) 0.077% (6 ways).
              </p>
              <p>
                For tabletop RPG character creation, some Dungeon Masters use <strong>5d6 drop lowest 2</strong> as a high-powered alternative to <Link href="/roll-4d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">4d6 Drop Lowest</Link> and <Link href="/roll-3d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">3d6</Link>, raising the expected ability score average to 13.43. Compare multi-dice pools inside our <Link href="/dice-average-calculator" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Dice Average Calculator</Link> or explore the <Link href="/dice-collection" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">3D Gemstone Dice Collection</Link>.
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
