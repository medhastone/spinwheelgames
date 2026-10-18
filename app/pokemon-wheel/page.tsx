import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Swords,
  Shield,
  Dices,
  RotateCw,
  Trophy,
  Layers,
  HelpCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Compass
} from 'lucide-react';
import PokemonWheelEngine from '@/components/pokemon/PokemonWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import DirectAnswer from '@/components/DirectAnswer';
import QuickFacts from '@/components/QuickFacts';
import { POKEMON_GENERATIONS, POKEMON_TYPE_CONFIG } from '@/lib/pokemonData';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Random Pokémon Spinner Wheel | SpinWheelGames",
  "description": "Free random pokemon generator and picker wheel. Spin across all 9 generations with type filters, 6-Pokemon team builder, and Nuzlocke challenge mode without duplicates.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/pokemon-wheel"
  },
  "openGraph": {
    "title": "Random Pokémon Spinner Wheel | SpinWheelGames",
    "description": "Free random pokemon generator and picker wheel. Spin across all 9 generations with type filters, 6-Pokemon team builder, and Nuzlocke challenge mode without duplicates.",
    "url": "https://spinwheelgames.org/pokemon-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fpokemon-wheel&title=Random+Pok%C3%A9mon+Spinner+Wheel+%7C+SpinWheelGames&desc=Free+random+pokemon+generator+and+picker+wheel.+Spin+across+all+9+generations+with+type+filters%2C+6-Pokemon+team+builder%2C+and+Nuzlocke+challenge+mode+without+duplicates.",
        "width": 1200,
        "height": 630,
        "alt": "Random Pokémon Spinner Wheel | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Random Pokémon Spinner Wheel | SpinWheelGames",
    "description": "Free random pokemon generator and picker wheel. Spin across all 9 generations with type filters, 6-Pokemon team builder, and Nuzlocke challenge mode without duplicates.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fpokemon-wheel&title=Random+Pok%C3%A9mon+Spinner+Wheel+%7C+SpinWheelGames&desc=Free+random+pokemon+generator+and+picker+wheel.+Spin+across+all+9+generations+with+type+filters%2C+6-Pokemon+team+builder%2C+and+Nuzlocke+challenge+mode+without+duplicates."
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/pokemon-wheel#webapp',
      name: 'Random Pokémon Generator & Picker Wheel',
      url: 'https://spinwheelgames.org/pokemon-wheel',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive random pokemon generator and picker wheel covering all 9 generations (Kanto to Paldea). Features elemental type filters, competitive 6-pokemon team builder, elimination no-repeat mode, and Nuzlocke route encounter roulette.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '2430',
        bestRating: '5',
        worstRating: '1'
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/pokemon-wheel#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://spinwheelgames.org/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Gaming Wheels',
          item: 'https://spinwheelgames.org/games'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random Pokémon Generator',
          item: 'https://spinwheelgames.org/pokemon-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/pokemon-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the random pokemon generator select Pokémon?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The random pokemon generator utilizes hardware-grade cryptographic pseudorandom number generators (CSPRNG via window.crypto) to calculate unbiased spin trajectories and slice angles, ensuring every Pokémon from Generation 1 to Generation 9 has an exact, mathematically fair probability of being selected.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I filter Pokémon by generation or elemental type?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can filter by any specific generation (Gen 1 Kanto through Gen 9 Paldea), isolate any of the 18 elemental types (such as Fire, Water, Dragon, Ghost, or Fairy), or narrow down to Starters, Fully Evolved Pokémon, or Legendaries only.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the no-repeat elimination option work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you enable the No-Repeat toggle, any Pokémon chosen by the spin wheel or instant picker is eliminated from the active pool. This ensures zero duplicate picks during drafts, team tournaments, or multi-round party selections until you click the Reset button.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the 6-Pokémon team builder mode?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 6-Pokémon team builder automatically assembles a balanced battle squad with role synergy, base stat total (BST) tracking, and type coverage analysis. You can also copy your generated team directly to clipboard in Pokémon Showdown format.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do streamers use the Nuzlocke challenge mode?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Streamers and challenge runners use our Nuzlocke mode to spin for legitimate route encounters without bias, enforce perma-faint graveyard tracking, and abide by standard Nuzlocke rules such as the Dupes Clause and Shiny Clause.'
          }
        }
      ]
    }
  ]
};

