import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cake,
  Crown,
  Sparkles,
  Utensils,
  Gift,
  Gamepad2,
  PartyPopper,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Users,
  Shuffle,
  Volume2,
  Sliders,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import BirthdayWheelEngine from '@/components/birthday/BirthdayWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Birthday Wheel – Activity & Gift Picker | SpinWheelGames",
  "description": "Spin the free birthday wheel to pick birthday party activities, food & dinners, gift ideas, party games, birthday themes, and person pickers. 100% free with custom entries.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/birthday-wheel"
  },
  "openGraph": {
    "title": "Birthday Wheel – Activity & Gift Picker | SpinWheelGames",
    "description": "Spin the free birthday wheel to pick birthday party activities, food & dinners, gift ideas, party games, birthday themes, and person pickers. 100% free with custom entries.",
    "url": "https://spinwheelgames.org/birthday-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fbirthday-wheel&title=Birthday+Wheel+%E2%80%93+Activity+%26+Gift+Picker+%7C+SpinWheelGames&desc=Spin+the+free+birthday+wheel+to+pick+birthday+party+activities%2C+food+%26+dinners%2C+gift+ideas%2C+party+games%2C+birthday+themes%2C+and+person+pickers.+100%25+free+with+custom+entries.",
        "width": 1200,
        "height": 630,
        "alt": "Birthday Wheel – Activity & Gift Picker | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Birthday Wheel – Activity & Gift Picker | SpinWheelGames",
    "description": "Spin the free birthday wheel to pick birthday party activities, food & dinners, gift ideas, party games, birthday themes, and person pickers. 100% free with custom entries.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fbirthday-wheel&title=Birthday+Wheel+%E2%80%93+Activity+%26+Gift+Picker+%7C+SpinWheelGames&desc=Spin+the+free+birthday+wheel+to+pick+birthday+party+activities%2C+food+%26+dinners%2C+gift+ideas%2C+party+games%2C+birthday+themes%2C+and+person+pickers.+100%25+free+with+custom+entries."
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/birthday-wheel#webapp',
      name: 'Birthday Wheel – Decision Spinner & Party Picker',
      url: 'https://spinwheelgames.org/birthday-wheel',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern web browser with HTML5 Canvas',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description:
        'Interactive birthday wheel decision spinner featuring dedicated modes for birthday person picker, birthday activities, birthday dinner food, gift ideas, party games, and party themes.'
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
          name: 'All Games',
          item: 'https://spinwheelgames.org/games'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Birthday Wheel',
          item: 'https://spinwheelgames.org/birthday-wheel'
        }
      ]
    },
    {
      '@type': 'HowTo',
      name: 'How to Use the Birthday Wheel for Birthday Decisions',
      description: 'Step-by-step instructions for picking birthday activities, food, gifts, themes, and games using the interactive decision wheel.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Your Birthday Decision Mode',
          text: 'Choose between Birthday Person Picker, Birthday Activity, Birthday Food, Birthday Gift Ideas, Birthday Party Games, or Birthday Theme from the top mode tabs.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Add Custom Entries or Keep Curated Presets',
          text: 'Use the inline input or Bulk Edit modal to add your friends names, custom restaurant choices, or wishlist items. Optionally enable No-Repeat elimination.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Spin the Wheel and Celebrate',
          text: 'Click Spin the Wheel or tap the center hub. Watch the physics-based animation and celebrate the winner with confetti and sound fanfare.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Birthday Wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Birthday Wheel is a free, interactive decision spinner designed specifically for birthday celebrations. It features 6 dedicated modes: Birthday Person Picker, Birthday Activity, Birthday Food, Birthday Gift Ideas, Birthday Party Games, and Birthday Theme.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add custom names and choices to the Birthday Wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can add custom entries directly using the inline input or paste a whole list of friends or wishlist items at once using the Bulk Edit / Paste List button. Your custom entries are saved in your browser.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the Birthday Wheel truly random?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Birthday Wheel uses the W3C Web Cryptography API (window.crypto.getRandomValues) to generate cryptographically secure pseudorandom numbers (CSPRNG), guaranteeing zero bias or favoritism.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat elimination mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you toggle No-Repeat to ON, any slice that wins is removed from remaining spins. This is ideal for party games where every guest gets a turn, or for drawing multiple activity choices without repeats.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I use the Birthday Wheel on a TV or tablet during a party?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The Birthday Wheel includes a Fullscreen button that maximizes the wheel on smart TVs, projectors, iPads, tablets, or laptops, making it the centerpiece of party entertainment.'
          }
        }
      ]
    }
  ]
};

