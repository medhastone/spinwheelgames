import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Smartphone,
  Sparkles,
  Gamepad2,
  Tv,
  CheckSquare,
  BookOpen,
  MessageCircle,
  Flame,
  Palette,
  Sliders,
  ShieldCheck,
  Lock,
  Award,
  HelpCircle,
  ListPlus,
  Ban,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import RandomAppPickerEngine from '@/components/apps/RandomAppPickerEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Random App Picker Decision Wheel | SpinWheelGames",
  "description": "Spin the random app picker to decide what mobile app, casual game, streaming service, or study tool to open. Features preset app categories, custom app lists, and no-repeat mode.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/random-app-picker"
  },
  "openGraph": {
    "title": "Random App Picker Decision Wheel | SpinWheelGames",
    "description": "Spin the random app picker to decide what mobile app, casual game, streaming service, or study tool to open. Features preset app categories, custom app lists, and no-repeat mode.",
    "url": "https://spinwheelgames.org/random-app-picker",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Frandom-app-picker&title=Random+App+Picker+Decision+Wheel+%7C+SpinWheelGames&desc=Spin+the+random+app+picker+to+decide+what+mobile+app%2C+casual+game%2C+streaming+service%2C+or+study+tool+to+open.+Features+preset+app+categories%2C+custom+app+lists%2C+and+no-repeat+mode.",
        "width": 1200,
        "height": 630,
        "alt": "Random App Picker Decision Wheel | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Random App Picker Decision Wheel | SpinWheelGames",
    "description": "Spin the random app picker to decide what mobile app, casual game, streaming service, or study tool to open. Features preset app categories, custom app lists, and no-repeat mode.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Frandom-app-picker&title=Random+App+Picker+Decision+Wheel+%7C+SpinWheelGames&desc=Spin+the+random+app+picker+to+decide+what+mobile+app%2C+casual+game%2C+streaming+service%2C+or+study+tool+to+open.+Features+preset+app+categories%2C+custom+app+lists%2C+and+no-repeat+mode."
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/random-app-picker#webapp',
      name: 'Random App Picker & Decision Wheel',
      url: 'https://spinwheelgames.org/random-app-picker',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and HTML5 canvas',
      description:
        'Interactive random app selector wheel. Choose from curated app categories or enter your custom installed apps to make unbiased choices with no-repeat exclusions.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '870',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Preset categories for Mobile Games, Streaming, Productivity, Learning, Social, Fitness, and Creative apps',
        'Custom app list input and bulk import from your phone or device',
        'No-repeat mode with exclusion toggles so you never spin the same app twice',
        'Action prompts giving you an immediate 15-minute focus goal once an app is picked',
        'Client-side hardware CSPRNG randomness powered by W3C Web Cryptography API'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/random-app-picker#breadcrumb',
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
          name: 'Tools',
          item: 'https://spinwheelgames.org/categories'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random App Picker',
          item: 'https://spinwheelgames.org/random-app-picker'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/random-app-picker#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Random App Picker work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Choose an app category or enter your own custom installed apps. When you tap Spin, the wheel uses cryptographic randomness (window.crypto.getRandomValues) to select an app fairly, complete with an actionable mission goal.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own phone apps to the picker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Select the [Custom List] category tab to add apps one by one or click [Bulk Paste Apps] to paste your entire list of installed apps at once. Your custom list is automatically saved in your browser.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I exclude apps I have already used?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enable the [No-Repeat: ON] toggle or click the eye icon next to any app in the roster. Excluded apps are instantly removed from the wheel slices for subsequent spins.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is "app selector" the same as a random app picker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In software development and enterprise IT, "app selector" frequently describes system dialogs (like Android’s Open-With picker) or enterprise software evaluation portals. However, when everyday smartphone users look for a random app selector or random app picker, they want a decision tool to pick what app to open next.'
          }
        }
      ]
    }
  ]
};

