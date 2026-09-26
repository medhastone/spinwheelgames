import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceRollerEngine from '@/components/dice/DiceRollerEngine';
import {
  Dice5,
  Dices,
  Calculator,
  Shield,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Dice Roller – Roll Dice Instantly | SpinWheelGames',
  description:
    'Roll one or more dice online with a fast interactive 3D dice roller. Choose your dice, set the number of rolls, and see individual results, totals, averages, and recent rolls instantly.',
  keywords: [
    'dice roller',
    'online dice roller',
    'roll dice online',
    'virtual dice',
    'random dice roller',
    'digital dice',
    'free dice roller',
    '3d dice roller',
    'dnd dice roller'
  ],
  openGraph: {
    title: 'Free Online Dice Roller – Roll Dice Instantly | SpinWheelGames',
    description:
      'Roll one or more dice online with a fast interactive 3D dice roller. Choose your dice, set the number of rolls, and see individual results, totals, averages, and recent rolls instantly.',
    url: 'https://spinwheelgames.org/dice-roller',
    siteName: 'SpinWheelGames',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Dice Roller – Roll Dice Instantly',
    description:
      'Roll interactive 3D dice online with totals, averages, and custom tabletop RPG notation.'
  },
  alternates: {
    canonical: 'https://spinwheelgames.org/dice-roller'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/dice-roller#app',
      name: 'Online 3D Dice Roller',
      url: 'https://spinwheelgames.org/dice-roller',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Supports HTML5 Canvas & WebGL.',
      description:
        'Free interactive 3D dice roller supporting d4, d6, d8, d10, d12, d20, d100, custom modifiers, and tabletop RPG notation with browser-based cryptographic randomness.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/dice-roller#breadcrumb',
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
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/dice-roller#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the online 3D dice roller generate random results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our online dice roller uses the browser Web Cryptography API (crypto.getRandomValues) to select unbiased random numbers locally on your device. The 3D animation visualizes the selected outcome with physics-based tumbling.'
          }
        },
        {
          '@type': 'Question',
          name: 'What types of dice can I roll?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can roll standard polyhedral dice including d2 (coins), d3, d4, d6, d8, d10, d12, d20, and percentile d100 dice, as well as arbitrary multi-die quantities up to 30 dice at once.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I drop lowest dice or add modifiers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Expand Advanced Rules to set Drop Lowest, Keep Highest, static bonuses or penalties (+/- modifier), rerolling 1s, or enter standard RPG formulas like 4d6dl1 directly.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do I need an account or software download?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The 3D dice roller is completely free, runs 100% in your browser, requires no account or registration, and works on desktop, tablet, and mobile devices.'
          }
        }
      ]
    }
  ]
};

