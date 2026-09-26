import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import UnusualDiceComponent from '@/components/dice/UnusualDiceComponent';

export const metadata: Metadata = {
  title: 'Unusual Dice Roller | Non-Standard Polyhedral Dice Simulator',
  description:
    'Free online unusual dice roller. Simulate odd-sided polyhedra like d3, d5, d7, d14, d16, d24, d30, and custom N-sided dice with 3D WebGL physics.',
  keywords: [
    'unusual dice roller',
    'non standard dice',
    'dcc rpg dice chain',
    'd3 die roller',
    'd7 die roller',
    'd30 dice roller',
    'custom n sided die'
  ]
};

export default function UnusualDicePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Unusual & Non-Standard Polyhedral Dice Roller',
    description:
      '3D WebGL dice simulator for non-standard polyhedral dice used in Dungeon Crawl Classics and tabletop RPGs.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0c10] text-slate-900 dark:text-[#e0e1eb] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Unusual Dice Roller', href: '/unusual-dice' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-bold">
            DCC RPG &amp; Non-Standard Polyhedra
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll Unusual Dice Online - Custom Polyhedral Roller
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll non-standard polyhedral dice like d3, d5, d7, d14, d16, d24, and d30 with fair 3D physics or simulate any custom N-sided die.
          </p>
        </div>

        {/* Primary Interactive Component */}
        <UnusualDiceComponent />

        {/* Guide */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            What Are Unusual Dice and How Are They Used?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400">1. Dungeon Crawl Classics (DCC RPG)</h3>
              <p>
                Dungeon Crawl Classics utilizes the official "Dice Chain" consisting of d3, d4, d5, d6, d7, d8, d10, d12, d14, d16, d20, d24, and d30. Modifiers step up or down the dice chain instead of adding flat numerical bonuses.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400">2. Simulating Odd-Sided Physical Dice</h3>
              <p>
                Because physical dice must be isohedral (face-transitive) to be fair, odd-sided physical dice are rare. A digital WebGL simulator provides guaranteed uniform random distributions for any N-sided die without geometric bias.
              </p>
            </div>
          </div>
        </div>

        {/* Cross Navigation */}
        <DiceNavigation currentPath="/unusual-dice" />
      </main>

      <Footer />
    </div>
  );
}
