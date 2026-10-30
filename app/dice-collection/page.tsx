import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceAssetShowcase from '@/components/dice/DiceAssetShowcase';
import PopularWheels from '@/components/PopularWheels';
import CreateWheelCTA from '@/components/CreateWheelCTA';
import { Sparkles, Dice5, Shield, ArrowRight, Dices, Layers } from 'lucide-react';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  "title": "3D RPG Dice Collection | SpinWheelGames",
  "description": "Explore the official 3D RPG gemstone dice collection for SpinWheelGames. Features realistic WebGL 3D physics, crystal glass materials, and gold numerals for D2 through D100.",
  "keywords": [
    "3d rpg dice collection",
    "3d dice set",
    "dnd dice roller 3d",
    "gemstone crystal dice",
    "polyhedral dice asset pack",
    "d20 amber gold die",
    "spin wheel games dice",
    "dice gallery",
    "polyhedral dice showcase"
  ],
  "alternates": {
    "canonical": "https://spinwheelgames.org/dice-collection"
  },
  "openGraph": {
    "title": "3D RPG Dice Collection | SpinWheelGames",
    "description": "Explore the official 3D RPG gemstone dice collection for SpinWheelGames. Features realistic WebGL 3D physics, crystal glass materials, and gold numerals for D2 through D100.",
    "url": "https://spinwheelgames.org/dice-collection",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fdice-collection&title=3D+RPG+Dice+Collection+%7C+SpinWheelGames&desc=Explore+the+official+3D+RPG+gemstone+dice+collection+for+SpinWheelGames.+Features+realistic+WebGL+3D+physics%2C+crystal+glass+materials%2C+and+gold+numerals+for+D2+through+D100.",
        "width": 1200,
        "height": 630,
        "alt": "3D RPG Dice Collection | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "3D RPG Dice Collection | SpinWheelGames",
    "description": "Explore the official 3D RPG gemstone dice collection for SpinWheelGames. Features realistic WebGL 3D physics, crystal glass materials, and gold numerals for D2 through D100.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fdice-collection&title=3D+RPG+Dice+Collection+%7C+SpinWheelGames&desc=Explore+the+official+3D+RPG+gemstone+dice+collection+for+SpinWheelGames.+Features+realistic+WebGL+3D+physics%2C+crystal+glass+materials%2C+and+gold+numerals+for+D2+through+D100."
    ]
  }
};

export default function DiceCollectionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemPage',
        name: 'Official 3D RPG Dice Collection',
        description:
          'Complete 8-piece polyhedral 3D RPG gemstone dice collection with interactive WebGL physics and custom color systems.',
        url: 'https://spinwheelgames.org/dice-collection',
        isPartOf: {
          '@type': 'WebSite',
          name: 'SpinWheelGames.org',
          url: 'https://spinwheelgames.org'
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
            name: 'Dice Collection',
            item: 'https://spinwheelgames.org/dice-collection'
          }
        ]
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
            { label: 'Dice Collection', href: '/dice-collection' }
          ]}
        />

        {/* Dice Hub Navigation */}
        <DiceNavigation currentPath="/dice-collection" />

        {/* Showcase Interactive Suite */}
        <DiceAssetShowcase />

        {/* Feature Cards & D&D Tool Cross-Links */}
        <section className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Integrated RPG &amp; Decision Tools
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Jump directly into specialized 3D simulators and calculators powered by our gemstone dice physics engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/dnd-stat-roller"
              className="group p-6 rounded-2xl bg-white dark:bg-[#181924] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg group-hover:text-amber-500 transition-colors flex items-center justify-between text-slate-900 dark:text-white">
                <span>D&amp;D Stat Roller</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Roll 6 ability scores using 4d6 Drop Lowest, Standard Array, or Point Buy rules.
              </p>
            </Link>

            <Link
              href="/dice-average-calculator"
              className="group p-6 rounded-2xl bg-white dark:bg-[#181924] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                <Dice5 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg group-hover:text-indigo-500 transition-colors flex items-center justify-between text-slate-900 dark:text-white">
                <span>Dice Average Calculator</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Parse complex formulas like <code className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">3d8 + 1d6 + 4</code> and render exact probability curves.
              </p>
            </Link>

            <Link
              href="/unusual-dice"
              className="group p-6 rounded-2xl bg-white dark:bg-[#181924] border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-xl transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg group-hover:text-purple-500 transition-colors flex items-center justify-between text-slate-900 dark:text-white">
                <span>Unusual Dice Roller</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Roll non-standard polyhedra (d3, d5, d7, d14, d30, d100) with custom physics.
              </p>
            </Link>
          </div>

          <article className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Platonic Solids, Gemstone Shaders &amp; Cryptographic Tabletop Fairness
            </h2>
            <p>
              The <strong>3D RPG Gemstone Dice Collection</strong> brings together all five classical Platonic solids—the four-sided tetrahedron (<Link href="/dice/d4" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d4</Link>), six-sided hexahedron (<Link href="/dice/d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d6</Link>), eight-sided octahedron (<Link href="/dice/d8" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d8</Link>), twelve-sided dodecahedron (<Link href="/dice/d12" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d12</Link>), and twenty-sided icosahedron (<Link href="/dice/d20" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d20</Link>)—alongside the pentagonal trapezohedron (<Link href="/dice/d10" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d10</Link> and <Link href="/dice/d100" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d100 percentile</Link>) and dual-metal decision coin (<Link href="/dice/d2" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d2</Link>).
            </p>
            <p>
              Unlike molded acrylic or resin dice that can suffer from microscopic air bubbles or tumbling wear along specific edges, every die in our WebGL showcase resolves outcomes using the browser&apos;s hardware-backed <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">crypto.getRandomValues()</code> CSPRNG before animating the physical trajectory. Whether you are testing a <Link href="/roll-4d6" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">4d6 drop lowest stat block</Link>, rolling <Link href="/roll-2d12" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">2d12 duality dice</Link>, or triggering a <Link href="/roll-d3" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">d3 damage roll</Link>, each face maintains an exact, verifiable probability weight.
            </p>
          </article>
        </section>

        {/* Popular Wheels & CTA */}
        <PopularWheels />
        <CreateWheelCTA />
      </main>

      <Footer />
    </div>
  );
}
