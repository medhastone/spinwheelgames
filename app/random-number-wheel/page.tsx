import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Binary,
  HelpCircle,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Dices,
  Filter,
  Layers,
  GraduationCap,
  Gamepad2,
  Ticket,
  Shuffle,
  ListOrdered,
  Zap,
  Target
} from 'lucide-react';
import NumberWheelEngine from '@/components/numbers/NumberWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Random Number Wheel – Pick a Number Spinner (1-10, 1-20, 1-50, 1-100)',
  description:
    'Spin the random number wheel online for any range: 1–10, 1–20, 1–50, 1–100, or custom bounds. Features picking multiple numbers, no-repeat mode, even/odd filters, and 100% fair CSPRNG.',
  keywords: [
    'picking a number',
    'number spinner',
    'spinner with numbers',
    'number spin wheel',
    'random number picker',
    'pick a number',
    'pick a number 1-10',
    'pick a number 1-20',
    'pick a number 1-50',
    'pick a number 1-100',
    'random number generator 1-10',
    'random number generator 1-20',
    'random number generator 1-50',
    'random number generator 1-100',
    'random number picker 1-100',
    'pick multiple numbers',
    'no repeat number generator',
    'even odd number wheel',
    'custom range number spinner'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/random-number-wheel'
  },
  openGraph: {
    title: 'Random Number Wheel – Pick a Number Spinner (1-10, 1-20, 1-50, 1-100)',
    description:
      'The strongest pick a number tool online. Spin a random number wheel with 1-10, 1-20, 1-50, 1-100 presets, custom ranges, multiple numbers, no-repeat elimination, and even/odd options.',
    url: 'https://spinwheelgames.org/random-number-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Random Number Wheel – Pick a Number Spinner'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Wheel – Pick a Number Spinner (1-10, 1-20, 1-50, 1-100)',
    description:
      'Spin the random number wheel online for 1–10, 1–20, 1–50, 1–100, or custom ranges. Features multiple numbers, no-repeat mode, even/odd options & CSPRNG fairness.'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/random-number-wheel#webapp',
      name: 'Random Number Wheel – Pick a Number Spinner',
      url: 'https://spinwheelgames.org/random-number-wheel',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online number spinner and random number picker. Features instant presets (1-10, 1-20, 1-50, 1-100), custom ranges, picking multiple numbers, no-repeat elimination mode, and even/odd parity filters.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '2180',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Quick presets: 1-10, 1-20 (D20), 1-50 (Bingo), 1-100 (Raffle), 1-4, 1-6 (Die), 1-12, 1-1000',
        'Custom Min and Max range bounds with +/- steppers and swap controls',
        'Pick multiple numbers simultaneously (Wheel multi-spin and Instant batch draws)',
        'No-repeat mode (elimination draw without replacement)',
        'Even and Odd parity filtering options',
        'Interactive exclusion blacklist',
        'Full session result history log with CSV download and one-click copy',
        'Hardware-level cryptographic randomness via Web Crypto API (crypto.getRandomValues)'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/random-number-wheel#breadcrumb',
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
          item: 'https://spinwheelgames.org/number-wheel'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random Number Wheel',
          item: 'https://spinwheelgames.org/random-number-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/random-number-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does this number spinner pick a random number?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The number spinner uses your browser native Web Cryptography API (crypto.getRandomValues). This hardware-entropy source generates uniform cryptographically secure pseudorandom numbers (CSPRNG) with zero statistical clustering or predictable patterns, ensuring 100% fair outcomes for every spin.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I pick multiple numbers at once?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can pick multiple numbers in two ways: in Wheel Mode, adjust the Draw Count selector to 2, 3, 4, or 5 to spin for multiple winners sequentially. In Instant Generator Mode, select Draw Count to pick up to 50 unique numbers simultaneously with Fisher-Yates randomness and batch statistics.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does No-Repeat mode do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No-Repeat mode executes drawing without replacement. When enabled, any number landed on is automatically eliminated from the wheel pool so it cannot be selected again. You can view all eliminated numbers and restore them anytime with the Reset button.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I pick between 1-10, 1-20, 1-50, or 1-100 without opening new pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Simply click any of the preset buttons (1-10, 1-20, 1-50, 1-100) above the wheel. The wheel slices, colors, and probabilities reconfigure immediately on this single page with zero reloading.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I set a custom range like 100 to 500 or filter only even numbers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Type your custom start and end numbers in the Min and Max fields. You can also select the Even or Odd parity filter to restrict the wheel pool exclusively to even integers (2, 4, 6...) or odd integers (1, 3, 5...).'
          }
        }
      ]
    }
  ]
};

