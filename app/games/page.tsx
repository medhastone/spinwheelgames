import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DirectAnswer from '@/components/DirectAnswer';
import AllGamesExplorer from '@/components/AllGamesExplorer';
import { Sparkles, ShieldCheck, Flame, Star, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All 180+ Wheel Games & Decision Spinners | SpinWheelGames',
  description:
    'Explore all 180+ free online wheel games, random name pickers, decision makers, classroom spinners, party games, and raffles by categories and popularity levels.',
  alternates: {
    canonical: 'https://spinwheelgames.org/games'
  },
  openGraph: {
    title: 'All 180+ Wheel Games & Decision Spinners | SpinWheelGames',
    description:
      'Explore all 180+ free online wheel games, random name pickers, decision makers, classroom spinners, party games, and raffles by categories and popularity levels.',
    url: 'https://spinwheelgames.org/games',
    siteName: 'SpinWheelGames',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 180+ Wheel Games & Decision Spinners | SpinWheelGames',
    description:
      'Explore all 180+ free online wheel games, random name pickers, decision makers, classroom spinners, party games, and raffles by categories and popularity levels.'
  }
};

export default function AllGamesPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All 180+ Wheel Games & Decision Spinners',
    description:
      'Explore all 180+ free online wheel games, random name pickers, decision makers, classroom spinners, party games, and raffles categorized by topic and trending levels.',
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
    }
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
        <section className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
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

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
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
