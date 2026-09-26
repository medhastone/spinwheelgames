import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DiceRollerEngine from '@/components/dice/DiceRollerEngine';
import { DIE_DEFINITIONS, DieType } from '@/components/dice/diceMath';
import {
  Dice5,
  Dices,
  Calculator,
  Shield,
  Layers,
  HelpCircle,
  ArrowRight,
  Compass,
  BarChart2
} from 'lucide-react';

interface DiceSlugPageProps {
  params: Promise<{ slug: string }>;
}

const SUPPORTED_SLUGS: Record<string, { dieType: DieType; title: string; subtitle: string; shapeName: string; useCases: string[] }> = {
  d2: {
    dieType: 'd2',
    title: 'Roll D2 Online - 3D Dice Roller',
    subtitle: 'Roll an interactive 3D metallic coin with real rigid-body bounce, heads/tails faces, and cryptographic fairness.',
    shapeName: 'Cylinder / Two-Sided Coin Disc',
    useCases: ['50/50 binary decisions and coin flips', 'D&D disadvantage/advantage coin tosses', 'Sports toss and turn orders', 'Probability classroom demonstrations']
  },
  d4: {
    dieType: 'd4',
    title: 'Roll D4 Online - 3D Dice Roller',
    subtitle: 'Roll a mathematically correct 4-sided triangular pyramid with real rigid-body tumbling, collision detection, and face detection.',
    shapeName: 'Regular Tetrahedron (4 Triangular Faces)',
    useCases: ['D&D dagger and dart weapon damage', 'Healing potion formulas (2d4+2)', 'Magic Missile spell force damage (1d4+1)', 'Small random choice selection']
  },
  d6: {
    dieType: 'd6',
    title: 'Roll D6 Online - 3D Dice Roller',
    subtitle: 'Roll classic six-sided dice with chamfered edges, realistic indentation pips, felt floor collisions, and exact face normal math.',
    shapeName: 'Regular Hexahedron / Cube (6 Square Faces)',
    useCases: ['Classic board games (Monopoly, Risk, Yahtzee, Catan)', 'Tabletop RPG ability scores (4d6 Drop Lowest)', 'Warhammer wargaming hit rolls and wound saves', 'Greatsword weapon damage (2d6)']
  },
  d8: {
    dieType: 'd8',
    title: 'Roll D8 Online - 3D Dice Roller',
    subtitle: 'Roll an authentic 8-sided octahedron with dual-pyramid geometry, physical momentum, and uniform probability distribution.',
    shapeName: 'Regular Octahedron (8 Equilateral Triangular Faces)',
    useCases: ['Longsword and rapier one-handed martial damage', 'Cure Wounds and healing spells (1d8 + modifier)', 'Hit dice for bards, clerics, druids, monks, rogues, warlocks', 'Weather generation tables']
  },
  d10: {
    dieType: 'd10',
    title: 'Roll D10 Online - 3D Dice Roller',
    subtitle: 'Roll a pentagonal trapezohedron with numbered kite faces, continuous collision detection, and genuine physical settling.',
    shapeName: 'Pentagonal Trapezohedron (10 Kite Faces)',
    useCases: ['Heavy weapon damage (halberd, glaive, heavy crossbow)', 'Fighter, paladin, and ranger hit die rolls', 'Percentile ones-digit rolls (0–9)', 'World of Darkness and Call of Cthulhu systems']
  },
  d12: {
    dieType: 'd12',
    title: 'Roll D12 Online - 3D Dice Roller',
    subtitle: 'Roll a 12-sided regular dodecahedron with 12 regular pentagon faces, realistic mass, momentum, and face-normal detection.',
    shapeName: 'Regular Dodecahedron (12 Regular Pentagon Faces)',
    useCases: ['Barbarian greataxe massive weapon damage (1d12)', 'Barbarian class hit point levels (d12 + CON)', 'Calendar month and zodiac random selection', 'D12 table encounter randomizers']
  },
  d20: {
    dieType: 'd20',
    title: 'Roll D20 Online - 3D Dice Roller',
    subtitle: 'Roll the iconic 20-sided icosahedron for D&D attacks, saving throws, ability checks, and natural 20 critical hits.',
    shapeName: 'Regular Icosahedron (20 Equilateral Triangular Faces)',
    useCases: ['D&D 5e core d20 attack rolls and armor class contest', 'Saving throws (DEX, CON, WIS, STR, INT, CHA)', 'Skill checks (Perception, Athletics, Stealth, Insight)', 'Natural 20 Critical Success & Natural 1 Fumble']
  },
  d100: {
    dieType: 'd100',
    title: 'Roll D100 Online - 3D Dice Roller',
    subtitle: 'Roll percentile dice with tens and units notation, rigid-body physics, and cryptographic fairness across 1 to 100.',
    shapeName: 'Dual Percentile Trapezohedron (00–90 & 0–9)',
    useCases: ['Call of Cthulhu skill success checks (1–100 percentile)', 'D&D Wild Magic Surge surge tables (1–100)', 'D&D Divine Intervention percentile check', 'Loot drop and treasure horde random generation']
  }
};

