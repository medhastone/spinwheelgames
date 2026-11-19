import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Gamepad2,
  Sparkles,
  Boxes,
  Layers,
  Users,
  Compass,
  GraduationCap,
  Zap,
  HelpCircle,
  CheckCircle2,
  Dice5,
  Dices,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  ListPlus,
  Lock,
  Award
} from 'lucide-react';
import RandomGameEngine from '@/components/games/RandomGameEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import RelatedWheelsSection from '@/components/RelatedWheelsSection';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Random Game Picker & Spinner Wheel | SpinWheelGames",
  "description": "Spin the random game generator wheel to choose what to play! Features custom game lists, Party games, Board games, Card games, Two-Player duels, Group energizers, and 5-minute quick games.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/random-game-picker"
  },
  "openGraph": {
    "title": "Random Game Picker & Spinner Wheel | SpinWheelGames",
    "description": "Spin the random game generator wheel to choose what to play! Features custom game lists, Party games, Board games, Card games, Two-Player duels, Group energizers, and 5-minute quick games.",
    "url": "https://spinwheelgames.org/random-game-picker",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Frandom-game-picker&title=Random+Game+Picker+%26+Spinner+Wheel+%7C+SpinWheelGames&desc=Spin+the+random+game+generator+wheel+to+choose+what+to+play%21+Features+custom+game+lists%2C+Party+games%2C+Board+games%2C+Card+games%2C+Two-Player+duels%2C+Group+energizers%2C+and+5-minute+quic",
        "width": 1200,
        "height": 630,
        "alt": "Random Game Picker & Spinner Wheel | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Random Game Picker & Spinner Wheel | SpinWheelGames",
    "description": "Spin the random game generator wheel to choose what to play! Features custom game lists, Party games, Board games, Card games, Two-Player duels, Group energizers, and 5-minute quick games.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Frandom-game-picker&title=Random+Game+Picker+%26+Spinner+Wheel+%7C+SpinWheelGames&desc=Spin+the+random+game+generator+wheel+to+choose+what+to+play%21+Features+custom+game+lists%2C+Party+games%2C+Board+games%2C+Card+games%2C+Two-Player+duels%2C+Group+energizers%2C+and+5-minute+quic"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/random-game-picker#webapp',
      name: 'Random Game Picker & Generator Wheel',
      url: 'https://spinwheelgames.org/random-game-picker',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Random game generator and decision wheel for game nights. Spin to choose party games, tabletop board games, card games, 2-player duels, custom game lists, and quick games.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1240',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Custom Games List Manager: Add individual games or bulk paste your personal board game shelf',
        '7 Curated Game Categories: Party, Board, Card, Two-Player, Group, Classroom, Quick',
        'Detailed game summaries, rules overviews, player counts, and setup tips',
        'No-repeat elimination mode so you never replay duplicate titles',
        'Hardware CSPRNG unbiased random wheel physics and audio fanfare'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/random-game-picker#breadcrumb',
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
          name: 'Games',
          item: 'https://spinwheelgames.org/games'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random Game Picker',
          item: 'https://spinwheelgames.org/random-game-picker'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/random-game-picker#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I add my own custom games list to the wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click the [Custom List] category tab on the tool. You can add games one by one or click [Bulk Paste List] to copy-paste your entire personal board game shelf, Steam backlog, or party roster at once.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the Random Game Picker solve game night analysis paralysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Deciding what to play among friends often takes 30+ minutes of debates and indecision. The Random Game Picker filters by your group\'s current vibe or custom list and spins an unbiased choice with complete rules and player guidelines ready on screen.'
          }
        },
        {
          '@type': 'Question',
          name: 'What game categories are featured on the wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The picker features 7 distinct pre-set categories: Party games (Charades, Codenames, Mafia), Board games (Catan, Ticket to Ride, Wingspan), Card games (Exploding Kittens, The Mind, Sushi Go!), Two-Player games (7 Wonders Duel, Patchwork, Hive), Group games (Wavelength, Just One, Secret Hitler), Classroom energizers (Trivia Bowl, Four Corners, Silent Ball), Quick 5-minute games, plus Custom Lists.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat mode work on the Game Picker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Activating No-Repeat mode automatically removes previously selected games from the wheel slices for subsequent spins. This is ideal for organizing game night marathons where you want to cycle through multiple unique activities without repeating.'
          }
        }
      ]
    }
  ]
};

