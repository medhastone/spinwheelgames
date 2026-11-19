import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Shield,
  Zap,
  HelpCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Clock,
  Shuffle,
  Volume2,
  Share2,
  Award,
  AlertCircle
} from 'lucide-react';
import TruthOrDareWheelEngine from '@/components/truthOrDare/TruthOrDareWheelEngine';
import PresetLaunchButton from '@/components/truthOrDare/PresetLaunchButton';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import RelatedWheelsSection from '@/components/RelatedWheelsSection';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Truth or Dare Wheel & Generator | SpinWheelGames",
  "description": "Spin the free Truth or Dare wheel & generator for parties, sleepovers, and game nights. Features clean family, friends, and party modes, two-stage spin, difficulty ratings, and timer.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/truth-or-dare-wheel"
  },
  "openGraph": {
    "title": "Truth or Dare Wheel & Generator | SpinWheelGames",
    "description": "Spin the free Truth or Dare wheel & generator for parties, sleepovers, and game nights. Features clean family, friends, and party modes, two-stage spin, difficulty ratings, and timer.",
    "url": "https://spinwheelgames.org/truth-or-dare-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Ftruth-or-dare-wheel&title=Truth+or+Dare+Wheel+%26+Generator+%7C+SpinWheelGames&desc=Spin+the+free+Truth+or+Dare+wheel+%26+generator+for+parties%2C+sleepovers%2C+and+game+nights.+Features+clean+family%2C+friends%2C+and+party+modes%2C+two-stage+spin%2C+difficulty+ratings%2C+and+tim",
        "width": 1200,
        "height": 630,
        "alt": "Truth or Dare Wheel & Generator | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Truth or Dare Wheel & Generator | SpinWheelGames",
    "description": "Spin the free Truth or Dare wheel & generator for parties, sleepovers, and game nights. Features clean family, friends, and party modes, two-stage spin, difficulty ratings, and timer.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Ftruth-or-dare-wheel&title=Truth+or+Dare+Wheel+%26+Generator+%7C+SpinWheelGames&desc=Spin+the+free+Truth+or+Dare+wheel+%26+generator+for+parties%2C+sleepovers%2C+and+game+nights.+Features+clean+family%2C+friends%2C+and+party+modes%2C+two-stage+spin%2C+difficulty+ratings%2C+and+tim"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/truth-or-dare-wheel#webapp',
      name: 'Truth or Dare Wheel & Generator',
      url: 'https://spinwheelgames.org/truth-or-dare-wheel',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and HTML5 canvas support',
      description:
        'Interactive Truth or Dare wheel and prompt generator with two-stage fate selection, clean family presets, friend banter, spicy party night modes, difficulty ratings, countdown timer, and no-repeat guarantees.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '1840',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Two-Stage Spin Engine: First decide Fate (Truth vs Dare), then spin the prompt',
        'Dedicated Truth Generator & Dare Generator standalone modes',
        '3 Audience Presets: Clean Family, Friends/Banter, and Party Night',
        '3 Difficulty Levels: Mild Icebreakers, Medium Revelations, Extreme Challenges',
        'Interactive Countdown Timer (30s, 45s, 60s, 90s) with ticking and buzzer audio',
        'Done (+1), Pass (Token Shield), and Hilarious Forfeit Penalty Drawer',
        'CSPRNG hardware-grade cryptographic randomness and No-Repeat guarantee'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
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
          name: 'Party Games',
          item: 'https://spinwheelgames.org/games'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Truth or Dare Wheel',
          item: 'https://spinwheelgames.org/truth-or-dare-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Truth or Dare generator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The generator uses a two-stage cryptographic algorithm. First, the Fate Wheel decides whether the player faces a Truth or a Dare. Next, the Prompt Wheel selects a vetted challenge matched precisely to your active audience preset (Clean, Friends, or Party) and chosen difficulty tier.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I spin pure Truths or pure Dares without the other?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Toggle the Game Mode selector to "Truth Only" to use the tool as a dedicated Truth Generator, or "Dare Only" to use it as a dedicated Dare Generator. Both single-spin wheels and instant Quick Draw modes are supported.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the Truth or Dare wheel safe for families and kids?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Switch the audience preset to "Clean / Family" mode. All questions in this mode are vetted for classroom, family dinner, and all-ages sleepover safety—featuring silly animal impressions, wholesome habits, and lighthearted laughs without inappropriate content.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat mode prevent duplicate questions during a party?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat is enabled, every challenge that is selected and completed is temporarily retired from the active pool. The wheel dynamically repopulates with unused prompts so your party never hears the same question twice in one evening.'
          }
        },
        {
          '@type': 'Question',
          name: 'What happens when a player passes or chickens out?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Players can use a Pass token (each player starts with a limited shield pool) or trigger a Forfeit. Clicking Forfeit instantly draws a hilarious, harmless penalty from our built-in punishment database—such as talking like a robot or performing 20 jumping jacks shouting "I chickened out!"'
          }
        }
      ]
    }
  ]
};