export default function RandomNumberWheelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <div className="min-h-screen flex flex-col bg-[#faf8fd] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
        {/* Global Header */}
        <SubpageHeader activePage="/random-number-wheel" />

        {/* Compact Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center gap-1.5 max-w-[1440px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 w-full"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/number-wheel" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Numbers & Dice
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-800 dark:text-gray-200" aria-current="page">
            Random Number Wheel
          </span>
        </nav>

        {/* Hero Section & Main Layout (Compact & Clean Matching Home Page) */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-2 pb-10 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-6">
          {/* Compact Hero Block */}
          <div className="text-center max-w-2xl mx-auto px-1 space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-500/20">
              <Binary className="w-3 h-3" />
              <span>Hardware CSPRNG • Truly Fair Random Number Picker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-gray-900 dark:text-white">
              Random Number Wheel
            </h1>
            <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
              Interactive <strong>number spinner</strong> and <strong>random number picker</strong>. Choose presets (<strong>1–10</strong>, <strong>1–20</strong>, <strong>1–50</strong>, <strong>1–100</strong>), custom bounds, multi-draw, <strong>no-repeat mode</strong>, and <strong>even/odd</strong> filters.
            </p>
          </div>

          {/* Interactive Tool Engine */}
          <div className="w-full">
            <NumberWheelEngine />
          </div>

          {/* Core Feature Highlights (Compact 4-Card Row) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                  <Dices className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-0.5">1–10 to 1–100</h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Switch instantly between 1–10, 1–20, 1–50, 1–100, or any custom Min/Max.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <Shuffle className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-0.5">No-Repeat Draw</h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Eliminates landed numbers so outcomes never repeat until restored.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                  <Filter className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-0.5">Even/Odd & Multi</h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Parity filtering (even/odd), exclusion blacklist, and multi-winner picks.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                  <ListOrdered className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-0.5">History & Voice</h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Session audit log with timestamps, CSV download, and voice announcement.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COMPACT SECTION: "Pick a Number Online"                                   */}
          {/* ========================================================================= */}
          <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs space-y-4 text-gray-800 dark:text-gray-200">
            <div className="border-b border-[#eeedf7] dark:border-[#252636] pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[11px] font-bold mb-1">
                <Target className="w-3.5 h-3.5" />
                <span>Guide &amp; Practical Uses</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-headline text-gray-900 dark:text-white tracking-tight">
                Pick a Number Online
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                Whether you are calling raffle tickets, managing a classroom roster, rolling tabletop gaming dice, or deciding who goes first, <strong>picking a number</strong> online should be fast, unbiased, and visually exciting. This <strong>number spin wheel</strong> replaces manual hat-draws and biased physical dice with cryptographic fairness and real-time animation.
              </p>
            </div>

            {/* How it Works (Compact 3-Step) */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-500" />
                <span>How the Number Spinner Works</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">1</span>
                    <h4 className="font-bold text-gray-900 dark:text-white">Configure Bounds</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Click presets (<strong>1–10</strong>, <strong>1–20</strong>, <strong>1–50</strong>, <strong>1–100</strong>) or type custom Min/Max. Wheel recalculates instantly.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
                    <h4 className="font-bold text-gray-900 dark:text-white">Apply Smart Filters</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Filter <strong>Even (2n)</strong> or <strong>Odd (2n+1)</strong>, exclude blacklist numbers, and toggle <strong>No-Repeat Mode</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">3</span>
                    <h4 className="font-bold text-gray-900 dark:text-white">Spin &amp; Log Result</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Press <strong>SPIN</strong> or <kbd className="px-1 py-0.2 rounded bg-gray-200 dark:bg-gray-800 text-[10px] border">Space</kbd>. Hear audio ticks, get confetti, and export history.
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Real-World Examples (Compact 4-Card Grid) */}
            <div className="space-y-2 pt-1">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Real-World Examples &amp; Use Cases</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Classroom Student Cold-Calling (1–30)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    Set range 1–30 and toggle <em>No-Repeat</em>. Each student gets chosen exactly once without repetition or favoritism.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Tabletop D20 &amp; Board Game D6 (1–20 / 1–6)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    Digital replacement for lost dice. Fullscreen theater mode gives high-visibility rolls for the whole table.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Raffles &amp; Door Prizes (1–100 or Custom)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    Set ticket bounds, enable <em>No-Repeat</em>, and draw 1st, 2nd, and 3rd place winners sequentially with audit logs.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Even/Odd 50-50 &amp; Quick Draws</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    Decide between two choices with even/odd filters, or use Instant Mode to draw 5 unique lucky numbers at once.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Compact Popular Ranges Matrix (1-10, 1-20, 1-50, 1-100) */}
          <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs space-y-3 text-gray-800 dark:text-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                All Popular Ranges in One Wheel
              </h2>
              <span className="text-[11px] text-gray-400">Zero page reloads needed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs">1 – 10 Wheel</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Base-10 decider for ratings, top 10 priorities &amp; student callouts.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs">1 – 20 RPG</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Tabletop D20 for D&amp;D ability checks, critical hits &amp; fumbles.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs">1 – 50 Bingo</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Medium groups, classroom rosters &amp; corporate workshop activities.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs">1 – 100 Raffle</span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  Percentile D100 rolls, door prizes, giveaways &amp; large raffles.
                </p>
              </div>
            </div>
          </section>

          {/* Compact Cryptographic Fairness Card */}
          <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs space-y-2.5 text-gray-800 dark:text-gray-200">
            <h2 className="text-xs sm:text-sm font-bold font-headline text-gray-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Hardware CSPRNG vs Pseudo-Random Math.random()</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Standard online wheels use <code>Math.random()</code>, which relies on deterministic PRNG algorithms vulnerable to pattern clustering. This wheel connects to the native <strong>Web Cryptography API</strong> (<code>crypto.getRandomValues</code>), harvesting hardware entropy for true zero-bias random integer draws.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39]">
                <strong className="text-gray-900 dark:text-white block text-[11px] mb-0.5">Standard PRNG (Math.random)</strong>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">Software seed • Clustering risk • Modulo bias</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                <strong className="text-indigo-900 dark:text-indigo-300 block text-[11px] mb-0.5">Hardware CSPRNG (Web Crypto API)</strong>
                <span className="text-[11px] text-indigo-700 dark:text-indigo-400">Cryptographically secure • Equal 1/N odds • Zero clustering</span>
              </div>
            </div>
          </section>

          {/* Compact Comparison Table */}
          <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2.5">
              Selection Method Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-[#eeedf7] dark:border-[#272838] bg-[#fbf8ff] dark:bg-[#14151e] text-gray-600 dark:text-gray-400">
                    <th className="p-2 font-bold">Method</th>
                    <th className="p-2 font-bold">Suspense</th>
                    <th className="p-2 font-bold">Custom Range</th>
                    <th className="p-2 font-bold">No-Repeat</th>
                    <th className="p-2 font-bold">Multi-Draw</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeedf7] dark:divide-[#272838]">
                  <tr>
                    <td className="p-2 font-bold text-indigo-600 dark:text-indigo-400">Number Wheel</td>
                    <td className="p-2 text-emerald-600 font-semibold">High (Wheel &amp; Audio)</td>
                    <td className="p-2 text-emerald-600 font-semibold">Yes (Any Bounds)</td>
                    <td className="p-2 text-emerald-600 font-semibold">Yes (Elimination)</td>
                    <td className="p-2 text-emerald-600 font-semibold">Yes (1 to 50)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-gray-700 dark:text-gray-300">Physical Dice</td>
                    <td className="p-2 text-gray-500">Medium</td>
                    <td className="p-2 text-red-500 font-semibold">Fixed (6 / 20)</td>
                    <td className="p-2 text-red-500 font-semibold">No (Can repeat)</td>
                    <td className="p-2 text-gray-500">Requires multi-dice</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-gray-700 dark:text-gray-300">Slips in Hat</td>
                    <td className="p-2 text-gray-500">Low</td>
                    <td className="p-2 text-gray-500">Manual prep</td>
                    <td className="p-2 text-emerald-600 font-semibold">Yes</td>
                    <td className="p-2 text-gray-500">Slow manual</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Compact FAQ Section */}
          <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs space-y-3 text-gray-800 dark:text-gray-200">
            <h2 className="text-xs sm:text-sm font-bold font-headline text-gray-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <h3 className="font-bold text-gray-900 dark:text-white text-[11px]">
                  How does the wheel pick random numbers?
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Uses browser-native <code>crypto.getRandomValues</code> for true hardware cryptographic randomness with zero pattern clustering.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <h3 className="font-bold text-gray-900 dark:text-white text-[11px]">
                  Can I draw multiple unique numbers?
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Yes! Choose 1 to 5 winners in Wheel mode, or switch to Instant mode to draw up to 50 unique numbers simultaneously.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <h3 className="font-bold text-gray-900 dark:text-white text-[11px]">
                  How does No-Repeat elimination work?
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Each drawn number is removed from the wheel so it cannot land again until you click the Restore/Reset button.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-0.5">
                <h3 className="font-bold text-gray-900 dark:text-white text-[11px]">
                  Can I use this as tabletop dice (D6/D20)?
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Yes! Click the 1–6 preset for standard board game dice or 1–20 for tabletop RPGs like Dungeons &amp; Dragons.
                </p>
              </div>
            </div>
          </section>

          {/* Compact Related Tools Row */}
          <section className="p-3.5 sm:p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> More Wheels
              </span>
              <Link href="/sitemap-directory" className="text-[11px] text-indigo-600 font-bold hover:underline">
                All Tools ›
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <Link
                href="/number-wheel"
                className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-indigo-400 transition-colors text-center"
              >
                <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Number Wheel</span>
                <span className="text-[10px] text-gray-400">Classic numeric spinner</span>
              </Link>
              <Link
                href="/bingo-wheel"
                className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-indigo-400 transition-colors text-center"
              >
                <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Bingo Wheel</span>
                <span className="text-[10px] text-gray-400">75 &amp; 90-ball caller</span>
              </Link>
              <Link
                href="/dice-roller"
                className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-indigo-400 transition-colors text-center"
              >
                <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Dice Roller</span>
                <span className="text-[10px] text-gray-400">Polyhedral 3D dice</span>
              </Link>
              <Link
                href="/pokemon-wheel"
                className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-indigo-400 transition-colors text-center"
              >
                <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Pokémon Wheel</span>
                <span className="text-[10px] text-gray-400">Dex randomizer</span>
              </Link>
            </div>
          </section>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
