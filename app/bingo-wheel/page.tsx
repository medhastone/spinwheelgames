import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Dices,
  Volume2,
  RotateCcw,
  Maximize2,
  Grid,
  Radio,
  Trophy,
  Gamepad2,
  Printer
} from 'lucide-react';
import BingoWheelEngine from '@/components/bingo/BingoWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DirectAnswer from '@/components/DirectAnswer';
import QuickFacts from '@/components/QuickFacts';
import ConcreteExample from '@/components/ConcreteExample';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  "title": "Bingo Wheel – Caller & Number Spinner | SpinWheelGames",
  "description": "Spin the free bingo wheel caller online! Features 75-ball & 90-ball modes, automatic voice caller, master call board, and no repeats. 100% fair & free!",
  "alternates": {
    "canonical": "https://spinwheelgames.org/bingo-wheel"
  },
  "openGraph": {
    "title": "Bingo Wheel – Caller & Number Spinner | SpinWheelGames",
    "description": "Spin the free bingo wheel caller online! Features 75-ball & 90-ball modes, automatic voice caller, master call board, and no repeats. 100% fair & free!",
    "url": "https://spinwheelgames.org/bingo-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fbingo-wheel&title=Bingo+Wheel+%E2%80%93+Caller+%26+Number+Spinner+%7C+SpinWheelGames&desc=Spin+the+free+bingo+wheel+caller+online%21+Features+75-ball+%26+90-ball+modes%2C+automatic+voice+caller%2C+master+call+board%2C+and+no+repeats.+100%25+fair+%26+free%21",
        "width": 1200,
        "height": 630,
        "alt": "Bingo Wheel – Caller & Number Spinner | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Bingo Wheel – Caller & Number Spinner | SpinWheelGames",
    "description": "Spin the free bingo wheel caller online! Features 75-ball & 90-ball modes, automatic voice caller, master call board, and no repeats. 100% fair & free!",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fbingo-wheel&title=Bingo+Wheel+%E2%80%93+Caller+%26+Number+Spinner+%7C+SpinWheelGames&desc=Spin+the+free+bingo+wheel+caller+online%21+Features+75-ball+%26+90-ball+modes%2C+automatic+voice+caller%2C+master+call+board%2C+and+no+repeats.+100%25+fair+%26+free%21"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/bingo-wheel#webapp',
      name: 'Bingo Wheel - Random Bingo Caller & Number Spinner',
      url: 'https://spinwheelgames.org/bingo-wheel',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online Bingo spin wheel and random bingo number caller tool. Call 75-ball, 90-ball or mini bingo numbers without repeats, view master board history, enable voice caller, and mark player cards.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1410',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '75-Ball, 90-Ball, and 30-Ball Mini Bingo modes',
        'Automatic No-Repeat elimination mode',
        'Interactive Master Bingo Call Board matrix',
        'Full-screen classroom and projector display mode',
        'Voice Speech Synthesis (TTS) bingo caller',
        'In-browser interactive player bingo cards with 5-in-a-row win detection',
        'Reset game and called numbers history'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/bingo-wheel#breadcrumb',
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
          name: 'Games & Classroom',
          item: 'https://spinwheelgames.org/classroom-wheel'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bingo Wheel',
          item: 'https://spinwheelgames.org/bingo-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/bingo-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Bingo spin wheel ensure numbers are not repeated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When a number is drawn, the engine automatically records it in the called numbers history and removes it from the active spin wheel pool. No number can be picked twice until you click the Reset Game button.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I use this for 75-Ball, 90-Ball, and Mini Bingo games?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The tool supports 75-Ball American Bingo (B1-15, I16-30, N31-45, G46-60, O61-75), 90-Ball UK/Australian Bingo (1-90), and 30-Ball Speed Mini Bingo with a single click.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does the tool have voice calling audio for numbers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can toggle the "Voice ON" button to enable real-time speech synthesis that reads out the letter and number as each ball lands (e.g. "B, 12" or "N, 35").'
          }
        },
        {
          '@type': 'Question',
          name: 'How do players mark numbers on their bingo cards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Switch to the "Player Cards" tab. Players can generate custom 5x5 bingo cards and click or tap any cell to dab called numbers. The engine automatically detects 5-in-a-row BINGO wins along rows, columns, and diagonals!'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the Bingo Spin Wheel free to use for teachers and events?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100% free with no registration, no sign-in required, and no limits. You can project it in full-screen mode onto classroom smartboards or party screens.'
          }
        }
      ]
    }
  ]
};