export default function TruthOrDareWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfe] dark:bg-[#0f1017] text-[#1f2029] dark:text-[#e4e1ed] transition-colors w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Global Header */}
      <SubpageHeader activePage="/truth-or-dare-wheel" />

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-16 flex-1 w-full max-w-full overflow-x-clip">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/games" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Party Games
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
              Truth or Dare Wheel
            </span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="mb-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Flame className="w-3.5 h-3.5" />
            <span>Truth or Dare Wheel • Truth Generator • Dare Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Truth or Dare Wheel & Generator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ignite your next game night, sleepover, or party. Spin the two-stage <strong>truth or dare wheel</strong> to decide fate, filter by Clean Family, Friends, or Spicy Party modes, and conquer real-time timed challenges with forfeit penalties.
          </p>

          {/* QUICK PRESET LAUNCH BAR */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <PresetLaunchButton
              gameMode="two-stage"
              audience="friends"
              difficulty="all"
              label="Two-Stage Fate Spin"
              emoji="🎲"
            />
            <PresetLaunchButton
              gameMode="truth-only"
              audience="friends"
              difficulty="medium"
              label="Truth Generator"
              emoji="💬"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            />
            <PresetLaunchButton
              gameMode="dare-only"
              audience="party"
              difficulty="extreme"
              label="Dare Generator"
              emoji="🔥"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            />
            <PresetLaunchButton
              gameMode="mixed"
              audience="clean"
              difficulty="mild"
              label="Clean Family Mode"
              emoji="🌟"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            />
          </div>
        </section>

        {/* INTERACTIVE TRUTH OR DARE WHEEL ENGINE */}
        <section className="max-w-6xl mx-auto px-1 sm:px-4 mb-16">
          <TruthOrDareWheelEngine />
        </section>

        {/* COMPACT & AUTHORITATIVE CONTENT GUIDES */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* SECTION 1: HOW TO PLAY TRUTH OR DARE (OFFICIAL HOUSE RULES) */}
          <section className="space-y-4 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-rose-500" />
                How to Play: Official Party Rules & Modern Formats
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton gameMode="two-stage" audience="friends" label="Play Circle Mode" emoji="⭕" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Truth or Dare has been the undisputed champion of party games for over three centuries, evolving from the 1714 parlor game <em>Questions and Commands</em> into today’s viral social favorite. While the premise is effortless—either answer a probing question truthfully or execute an entertaining dare—establishing crystal-clear house rules before the first spin prevents awkward stalemates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  1. The Classic Circle Format
                </span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Players gather in a circle, facing inward. The device is placed in the center or passed clockwise. On their turn, the active player spins the Fate Wheel. Once fate dictates Truth or Dare, the prompt wheel selects their specific challenge.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  2. The 3-Pass Shield Rule
                </span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  To protect personal dignity without derailing momentum, grant every player exactly <strong>2 or 3 Pass Tokens</strong> for the entire evening. If a challenge crosses an uncomfortable line, they spend one shield with zero penalty.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  3. The Forfeit Punishment
                </span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  If a player refuses a challenge and has exhausted their Pass Tokens, they must take a <strong>Forfeit</strong>. Clicking the Forfeit button triggers an instant, hilarious penalty from our database (e.g. 20 frog jumps or wearing socks as gloves).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  4. The 60-Second Pressure Clock
                </span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Every challenge card includes an interactive countdown timer. Set to 30, 45, or 60 seconds, it stops overthinking, eliminates dead air, and turns dares into exhilarating, race-against-the-buzzer spectacles.
                </p>
              </div>
            </div>

            {/* Respect and Boundaries Box */}
            <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 space-y-1">
                <strong>The "Red Line / Safe Word" Golden Rule:</strong> Good party games create laughter, not anxiety. A dare must never risk physical safety, property destruction, or legal trouble. If anyone uses the agreed safe word, the challenge is immediately discarded with unanimous respect.
              </div>
            </div>
          </section>

          {/* SECTION 2: HOW THE GENERATOR WORKS (UNDER THE HOOD) */}
          <section className="space-y-4 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-indigo-500" />
                How the Truth or Dare Generator Works (Under the Hood)
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton gameMode="truth-only" label="Launch Truth Mode" emoji="⚡" />
                <PresetLaunchButton gameMode="dare-only" label="Launch Dare Mode" emoji="🎯" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Traditional paper slips or generic lists quickly suffer from repetitive prompts and awkward silences. Our generator runs on an entropy-driven state machine engineered specifically for social group dynamics:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Shuffle className="w-4 h-4" />
                  <span>Two-Stage Entropy</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Stage 1 uses a balanced 8-sector wheel with alternating 50/50 probability to break decision bias. Stage 2 dynamically constructs a slice matrix using only prompts matching the selected fate and audience filter.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>CSPRNG Hardware Fairness</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Instead of pseudo-random algorithms that cluster outcomes, all spins pull random values directly from browser <code className="text-xs px-1 py-0.5 rounded bg-gray-200 dark:bg-slate-800">crypto.getRandomValues</code>, delivering mathematically uniform probability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/70 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Zero-Repeat State Pool</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  When No-Repeat mode is active, chosen items are dynamically quarantined into a session registry. The generator transparently redraws without repeats until the entire curated database is completed.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: AUDIENCE MODES & DIFFICULTY TIERS */}
          <section className="space-y-4 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-500" />
              Audience Modes & Difficulty Tiers: Tailored to Your Vibe
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              One size never fits all in party games. Asking spicy dating questions at a Thanksgiving family dinner or mild cartoon questions at a college bash kills the mood instantly. Our database is strictly partitioned across three audience settings and three difficulty ratings:
            </p>

            <div className="space-y-4 pt-2">
              {/* Audience 1: Clean Family */}
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <span>🌟 Clean / Family Mode (All-Ages Safe)</span>
                  </span>
                  <PresetLaunchButton audience="clean" difficulty="all" label="Launch Family Mode" emoji="👪" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  100% wholesome, school-safe, and parent-friendly. Prompts focus on funny habits, childhood memories, dramatic voice impressions, and silly physical comedy without awkwardness or sensitive topics.
                </p>
                <div className="text-xs text-emerald-700 dark:text-emerald-300 italic">
                  Examples: "Speak in a Shakespearean accent for 2 rounds", "What is the weirdest food combination you secretly love?"
                </div>
              </div>

              {/* Audience 2: Friends */}
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span>👥 Friends Mode (Sleepovers, Road Trips & Hangouts)</span>
                  </span>
                  <PresetLaunchButton audience="friends" difficulty="all" label="Launch Friends Mode" emoji="🍕" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  The ideal sweet spot for close social circles. Packed with lighthearted secrets, phone pranks, petty confession banter, and room challenges that reveal unexpected sides of people you thought you knew inside out.
                </p>
                <div className="text-xs text-blue-700 dark:text-blue-300 italic">
                  Examples: "Send a voice note singing Happy Birthday to the last person you texted", "Who here would survive a zombie apocalypse longest?"
                </div>
              </div>

              {/* Audience 3: Party Night */}
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <span>🔥 Party / College Night (High-Voltage Energy)</span>
                  </span>
                  <PresetLaunchButton audience="party" difficulty="extreme" label="Launch Party Night" emoji="🎉" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Designed for college parties, bachelor/bachelorette gatherings, and late-night adult hangouts. High-stakes confessions, cheeky dating revelations, social media dare posts, and spicy challenges.
                </p>
                <div className="text-xs text-rose-700 dark:text-rose-300 italic">
                  Examples: "Let the group compose a random 5-word comment on a mutual friend’s newest post", "What was your worst dating disaster?"
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
          <section className="space-y-6 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-500" />
              Frequently Asked Questions About Truth or Dare Wheels
            </h2>

            <div className="divide-y divide-gray-200 dark:divide-gray-800 space-y-4">
              <div className="pt-4 first:pt-0 space-y-2">
                <h3 className="text-base font-bold text-gray-950 dark:text-white">
                  What makes a two-stage spin better than a single-wheel spin?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  In casual play, players often stall or negotiate when picking between Truth or Dare. The two-stage wheel eliminates hesitation by letting the Fate Wheel decide Truth vs Dare first, building maximum suspense before immediately spinning the targeted prompt.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <h3 className="text-base font-bold text-gray-950 dark:text-white">
                  Can we add our own inside jokes or custom dares?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Yes! Click the <strong>Add Custom Truth or Dare</strong> button on the wheel panel. Custom entries are tagged and seamlessly injected into the active wheel pool alongside our curated database.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <h3 className="text-base font-bold text-gray-950 dark:text-white">
                  What if our group wants to play fast without waiting for the wheel animation?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Use the <strong>Quick Draw (Instant Mode)</strong> button. It uses the exact same CSPRNG randomness and difficulty filters to pull an instant challenge card with zero animation wait time—ideal for rapid phone passing.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <h3 className="text-base font-bold text-gray-950 dark:text-white">
                  Does this tool work completely offline or on mobile devices?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Yes. The entire database, Web Audio synthesizer, and canvas animation run directly inside your client browser. You can play on a camping trip, beach party, or road trip with zero internet connection.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: RELATED WHEELS */}
          <RelatedWheelsSection
            maxWidthClass="max-w-4xl px-0 sm:px-0 lg:px-0"
            title="Related Wheels"
            subtitle="Keep game night rolling with closely related party, movie, and dinner spinners."
            wheels={[
              {
                name: 'Never Have I Ever Wheel',
                href: '/never-have-i-ever-wheel',
                anchorText: 'Spin the Never Have I Ever Wheel for group confessions',
                description: 'Switch up the energy with clean family, friends, or party confession prompts.',
                tag: 'Party Game'
              },
              {
                name: 'Icebreakers Wheel',
                href: '/icebreakers',
                anchorText: 'Try the Icebreakers Wheel to warm up new groups',
                description: 'Start the night with low-pressure conversation prompts before diving into dares.',
                tag: 'Social'
              },
              {
                name: 'Movie Wheel',
                href: '/movie-wheel',
                anchorText: 'Use the Movie Wheel to pick a late-night watch',
                description: 'End the sleepover or hangout by spinning genres and your custom watchlist.',
                tag: 'Entertainment'
              },
              {
                name: 'Food Wheel',
                href: '/food-wheel',
                anchorText: 'Spin the Food Wheel to settle party snacks & takeout',
                description: 'Stop debating pizza vs tacos—let cryptographic randomness pick the food order.',
                tag: 'Food & Drink'
              }
            ]}
            guides={[
              { label: 'How to Use a Spin Wheel for Party & Group Nights', href: '/how-to-use-a-wheel', readingTime: '5 min' },
              { label: 'How Random Wheels Guarantee Fair Spins', href: '/how-random-wheels-work', readingTime: '6 min' }
            ]}
          />
        </article>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
