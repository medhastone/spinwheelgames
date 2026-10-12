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

export const dynamic = 'force-static';



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
        'Browser-based cryptographic randomness via Web Crypto API (crypto.getRandomValues)'
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
            text: 'Yes! Click the 1-6 preset for a standard 6-sided die or the 1-20 preset for tabletop RPGs and Dungeons & Dragons D20 rolls. Every face has an exact, uniform equal probability.'
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

      <div className="min-h-screen flex flex-col bg-[#faf8fd] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
        {/* Global Header */}
        <SubpageHeader activePage="/number-wheel" />

        {/* Breadcrumb Navigation - fully visible on mobile & desktop */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center gap-1.5 max-w-[1440px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-32 pb-1 sm:pb-2 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 w-full"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/numbers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Numbers & Dice
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-800 dark:text-gray-200" aria-current="page">
            Number Spin Wheel
          </span>
        </nav>

        {/* Hero Section & Main Layout */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-2 sm:pt-3 pb-8 w-full max-w-full overflow-x-clip">
          <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6 px-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3 border border-indigo-500/20">
              <Binary className="w-3.5 h-3.5" />
              <span>CSPRNG Cryptographically Fair Number Picker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black font-headline tracking-tight text-gray-900 dark:text-white mb-1.5 sm:mb-2">
              Number Spin Wheel
            </h1>
            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Spin a random number wheel online. Choose any range (1-4, 1-6, 1-10, 1-20, 1-50, 1-100 or custom),
              generate unique numbers, exclude numbers, and use the result for games, decisions, or classroom activities.
            </p>
          </div>

          {/* Interactive Tool Engine */}
          <div className="w-full mb-6 sm:mb-8">
            <NumberWheelEngine />
          </div>

          {/* Compact Editorial & Discovery Content (Matching Homepage Cards Layout) */}
          <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 py-2 sm:py-4 text-[#1a1b22] dark:text-[#eeedf7]">
            {/* 1. Core Feature Highlights (Compact 4-Card Row) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                    <Dices className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-white mb-0.5">Preset Ranges</h2>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Instant 1–4, 1–6 (Dice), 1–10, 1–20 (D20), 1–50, and 1–100 deciders.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                    <Filter className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-white mb-0.5">Even/Odd & Filter</h2>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Filter by even or odd integers only, and blacklist numbers from landing.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-white mb-0.5">Multi-Number Draw</h2>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Draw up to 50 unique numbers simultaneously with instant sorting & stats.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-white mb-0.5">Hardware CSPRNG</h2>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Powered by Web Crypto API for true zero-bias, cryptographically fair results.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Pick a Number Online (Compact Guide Card) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-3.5">
              <div className="border-b border-[#eeedf7] dark:border-[#252636] pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Practical Guide</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-[#1a1b22] dark:text-white tracking-tight">
                  Pick a Number Online
                </h2>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed mt-1">
                  Whether for classroom student calls, raffle drawings, tabletop board games, or daily decisions, <strong>picking a number</strong> online provides a provably unbiased, exciting experience. This <strong>number spinner</strong> reconfigures instantly across popular ranges (<strong>1–10</strong>, <strong>1–20</strong>, <strong>1–50</strong>, <strong>1–100</strong>, and custom bounds) without needing separate pages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[12px]">How it Works</h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Set your bounds or click a preset chip. The tool renders high-resolution slices with distinct colors and uses the browser native Web Cryptography API (<code>crypto.getRandomValues</code>) to guarantee hardware-level mathematical fairness.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[12px]">Practical Examples</h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Roll a D20 for RPGs (1–20), draw 3 prize winners with <em>No-Repeat</em> mode (1–100), call 30 students randomly for presentations, or generate 5 lucky lottery numbers with instant multi-draw.
                  </p>
                </div>
              </div>

              <div className="pt-0.5 text-xs flex items-center justify-between">
                <Link
                  href="/random-number-wheel"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline"
                >
                  <span>Explore full features on Random Number Wheel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-[#767586] dark:text-[#908fa1] hidden sm:inline">
                  Hardware CSPRNG Verified
                </span>
              </div>
            </section>

            {/* 3. How to Use the Number Spin Wheel (Compact 3-Step) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                    Simple &amp; Instant
                  </span>
                  <h2 className="text-base sm:text-lg font-bold font-headline text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                    How to Use the Number Spin Wheel
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#4648d4] text-white font-bold text-[10px] flex items-center justify-center">1</span>
                    <h3 className="font-bold text-[#1a1b22] dark:text-white text-[12px]">Choose Range &amp; Filters</h3>
                  </div>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Click a quick preset (1–6 dice, 1–10, 1–20 D20, 1–100) or enter custom Min/Max. Optionally filter for Even/Odd or add exclusions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#4648d4] text-white font-bold text-[10px] flex items-center justify-center">2</span>
                    <h3 className="font-bold text-[#1a1b22] dark:text-white text-[12px]">Select Wheel or Instant</h3>
                  </div>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Use <strong>Wheel Mode</strong> for animated suspense with clicking audio ticks, or <strong>Instant Mode</strong> to draw up to 50 unique numbers in 1 click.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#4648d4] text-white font-bold text-[10px] flex items-center justify-center">3</span>
                    <h3 className="font-bold text-[#1a1b22] dark:text-white text-[12px]">Spin &amp; Log Result</h3>
                  </div>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Hit <strong>SPIN</strong> or press <kbd className="px-1 py-0.2 rounded bg-gray-200 dark:bg-gray-800 text-[10px] border">Space</kbd>. Copy results, enable No-Repeat, and download CSV history.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Popular Number Ranges (Compact 6-Card Grid) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                    Quick Presets
                  </span>
                  <h2 className="text-base sm:text-lg font-bold font-headline text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                    Popular Number Ranges &amp; Practical Use Cases
                  </h2>
                </div>
                <span className="text-[11px] text-[#767586] dark:text-[#908fa1] hidden sm:inline">
                  Instant switch
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 4 Wheel</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    4-Way Pick
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    Four-person turn order, multiple-choice (A, B, C, D) &amp; brackets.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 6 Die</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    D6 Roller
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    Digital replacement for lost dice in board games with 16.67% odds.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 10 Decider</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    Top 10 Pick
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    Standard base-10 decider for ratings, priority lists &amp; volunteers.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 20 RPG</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    Tabletop D20
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    D&amp;D ability checks, natural 20 critical hits &amp; critical fumbles.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 50 Bingo</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    Class &amp; Bingo
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    Classroom attendance rosters, mini bingo &amp; corporate workshops.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#4648d4] dark:text-[#8587ff]">1 – 100 Raffle</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 block w-fit">
                    Raffle / D100
                  </span>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-snug">
                    Door prize raffles, giveaways, percentile rolls &amp; lucky draws.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Cryptographic Fairness Card (Compact 2-Column) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-headline text-[#1a1b22] dark:text-white tracking-tight">
                    Hardware CSPRNG vs Pseudo-Random Math.random()
                  </h2>
                  <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                    True hardware entropy with zero seed predictability or modulo bias.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330]">
                  <strong className="text-[#1a1b22] dark:text-white block text-[11px] mb-0.5">Standard PRNG (Math.random)</strong>
                  <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">Software seed • Clustering vulnerability • Modulo bias risk</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                  <strong className="text-indigo-900 dark:text-indigo-300 block text-[11px] mb-0.5">Hardware CSPRNG (Web Crypto API)</strong>
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-400">Browser hardware entropy • Equal 1/N odds • Zero clustering</span>
                </div>
              </div>
            </section>

            {/* 6. Comparison Table (Compact) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs">
              <h2 className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-white mb-2.5">
                Comparison: Number Spin Wheel vs Other Selection Methods
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#eeedf7] dark:border-[#272838] bg-[#fbf8fd] dark:bg-[#14151e] text-[#464554] dark:text-[#c7c4d7]">
                      <th className="p-2.5 font-bold">Method</th>
                      <th className="p-2.5 font-bold">Suspense</th>
                      <th className="p-2.5 font-bold">Custom Range</th>
                      <th className="p-2.5 font-bold">No-Repeat</th>
                      <th className="p-2.5 font-bold">Multi-Draw</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eeedf7] dark:divide-[#272838]">
                    <tr>
                      <td className="p-2.5 font-bold text-[#4648d4] dark:text-[#8587ff]">Number Spin Wheel</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">High (Wheel &amp; Audio)</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">Yes (Any Bounds)</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">Yes (Elimination)</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">Yes (1 to 50)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Physical Dice</td>
                      <td className="p-2.5 text-gray-500">Medium</td>
                      <td className="p-2.5 text-red-500 font-semibold">Fixed (6 / 20)</td>
                      <td className="p-2.5 text-red-500 font-semibold">No (Can repeat)</td>
                      <td className="p-2.5 text-gray-500">Requires multi-dice</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Slips in a Hat</td>
                      <td className="p-2.5 text-gray-500">Low</td>
                      <td className="p-2.5 text-gray-500">Manual prep</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">Yes</td>
                      <td className="p-2.5 text-gray-500">Slow manual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Frequently Asked Questions (Compact 2x2 Grid) */}
            <section className="bg-white dark:bg-[#181922] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-3">
              <h2 className="text-xs sm:text-sm font-bold font-headline text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[11px]">
                    How does the number wheel pick random numbers?
                  </h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Uses native <code>crypto.getRandomValues</code> for true hardware cryptographic randomness with zero pattern clustering.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[11px]">
                    Can I pick multiple unique numbers at once?
                  </h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Yes! Choose 1 to 5 winners in Wheel mode, or switch to Instant mode to draw up to 50 unique numbers simultaneously.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[11px]">
                    How do I exclude specific numbers from the wheel?
                  </h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Type numbers into the Filters tab to blacklist them, or turn on No-Repeat mode to eliminate landed numbers automatically.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-1">
                  <h3 className="font-bold text-[#1a1b22] dark:text-white text-[11px]">
                    Can I use this as tabletop gaming dice (D6/D20)?
                  </h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                    Yes! Click 1–6 for standard board games or 1–20 for tabletop RPGs like Dungeons &amp; Dragons with equal angular slice probability.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. More Decision & Randomizer Wheels (Compact 4-Card Row) */}
            <section className="p-3.5 sm:p-4 rounded-2xl bg-[#fbf8fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" /> More Wheels
                </span>
                <Link href="/sitemap-directory" className="text-[11px] text-[#4648d4] dark:text-[#8587ff] font-bold hover:underline">
                  All Tools ›
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <Link
                  href="/random-number-wheel"
                  className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-[#4648d4]/50 transition-colors text-center"
                >
                  <span className="font-bold text-[#1a1b22] dark:text-white block text-[11px]">Random Number Wheel</span>
                  <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">Presets &amp; CSV history</span>
                </Link>
                <Link
                  href="/bingo-wheel"
                  className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-[#4648d4]/50 transition-colors text-center"
                >
                  <span className="font-bold text-[#1a1b22] dark:text-white block text-[11px]">Bingo Wheel</span>
                  <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">75 &amp; 90-ball caller</span>
                </Link>
                <Link
                  href="/dice-roller"
                  className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-[#4648d4]/50 transition-colors text-center"
                >
                  <span className="font-bold text-[#1a1b22] dark:text-white block text-[11px]">Dice Roller</span>
                  <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">Polyhedral 3D dice</span>
                </Link>
                <Link
                  href="/wheel-of-names"
                  className="p-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#272838] hover:border-[#4648d4]/50 transition-colors text-center"
                >
                  <span className="font-bold text-[#1a1b22] dark:text-white block text-[11px]">Wheel of Names</span>
                  <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">Raffle &amp; student caller</span>
                </Link>
              </div>
            </section>
          </div>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
