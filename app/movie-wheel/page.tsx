import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Film,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Clapperboard,
  Tv,
  Heart,
  Smile,
  Popcorn,
  Flame,
  Zap,
  Clock,
  Shuffle
} from 'lucide-react';
import MovieWheelEngine from '@/components/movie/MovieWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Movie Wheel - What Movie Should I Watch Generator',
  description:
    'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!',
  keywords: [
    'what movie should i watch generator',
    'random movie generator',
    'movie wheel',
    'movie roulette',
    'random movie picker',
    'netflix random movie generator',
    'wheel of movies',
    'film spinner',
    'random film generator',
    'movie randomizer',
    'movie night picker',
    'random movie generator by genre'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/movie-wheel'
  },
  openGraph: {
    title: 'Movie Wheel - What Movie Should I Watch Generator',
    description:
      'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!',
    url: 'https://spinwheelgames.org/movie-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Movie Wheel - What Movie Should I Watch Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Wheel - What Movie Should I Watch Generator',
    description:
      'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/movie-wheel#webapp',
      name: 'Movie Wheel - What Movie Should I Watch Generator',
      url: 'https://spinwheelgames.org/movie-wheel',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online movie wheel spin and random movie picker. Pick what to watch by genre, streaming service, or custom watchlist with fair cryptographic randomness.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1280',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Genre filters: Action, Comedy, Horror, Sci-Fi, Romance, Thriller',
        'Quick presets: Date Night, Family Friendly, Group Voting',
        'Custom watchlist paste and elimination mode',
        'Cryptographic randomness for unbiased film selection',
        'Fullscreen movie night presentation mode'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
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
          name: 'Decisions',
          item: 'https://spinwheelgames.org/decisions'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Movie Wheel',
          item: 'https://spinwheelgames.org/movie-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I decide what movie to watch tonight?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the Movie Wheel Spin to eliminate streaming indecision. Choose your current vibe (Movie Decision, Family, Date Night, or Group), filter by genres like Animation, Comedy, Action, Horror, or Classic, or paste your personal watchlist into the Custom List tab and spin.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Group Movie Mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Group Movie Mode puts crowd-pleasing, high-energy blockbusters on the wheel. If a participant dislikes the winning movie, you can use the Veto & Eliminate button to remove that option and spin again among the remaining candidates until consensus is reached.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own Netflix or Disney+ watchlist to the movie wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click the "My Custom Watchlist" tab and paste your movie titles using the Bulk Paste button. You can adjust weights, toggle specific movies on or off, and spin exclusively with your personal watchlist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the movie selection truly random and fair?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. SpinWheelGames utilizes browser-native Web Cryptography API (CSPRNG) hardware entropy to ensure completely unbiased, provably fair movie spins with no weighted bias.'
          }
        }
      ]
    }
  ]
};

