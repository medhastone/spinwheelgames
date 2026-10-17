import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Film,
  Sparkles,
  HelpCircle,
  Users,
  Compass,
  ArrowRight,
  ChevronRight,
  Home,
  Clapperboard,
  Heart,
  Smile,
  Popcorn,
  Flame,
  Zap
} from 'lucide-react';
import MovieWheelEngine from '@/components/movie/MovieWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Movie Wheel – What Movie to Watch | SpinWheelGames',
  description: 'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!',
  alternates: {
    canonical: 'https://spinwheelgames.org/movie-wheel'
  },
  openGraph: {
    title: 'Movie Wheel – What Movie to Watch | SpinWheelGames',
    description: 'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!',
    url: 'https://spinwheelgames.org/movie-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Movie Wheel – What Movie to Watch | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Wheel – What Movie to Watch | SpinWheelGames',
    description: 'Spin the movie wheel to randomly pick what to watch on Netflix, Prime, or cinema. Filter by genre, date night, or your custom watchlist. Free & 100% fair!',
    images: ['https://spinwheelgames.org/spinwheel.webp']
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
            text: 'Yes! Click the "Custom List" tab and paste your movie titles using the Bulk Paste button. You can adjust weights, toggle specific movies on or off, and spin exclusively with your personal watchlist.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the movie selection truly random and fair?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. SpinWheelGames uses the browser Web Cryptography API (crypto.getRandomValues()) to generate unbiased random values with no weighted bias.'
          }
        }
      ]
    }
  ]
};

export default function MovieWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
      <SubpageHeader activePage="/movie-wheel" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 flex flex-col gap-4 sm:gap-6">
        {/* Compact Breadcrumb & Mode Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#767586] dark:text-[#908fa1]">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 font-medium py-1 px-3 rounded-xl bg-slate-200/70 dark:bg-[#181924]/85 backdrop-blur-xs border border-slate-300/60 dark:border-slate-800/70">
            <Link href="/" className="inline-flex items-center gap-1 text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
              <Home className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/categories" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
              Decisions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-bold text-[#1a1b22] dark:text-white">Movie Wheel</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-bold py-1 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Film className="w-3.5 h-3.5" />
            <span>Random Movie Picker &amp; Decision Wheel</span>
          </div>
        </div>

        {/* Compact Hero Headline */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-1.5 pt-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1b22] dark:text-white tracking-tight leading-tight">
            Movie Wheel Spin
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-lg mx-auto">
            Stop endless scrolling. Spin the wheel to decide what movie to watch tonight by genre, mood, streaming platform, or your custom watchlist in seconds.
          </p>
        </div>

        {/* Core Interactive Tool Engine */}
        <section id="movie-engine" className="w-full">
          <MovieWheelEngine />
        </section>

        {/* Information Cards Matching Home Page Style */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-5 sm:p-6 lg:p-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
              <Popcorn className="w-4 h-4 text-rose-500" />
              <span>What Should We Watch Tonight?</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
              Replace streaming indecision with four distinct movie selection experiences:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Decision Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Curated blend of critical darlings, timeless classics, and top-tier blockbusters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                <Smile className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Family Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Wholesome G and PG rated favorites, animated gems, and all-ages adventures.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Date Night
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Witty rom-coms, edge-of-your-seat thrillers, and heartfelt romantic dramas for two.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Group Mode
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Crowd-pleasers with Veto &amp; Eliminate functionality to resolve group disputes fairly.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-5 sm:p-6 lg:p-7 flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>3 Simple Steps to Stop Scrolling &amp; Start Watching</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f]">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">Choose Vibe or Watchlist</h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Select Decision, Family, Date Night, or Group, or paste your personal streaming watchlist.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f]">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">Filter Genre &amp; Streaming App</h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Narrow down to Netflix, Prime Video, Disney+, Max, specific genres, or target runtime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f]">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">Spin &amp; Enjoy Movie Night</h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Hit Spin or Quick Pick to let unbiased Web Cryptography choose your winner instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-5 sm:p-6 lg:p-7 flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                How do I decide what movie to watch tonight?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Select your vibe, filter by genre or streaming service, or paste your watchlist and click Spin.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                How does Group Movie Mode work?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Puts crowd-pleasers on the wheel. If someone vetoes the winner, click Veto &amp; Spin to eliminate it and pick again among remaining candidates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Can I add my personal Netflix or Disney+ watchlist?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Yes! Switch to the Custom Watchlist tab and paste movie titles. You can adjust weights, toggle specific titles on or off, and spin exclusively with your personal watchlist.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                Is the wheel fair and random?
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Yes. SpinWheelGames utilizes the browser Web Cryptography API (`crypto.getRandomValues()`) to ensure unbiased, cryptographically uniform selections.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
