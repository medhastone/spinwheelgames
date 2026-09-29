import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Music,
  Disc,
  Mic,
  Sparkles,
  Radio,
  ListPlus,
  Flame,
  CheckCircle2,
  HelpCircle,
  Search,
  ShieldCheck,
  ChevronRight,
  Globe
} from 'lucide-react';
import SongWheelEngine from '@/components/music/SongWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Song Wheel - Random Song & Karaoke Picker Wheel',
  description:
    'Spin the free song wheel to randomly pick karaoke tracks, music genres, dance challenges, and playlist songs. Add custom tracks or spin party presets!',
  keywords: [
    'karaoke song picker wheel',
    'song wheel',
    'random song generator',
    'playlist roulette wheel',
    'music genre spinner',
    'spin the wheel songs',
    'random music generator',
    'karaoke wheel spinner'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/song-wheel'
  },
  openGraph: {
    title: 'Song Wheel - Random Song & Karaoke Picker Wheel',
    description:
      'Spin the free song wheel to randomly pick karaoke tracks, music genres, dance challenges, and playlist songs. Add custom tracks or spin party presets!',
    type: 'website',
    url: 'https://spinwheelgames.org/song-wheel',
    siteName: 'SpinWheelGames',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Song Wheel - Random Song & Karaoke Picker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Song Wheel - Random Song & Karaoke Picker Wheel',
    description:
      'Spin the free song wheel to randomly pick karaoke tracks, music genres, dance challenges, and playlist songs. Add custom tracks or spin party presets!'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/song-wheel#webapp',
      url: 'https://spinwheelgames.org/song-wheel',
      name: 'Song Wheel - Random Song & Karaoke Picker',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive random song picker wheel featuring genre selection, decade filters, mood playlists, karaoke sing-along mode, and custom playlist support.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1190',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Curated genres: Pop, Rock, Hip-Hop, 80s/90s Retro, Karaoke Hits, R&B',
        'Custom songs and artists input list',
        'No-repeat elimination mode for karaoke queues',
        'Party mode with sound effects and animations',
        'One-click search integration for chosen tracks'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/song-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does the song wheel stream copyrighted audio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. To strictly follow copyright regulations, the tool randomly selects song titles, artists, genres, decades, and singing challenges, and provides quick search buttons for lyrics and music streams.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own custom song list to the wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click "Custom Songs" and use the input box or Bulk Paste modal to paste your personal Spotify, Apple Music, or party playlist.'
          }
        },
        {
          '@type': 'Question',
          name: 'What modes are available on the music wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can choose between Genre Mode, Decade Mode, Mood Mode, Karaoke Sing-Along Mode, Artist List Mode, Song Challenge Mode, and Custom Playlist Mode.'
          }
        }
      ]
    }
  ]
};

export default function SongWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 max-w-7xl mx-auto space-y-12 w-full flex-1">
        {/* Breadcrumb Header */}
        <Breadcrumbs
          items={[
            { label: 'Creativity & Fun', href: '/creativity' },
            { label: 'Spin the Wheel for Songs' }
          ]}
        />

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-950/80 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
            <Music className="w-4 h-4" />
            <span>Random Song & Music Randomizer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Spin the Wheel for Songs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Spin a music wheel to randomly choose a song, genre, artist or karaoke challenge. Add your own songs for a personalized playlist picker.
          </p>
        </div>

        {/* Main Interactive Wheel Engine */}
        <SongWheelEngine />

        {/* Feature Highlights Grid */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              7 Musical Modes in One Interactive Randomizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Whether you are hosting a karaoke party, looking for workout motivation, or building a custom playlist, the Song Wheel delivers instant randomness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold">
                <Disc className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Genre Mode</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Spin across Pop, Rock, Hip-Hop, R&B, EDM, Country, K-Pop, Latin, and Indie to decide your next listening vibe.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Decade Mode</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Travel through musical history from 1970s disco and 1980s synth rock to 2000s nostalgia and 2020s chart toppers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Mood Mode</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select tracks curated for High Energy workouts, Chillout sessions, Feel-Good party vibes, or Late Night drives.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Karaoke Mode</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Features iconic sing-alongs, duet bops, and vocal showcases perfect for house parties and singing contests.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Song Challenge</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test your music knowledge with Chorus Relays, Humming Mysteries, A Cappella solos, and Artist Discography trivia.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
                <ListPlus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Custom Playlist List</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Paste your favorite playlist titles or custom song lists into the wheel to create a personalized random song selector.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Informational Guide & Copyright Policy */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Fair Use & Copyright Commitment</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            How the Song Wheel Works Safely & Respectfully
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              The <strong>Spin the Wheel for Songs</strong> tool is an interactive decision-making application engineered for music lovers, karaoke singers, DJs, and games hosts. We do not stream or embed copyrighted master audio recordings without permission. Instead, the wheel generates randomized song titles, artist names, music genres, and creative singing prompts.
            </p>
            <p>
              When the wheel selects a song, you can instantly click the <strong>[Lyrics Search]</strong> button to look up song lyrics or find the track on your preferred official streaming platforms (such as Spotify, Apple Music, YouTube Music, or Amazon Music).
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Song Wheel Questions & Answers
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                How does the random song picker choose winning items?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The wheel utilizes client-side Cryptographically Secure Pseudorandom Number Generation (CSPRNG via <code className="text-pink-600 font-mono">crypto.getRandomValues</code>) to provide uniform, unbiased spins every time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Can I save my custom song list for later?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Yes! Your custom songs remain active in your browser state while you spin. You can also use the Bulk Paste tool to quickly re-import saved playlists anytime.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Is the Song Wheel free to use?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Yes! The tool is 100% free with no account registration or subscriptions required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