export default function DiceRollerPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <Navbar />

      <div className="pt-20 sm:pt-22 lg:pt-24">
        <DiceNavigation />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller' }
          ]}
        />

        {/* Master Interactive 3D Dice Tool */}
        <section id="dice-tool-workspace" aria-label="Interactive 3D Dice Roller">
          <DiceRollerEngine
            initialCount={2}
            initialSides={6}
            pageTitle="Roll Dice Online - 3D Dice Roller"
            pageSubtitle="Roll one or more dice online with a fast interactive 3D dice roller. Choose your dice, set the number of rolls, and see individual results, totals, averages, and recent rolls instantly."
          />
        </section>

        {/* Deep Informative Editorial & Educational Content */}
        <article className="space-y-10 border-t border-[#eeedf7] dark:border-[#222330] pt-10">
          
          {/* Quick Direct Answer */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white">
              About This Online Dice Roller
            </h2>
            <p className="text-sm sm:text-base text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Whether you are running an evening tabletop roleplaying game, playing classic board games like Monopoly or Yahtzee, settling classroom turn orders, or teaching probability math, this free digital dice roller gives you authentic 3D dice rolling on any device. Every throw calculates individual results, total sums, arithmetic averages, and minimum/maximum ranges with local cryptographic randomness.
            </p>
          </div>

          {/* Feature Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center">
                <Dices className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-bold text-[#1a1b22] dark:text-white">
                All Standard Polyhedral Dice
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                Full 3D geometric modeling for d2 coins, d3, d4 tetrahedrons, d6 cubes, d8 octahedrons, d10 trapezohedrons, d12 dodecahedrons, d20 icosahedrons, and dual d100 percentile dice.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-bold text-[#1a1b22] dark:text-white">
                Unbiased Cryptographic Math
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                Uses browser-based cryptographic randomness via <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">window.crypto.getRandomValues</code> for uniform outcome distribution before rendering smooth 3D motion.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-headline text-lg font-bold text-[#1a1b22] dark:text-white">
                RPG Formulas &amp; Modifiers
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                Supports drop lowest (4d6dl1), keep highest (4d6kh3), advantage (2d20kh1), disadvantage (2d20kl1), exploding dice, reroll 1s, and arithmetic modifiers (+5, -2).
              </p>
            </div>
          </section>

          {/* Dedicated Tools Hub / Internal Links Grid */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white">
              Specialized Dice Landing Pages &amp; Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/roll-4d6"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll 4d6 Online
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Roll four d6 dice with optional Drop Lowest mode for character ability scores and statistical analysis.
                </p>
              </Link>

              <Link
                href="/roll-1d4"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll 1d4 Online
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Single 4-sided tetrahedron die roller for d4 damage, spell effects, and 1-in-4 decisions.
                </p>
              </Link>

              <Link
                href="/roll-3d6"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll 3d6 Online
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Classic bell curve distribution simulator (3–18) with theoretical average of 10.5.
                </p>
              </Link>

              <Link
                href="/dnd-stat-roller"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    D&amp;D Stat Roller
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Roll complete ability scores (STR, DEX, CON, INT, WIS, CHA) using 4d6 Drop Lowest with full transparency.
                </p>
              </Link>

              <Link
                href="/dice-average-calculator"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Dice Average Calculator
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Calculate expected averages, minimums, maximums, and full probability bell curves for any dice formula.
                </p>
              </Link>

              <Link
                href="/roll-5d6"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll 5d6 Online
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Roll five six-sided dice for Yahtzee turns, wargaming pools, and sums from 5 to 30.
                </p>
              </Link>

              <Link
                href="/roll-d3"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll d3 Randomizer
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Three-sided die roll with equal 33.33% chance for Warhammer wounds and quick 3-way picks.
                </p>
              </Link>

              <Link
                href="/roll-2d12"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Roll 2d12 Online
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Two 12-sided dice with 2 to 24 triangular distribution and greataxe critical hit math.
                </p>
              </Link>

              <Link
                href="/unusual-dice"
                className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                    Unusual &amp; Odd-Sided Dice
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1.5">
                  Roll non-standard dice like d3, d5, d7, d13, d14, d16, d18, d24, d26, d30, and beyond.
                </p>
              </Link>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  How does the online 3D dice roller generate random results?
                </h3>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Our online dice roller uses the browser Web Cryptography API (crypto.getRandomValues) to select unbiased random numbers locally on your device. The 3D animation visualizes the selected outcome with physics-based tumbling.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  What types of dice can I roll?
                </h3>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  You can roll standard polyhedral dice including d2 (coins), d3, d4, d6, d8, d10, d12, d20, and percentile d100 dice, as well as arbitrary multi-die quantities up to 30 dice at once.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Can I drop lowest dice or add modifiers?
                </h3>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Yes. Expand Advanced Rules to set Drop Lowest, Keep Highest, static bonuses or penalties (+/- modifier), rerolling 1s, or enter standard RPG formulas like 4d6dl1 directly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Do I need an account or software download?
                </h3>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  No. The 3D dice roller is completely free, runs 100% in your browser, requires no account or registration, and works on desktop, tablet, and mobile devices.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