export default function BingoWheelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <div className="min-h-screen flex flex-col bg-[#faf8fd] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
        {/* Global Header */}
        <SubpageHeader activePage="/bingo-wheel" />

        <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-16">
          {/* Top Header & Breadcrumbs Section */}
          <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Games & Classroom', href: '/categories' },
                { label: 'Bingo Spin Wheel' }
              ]}
            />

            {/* Compact Hero Banner Header (like Home Page) */}
            <div className="text-center max-w-3xl mx-auto space-y-2 pt-0 pb-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
                <Dices className="w-3.5 h-3.5" />
                <span>Bingo Caller Wheel • 75-Ball &amp; 90-Ball • Zero Repeats</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-gray-950 dark:text-white tracking-tight leading-[1.1]">
                Bingo Spin Wheel &amp; Live Caller
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Spin the free <strong>bingo wheel</strong> to randomly call balls without repeats. Features voice text-to-speech caller, live master call board, and interactive 5x5 player cards.
              </p>
            </div>

            {/* Interactive Bingo Wheel Engine Tool */}
            <div id="interactive-workspace" className="w-full pt-1">
              <BingoWheelEngine />
            </div>
          </section>

          {/* Provable Fairness & Privacy Bar (Home Page style) */}
          <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#1a1b22] dark:text-white">
                    Client-Side Web Cryptography (crypto.getRandomValues)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                  <Radio className="w-3.5 h-3.5 text-rose-500" />
                  <span>Strict Zero-Repeat Ball Draw Protocol</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero Account Required • Voice Caller Audio • 100% Free Forever</span>
              </div>
            </div>
          </section>

          {/* Editorial Content Container */}
          <article className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 space-y-8 sm:space-y-10">

          {/* Direct Answer Block Below Wheel Container */}
          <div className="mb-10">
            <DirectAnswer
              question="What is the Bingo Spin Wheel?"
              answer="The Bingo Spin Wheel is a free, interactive online random number caller designed for 75-Ball, 90-Ball, and 30-Ball Bingo. It spins to select numbers without repeats, tracks draws on a live master board, offers voice text-to-speech calling, and provides interactive digital player cards."
            />
          </div>

          {/* Quick Facts Component */}
          <div className="mb-10">
            <QuickFacts
              facts={{
                toolName: 'Bingo Spin Wheel & Caller',
                purpose: 'Random bingo number generation and live automated game calling',
                bestFor: 'Classroom games, senior center bingo, family game nights, and fundraiser events',
                modes: ['75-Ball US Bingo', '90-Ball UK Bingo', '30-Ball Speed Mini', 'Player Cards Mode'],
                customization: ['Spin Speed (1.5s to 8.5s)', 'Voice TTS Caller', 'Master Board History', 'Card Dabbing'],
                accountRequired: 'No Account Required',
                cost: '100% Free Forever',
                selectionMethod: 'Browser Web Cryptography API (crypto.getRandomValues)'
              }}
            />
          </div>

          {/* Concrete Example */}
          <div className="mb-10">
            <ConcreteExample
              example={{
                title: 'Example Bingo Call Workflow',
                scenario: 'A classroom teacher spins the 75-Ball Bingo Wheel during math review. 75 numbers (B1–15 through O61–75) are in the pool.',
                userChoices: ['B-12', 'I-24', 'N-37', 'G-51', 'O-68'],
                result: 'N-37',
                explanation: 'The wheel landed firmly on N-37, the audio voice caller announced "N, 37", and cell 37 lit up on the Master Call Board while locking against repeat draws.'
              }}
            />
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Dices className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">75, 90 & Mini Modes</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Full support for standard 75-Ball US Bingo (B-I-N-G-O), 90-Ball UK Bingo, and 30-Ball speed games.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
                <Grid className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Master Call Board</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Live interactive matrix highlights all called numbers with B-I-N-G-O column grouping and recent call log.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Radio className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Voice Audio Caller</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Built-in Web Speech API announcer vocalizes each called letter and number with realistic caller sound FX.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Interactive Player Cards</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Generate 5x5 player cards in browser for players to dab numbers and automatically detect 5-in-a-row BINGO!
              </p>
            </div>
          </div>

          {/* Deep Editorial Content */}
          <section className="space-y-12 mb-16 text-gray-800 dark:text-gray-200">
            {/* Step-by-Step Instructions */}
            <div className="bg-white dark:bg-[#161722] p-6 sm:p-8 rounded-2xl border border-[#eceaf6] dark:border-[#27283c] shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                How to Host a Game with the Bingo Spin Wheel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Select Your Bingo Mode</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Choose <strong>75-Ball</strong> for traditional American B-I-N-G-O, <strong>90-Ball</strong> for UK/Aussie games, or <strong>30-Ball</strong> for rapid mini games.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Spin & Call Numbers</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Click <strong>CALL NEXT BINGO NUMBER</strong>. The wheel spins smoothly and announces the result with sound FX and voice text-to-speech. Numbers are drawn strictly without repeats!
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Track on Master Board & Cards</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    View called numbers on the <strong>Master Call Board</strong> or hand out digital <strong>Player Cards</strong> for participants to mark their numbers in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Bingo Game Formats */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-white">
                Popular Bingo Game Formats & Ideas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <span className="font-bold text-sm text-blue-600 dark:text-blue-400 block">Classroom Vocabulary Bingo</span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Teachers assign numbers to vocabulary words or math problems. Spin the wheel to pick the next question and keep students engaged on smartboards.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <span className="font-bold text-sm text-rose-600 dark:text-rose-400 block">Family & Party Night Bingo</span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    No physical bingo cage or wooden balls required! Turn on the Voice Caller and project the wheel onto TV screens for holiday family gatherings.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#161722] border border-[#eceaf6] dark:border-[#27283c] space-y-2">
                  <span className="font-bold text-sm text-purple-600 dark:text-purple-400 block">Fundraiser & Community Events</span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Browser-based cryptographic randomness (crypto.getRandomValues()) guarantees equal odds for charity raffles, church bingo nights, and corporate team-building events.
                  </p>
                </div>
              </div>
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
                    How does the Bingo spin wheel ensure numbers are not repeated?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    When a number is drawn, the engine automatically records it in the called numbers history and removes it from the active spin wheel pool. No number can be picked twice until you click the Reset Game button.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Can I use this for 75-Ball, 90-Ball, and Mini Bingo games?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Yes! The tool supports 75-Ball American Bingo (B1-15, I16-30, N31-45, G46-60, O61-75), 90-Ball UK/Australian Bingo (1-90), and 30-Ball Speed Mini Bingo with a single click.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Does the tool have voice calling audio for numbers?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Yes! You can toggle the &quot;Voice ON&quot; button to enable real-time speech synthesis that reads out the letter and number as each ball lands (e.g. &quot;B, 12&quot; or &quot;N, 35&quot;).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1b28] border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    How do players mark numbers on their bingo cards?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Switch to the &quot;Player Cards&quot; tab. Players can generate custom 5x5 bingo cards and click or tap any cell to dab called numbers. The engine automatically detects 5-in-a-row BINGO wins along rows, columns, and diagonals!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Tools & Wheels */}
            <div className="p-6 rounded-2xl bg-[#f8f7fd] dark:bg-[#171825] border border-[#eceaf6] dark:border-[#27283c]">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Explore More Games & Classroom Wheels
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <Link
                  href="/number-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Number Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Random range & dice roller</span>
                </Link>

                <Link
                  href="/classroom-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Classroom Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Student & group picker</span>
                </Link>

                <Link
                  href="/question-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Question Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Icebreakers & trivia prompts</span>
                </Link>

                <Link
                  href="/drawing-wheel"
                  className="p-3 rounded-xl bg-white dark:bg-[#202130] border border-gray-200/80 dark:border-gray-700/80 hover:border-indigo-400 transition-colors block text-center"
                >
                  <span className="font-bold text-gray-900 dark:text-white block mb-0.5">Drawing Wheel</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Art & Pictionary ideas</span>
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
