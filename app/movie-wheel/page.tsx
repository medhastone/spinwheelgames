import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Film,
  Sparkles,
  HelpCircle,
  Users,
  Compass,
  ChevronRight,
  Home,
  Clapperboard,
  Heart,
  Smile,
  Popcorn,
  Zap,
  CheckCircle2,
  BookOpen,
  ListChecks
} from 'lucide-react';
import MovieWheelEngine from '@/components/movie/MovieWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import RelatedWheelsSection from '@/components/RelatedWheelsSection';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Movie Wheel – Random Movie Picker by Genre & Watchlist | SpinWheelGames',
  description:
    'End 30-minute Netflix and Prime scrolling fatigue. Filter by genre, date night, or paste your Letterboxd watchlist and use veto-elimination to pick a movie tonight.',
  alternates: {
    canonical: 'https://spinwheelgames.org/movie-wheel'
  },
  openGraph: {
    title: 'Movie Wheel – Random Movie Picker by Genre & Watchlist | SpinWheelGames',
    description:
      'End 30-minute Netflix and Prime scrolling fatigue. Filter by genre, date night, or paste your Letterboxd watchlist and use veto-elimination to pick a movie tonight.',
    url: 'https://spinwheelgames.org/movie-wheel',
    siteName: 'SpinWheelGames',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/api/og?path=%2Fmovie-wheel&title=Movie+Wheel+%E2%80%93+Random+Movie+Picker+by+Genre+%26+Watchlist+%7C+SpinWheelGames&desc=End+30-minute+Netflix+and+Prime+scrolling+fatigue.+Filter+by+genre%2C+date+night%2C+or+paste+your+Letterboxd+watchlist.',
        width: 1200,
        height: 630,
        alt: 'Movie Wheel – Random Movie Picker by Genre & Watchlist | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Wheel – Random Movie Picker by Genre & Watchlist | SpinWheelGames',
    description:
      'End 30-minute Netflix and Prime scrolling fatigue. Filter by genre, date night, or paste your Letterboxd watchlist and use veto-elimination to pick a movie tonight.',
    images: [
      'https://spinwheelgames.org/api/og?path=%2Fmovie-wheel&title=Movie+Wheel+%E2%80%93+Random+Movie+Picker+by+Genre+%26+Watchlist+%7C+SpinWheelGames&desc=End+30-minute+Netflix+and+Prime+scrolling+fatigue.+Filter+by+genre%2C+date+night%2C+or+paste+your+Letterboxd+watchlist.'
    ]
  }
};

const EXAMPLE_MOVIE_PRESETS = [
  {
    title: '1. Friday Couple Date Night (Nominate 3 Each)',
    scenario:
      'Both partners nominate three movies they genuinely want to watch—mixing romance, mystery, and comedy—so neither person feels stuck watching a film they hate.',
    slices: [
      'Knives Out (Mystery Comedy)',
      'About Time (Sci-Fi Romance)',
      'La La Land (Musical Drama)',
      'Palm Springs (Time-Loop Rom-Com)',
      'Before Sunrise (Romantic Drama)',
      'Crazy Rich Asians (Rom-Com)'
    ]
  },
  {
    title: '2. Family Pizza & PG Movie Night',
    scenario:
      'Designed for parents and kids ages 6–14 where every kid gets two nominations on the wheel and agrees to celebrate the winning pick without complaints.',
    slices: [
      'Spider-Man: Into the Spider-Verse',
      'Paddington 2',
      'The Mitchells vs. the Machines',
      'Coco',
      'How to Train Your Dragon',
      'Ratatouille',
      'Puss in Boots: The Last Wish',
      'The Incredibles'
    ]
  },
  {
    title: '3. Letterboxd & Prestige Watchlist Backlog',
    scenario:
      'Stop letting critically acclaimed classics sit unwatched in your watchlist for three years. Put 6 high-priority films on the wheel and remove each winner after watching.',
    slices: [
      'Parasite (2019)',
      'Everything Everywhere All at Once',
      'Whiplash',
      'Arrival',
      'The Grand Budapest Hotel',
      'No Country for Old Men'
    ]
  },
  {
    title: '4. Two-Stage Genre-First Decider Wheel',
    scenario:
      'When your group cannot even agree on specific titles, spin a 7-slice Genre Wheel first to lock in tonight’s mood, then spend 2 minutes picking a movie inside that genre.',
    slices: [
      '90-Minute Comedies',
      'Mind-Bending Sci-Fi',
      'Cozy Whodunit Mystery',
      'A24 Indie Thriller',
      '90s Action Throwback',
      'Studio Ghibli Animation',
      'True Crime Documentary'
    ]
  },
  {
    title: '5. Roommate Horror & Late-Night Cult Classics',
    scenario:
      'Perfect for Friday nights or October movie marathons when friends want high-tension thrillers, supernatural horror, or camp classics.',
    slices: [
      'Get Out',
      'Hereditary',
      'The Thing (1982)',
      'Scream (1996)',
      'Train to Busan',
      'A Quiet Place',
      'Shaun of the Dead'
    ]
  }
];

