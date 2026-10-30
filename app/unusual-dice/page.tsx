import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import UnusualDiceComponent from '@/components/dice/UnusualDiceComponent';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  "title": "Unusual Dice Roller | SpinWheelGames",
  "description": "Free online unusual dice roller. Simulate odd-sided polyhedra like d3, d5, d7, d14, d16, d24, d30, and custom N-sided dice with 3D WebGL physics.",
  "keywords": [
    "unusual dice roller",
    "non standard dice",
    "dcc rpg dice chain",
    "d3 die roller",
    "d7 die roller",
    "d30 dice roller",
    "custom n sided die"
  ],
  "alternates": {
    "canonical": "https://spinwheelgames.org/unusual-dice"
  },
  "openGraph": {
    "title": "Unusual Dice Roller | SpinWheelGames",
    "description": "Free online unusual dice roller. Simulate odd-sided polyhedra like d3, d5, d7, d14, d16, d24, d30, and custom N-sided dice with 3D WebGL physics.",
    "url": "https://spinwheelgames.org/unusual-dice",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Funusual-dice&title=Unusual+Dice+Roller+%7C+SpinWheelGames&desc=Free+online+unusual+dice+roller.+Simulate+odd-sided+polyhedra+like+d3%2C+d5%2C+d7%2C+d14%2C+d16%2C+d24%2C+d30%2C+and+custom+N-sided+dice+with+3D+WebGL+physics.",
        "width": 1200,
        "height": 630,
        "alt": "Unusual Dice Roller | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Unusual Dice Roller | SpinWheelGames",
    "description": "Free online unusual dice roller. Simulate odd-sided polyhedra like d3, d5, d7, d14, d16, d24, d30, and custom N-sided dice with 3D WebGL physics.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Funusual-dice&title=Unusual+Dice+Roller+%7C+SpinWheelGames&desc=Free+online+unusual+dice+roller.+Simulate+odd-sided+polyhedra+like+d3%2C+d5%2C+d7%2C+d14%2C+d16%2C+d24%2C+d30%2C+and+custom+N-sided+dice+with+3D+WebGL+physics."
    ]
  }
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'Unusual Dice Roller', href: '/unusual-dice' }
          ]}
        />

        {/* Hero */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-bold uppercase tracking-wider">
            DCC RPG &amp; Non-Standard Polyhedra
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll Unusual Dice Online - Custom Polyhedral Roller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Roll non-standard polyhedral dice like d3, d5, d7, d14, d16, d24, and d30 with fair 3D physics or simulate any custom N-sided die.
          </p>
        </div>

        {/* Primary Interactive Component */}
        <UnusualDiceComponent />

        {/* Guide */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
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

          <div className="pt-4 border-t border-slate-200 dark:border-[#1e2030] space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Zocchi Dice Chain &amp; Non-Standard Tabletop Mechanics
            </h3>
            <p>
              Pioneered by game designer Lou Zocchi and popularized by <em>Dungeon Crawl Classics (DCC RPG)</em>, the extended dice chain steps smoothly between standard polyhedra: <strong><Link href="/roll-d3" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d3</Link> &rarr; <Link href="/dice/d4" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d4</Link> &rarr; d5 &rarr; <Link href="/dice/d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d6</Link> &rarr; d7 &rarr; <Link href="/dice/d8" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d8</Link> &rarr; <Link href="/dice/d10" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d10</Link> &rarr; <Link href="/dice/d12" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d12</Link> &rarr; d14 &rarr; d16 &rarr; <Link href="/dice/d20" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d20</Link> &rarr; d24 &rarr; d30</strong>. Instead of adding flat plus-or-minus modifiers to a roll, situational bonuses shift a character one step up or down the dice chain.
            </p>
            <p>
              Beyond dungeon crawlers, odd-sided rollers solve practical problems across board games and classroom activities: a <strong>d7</strong> picks a random day of the week, a <strong>d24</strong> selects a random hour of the day, a <strong>d30</strong> chooses a random calendar day, and a <strong>d60</strong> generates random minutes or seconds. You can also compare odd-sided averages inside our <Link href="/dice-average-calculator" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Dice Average Calculator</Link> or browse the <Link href="/dice-collection" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">3D Gemstone Dice Collection</Link>.
            </p>
          </div>
        </div>

        {/* Cross Navigation */}
        <DiceNavigation currentPath="/unusual-dice" />
      </main>

      <Footer />
    </div>
  );
}
