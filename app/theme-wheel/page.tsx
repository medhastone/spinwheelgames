import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  PartyPopper,
  Cake,
  GraduationCap,
  Video,
  Calendar,
  Plus,
  Palette,
  PenTool,
  RefreshCw,
  Heart,
  Sliders,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import ThemeWheelEngine from '@/components/themes/ThemeWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Theme Wheel – Party & Event Spinner | SpinWheelGames",
  "description": "Spin the free theme wheel to generate random party themes, birthday party ideas, classroom activities, content creator concepts, seasonal festivals, and custom themes.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/theme-wheel"
  },
  "openGraph": {
    "title": "Theme Wheel – Party & Event Spinner | SpinWheelGames",
    "description": "Spin the free theme wheel to generate random party themes, birthday party ideas, classroom activities, content creator concepts, seasonal festivals, and custom themes.",
    "url": "https://spinwheelgames.org/theme-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Ftheme-wheel&title=Theme+Wheel+%E2%80%93+Party+%26+Event+Spinner+%7C+SpinWheelGames&desc=Spin+the+free+theme+wheel+to+generate+random+party+themes%2C+birthday+party+ideas%2C+classroom+activities%2C+content+creator+concepts%2C+seasonal+festivals%2C+and+custom+themes.",
        "width": 1200,
        "height": 630,
        "alt": "Theme Wheel – Party & Event Spinner | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Theme Wheel – Party & Event Spinner | SpinWheelGames",
    "description": "Spin the free theme wheel to generate random party themes, birthday party ideas, classroom activities, content creator concepts, seasonal festivals, and custom themes.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Ftheme-wheel&title=Theme+Wheel+%E2%80%93+Party+%26+Event+Spinner+%7C+SpinWheelGames&desc=Spin+the+free+theme+wheel+to+generate+random+party+themes%2C+birthday+party+ideas%2C+classroom+activities%2C+content+creator+concepts%2C+seasonal+festivals%2C+and+custom+themes."
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/theme-wheel#webapp',
      name: 'Theme Wheel & Spin Wheel Themes',
      url: 'https://spinwheelgames.org/theme-wheel',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern web browser with HTML5 Canvas',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description:
        'Interactive random theme wheel generator featuring dedicated modes for Party themes, Birthday themes, Classroom themes, Content creator themes, Seasonal celebrations, and Custom themes with No-Repeat elimination.'
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
          name: 'Creative Tools',
          item: 'https://spinwheelgames.org/theme-wheel'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Theme Wheel',
          item: 'https://spinwheelgames.org/theme-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/theme-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What categories are supported on the Theme Wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Theme Wheel provides dedicated categories for Party themes, Birthday themes, Classroom themes, Content creator ideas, Seasonal festivals, Custom user themes, Drawing prompts, and Writing hooks.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the No-Repeat Deck mode work on the Theme Wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat Deck is turned on, any theme drawn by the wheel is automatically hidden from future spins. This guarantees unique results across rounds without duplicates until you tap Reset.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add or import my own custom theme lists?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Select the Custom tab to add individual themes, or click Bulk Paste to import an entire list of themes and scenario ideas at once.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the Theme Wheel 100% fair and random?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The wheel uses cryptographic random number generation (Web Crypto API) ensuring unbiased mathematical odds for every theme slice.'
          }
        }
      ]
    }
  ]
};

const THEME_CATEGORIES_INFO = [
  {
    title: 'Party Themes',
    description: 'Costume ideas, dress codes, decor, and playlist vibes for epic social gatherings and dance parties.',
    icon: PartyPopper,
    color: 'from-purple-500/10 to-indigo-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20',
    badge: 'Nightlife & Fun',
    examples: ['90s Neon Retro Disco', 'Venetian Masquerade', 'Tropical Island Luau', 'Gatsby Speakeasy']
  },
  {
    title: 'Birthday Themes',
    description: 'Milestone celebrations, kids parties, teen bashes, and adult birthday adventures with themed activities.',
    icon: Cake,
    color: 'from-pink-500/10 to-rose-500/5 text-pink-600 dark:text-pink-400 border-pink-500/20',
    badge: 'Celebrations',
    examples: ['Golden Milestone Glitz', 'Retro Arcade Pixel', 'Enchanted Fairytale', 'Glow Bowling Arena']
  },
  {
    title: 'Classroom Themes',
    description: 'Engaging student projects, science fair prompts, historical debates, and collaborative group challenges.',
    icon: GraduationCap,
    color: 'from-blue-500/10 to-cyan-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20',
    badge: 'Education',
    examples: ['Science Fair Innovation', 'Historical Figures Debate', 'Mars Colony Engineering', 'Shark Tank Pitches']
  },
  {
    title: 'Content Themes',
    description: 'Viral ideas for YouTube videos, TikTok trends, podcast episodes, short-form reels, and livestreams.',
    icon: Video,
    color: 'from-rose-500/10 to-amber-500/5 text-rose-600 dark:text-rose-400 border-rose-500/20',
    badge: 'Creators',
    examples: ['24-Hour Swap Routine', 'Budget vs Luxury Duel', 'Street Hot Takes', 'Silent ASMR Work Session']
  },
  {
    title: 'Seasonal Themes',
    description: 'Spring picnics, summer pool splashes, autumn harvest, winter holiday cheer, Halloween, and New Year.',
    icon: Calendar,
    color: 'from-amber-500/10 to-orange-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20',
    badge: 'Year-Round',
    examples: ['Spooky Halloween Monster Bash', 'Winter Wonderland Cheer', 'Autumn Harvest Fest', 'Midsummer Splash']
  },
  {
    title: 'Custom Themes',
    description: 'Build your own personalized wheel or paste bulk theme lists directly from spreadsheets or notes.',
    icon: Plus,
    color: 'from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    badge: 'Full Control',
    examples: ['Custom Party Dress Codes', 'Family Game Night Roster', 'Team Building Icebreakers', 'Book Club Topics']
  }
];