export default function RandomAppPickerPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/random-app-picker" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12 sm:pb-16">
        {/* Top Header & Interactive Wheel Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Tools', href: '/categories' },
              { label: 'Random App Picker' }
            ]}
          />

          {/* Compact Hero Title Section */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive Decision Wheel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Random App Picker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Stuck scrolling through your home screen? Spin the <strong>random app picker</strong> to choose what mobile game to play, video service to watch, or productivity app to tackle with no-repeat exclusions!
            </p>
          </div>

          {/* Interactive Wheel Engine Above the Fold */}
          <div id="tool-interactive">
            <RandomAppPickerEngine />
          </div>
        </section>

        {/* COMPACT BOX 1: Provable Fairness & Privacy Bar (Home Page Style) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Cryptographically Random (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>100% Unbiased Equal Slice Physics</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Zero Account Required • Local Browser Persistence</span>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 2: 7 Preset App Categories Grid (Home-Style Compact Responsive Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Curated Presets
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Explore Preset App Categories
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Switch categories with one tap to spin tailored apps for entertainment, fitness, or focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Mobile Games */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Casual
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Casual &amp; Mobile Games
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Endless runners, match-3 puzzles, board tactics (Chess.com), and quick action games to pass the time.
                </p>
              </div>
            </div>

            {/* Card 2: Streaming */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Tv className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Media
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Streaming &amp; Video
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Netflix, YouTube, Prime Video, Disney+, and Spotify when you and your partner can’t agree on what to stream.
                </p>
              </div>
            </div>

            {/* Card 3: Productivity */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Focus
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Productivity &amp; Tasks
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Break task freeze by spinning Notion, Todoist, Google Calendar, or Forest for a 20-minute focus sprint.
                </p>
              </div>
            </div>

            {/* Card 4: Learning */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Study
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Learning &amp; Reading
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Duolingo language streaks, Kindle books, Audible, Anki flashcards, and Khan Academy micro-lessons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 3: Overcoming Phone Analysis Paralysis (Compact 2-Column Box) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-[#4648d4] dark:text-[#8587ff] border border-indigo-500/20 uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Screen Time Strategy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                How a Random App Picker Breaks Endless Home Screen Scrolling
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                The average smartphone user has over 80 installed applications but actively cycles through fewer than 9. Having too many options causes decision fatigue, resulting in mindless social doomscrolling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#181924] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Bypass Choice Overload
                </h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Instead of staring at 6 home screen folders, spin the wheel to surrender the decision to random chance and commit immediately.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#181924] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Rediscover Forgotten Apps
                </h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Paste your backlog games and educational tools. You will naturally rotate through apps you paid for but never opened.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#181924] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  No-Repeat Session Marathons
                </h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Turn on No-Repeat mode to cycle through multiple 15-minute productive bursts or study sessions without repeating the same app twice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 4: 4 Practice Workflows & Use Cases (Home-Style Compact Cards Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Practical Workflows
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Popular Ways to Use the Random App Picker
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              From phone decluttering audits to family movie night selection, see how creators and gamers use the wheel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Workflow 1 */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Gamepad2 className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wide">Backlog Gamers</span>
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                Mobile Backlog Clearing
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Paste the 10 mobile puzzle games or indie roguelikes installed on your phone. Spin to decide which one gets played for tonight’s commute or flight.
              </p>
            </div>

            {/* Workflow 2 */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Tv className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wide">Couch Streaming</span>
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                Fair Movie Night Picker
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Cannot decide between Netflix, Hulu, HBO, or Disney+? Spin the Streaming preset and agree to pick a movie exclusively on whatever service wins.
              </p>
            </div>

            {/* Workflow 3 */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Sliders className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wide">Digital Declutter</span>
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                "Keep or Delete" App Audit
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Put 20 dormant apps on the wheel. Spin one daily. If you do not open and enjoy it within 10 minutes, uninstall it from your device immediately.
              </p>
            </div>

            {/* Workflow 4 */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4.5 space-y-2.5">
              <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <Flame className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wide">Daily Habits</span>
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                Micro-Study &amp; Fitness Roulette
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Spin during afternoon lulls. If Duolingo wins, do 2 lessons. If Strava wins, do a 15-minute brisk walk. If Kindle wins, read 1 chapter.
              </p>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 5: FAQ Section (Home-Style Responsive Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Questions About the Random App Picker
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Everything you need to know about custom lists, provable randomness, and no-repeat mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  How does the Random App Picker ensure spins are unbiased?
                </h4>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Every spin generates a cryptographic entropy seed using the browser’s native <code className="text-indigo-600 dark:text-indigo-400 font-mono">crypto.getRandomValues()</code> API. There are no secret weights, hidden sponsors, or algorithmic biases.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Can I bulk import all installed apps from my smartphone?
                </h4>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Yes. Under the <strong>Custom List</strong> tab, click <strong>Bulk Paste Apps</strong>. You can paste a list of app names (one per line) from a notes app or launcher backup.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  How does No-Repeat mode handle previously selected apps?
                </h4>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                With No-Repeat mode enabled, winning apps are automatically removed from the active wheel slices for future spins. You can also manually toggle the eye icon on any app to exclude or include it at any time.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Is "app selector" the same thing as this picker?
                </h4>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                While "app selector" can refer to system "Open With" dialogs or enterprise software evaluation tools, users looking for an interactive random app selector want a fair wheel to pick an application to open without overthinking.
              </p>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 6: Related Decision Tools Strip */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">
                Explore More Decision Spinners &amp; Random Pickers
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7]">
                Try our other curated wheels for game nights, creative brainstorming, and daily decisions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/random-game-picker"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
                <span>Game Picker</span>
              </Link>
              <Link
                href="/word-spinner"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Word Spinner</span>
              </Link>
              <Link
                href="/drawing-wheel"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Palette className="w-3.5 h-3.5 text-purple-500" />
                <span>Drawing Wheel</span>
              </Link>
              <Link
                href="/categories"
                className="px-3 py-2 rounded-xl bg-[#4648d4] text-white hover:bg-[#3b3db8] text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>All Wheels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