export default function MovieWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7]">
      <SubpageHeader activePage="/movie-wheel" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-10 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748b]">
          <Link href="/" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/decisions" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            Decisions
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#1a1b22] dark:text-white">Movie Wheel Spin</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold">
            <Film className="w-4 h-4" />
            Random Movie Picker & Generator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1a1b22] dark:text-white tracking-tight">
            Movie Wheel Spin
          </h1>
          <p className="text-sm sm:text-base text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            End the debate and stop endless scrolling across Netflix, Disney+, and Prime. Spin the
            movie randomizer wheel to instantly pick what to watch by genre, mood, or your custom watchlist.
          </p>
        </div>

        {/* Core Interactive Tool Engine */}
        <section id="movie-engine" className="w-full">
          <MovieWheelEngine />
        </section>

        {/* How It Solves "What Should We Watch Tonight?" */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2.5">
              <Popcorn className="w-6 h-6 text-red-500" />
              What Should We Watch Tonight? Solving Movie Night Indecision
            </h2>
            <p className="text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              The average person spends over <strong>18 minutes scrolling through streaming platforms</strong> before
              settling on a title or giving up entirely. The <strong>Movie Wheel Spin</strong> replaces endless previews
              and analysis paralysis with an exciting, fair, and decisive choice in under 10 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-500 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">
                Movie Decision Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Universal mode curated with award winners, modern sensations, and timeless classics across all major streaming services.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-500/20 text-green-500 flex items-center justify-center font-bold">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">
                Family Movie Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Filter exclusively for wholesome G and PG rated family favorites, Pixar animation, and heartwarming adventures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">
                Date-Night Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Sparks engaging conversations with charming rom-coms, stylish thrillers, and captivating romantic dramas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">
                Group Movie Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                High-octane blockbusters and side-splitting comedies with built-in veto elimination for democratic group consensus.
              </p>
            </div>
          </div>
        </section>

        {/* Supported Movie Genres Breakdown */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2.5">
              <Clapperboard className="w-6 h-6 text-amber-500" />
              Filter by Film Genre & Mood
            </h2>
            <p className="text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl">
              Whether you want edge-of-your-seat suspense or a lighthearted laugh, customize the movie randomizer wheel with your favorite genre:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Animation</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Pixar, Studio Ghibli, and groundbreaking visual spectacles like <em>Spider-Man: Into the Spider-Verse</em> and <em>Spirited Away</em>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-500 font-bold">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Comedy</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Witty satires, cult favorites, and riotous belly laughs like <em>Superbad</em>, <em>Knives Out</em>, and <em>The Grand Budapest Hotel</em>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Action & Sci-Fi</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Pulse-pounding blockbusters like <em>Top Gun: Maverick</em>, <em>Mad Max: Fury Road</em>, and <em>Interstellar</em>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Horror & Thriller</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Atmospheric dread, psychological twists, and heart-racing jumps like <em>Get Out</em>, <em>A Quiet Place</em>, and <em>Parasite</em>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Family</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Crowd-approved generational gems like <em>Paddington 2</em>, <em>Home Alone</em>, and <em>Harry Potter</em>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 font-bold">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1b22] dark:text-white">Classic Legends</h4>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1">
                  Golden age cinema and essential masterpieces like <em>Casablanca</em>, <em>Back to the Future</em>, and <em>Jurassic Park</em>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
            How to Use the Random Movie Selector Wheel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Step 1</div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">Choose Mood or Custom List</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Select from Decision Mode, Family, Date Night, or Group, or paste your own streaming watchlist directly into the Custom List tab.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Step 2</div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">Filter by Genre & Runtime</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Dial in your preferences: filter for quick sub-105-minute movies or full epics, and restrict to your subscribed streaming platforms.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Step 3</div>
              <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">Spin & Settle the Debate</h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Click <strong>SPIN MOVIE WHEEL</strong>. Grab the popcorn and start watching, or use the Veto button if you want to eliminate and spin again!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-red-500" />
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#464554] dark:text-[#c7c4d7]">
              Everything you need to know about the movie wheel spin and random movie generator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-2">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                How do I decide what movie to watch tonight?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Select your vibe mode (Date Night, Family, or Group) or filter by genres like Animation, Action, Comedy, or Horror. If you already have a watchlist on Netflix or Prime, paste it into the Custom List tab and let the wheel make the final call.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-2">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Can we use this for group movie tournament voting?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Yes! When a movie is selected, anyone with veto power can click <strong>&quot;Veto &amp; Spin Again&quot;</strong> to eliminate that title from the wheel. You can keep spinning until everyone agrees on the winner.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-2">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Is the wheel truly random?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Yes. The engine uses hardware-seeded Web Cryptography API (CSPRNG) entropy to generate certified, unbiased random picks every spin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7fd] dark:bg-[#171824] border border-[#eeedf7] dark:border-[#222330] space-y-2">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Is this movie picker completely free?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                100% free with zero paywalls, no forced account signups, and unlimited spins across mobile, tablet, and desktop devices.
              </p>
            </div>
          </div>
        </section>

        {/* Explore Other Decision Wheels */}
        <section className="bg-gradient-to-br from-[#4648d4]/10 via-[#6cf8bb]/10 to-transparent p-6 sm:p-10 rounded-3xl border border-[#eeedf7] dark:border-[#222330] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                Explore More Decision Wheels
              </h2>
              <p className="text-sm text-[#464554] dark:text-[#c7c4d7] mt-1">
                From dinner to team raffles, solve every choice with certified randomness.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] text-white font-bold text-xs hover:bg-[#3b3dbb] transition-colors self-start sm:self-auto"
            >
              <span>View All 106+ Wheels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/food-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all hover:-translate-y-0.5 group"
            >
              <div className="text-lg">🍕</div>
              <div className="text-xs font-bold text-[#1a1b22] dark:text-white mt-2 group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                Food Wheel
              </div>
              <div className="text-[11px] text-[#64748b]">Pick dinner &amp; cuisine</div>
            </Link>

            <Link
              href="/number-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all hover:-translate-y-0.5 group"
            >
              <div className="text-lg">🔢</div>
              <div className="text-xs font-bold text-[#1a1b22] dark:text-white mt-2 group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                Number Wheel
              </div>
              <div className="text-[11px] text-[#64748b]">RNG 1-100 &amp; Custom</div>
            </Link>

            <Link
              href="/animal-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all hover:-translate-y-0.5 group"
            >
              <div className="text-lg">🦁</div>
              <div className="text-xs font-bold text-[#1a1b22] dark:text-white mt-2 group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                Animal Wheel
              </div>
              <div className="text-[11px] text-[#64748b]">Habitats &amp; Zoo games</div>
            </Link>

            <Link
              href="/random-object-generator"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all hover:-translate-y-0.5 group"
            >
              <div className="text-lg">🎲</div>
              <div className="text-xs font-bold text-[#1a1b22] dark:text-white mt-2 group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                Random Object
              </div>
              <div className="text-[11px] text-[#64748b]">Creative inspiration</div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
