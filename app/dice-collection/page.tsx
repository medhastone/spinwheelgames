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
  title: 'Official 3D RPG Dice Collection & Asset Pack | SpinWheelGames.org',
  description:
    'Explore the official 3D RPG gemstone dice collection for SpinWheelGames.org. Features hyper-realistic WebGL 3D physics, crystal glass materials, and metallic gold numerals for D2, D4, D6, D8, D10, D12, D20, and D100.',
  keywords: [
    '3d rpg dice collection',
    '3d dice set',
    'dnd dice roller 3d',
    'gemstone crystal dice',
    'polyhedral dice asset pack',
    'd20 amber gold die',
    'spin wheel games dice',
    'dice gallery',
    'polyhedral dice showcase'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/dice-collection'
  },
  openGraph: {
    title: '3D RPG Gemstone Dice Collection | SpinWheelGames.org',
    description:
      'Complete 8-piece 3D RPG dice collection with WebGL physics, crystal glass materials, and metallic gold engraved numerals.',
    url: 'https://spinwheelgames.org/dice-collection',
    type: 'website'
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 space-y-6">
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
        </section>

        {/* Popular Wheels & CTA */}
        <PopularWheels />
        <CreateWheelCTA />
      </main>

      <Footer />
    </div>
  );
}
