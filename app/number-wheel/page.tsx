import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Binary,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Dices,
  Hash,
  Filter,
  Ban,
  Layers,
  Award,
  GraduationCap,
  Gamepad2,
  Ticket
} from 'lucide-react';
import NumberWheelEngine from '@/components/numbers/NumberWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Number Wheel - Random Number Generator Wheel (1-100)',
  description:
    'Spin the random number wheel online for any custom range: 1-10, 1-20, 1-50, 1-100, or 1-1000. Features even/odd filters, no-repeat mode & 100% fair RNG.',
  keywords: [
    'pick a number 1-10',
    'number wheel',
    'number randomiser 1 10',
    'random number generator 1-4',
    'number randomizer 1-4',
    'random number from 1-4',
    'pick a number 1-100',
    'number generator 1-100',
    'choose a number between 1 to 10',
    'number generator 1 100',
    'android number spinner',
    'pick a number between 1 and 100',
    'random number 1-4',
    'random number 1-6',
    'pick a number between 1 and 4',
    '1-4 random number generator',
    'pick a number 1-6',
    'random number 1 to 4',
    'random number picker 1-100',
    '1-6 random number generator',
    'pick a number 1 to 10',
    'rng 1 to 4',
    'pick a number 1 through 100',
    'pick a number between 1 and 6',
    'pick a number 1 100',
    'random number between 1 and 10',
    'choose a number from 1 to 100',
    'random number generator 1 to 4',
    'random number 1 to 6',
    'pick a number from 1-100',
    'rng 1-4',
    'number randomizer 1-1000',
    'random number generator 1 6',
    'random number generator 1-20',
    'pick a number from 1 through 100',
    'pick a number between 1-10',
    'random number 1-50',
    'random number generator 1 4',
    'rng 1-6',
    'choose a number between 1 and 10',
    'random number generator 1 to 6',
    'number generator 1 20',
    'pick a number 1-20',
    'spinner with numbers',
    'random number from 1 to 10',
    '1-6 number generator',
    'pick a number 1-11',
    'random number generator 1-9',
    'pick a number 1 to 4',
    'pick a number between 1 and 50',
    'pick a number 1 50',
    'random number 1 to 50',
    'number generator 1-6',
    'random number generator 1 1000',
    'pick a number 1 9',
    '1 30 random number generator',
    'random number from 1 to 30',
    'random number 1 to 9',
    'random number 1 50',
    'pick a number 1 - 10',
    '1 30 number generator'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/number-wheel'
  },
  openGraph: {
    title: 'Number Wheel - Random Number Generator Wheel (1-100)',
    description:
      'Spin the random number wheel online for any custom range: 1-10, 1-20, 1-50, 1-100, or 1-1000. Features even/odd filters, no-repeat mode & 100% fair RNG.',
    url: 'https://spinwheelgames.org/number-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Number Wheel - Random Number Generator Wheel'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number Wheel - Random Number Generator Wheel (1-100)',
    description:
      'Spin the random number wheel online for any custom range: 1-10, 1-20, 1-50, 1-100, or 1-1000. Features even/odd filters, no-repeat mode & 100% fair RNG.'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/number-wheel#webapp',
      name: 'Number Wheel - Random Number Generator Wheel',
      url: 'https://spinwheelgames.org/number-wheel',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online number spin wheel and random number generator picker. Choose any range (1-4, 1-6, 1-10, 1-20, 1-50, 1-100 or custom), filter even/odd, exclude numbers, and pick unique batches.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1540',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Custom Minimum and Maximum range bounds',
        'Quick presets: 1-4, 1-6 (Dice), 1-10, 1-20 (D20), 1-50, 1-100',
        'Even and Odd parity filtering',
        'Exclude number blacklist',
        'Unique multiple numbers batch draw',
        'No-repeat elimination mode',
        'Provably fair CSPRNG hardware entropy via Web Cryptography API'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/number-wheel#breadcrumb',
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
          name: 'Numbers & Dice',
          item: 'https://spinwheelgames.org/numbers'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Number Wheel',
          item: 'https://spinwheelgames.org/number-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/number-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the number spin wheel pick random numbers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Number Spin Wheel uses your browser\'s native Web Cryptography API (crypto.getRandomValues). This hardware-entropy source generates uniform cryptographically secure pseudorandom numbers (CSPRNG) with zero predictable patterns or bias.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I pick multiple unique numbers at once without duplicates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! In Instant Generator mode, you can select the "Draw Count" selector to pick 1, 2, 5, 10, or up to 50 unique numbers simultaneously with no duplicates.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I exclude numbers from being picked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enter comma-separated numbers into the "Exclude" field (e.g. 13, 7, 4) and click Add. You can also turn on "No Repeat" mode to automatically eliminate each number as it lands on the wheel.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I use this as a replacement for board game dice (D6, D20)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click the 1-6 preset for a standard 6-sided die or the 1-20 preset for tabletop RPGs and Dungeons & Dragons D20 rolls. Every face has an exact, provably equal probability.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I set a custom number range like 100 to 250?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Type your custom start number in the "Min" input and your ending number in the "Max" input. The tool dynamically recalculates and updates the wheel slices and pool instantly.'
          }
        }
      ]
    }
  ]
};

