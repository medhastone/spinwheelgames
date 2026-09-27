import React from 'react';
import { Metadata } from 'next';
import {
  Sparkles,
  Palette,
  PenTool,
  PartyPopper,
  Camera,
  Video,
  BookOpen,
  Gamepad2,
  GraduationCap,
  RefreshCw,
  Heart,
  Sliders
} from 'lucide-react';
import ThemeWheelEngine from '@/components/themes/ThemeWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Theme Wheel - Random Party & Costume Theme Generator',
  description:
    'Spin the theme wheel to randomly pick party themes, Dress to Impress (DTI) styles, creative writing prompts, and event dress codes. 100% free & fun!',
  keywords: [
    'random party theme generator',
    'theme wheel',
    'costume theme wheel',
    'spin wheel themes',
    'dress to impress themes wheel',
    'dti theme wheel',
    'random theme generator',
    'event theme picker',
    'trivia night theme roulette',
    'creative writing theme generator'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/theme-wheel'
  },
  openGraph: {
    title: 'Theme Wheel - Random Party & Costume Theme Generator',
    description:
      'Spin the theme wheel to randomly pick party themes, Dress to Impress (DTI) styles, creative writing prompts, and event dress codes. 100% free & fun!',
    type: 'website',
    url: 'https://spinwheelgames.org/theme-wheel',
    siteName: 'SpinWheelGames',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Theme Wheel - Random Party & Costume Theme Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theme Wheel - Random Party & Costume Theme Generator',
    description:
      'Spin the theme wheel to randomly pick party themes, Dress to Impress (DTI) styles, creative writing prompts, and event dress codes. 100% free & fun!'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/theme-wheel#webapp',
      url: 'https://spinwheelgames.org/theme-wheel',
      name: 'Theme Wheel - Random Party & Costume Theme Generator',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive random theme wheel featuring 8 modes (Drawing, Writing, Party, Photography, Video, Storytelling, Gaming, Classroom, Custom), No-Repeat elimination deck, and favorite bookmarks.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1210',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '8 Curated Theme Modes: Parties, DTI Costumes, Creative Writing, Drawing, Video Prompts, Photography',
        'No-Repeat elimination mode for event rounds',
        'Custom themes bulk input with probability sliders',
        'Mobile responsive touch spinning and sound effects',
        'Fullscreen party presentation view'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/theme-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What modes are available on the Spin Wheel Themes generator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The theme wheel includes 8 creative modes: Drawing, Writing, Party, Photography, Video, Storytelling, Gaming, and Classroom, plus a Custom mode for adding your own themes.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat Deck mode work for themes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat Deck is enabled, every drawn theme is eliminated from the active pool until you click Reset Deck, ensuring fresh prompts without duplicates.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I import my own custom theme list?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Select Custom mode to add individual themes or click Bulk Import to paste an entire list of custom themes and prompt ideas at once.'
          }
        }
      ]
    }
  ]
};

export default function ThemeWheelPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
        <div className="mb-6 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
          <Breadcrumbs
            items={[
              { label: 'Creative & Games', href: '/sitemap' },
              { label: 'Spin Wheel Themes', href: '/theme-wheel' }
            ]}
          />
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Random Theme Generator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Spin Wheel Themes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Spin a random theme wheel for drawing, writing, parties, storytelling, videos, photography, games and creative challenges. Choose a built-in mode or add your own custom prompts.
          </p>
        </div>

        {/* Interactive Engine */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-12">
          <ThemeWheelEngine />
        </section>

        {/* Features Grid */}
        <section className="my-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black">8 Creative Tool Modes for Any Project</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Instant inspiration tailored for artists, writers, event planners, creators, and teachers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Drawing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Illustration, character concept art, and digital painting prompts with detailed scenery ideas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Writing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Flash fiction story hooks, journaling scenarios, and creative writing exercise starters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Party</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dress codes, decor concepts, playlist vibes, and party themes for birthdays and gatherings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Photography</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lighting setups, urban perspectives, macro nature challenges, and portraiture subjects.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Video</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Reel, TikTok, YouTube vlog, and short film concepts with rhythmic editing hooks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Storytelling</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Narrative arcs, dramatic betrayals, and tabletop RPG scenario hooks for dungeon masters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Gaming</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Game jam themes, game night challenges, and retro pixel art level design prompts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Classroom</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Student group challenges, debate questions, and science fair breakthrough prompts.
              </p>
            </div>
          </div>
        </section>

        {/* Highlights Banner */}
        <section className="my-16 bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black">Built for Creative Brainstorming & Fair Drawing</h2>
            <p className="text-sm sm:text-base text-purple-200 leading-relaxed">
              Never experience creator block again. Use <strong>No-Repeat Mode</strong> to eliminate drawn themes, bookmark top prompts to your <strong>Favorites</strong>, or import custom lists via <strong>Bulk Import</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-purple-300">
                  <RefreshCw className="w-4 h-4" />
                  <span>No-Repeat Deck</span>
                </div>
                <p className="text-xs text-purple-100">Draws unique themes without repeating until you click reset.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>Saved Favorites</span>
                </div>
                <p className="text-xs text-purple-100">Save themes to your profile favorites across sessions.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
                  <Sliders className="w-4 h-4" />
                  <span>Custom Import</span>
                </div>
                <p className="text-xs text-purple-100">Add individual prompts or paste whole lists at once.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-16 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                What modes are available on the Spin Wheel Themes generator?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The theme wheel includes 8 creative modes: Drawing, Writing, Party, Photography, Video, Storytelling, Gaming, and Classroom, plus a Custom mode for adding your own themes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                How does No-Repeat Deck mode work for themes?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When No-Repeat Deck is enabled, every drawn theme is eliminated from the active pool until you click Reset Deck, ensuring fresh prompts without duplicates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Can I import my own custom theme list?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Select Custom mode to add individual themes or click Bulk Import to paste an entire list of custom themes and prompt ideas at once.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