const THEME_FAQS = [
  {
    q: 'What categories are supported on the Theme Wheel?',
    a: 'The Theme Wheel provides 6 core categories requested by organizers: Party themes, Birthday themes, Classroom themes, Content creator ideas, Seasonal celebrations, and Custom themes, plus drawing and writing creative prompts.'
  },
  {
    q: 'How does No-Repeat Deck mode work?',
    a: 'When No-Repeat Deck is enabled, every drawn theme is removed from the active wheel pool. This prevents duplicate draws across rounds or party games until you click Reset Deck.'
  },
  {
    q: 'Can I add or import my own custom theme list?',
    a: 'Yes! Switch to the Custom tab to enter themes one by one, or click Bulk Paste to paste dozens of lines simultaneously formatted as Title | Optional description.'
  },
  {
    q: 'Can I save favorite themes to review later?',
    a: 'Yes! Simply click the heart icon on any selected result card or game header to store it in your browser favorites for instant recall.'
  }
];

export default function ThemeWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf9fe] dark:bg-[#0e0f15] text-[#1a1b22] dark:text-[#f4f3fb] flex flex-col w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/theme-wheel" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12">
        {/* Top Hero Container */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Creative Wheels', href: '/categories' },
              { label: 'Theme Wheel' }
            ]}
          />

          {/* Hero Header Banner */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Random Theme Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Theme Wheel &amp; Spin Wheel Themes
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Spin the free theme wheel for party themes, birthday ideas, classroom activities, content creator concepts, seasonal festivals, and custom prompts.
            </p>
          </div>

          {/* Interactive Wheel Engine */}
          <div id="tool-interactive">
            <ThemeWheelEngine />
          </div>
        </section>

        {/* 1. Dedicated Theme Categories Showcase (Compact Flat Cards) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Theme Categories
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Curated Wheel Presets for Any Event
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Switch categories instantly with instant presets or create your own custom theme wheel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {THEME_CATEGORIES_INFO.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${cat.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Examples list */}
                  <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                    <div className="flex flex-wrap gap-1">
                      {cat.examples.map((ex, eIdx) => (
                        <span
                          key={eIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#12131a] text-slate-600 dark:text-slate-400 font-medium"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Key Features Strip (Compact) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Wheel Features
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Built for Fair Draws &amp; Fast Brainstorms
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">No-Repeat Elimination Deck</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Prevents duplicate themes across rounds. Drawn items disappear until you click reset.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="p-2 w-fit rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Bookmark Favorite Themes</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Save winning ideas with one click to your local profile favorites for quick retrieval.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="p-2 w-fit rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Bulk Paste &amp; Custom Editor</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Add your own themes or paste spreadsheet lists with prompt descriptions in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Frequently Asked Questions (Compact) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Theme Wheel FAQ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {THEME_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Wheels Strip */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <h3 className="font-bold text-sm sm:text-base">Looking for other decision spinners?</h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Explore our Color Wheel, Wheel of Names, Food Wheel, and Classroom Wheel.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/color-wheel"
                className="px-3 py-1.5 rounded-xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 transition-colors"
              >
                Color Wheel
              </Link>
              <Link
                href="/classroom-wheel"
                className="px-3 py-1.5 rounded-xl bg-purple-800 text-white font-bold text-xs hover:bg-purple-700 transition-colors"
              >
                Classroom Wheel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
