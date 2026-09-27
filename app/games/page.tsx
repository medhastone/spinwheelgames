import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DirectAnswer from '@/components/DirectAnswer';
import AllGamesExplorer from '@/components/AllGamesExplorer';
import { Sparkles, ShieldCheck, Flame, Star, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wheel Games - 180+ Free Online Decision Spinners & Wheels',
  description:
    'Explore 180+ free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. 100% fair and customizable!',
  keywords: [
    'spin the wheel games',
    'online wheel games',
    'free wheel spinners',
    'decision maker wheels',
    'random picker games',
    'classroom spinner games',
    'party wheel games',
    'wheel of fortune online'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/games'
  },
  openGraph: {
    title: 'Wheel Games - 180+ Free Online Decision Spinners & Wheels',
    description:
      'Explore 180+ free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. 100% fair and customizable!',
    url: 'https://spinwheelgames.org/games',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'All Wheel Games & Decision Spinners'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wheel Games - 180+ Free Online Decision Spinners & Wheels',
    description:
      'Explore 180+ free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. 100% fair and customizable!'
  }
};

export default function AllGamesPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All 180+ Wheel Games & Decision Spinners',
    description:
      'Explore 180+ free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. 100% fair and customizable!',
    url: 'https://spinwheelgames.org/games',
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SpinWheelGames',
      url: 'https://spinwheelgames.org/'
    },
    about: {
      '@type': 'Thing',
      name: 'Random Wheel Games and Decision Spinners'
    },
    hasPart: [
      { '@type': 'WebApplication', name: 'Food Wheel', url: 'https://spinwheelgames.org/food-wheel' },
      { '@type': 'WebApplication', name: 'Movie Wheel', url: 'https://spinwheelgames.org/movie-wheel' },
      { '@type': 'WebApplication', name: 'Number Wheel', url: 'https://spinwheelgames.org/number-wheel' },
      { '@type': 'WebApplication', name: 'Bingo Wheel', url: 'https://spinwheelgames.org/bingo-wheel' },
      { '@type': 'WebApplication', name: 'Animal Wheel', url: 'https://spinwheelgames.org/animal-wheel' },
      { '@type': 'WebApplication', name: 'Classroom Wheel', url: 'https://spinwheelgames.org/classroom-wheel' },
      { '@type': 'WebApplication', name: 'Drawing Wheel', url: 'https://spinwheelgames.org/drawing-wheel' },
      { '@type': 'WebApplication', name: 'Question Wheel', url: 'https://spinwheelgames.org/question-wheel' },
      { '@type': 'WebApplication', name: 'Random Object Generator', url: 'https://spinwheelgames.org/random-object-generator' },
      { '@type': 'WebApplication', name: 'Song Wheel', url: 'https://spinwheelgames.org/song-wheel' },
      { '@type': 'WebApplication', name: 'Team Generator', url: 'https://spinwheelgames.org/team-generator' },
      { '@type': 'WebApplication', name: 'Theme Wheel', url: 'https://spinwheelgames.org/theme-wheel' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] flex flex-col justify-between transition-colors duration-200">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Global Navbar */}
      <Navbar activeNav="/games" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-8 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'All 180+ Wheel Games' }
          ]}
        />

        {/* Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Catalog (180+ Wheels)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              Trending &amp; Hot Picks
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Explore All 180+ Wheel Games &amp; Decision Spinners
          </h1>

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl mx-auto">
            Browse our complete directory of interactive wheel games, decision engines, classroom callers, party pickers, and cryptographic lottery spinners. Filter by category or explore trending, hot viral, and most popular wheels.
          </p>

          <DirectAnswer
            question="What is the complete SpinWheelGames library?"
            answer="The SpinWheelGames library contains over 180+ verified, free online randomizers spanning 18 distinct categories including decisions, names, dining, classroom education, party games, giveaways, and number RNGs. Every wheel runs client-side with zero tracking and cryptographically unbiased randomness."
          />
        </section>

        {/* Dynamic Games Explorer Component with Search, Level Filters & Categories */}
        <section className="pt-2">
          <AllGamesExplorer />
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