export async function generateStaticParams() {
  return Object.keys(SUPPORTED_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cfg = SUPPORTED_SLUGS[slug.toLowerCase()];
  if (!cfg) return { title: 'Online Dice Roller | SpinWheelGames' };

  return {
    title: `${cfg.title} | SpinWheelGames`,
    description: `${cfg.subtitle} Free interactive 3D physics tool with totals, averages, modifiers, and statistical distribution.`,
    keywords: [
      `roll ${slug}`,
      `${slug} dice roller`,
      `online ${slug} roller`,
      `3d ${slug} dice`,
      `virtual ${slug}`,
      'rpg dice roller',
      'polyhedral dice'
    ],
    openGraph: {
      title: `${cfg.title} | SpinWheelGames`,
      description: cfg.subtitle,
      url: `https://spinwheelgames.org/dice/${slug}`,
      siteName: 'SpinWheelGames',
      type: 'website'
    },
    alternates: {
      canonical: `https://spinwheelgames.org/dice/${slug}`
    }
  };
}

export default async function DiceSlugPage({ params }: DiceSlugPageProps) {
  const { slug } = await params;
  const cfg = SUPPORTED_SLUGS[slug.toLowerCase()];
  if (!cfg) notFound();

  const dieDef = DIE_DEFINITIONS[cfg.dieType];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${cfg.dieType.toUpperCase()} 3D Physics Dice Roller`,
        url: `https://spinwheelgames.org/dice/${slug}`,
        applicationCategory: 'GameApplication',
        description: cfg.subtitle,
        operatingSystem: 'All'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://spinwheelgames.org' },
          { '@type': 'ListItem', position: 2, name: 'Dice Roller', item: 'https://spinwheelgames.org/dice-roller' },
          { '@type': 'ListItem', position: 3, name: cfg.dieType.toUpperCase(), item: `https://spinwheelgames.org/dice/${slug}` }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <div className="pt-20 sm:pt-22 lg:pt-24">
        <DiceNavigation />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: cfg.dieType.toUpperCase() }
          ]}
        />

        {/* 3D Physics Engine Workspace */}
        <section id="dice-tool-workspace" aria-label={`Interactive ${cfg.dieType.toUpperCase()} Roller`}>
          <DiceRollerEngine
            initialCount={1}
            initialSides={dieDef.sides}
            pageTitle={cfg.title}
            pageSubtitle={cfg.subtitle}
          />
        </section>

        {/* Deep Informative Educational Content */}
        <article className="space-y-10 border-t border-[#eeedf7] dark:border-[#222330] pt-10">
          
          {/* Quick Mathematical Facts Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs">
              <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase">Faces</span>
              <div className="font-headline text-2xl sm:text-3xl font-black text-[#4648d4] dark:text-[#8587ff] mt-1">
                {dieDef.sides}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs">
              <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase">Theoretical Average</span>
              <div className="font-headline text-2xl sm:text-3xl font-black text-[#4648d4] dark:text-[#8587ff] mt-1">
                {dieDef.average}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs">
              <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase">Each Face Probability</span>
              <div className="font-headline text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {(100 / dieDef.sides).toFixed(1)}%
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs">
              <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase">Outcome Range</span>
              <div className="font-headline text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white mt-1">
                {dieDef.min} – {dieDef.max}
              </div>
            </div>
          </section>

          {/* Geometry & Physical Modeling Info */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>3D Geometry &amp; Physical Rigidity: {dieDef.label.toUpperCase()}</span>
            </h2>
            <p className="text-sm sm:text-base text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              In this physical simulation engine, the <strong>{dieDef.name}</strong> is modeled with exact 3D polygon geometry (<strong>{cfg.shapeName}</strong>). When thrown, the die interacts with gravity (-22 m/s²), restitution on felt, friction damping, and angular momentum. Once the die settles below stability thresholds, the orientation vector calculates which face normal is pointing closest to the world UP vector.
            </p>
          </div>

          {/* Real-World Use Cases */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white flex items-center gap-2.5">
              <Dices className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Common Tabletop RPG &amp; Gaming Use Cases</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cfg.useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] flex items-center gap-3 shadow-2xs"
                >
                  <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#1a1b22] dark:text-white">
                    {useCase}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Related Polyhedral Dice Links */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white">
              Explore Other Polyhedral Dice
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(SUPPORTED_SLUGS)
                .filter(([s]) => s !== slug)
                .map(([s, c]) => (
                  <Link
                    key={s}
                    href={`/dice/${s}`}
                    className="p-4 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all group shadow-2xs flex items-center justify-between"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff]">
                      Roll {s.toUpperCase()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