const MOVIE_FAQS = [
  {
    question: 'Why do couples and groups spend 30+ minutes scrolling Netflix without picking a movie?',
    answer:
      'Streaming platforms trigger choice overload by presenting thousands of thumbnails at once. Furthermore, proposing a specific movie in a group carries social risk—nobody wants to be blamed if the film turns out slow. Narrowing the field to 6–8 pre-approved slices on the Movie Wheel removes choice paralysis and transfers responsibility to an impartial random spin.'
  },
  {
    question: 'How does the "Nominate 3, Veto 1" group movie night rule work?',
    answer:
      'Have each person nominate 2 or 3 movies onto the Custom Watchlist tab. Before spinning, give every viewer exactly one Veto token. When the wheel lands on a movie, anyone can spend their single veto to eliminate that slice and trigger an immediate re-spin—guaranteeing a consensus winner in under 60 seconds.'
  },
  {
    question: 'Can I paste my own Letterboxd, IMDb, Netflix, or Disney+ watchlist into the wheel?',
    answer:
      'Yes! Select the Custom Watchlist mode inside the tool above and paste any newline- or comma-separated list of film titles. You can toggle individual titles on or off, weight must-watch releases higher, and save your list locally in your browser for future movie nights.'
  },
  {
    question: 'What if we don’t have specific movie titles in mind yet?',
    answer:
      'Use a two-stage spin workflow. First, spin by broad category or vibe (Action, Comedy, Sci-Fi, Thriller, Romance, Animation, or Classic) to lock in the genre. Once the wheel narrows your focus to a single genre, our built-in curated film pool immediately loads top-rated titles in that category for a second decisive spin.'
  },
  {
    question: 'How does the Movie Wheel ensure the selection is 100% fair and unbiased?',
    answer:
      'Every spin calls your browser’s hardware-backed Web Cryptography API (window.crypto.getRandomValues) rather than predictable Math.random() timers. Every active movie slice with equal weight receives an identical angular sector and exact mathematical probability.'
  }
];

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/movie-wheel#webapp',
      name: 'Movie Wheel – Random Movie Picker by Genre & Watchlist',
      url: 'https://spinwheelgames.org/movie-wheel',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive movie wheel and watchlist randomizer. Filter by genre, date night, family PG ratings, or paste your Letterboxd/streaming watchlist with veto-elimination support.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Genre filters: Action, Comedy, Horror, Sci-Fi, Romance, Thriller, Animation',
        'Quick modes: Movie Decision, Family Friendly PG, Date Night, Group Veto Mode',
        'Custom watchlist bulk paste and one-click Veto & Eliminate re-spins',
        'Cryptographic randomness (Web Crypto CSPRNG) for unbiased film selection',
        'Fullscreen living-room TV & projector presentation mode'
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
          item: 'https://spinwheelgames.org/'
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
      mainEntity: MOVIE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
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

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 flex flex-col gap-6 sm:gap-8">
        {/* Compact Breadcrumb & Mode Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#767586] dark:text-[#908fa1]">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-1.5 font-medium py-1 px-3 rounded-xl bg-slate-200/70 dark:bg-[#181924]/85 backdrop-blur-xs border border-slate-300/60 dark:border-slate-800/70"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link
              href="/decisions"
              className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
            >
              Decisions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-bold text-[#1a1b22] dark:text-white">Movie Wheel</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-bold py-1 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Film className="w-3.5 h-3.5" />
            <span>Random Movie Picker &amp; Watchlist Decider</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-2 pt-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1b22] dark:text-white tracking-tight leading-tight">
            Movie Wheel: Random Movie Picker by Genre &amp; Watchlist
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-2xl mx-auto">
            Stop losing 35 minutes every Friday night scrolling through Netflix, Prime Video, and Disney+ menus until your food gets cold. Filter by mood and genre, or paste your own watchlist and let an unbiased spin pick tonight&apos;s film in seconds.
          </p>
        </div>

        {/* Core Interactive Tool Engine */}
        <section id="movie-engine" className="w-full">
          <MovieWheelEngine />
        </section>

        {/* Deep Editorial Guide: When, Why, and How to Use the Movie Wheel (280+ words) */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <BookOpen className="w-4 h-4" />
              <span>When, Why &amp; How to Use This Tool</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              How to Cure Streaming Fatigue &amp; Run a Conflict-Free Movie Night
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm sm:text-base font-bold text-[#1a1b22] dark:text-white">
                Why Streaming Menus Cause Choice Paralysis
              </h3>
              <p>
                Media research consistently shows that the average household spends between 25 and 40 minutes browsing streaming carousels before starting a movie—and nearly one in five viewers eventually gives up and rewatches an old comfort show. When Netflix, Max, Prime Video, and Disney+ display 4,000+ algorithmic thumbnails simultaneously, your brain shifts from relaxation mode into high-friction comparison shopping.
              </p>
              <p>
                In couples and friend groups, a second psychological barrier appears: <strong>recommendation anxiety</strong>. Nobody wants to force four friends to sit through a two-hour slow-burn drama and feel responsible if the room gets bored. By placing 6 to 10 pre-vetted movie candidates onto a spinning wheel, the group shares ownership of the shortlist while outsourcing the final tie-breaker to pure cryptographic chance.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm sm:text-base font-bold text-[#1a1b22] dark:text-white">
                When &amp; How to Use the Two-Spin and Veto Workflows
              </h3>
              <p>
                Use the Movie Wheel in one of two proven modes depending on how prepared your group is:
              </p>
              <ul className="flex flex-col gap-2 pl-4 list-disc">
                <li>
                  <strong>The Nominate-and-Veto Shortlist (Best for Couples &amp; Roommates):</strong> Open the <em>Custom Watchlist</em> tab and have each person add 2 or 3 films from their Letterboxd or streaming queue. Give everyone one single &ldquo;Veto Token&rdquo; for the night. If the pointer lands on a film someone truly isn&apos;t in the mood for, they spend their veto, click <em>Veto &amp; Eliminate</em>, and the next spin is final.
                </li>
                <li>
                  <strong>The Genre-First Discovery Spin (Best When You Have Zero Ideas):</strong> Switch between <em>Decision Mode</em>, <em>Family Mode</em>, <em>Date Night</em>, or <em>Group Mode</em> and toggle specific genre pills (Action, Comedy, Sci-Fi, Horror, Romance, Thriller, or Animation) to spin a curated pool of acclaimed crowd-pleasers without typing a single title.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5 Practical Use-Case Examples & Copy-Ready Movie Option Lists */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              <ListChecks className="w-4 h-4" />
              <span>5 Practical Movie Night Scenarios &amp; Sample Option Lists</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Ready-to-Spin Watchlist Templates
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
              Copy any of these 5 real-world movie wheel setups directly into the Custom Watchlist tab or use them as a blueprint for your own group:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLE_MOVIE_PRESETS.map((preset) => (
              <div
                key={preset.title}
                className="p-5 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col justify-between gap-3"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1a1b22] dark:text-white">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                    {preset.scenario}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Example Wheel Slices ({preset.slices.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {preset.slices.map((slice) => (
                      <span
                        key={slice}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-[#0f1017] text-[#1a1b22] dark:text-[#eeedf7] border border-slate-200/80 dark:border-slate-800"
                      >
                        {slice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Four Built-in Mode Cards & Original Pro Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-6 sm:p-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
                <Popcorn className="w-4 h-4 text-rose-500" />
                <span>4 Built-In Movie Selection Modes</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
                Switch instantly between four hand-curated film libraries above:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                  Decision Mode (Solo &amp; Critics)
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Award-winning modern classics, high-IMDb thrillers, and essential cinema when you want a guaranteed 8/10+ film.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                  <Smile className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                  Family Mode (G &amp; PG)
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Pixar, Studio Ghibli, DreamWorks, and wholesome all-ages adventures verified safe for kids and parents together.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-500 flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                  Date Night Mode
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Sharp romantic comedies, stylish mysteries, and high-chemistry dramas that spark great post-movie conversation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                  Group Veto Mode
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Fast-paced crowd-pleasers paired with one-click Veto &amp; Eliminate removal so large groups reach consensus fast.
                </p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-6 sm:p-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Original Host Tips for Better Movie Nights</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
                Field-tested rules that prevent re-spin arguments:
              </p>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Enforce the 9:30 PM Runtime Cap:</strong> Before spinning on a weeknight, remove any 165+ minute epic from the wheel so nobody falls asleep halfway through Act II.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Use the &ldquo;Groan Reflex&rdquo; Diagnostic:</strong> If the wheel lands on a movie and both of you immediately groan, eliminate that slice right away—the spin just proved you didn&apos;t actually want to watch it.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Verify Streaming Availability First:</strong> Add the streaming service in parentheses on your custom slice—like <em>Dune: Part Two (Max)</em> or <em>Past Lives (Netflix)</em>—so you can press play within 10 seconds of the spin.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pair With Dinner &amp; Date Night Wheels:</strong> Turn the evening into a full combo by spinning our{' '}
                  <Link href="/dinner-wheel" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
                    Dinner Wheel
                  </Link>{' '}
                  or{' '}
                  <Link href="/date-night-wheel" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
                    Date Night Wheel
                  </Link>{' '}
                  right before picking your film.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* Expanded FAQ Section */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-base sm:text-xl font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Movie Wheel Frequently Asked Questions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOVIE_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="p-5 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex flex-col gap-2"
              >
                <h3 className="text-sm font-bold text-[#1a1b22] dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Wheels Section */}
        <RelatedWheelsSection
          title="Related Wheels for Movie Night & Entertainment"
          subtitle="Pair your movie spin with dinner takeout, date night ideas, or party games."
          maxWidthClass="max-w-7xl px-0!"
          wheels={[
            {
              name: 'Food Wheel',
              href: '/food-wheel',
              anchorText: 'Spin the Food Wheel to pick movie-night takeout',
              description: 'Settle pizza, sushi, Thai, or home-cooked dinner before pressing play.',
              tag: 'Dining'
            },
            {
              name: 'Date Night Wheel',
              href: '/date-night-wheel',
              anchorText: 'Use the Date Night Wheel for Friday couple plans',
              description: 'Cozy at-home dates, local outings, and fun relationship conversation sparks.',
              tag: 'Couples'
            },
            {
              name: 'Never Have I Ever Wheel',
              href: '/never-have-i-ever-wheel',
              anchorText: 'Play the Never Have I Ever Wheel after the film',
              description: 'Clean family, college, and party prompts for group watch-party hangouts.',
              tag: 'Party'
            },
            {
              name: 'Decision Wheel',
              href: '/decision-wheel',
              anchorText: 'Try the Decision Wheel for custom group tie-breakers',
              description: 'Settle TV show marathons, video games, or weekend plans with weighted slices.',
              tag: 'Decisions'
            }
          ]}
          guides={[
            { label: 'How to Use a Wheel for Faster Decisions', href: '/how-to-use-a-wheel', readingTime: '4 min' },
            { label: 'How Random Wheels Work (CSPRNG Fairness)', href: '/how-random-wheels-work', readingTime: '6 min' }
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