export default function PokemonWheelPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors w-full max-w-full overflow-x-clip">
        {/* Global Header */}
        <SubpageHeader activePage="/pokemon-wheel" />

        {/* Main Content Container matching Home Page rhythm */}
        <main className="w-full pt-16 sm:pt-18 lg:pt-20 flex-1 flex flex-col">
          {/* Compact Hero Banner Section (styled identically to Home Page HeroBanner) */}
          <section className="relative w-full px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3 overflow-hidden bg-[#fbf8ff] dark:bg-[#12131a] transition-colors">
            {/* Subtle Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-12 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-2">
              {/* Tagline / Feature Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                <span className="text-[11px] sm:text-[12px] font-bold text-[#1a1b22] dark:text-[#f1effa] tracking-wide">
                  All 9 Generations • 18 Elemental Types • True Web Crypto CSPRNG
                </span>
              </div>

              {/* H1 Heading */}
              <h1 className="font-headline text-[26px] sm:text-[36px] md:text-[44px] tracking-tight font-black leading-[1.1] text-[#1a1b22] dark:text-white">
                Random Pokémon Generator &amp; Picker
              </h1>

              {/* Supporting Copy */}
              <p className="font-body text-[13px] sm:text-[15px] text-[#464554] dark:text-[#c7c4d7] max-w-2xl leading-relaxed">
                Spin the interactive wheel to randomly pick Pokémon across Gen 1–9. Filter by elemental type, draft balanced 6-Pokémon teams, randomize Nuzlocke route encounters, or eliminate duplicates.
              </p>
            </div>
          </section>

          {/* Central Tool: Interactive Pokemon Wheel Engine */}
          <div className="w-full">
            <PokemonWheelEngine />
          </div>

          {/* Supporting Guides & Content Container (max-w-[1440px] px-4 sm:px-6) */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-8 sm:space-y-10">
            <DirectAnswer
              question="What is the Random Pokémon Generator?"
              answer="The Random Pokémon Generator is a free, cryptographic online picker and spin wheel supporting all 9 Pokémon generations (Kanto through Paldea). It allows trainers to filter across all 18 elemental types, construct complete 6-member battle teams with Pokédex stat overviews, run unbiased Nuzlocke route encounter roulette, and eliminate drawn Pokémon with zero duplicates."
            />

            {/* Quick Facts Component */}
            <QuickFacts
              facts={{
                toolName: 'Random Pokémon Generator & Picker',
                purpose:
                  'Generate random Pokémon for drafts, competitive team building, drawing prompts, and Nuzlocke challenge runs.',
                bestFor:
                  'Pokémon trainers, competitive VGC players, Nuzlocke challenge streamers, and draft leagues.',
                modes: [
                  'Single Wheel Picker',
                  '6-Pokémon Team Builder',
                  'Nuzlocke Route Roulette',
                  'Instant Multi-Roll',
                  'No-Repeat Elimination'
                ],
                customization: [
                  'Generations 1–9',
                  '18 Elemental Types',
                  'Starters & Legendaries Only',
                  'Showdown Export',
                  'Audio & Fullscreen'
                ],
                accountRequired: 'No Sign-Up Needed',
                cost: '100% Free',
                selectionMethod: 'Cryptographic CSPRNG with Real Canvas Physics'
              }}
            />

            {/* Comprehensive Guides & Content Sections */}
            <div className="space-y-6 sm:space-y-10">
          {/* Section 1: How to Use the Random Pokémon Picker */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Guide</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                How to Use the Random Pokémon Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Whether you need a quick surprise pick for casual battles, want to discover a new favorite monster, or need to run an authentic challenge run on stream, our picker wheel is designed for effortless customizability:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Apply Filters
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Select your target Generation (Gen 1 to Gen 9), choose an elemental type (e.g. Fire, Dragon, Water), or isolate Starters and Legendaries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Spin or Instant Roll
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tap <strong>SPIN THE WHEEL</strong> to enjoy real inertia canvas physics and audio ticks, or use the <strong>Instant Dex Roll</strong> tab for rapid multi-draws.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Inspect Result Card
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Review your Pokémon&apos;s National Pokédex number, official sprite, dual typing, Base Stat Total (BST), and competitive battle archetype.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Four Powerful Modes Explained */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Four Specialized Game &amp; Challenge Modes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
              Our tool is far more than a simple randomizer. Explore dedicated sub-modes crafted specifically for competitive drafters, challenge runners, and casual fans alike:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm">
                  <RotateCw className="w-4 h-4 shrink-0" />
                  <span>1. Single Pokémon Wheel Picker</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ideal for mystery drawing challenges, choosing your daily mascot, or selecting a wild Pokémon to hunt in your latest cartridge playthrough. Slices adapt dynamically to your active filters.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm">
                  <Swords className="w-4 h-4 shrink-0" />
                  <span>2. 6-Pokémon Battle Squad Builder</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drafts a complete 6-member party with automated type coverage calculations, average BST ratings, and role distribution. You can copy the entire team directly for Pokémon Showdown imports with one click.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>3. Nuzlocke Route Encounter Roulette</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lock in legitimate encounters route-by-route. Manage an active team roster alongside a perma-death graveyard counter to adhere to standard and hardcore Nuzlocke rulesets without bias.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>4. Elimination Draft (No-Repeat Option)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hosting a draft tournament among friends? Enable <strong>No-Repeat</strong>. Each selected Pokémon is eliminated from subsequent rolls until all options are exhausted or you trigger a manual pool reset.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Generations Matrix (Gen 1 to Gen 9) */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              All 9 Generations Supported (Kanto to Paldea)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
              Every era of the Pokémon franchise introduced iconic battle mechanics, regions, and legendary titans. Filter precisely by your favorite generation:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {POKEMON_GENERATIONS.map((gen) => (
                <div
                  key={gen.gen}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900 dark:text-white">
                      {gen.name}: {gen.region}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      {gen.count} Pokémon
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {gen.games}
                  </p>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                    Theme: <strong>{gen.tag}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: All 18 Elemental Types & Synergy */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              All 18 Elemental Types &amp; Battle Synergy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
              Looking to draft a Monotype Gym Leader squad or shore up defensive weaknesses? You can filter the wheel by any of the 18 official elemental typings:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {Object.keys(POKEMON_TYPE_CONFIG).map((typeKey) => {
                const cfg = POKEMON_TYPE_CONFIG[typeKey];
                return (
                  <div
                    key={typeKey}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 text-center space-y-1"
                  >
                    <div className="text-xl">{cfg.icon}</div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {typeKey}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {cfg.strongAgainst.length > 0 ? `Beats ${cfg.strongAgainst[0]}` : 'Balanced'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Nuzlocke Challenge Guidelines */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Nuzlocke Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Streamer &amp; Nuzlocke Challenge Rules
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Nuzlocke Challenge is a community-created ruleset that transforms Pokémon games into roguelike survival tests. Our random pokemon generator is specifically tailored to assist challenge runners:
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Route Encounter Roulette:</strong> Spin when stepping onto a new route to determine which wild Pokémon you must encounter or draft.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Dupes Clause Integration:</strong> With the No-Repeat toggle enabled, duplicate species are automatically skipped, preserving your encounter roll.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Perma-Faint Tracking:</strong> Click the skull button in the Nuzlocke tab to mark fallen party members and maintain an accurate graveyard count.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Frequently Asked Questions (FAQ) */}
          <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#141523] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQ</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Is this random pokemon generator truly unbiased?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes. Unlike simple Math.random() implementations, we use the browser&apos;s cryptographic entropy API (`window.crypto.getRandomValues`). Every slice on the wheel has an exact, mathematically identical chance of landing at the marker.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Can I export the 6-Pokémon team to Pokémon Showdown?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes! Once you generate a 6-monster squad, click the <strong>Copy Showdown</strong> button. You can paste the formatted text directly into Pokémon Showdown&apos;s team builder to start battling immediately.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Does the picker include Generation 9 (Scarlet &amp; Violet) Pokémon?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes. The database includes fan favorites from Paldea including Meowscarada, Skeledirge, Quaquaval, Tinkaton, Baxcalibur, Annihilape, Kingambit, Gholdengo, Koraidon, and Miraidon.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Can I exclude Legendaries or Starters?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes. In the filter bar, use the <strong>Pool</strong> dropdown to select &ldquo;Starters Only&rdquo;, &ldquo;Fully Evolved Only&rdquo;, &ldquo;Legendaries Only&rdquo;, or &ldquo;All Pokemon&rdquo; to customize your experience.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a2c] border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Does the wheel work on mobile devices?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes! The entire interface is built with responsive touch targets, smooth CSS transitions, horizontal overflow safeguards, and compact mobile result cards that fit any smartphone screen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Related Gaming & Decision Wheels */}
          <section className="p-5 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-[#141523]/80 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Explore More Gaming &amp; Randomizer Wheels
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
              Looking for more decision makers, party games, or tabletop tools? Try these companion pickers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <Link
                href="/animal-wheel"
                className="p-4 rounded-2xl bg-white dark:bg-[#181a2c] border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all group"
              >
                <div className="font-black text-sm text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Animal &amp; Pet Wheel
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Random wildlife generator for sketching, quizzes &amp; trivia.
                </p>
              </Link>

              <Link
                href="/team-generator"
                className="p-4 rounded-2xl bg-white dark:bg-[#181a2c] border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all group"
              >
                <div className="font-black text-sm text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Random Team Generator
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Split players into balanced squads for games and tournaments.
                </p>
              </Link>

              <Link
                href="/dice-roller"
                className="p-4 rounded-2xl bg-white dark:bg-[#181a2c] border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all group"
              >
                <div className="font-black text-sm text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  3D Dice Roller Hub
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  D&amp;D RPG dice roller with d4, d6, d8, d10, d12, and d20 dice.
                </p>
              </Link>

              <Link
                href="/drawing-wheel"
                className="p-4 rounded-2xl bg-white dark:bg-[#181a2c] border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all group"
              >
                <div className="font-black text-sm text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Drawing Prompt Wheel
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Creative art challenges, character design ideas &amp; sketches.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>

      {/* Global Footer */}
      <Footer />
    </div>
  </>
);
}