export default function RandomGamePickerPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/random-game-picker" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12">
        {/* Top Header & Interactive Wheel Section */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Wheel Games', href: '/games' },
              { label: 'Random Game Picker' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Game Night Decision Maker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Random Game Picker Wheel
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Can&apos;t agree on what to play? Filter by Party, Board, Card, Two-Player, Group, Classroom, or add your own <strong>Custom Games List</strong> to spin!
            </p>
          </div>

          {/* Interactive Random Game Engine */}
          <div id="tool-interactive">
            <RandomGameEngine />
          </div>
        </section>

        {/* COMPACT BOX 1: Provable Fairness & Privacy Bar (Matching Home Page Style) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Client-Side CSPRNG Randomness (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>100% Unbiased Decision Physics</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Zero Account Required • Local Browser Memory</span>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 2: 4 Category Showcase Cards (Home-Style Compact Cards Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Wheel Features
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Explore Game Night Modes &amp; Features
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Switch categories or add your own custom game collection in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Custom Games List */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <ListPlus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Custom List
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Add Your Own Games
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Bulk-paste or add your personal board game closet titles, Steam backlog, or custom household games to spin!
                </p>
              </div>
            </div>

            {/* Card 2: Party & Group */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Party &amp; Group
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Party Icebreakers
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Charades, Codenames, Mafia, and Wavelength to bring high energy and laughter to any room.
                </p>
              </div>
            </div>

            {/* Card 3: Board & Strategy */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Board &amp; Cards
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Board &amp; Card Classics
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Catan, Ticket to Ride, Wingspan, Exploding Kittens, and Sushi Go! for rich strategy sessions.
                </p>
              </div>
            </div>

            {/* Card 4: 2-Player & Quick Sprints */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Duels &amp; Sprints
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  2-Player &amp; Quick 5m
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  7 Wonders Duel, Patchwork, 5 Second Rule, and RPS tournaments for fast 2-player or micro games.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 3: Deep Strategic Guide (Home-Style 2-Column Compact Layout) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Decision Science &amp; Game Night Strategy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white tracking-tight">
                Solving Game Night Indecision with Structured Randomness
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-slate-300 leading-relaxed">
                Every gaming group has experienced the dreaded 40-minute standoff: staring at shelves of board games or debating party options while snacks get cold. The Random Game Picker eliminates decision fatigue in three easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1. Calibrate Group Vibe</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Select Party for high-energy mingling, Board Games for tactical strategy, or Custom List to spin your actual board game closet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>2. Instant Rules Summary</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Every result provides setup tips, player counts, estimated playtime, and concise gameplay primers so new players learn instantly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>3. No-Repeat Marathons</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Turn on No-Repeat mode to draw and eliminate game titles one by one, creating a seamless, varied lineup throughout long sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 4: Frequently Asked Questions (Home-Style Compact Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Random Game Picker FAQs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  How do I add my own custom games list to the wheel?
                </h3>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Click the [Custom List] category tab on the tool. You can add games one by one or click [Bulk Paste List] to copy-paste your entire personal board game shelf, Steam backlog, or party roster at once.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  How does the Random Game Picker choose a game?
                </h3>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  It uses cryptographic client-side randomness (crypto.getRandomValues) to calculate equal slice probabilities based on your active category filter, then animates a wheel spin with realistic easing and audio feedback.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  Can I pick games specifically for two players?
                </h3>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Yes! Click the [2-Player] category pill to load games like 7 Wonders Duel, Patchwork, Hive, Jaipur, and Battleship engineered specifically for pairs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  How do I share the winning game recommendation?
                </h3>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Click [Copy Rules] on the result card to copy the game name, player count, playtime, and quick instructions to your clipboard to paste into your Discord or group chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Wheels Section */}
        <RelatedWheelsSection
          title="Related Gaming & Game Night Wheels"
          subtitle="Draft balanced squads, pick board games, and launch party mini-games in one spin."
          wheels={[
            {
              name: 'Team Picker Wheel',
              href: '/team-picker',
              anchorText: 'Use the Team Picker Wheel for esports & FIFA drafts',
              description: 'Run live draft order lotteries or assign random clubs and team captains.',
              tag: 'Drafts'
            },
            {
              name: 'Movie Wheel',
              href: '/movie-wheel',
              anchorText: 'Try the Movie Wheel when game night switches to movies',
              description: 'Pick tonight’s sci-fi, comedy, or thriller by genre or custom watchlist.',
              tag: 'Movies'
            },
            {
              name: 'Truth or Dare Wheel',
              href: '/truth-or-dare-wheel',
              anchorText: 'Play the Truth or Dare Wheel between gaming rounds',
              description: 'Clean and spicy prompts for Discord hangouts and living-room game nights.',
              tag: 'Party'
            },
            {
              name: 'Dice Roller',
              href: '/dice-roller',
              anchorText: 'Roll 3D RPG Dice for tabletop & board games',
              description: 'Physics-powered D4, D6, D8, D10, D12, and D20 polyhedral dice.',
              tag: 'Tabletop'
            }
          ]}
          guides={[
            { label: 'How Random Wheels Work', href: '/how-random-wheels-work', readingTime: '6 min' }
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