export default function BirthdayWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/birthday-wheel" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-6 sm:space-y-8 pb-12 sm:pb-16">
        {/* Top Header & Interactive Tool Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Games', href: '/games' },
              { label: 'Birthday Wheel' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 text-[11px] font-bold uppercase tracking-wider">
              <Cake className="w-3.5 h-3.5" />
              <span>Interactive Birthday Decision Spinner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Birthday Wheel
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Spin the interactive <strong>birthday wheel</strong> to choose party activities, birthday dinner spots, gift ideas, parlor games, party themes, and birthday VIP pickers. Add your custom entries and celebrate with fanfare!
            </p>
          </div>

          {/* Interactive Birthday Wheel Engine Above the Fold */}
          <div id="tool-interactive">
            <BirthdayWheelEngine />
          </div>
        </section>

        {/* Compact Box 1: Provable Fairness Guarantee */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center justify-center flex-shrink-0 text-rose-600 dark:text-rose-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  100% Unbiased & Cryptographically Fair Spins
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Every spin of the birthday wheel is powered by hardware entropy using the W3C Web Cryptography API (<code className="text-rose-600 dark:text-rose-400">window.crypto.getRandomValues</code>). No rigged outcomes, no secret weights, and zero bias.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 rounded-xl flex-shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>Hardware CSPRNG</span>
            </div>
          </div>
        </section>

        {/* Compact Box 2: 6 Dedicated Modes Deep Dive */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Six Tailored Experiences
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Dedicated Modes on the Birthday Wheel
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Switch modes in one click to solve every birthday planning dilemma from guest spotlights to theme aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mode 1 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Birthday Person Picker
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Determine who gets the center spotlight, who blows the candles, who serves the first slice of birthday cake, or who picks the next party song. Add all your party guests for unforgettable turns.
              </p>
            </div>

            {/* Mode 2 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2. Birthday Activity Wheel
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Never argue about what to do for your birthday. Spin between escape rooms, karaoke booths, go-karting, sunset beach bonfires, paint and sip classes, trampoline dodgeball, and outdoor movie nights.
              </p>
            </div>

            {/* Mode 3 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3. Birthday Food & Dinner
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Solve the group dinner standoff instantly. Choose between artisan wood-fired pizza, sizzling Korean BBQ, street tacos, smashburgers, hibachi sushi, fondue grazing boards, or giant sundae dessert bars.
              </p>
            </div>

            {/* Mode 4 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4. Birthday Gift Ideas
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you need gift wishlist inspiration or surprise presents for friends, spin for trending ideas like noise-cancelling headphones, instant polaroids, experience tickets, sunset lamps, or spa baskets.
              </p>
            </div>

            {/* Mode 5 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                5. Birthday Party Games
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Break the ice with hilarious party games: &quot;How Well Do You Know the Birthday Star?&quot; trivia, Two Truths and a Lie, saran wrap mystery balls, freeze dance battles, and blindfolded cake decorating.
              </p>
            </div>

            {/* Mode 6 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <PartyPopper className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                6. Birthday Theme
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Give your celebration an unforgettable aesthetic: Neon glow-in-the-dark raves, retro 90s/Y2K throwbacks, Hollywood VIP red carpet galas, enchanted fairy forests, tropical luau tiki bars, or 1920s speakeasies.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 3: 3-Step Guide */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Quick Tutorial
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                How to Use the Birthday Wheel at Parties
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Designed to run directly in your browser on phones, tablets, or full-screen TVs with zero setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Pick Your Celebration Mode
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Click any of the 6 mode tabs at the top (Person Picker, Activity, Food, Gifts, Games, or Theme). The wheel instantly updates its slices and palette.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Customize Entries & Options
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Type new names into the input or click <strong>Bulk Edit</strong> to paste your party guest list. Toggle <strong>No-Repeat</strong> on if you want each pick removed from future spins.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Spin, Celebrate & Share
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hit <strong>SPIN</strong> or click the wheel. When the needle halts, enjoy the fanfare sound and confetti shower. Copy the result or share it to your party group chat!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Box 4: Birthday Planning Strategies by Milestone */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Party Planning Masterclass
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Birthday Decision Strategies by Milestone
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              How event planners and party hosts use decision wheels to streamline celebrations across every age group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                Milestone 18th & 21st
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                High-Energy Squad Bashes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Load the Activity Wheel with nightlife, karaoke lounges, and laser tag. Use the Person Picker to determine VIP photo positions and speech givers.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                Milestone 30th, 40th & 50th
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Curated Culinary & Escape Nights
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Use the Food Wheel to settle debate between fine-dining steak houses, fondue grazing tables, and artisan sushi spreads. Eliminates group text indecision.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Kids & Teens Celebrations
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Fair Games & Elimination Rounds
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Turn on No-Repeat elimination so every child gets a turn blowing candles, picking musical chair tracks, or receiving party favor mystery bags without tears.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                Surprise & Office Birthdays
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Secret Themes & Gift Exchanges
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Project the wheel onto the office conference TV or living room screen to unveil the chosen theme, dessert catering, or secret teammate gift box.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 5: Frequently Asked Questions */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Clear Answers
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions About the Birthday Wheel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Can I paste a list of my friends&apos; names?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! Click the <strong>Bulk Edit / Paste List</strong> button in the Birthday Person Picker mode. Paste your list of guests one name per line and click Save. The wheel slices update instantly.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>How does the No-Repeat feature work?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                When No-Repeat is ON, the winning slice is automatically eliminated from remaining spins. This ensures every party game or guest gets selected once without duplicate outcomes.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Does the Birthday Wheel require an account or app download?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                No. The tool is 100% free, browser-based, and runs offline on modern smartphones, tablets, and computers with HTML5 Canvas. Zero sign-up, zero downloads, and zero paid barriers.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Can I project the wheel onto a TV during a birthday party?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! Click the Fullscreen button on the controls bar to expand the Birthday Wheel to fill your entire display. It looks gorgeous on smart TVs, projectors, and iPads.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Are my custom items saved if I refresh the page?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes. Your custom slices and additions for each mode are saved securely in your browser&apos;s local storage so you never lose your party guest list or wishlist ideas.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>What makes this birthday wheel fair?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                It uses the W3C Web Cryptography API for CSPRNG hardware entropy. Each slice has equal geometric area and mathematically equal probability of being picked by the pointer.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 6: Related Decision Tools */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Explore More Party & Decision Wheels
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Complement your birthday party with companion randomizers and event spinners.
                </p>
              </div>
              <Link
                href="/games"
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>All Games</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link
                href="/theme-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <PartyPopper className="w-5 h-5 mx-auto text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Theme Wheel</span>
                <span className="block text-[10px] text-slate-400">Party & event themes</span>
              </Link>

              <Link
                href="/random-game-picker"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <Gamepad2 className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Game Picker</span>
                <span className="block text-[10px] text-slate-400">Board & card games</span>
              </Link>

              <Link
                href="/comment-picker"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <Sparkles className="w-5 h-5 mx-auto text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Comment Picker</span>
                <span className="block text-[10px] text-slate-400">Giveaways & contests</span>
              </Link>

              <Link
                href="/wheel-of-names"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <Users className="w-5 h-5 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Wheel of Names</span>
                <span className="block text-[10px] text-slate-400">Random name drawer</span>
              </Link>

              <Link
                href="/food-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <Utensils className="w-5 h-5 mx-auto text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Food Wheel</span>
                <span className="block text-[10px] text-slate-400">Meal & dining decider</span>
              </Link>

              <Link
                href="/team-generator"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-rose-400 transition-all text-center space-y-1 group"
              >
                <Shuffle className="w-5 h-5 mx-auto text-cyan-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Team Generator</span>
                <span className="block text-[10px] text-slate-400">Balanced party squads</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