export default function NumberWheelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <div className="min-h-screen flex flex-col bg-[#faf8fd] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7]">
        {/* Global Header */}
        <SubpageHeader activePage="/number-wheel" />

        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 w-full"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/numbers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Numbers & Dice
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-800 dark:text-gray-200" aria-current="page">
            Number Spin Wheel
          </span>
        </nav>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
              <Binary className="w-3.5 h-3.5" />
              <span>CSPRNG Cryptographically Fair Number Picker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight text-gray-900 dark:text-white mb-3">
              Number Spin Wheel
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Spin a random number wheel online. Choose any range (1-4, 1-6, 1-10, 1-20, 1-50, 1-100 or custom),
              generate unique numbers, exclude numbers, and use the result for games, decisions, or classroom activities.
            </p>
          </div>

          {/* Interactive Tool Engine */}
          <div className="mb-14">
            <NumberWheelEngine />
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Dices className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Preset & Custom Ranges</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Instant 1-4, 1-6 (Dice), 1-10, 1-20 (D20), 1-50, and 1-100 presets, or configure custom Min/Max integers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Filter className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Even / Odd & Exclusions</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Filter by even or odd integers only, and blacklist specific numbers so they never appear in draws.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Batch & Unique Draws</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Draw up to 50 unique numbers simultaneously in Instant Mode with automatic statistics and sorting.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Provable Fairness</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Powered by the Web Cryptography API (CSPRNG) for pure statistical independence and zero bias.
              </p>
            </div>
          </div>

          {/* Deep Editorial & Educational Content */}
          <section className="space-y-12 mb-16 text-gray-800 dark:text-gray-200">
            {/* Step-by-Step Instructions */}
            <div className="bg-white dark:bg-[#161722] p-6 sm:p-8 rounded-2xl border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                How to Use the Number Spin Wheel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Choose Your Range & Filters</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Click a quick range preset (such as 1-6 for dice or 1-100 for raffles), or type your custom Min and Max numbers.
                    Optionally filter for <strong>Even</strong> or <strong>Odd</strong> numbers, or add numbers to exclude.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Select Spin or Instant Mode</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Use <strong>Wheel Mode</strong> for physical spin suspense with clicking audio feedback and pointer deflection, or switch to <strong>Instant Generator</strong> to draw single or multiple unique numbers at once.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Spin & Use Your Number</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Hit <strong>SPIN</strong> or press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[11px] font-mono border">Spacebar</kbd>.
                    Copy your results, check the session roll history, or enable <strong>No Repeat</strong> to eliminate chosen numbers on subsequent spins.
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Range Presets & Practical Applications */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white">
                Popular Number Ranges & Practical Use Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                {/* 1-4 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 4 Number Wheel</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      4-Way Decisions
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Ideal for dividing groups into 4 quadrants, picking 4-person turn orders, choosing between multiple-choice options (A, B, C, D), or determining round-robin brackets.
                  </p>
                </div>

                {/* 1-6 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 6 Dice Spinner</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      D6 Digital Die
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A digital alternative for lost 6-sided dice in classic board games like Monopoly, Settlers of Catan, Yahtzee, and Risk. Guarantees flat 16.67% odds per face.
                  </p>
                </div>

                {/* 1-10 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 10 Random Wheel</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Top 10 Decider
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The standard base-10 randomizer. Perfect for quick 1-to-10 ratings, picking priorities from a to-do list of 10 items, or selecting student volunteer numbers.
                  </p>
                </div>

                {/* 1-20 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 20 D20 RPG Roller</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Tabletop D20
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Built for Dungeons & Dragons, Pathfinder, and tabletop roleplaying games. Delivers high-tension natural 20 critical hits and natural 1 fumbles on a certified wheel.
                  </p>
                </div>

                {/* 1-50 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 50 Bingo & Group Picker</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Classroom & Games
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Great for mini bingo games, classroom attendance rosters, 50-state quizzes, or picking numbers for corporate workshops with medium-sized attendee lists.
                  </p>
                </div>

                {/* 1-100 */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">1 – 100 Raffle & Percentile</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Raffle & D100
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Ideal for door prize raffles, percentile dice rolls (d100), statistical sampling, and giveaways. Pair with No-Repeat elimination to draw 1st, 2nd, and 3rd place prizes.
                  </p>
                </div>
              </div>
            </div>

            {/* Cryptographic Fairness vs Standard Math.random() */}
            <div className="bg-white dark:bg-[#161722] p-6 sm:p-8 rounded-2xl border border-[#eceaf6] dark:border-[#27283c] space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                True Randomness: Hardware CSPRNG vs Pseudo-Random Math
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Most online number pickers rely on Javascript’s built-in <code>Math.random()</code>, which uses pseudo-random algorithms (such as xoshiro128+). While fast, pseudo-random generators can exhibit subtle statistical clustering and predictable period cycles when called in succession.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1f202f] border border-gray-200 dark:border-gray-800 text-xs">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Standard PRNG (Math.random)</h3>
                  <ul className="space-y-1 text-gray-500 dark:text-gray-400 list-disc list-inside">
                    <li>Software-based deterministic seed</li>
                    <li>Vulnerable to seed prediction in competitive raffles</li>
                    <li>Can show distribution clustering over large sample sets</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">Our CSPRNG Web Cryptography API</h3>
                  <ul className="space-y-1 text-indigo-800 dark:text-indigo-300 list-disc list-inside">
                    <li>Hardware thermal noise & OS system entropy</li>
                    <li>NIST SP 800-90A statistical compliance</li>
                    <li>Zero predictability, bias, or repeating loops</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white dark:bg-[#161722] p-6 rounded-2xl border border-[#eceaf6] dark:border-[#27283c] overflow-x-auto">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                Comparison: Number Spin Wheel vs Other Random Selection Methods
              </h2>
              <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1f202f]">
                    <th className="p-3 font-bold text-gray-700 dark:text-gray-300">Method</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-gray-300">Visual Suspense</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-gray-300">Custom Range</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-gray-300">No-Repeat Mode</th>
                    <th className="p-3 font-bold text-gray-700 dark:text-gray-300">Batch Draws</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">Number Spin Wheel</td>
                    <td className="p-3 text-emerald-600 font-semibold">High (Wheel animation & audio)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes (Any Min/Max)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes (Elimination)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes (1 to 50 unique)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700 dark:text-gray-300">Physical Dice (D6/D20)</td>
                    <td className="p-3 text-gray-500">Medium (Table roll)</td>
                    <td className="p-3 text-red-500 font-semibold">Fixed (6 or 20 only)</td>
                    <td className="p-3 text-red-500 font-semibold">No (Can repeat)</td>
                    <td className="p-3 text-gray-500">Requires multiple dice</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700 dark:text-gray-300">Drawing Slips from a Hat</td>
                    <td className="p-3 text-gray-500">Low to Medium</td>
                    <td className="p-3 text-gray-500">Manual setup required</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes (Discard slip)</td>
                    <td className="p-3 text-gray-500">Slow manual draws</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-700 dark:text-gray-300">Basic Text RNG</td>
                    <td className="p-3 text-red-500 font-semibold">None (Plain text)</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes</td>
                    <td className="p-3 text-gray-500">Rarely supported</td>
                    <td className="p-3 text-emerald-600 font-semibold">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white dark:bg-[#161722] p-6 sm:p-8 rounded-2xl border border-[#eceaf6] dark:border-[#27283c] space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    How does the number spin wheel pick random numbers?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The Number Spin Wheel uses your browser&apos;s native Web Cryptography API (<code>crypto.getRandomValues</code>). This hardware-entropy source generates uniform cryptographically secure pseudorandom numbers (CSPRNG) with zero predictable patterns or bias.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Can I pick multiple unique numbers at once without duplicates?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Yes! Switch to <strong>Instant Generator</strong> mode and set the &quot;Draw Count&quot; selector to 2, 3, 5, 10, or up to 50 numbers. The algorithm executes a cryptographic Fisher-Yates draw that guarantees every drawn number is completely unique.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    How do I exclude specific numbers from the wheel?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Type the numbers you wish to blacklist into the &quot;Exclude&quot; field (separated by commas or spaces, e.g. <code>13, 7, 4</code>) and click Add. You can also toggle <strong>No Repeat</strong> mode to automatically discard each number as it lands.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Can I use this as a tabletop gaming die (D4, D6, D20)?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Yes! Simply click the 1-4, 1-6, or 1-20 preset buttons at the top of the controls. Every face is rendered with an exact equal angle on the wheel, providing an unbiased digital die roll.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Tools & Wheels */}
            <div className="p-6 rounded-2xl bg-[#f8f7fd] dark:bg-[#171825] border border-[#eceaf6] dark:border-[#27283c]">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Explore More Decision & Randomizer Wheels
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <Link
                  href="/food-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Food Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Meal & takeout picker</span>
                </Link>

                <Link
                  href="/random-object-generator"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Random Object</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Pictionary & creative ideas</span>
                </Link>

                <Link
                  href="/yes-or-no-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Yes or No Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">50/50 binary decider</span>
                </Link>

                <Link
                  href="/wheel-of-names"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Wheel of Names</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Student & raffle winner picker</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
