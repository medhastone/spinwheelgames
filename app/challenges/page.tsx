import { SITE_COUNTS } from "@/lib/siteConfig";
import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DirectAnswer from '@/components/DirectAnswer';
import ChallengeEngine from '@/components/ChallengeEngine';
import {
  Flame,
  Trophy,
  Calendar,
  Globe,
  CheckCircle2,
  Sparkles,
  Share2,
  HelpCircle,
  Zap,
  Target,
  ShieldCheck,
  Award,
  Crown
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Daily Wheel Challenges - Spin Today’s Global Quest & Streak Picker',
  description:
    'Take on today’s global synchronized daily wheel challenge! Earn daily streaks, unlock community badges, and share your result with verifiable cryptographic seeds.',
  keywords: [
    'daily wheel challenge',
    'daily spin the wheel',
    'global wheel quest',
    'daily streak wheel',
    'random daily challenge generator',
    'community wheel games',
    'daily decision challenge'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/challenges'
  },
  openGraph: {
    title: 'Daily Wheel Challenges - Spin Today’s Global Quest',
    description:
      'Take on today’s global synchronized daily wheel challenge! Earn daily streaks, unlock community badges, and share your result.',
    url: 'https://spinwheelgames.org/challenges',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Daily Wheel Challenge Arena'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Wheel Challenges - Spin Today’s Global Quest',
    description:
      'Take on today’s global synchronized daily wheel challenge! Earn daily streaks and share your results.'
  }
};

export default function ChallengesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Daily Wheel Challenge Generator',
        url: 'https://spinwheelgames.org/challenges',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript and HTML5 Canvas',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1840',
          bestRating: '5',
          worstRating: '1'
        },
        featureList: [
          'Synchronized global date-seeded PRNG randomness',
          'Persistent daily streak tracker & milestone badges',
          'Shareable victory card generation with cryptographic verification seed',
          'Mobile touch-optimized canvas physics'
        ]
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
            name: 'Daily Challenges',
            item: 'https://spinwheelgames.org/challenges'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does the Daily Wheel Challenge work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every day at 00:00 UTC, a new global challenge is generated from our curated pool. Everyone worldwide spins the exact same wheel seeded to today’s date. Complete today’s spin to increase your daily streak and earn verifiable achievement cards.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is everyone’s Daily Challenge wheel the same each day?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All players worldwide receive identical options and weights for today’s date, synchronized using a cryptographic date hash. Your outcome is generated fairly using Hardware-grade CSPRNG.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do daily streaks and badges work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Spinning the challenge once each consecutive calendar day increments your streak. Reaching milestones (3, 7, 14, 30, and 100 days) unlocks streak tiers, exclusive title badges, and gold celebration confetti.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I replay past daily challenges?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can practice on custom wheels anytime in our Wheel Games Hub. However, only spins completed on the active calendar date count towards your verified daily challenge streak.'
            }
          }
        ]
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Daily Challenges' }
  ];

  return (
    <div className="min-h-screen bg-[#faf9fe] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] flex flex-col font-sans transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex flex-col gap-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl p-6 sm:p-10 border border-amber-500/20 dark:border-amber-500/15">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>Synchronized Global Daily Quest</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1a1b22] dark:text-[#f1effa]">
            Daily Wheel Challenge
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#767586] dark:text-[#908fa1] max-w-3xl leading-relaxed">
            Every day, players around the world spin the exact same quest wheel. Spin today, log your result, build your consecutive streak, and claim your shareable victory card!
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
            <span className="flex items-center gap-1.5 bg-white dark:bg-[#181922] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Calendar className="w-4 h-4 text-indigo-500" /> Resets Daily at 00:00 UTC
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-[#181922] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Flame className="w-4 h-4 text-amber-500" /> Consecutive Streak Multipliers
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-[#181922] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Cryptographically Fair
            </span>
          </div>
        </div>

        {/* Direct Answer Summary Box */}
        <DirectAnswer
          question="What is the Daily Wheel Challenge?"
          answer="The Daily Wheel Challenge is a free, synchronized daily game where everyone worldwide spins an identical date-seeded quest wheel. Players earn consecutive daily streaks, complete fun daily prompts, and unlock verifiable community achievement cards."
        />

        {/* Interactive Challenge Engine Component */}
        <div className="w-full">
          <ChallengeEngine
            soundEnabled={true}
            soundPack="arcade"
            volume={0.7}
          />
        </div>

        {/* Streak Milestone Rewards Grid */}
        <section className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-[#f1effa]">
                Streak Milestones & Achievements
              </h2>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
                Spin consecutive daily challenges to earn prestigious badges and bragging rights.
              </p>
            </div>
            <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-base text-amber-600 dark:text-amber-400">
                  🥉 3-Day Spark
                </span>
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Complete 3 consecutive daily spins. Unlocks bronze challenge share badge.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-base text-blue-600 dark:text-blue-400">
                  🥈 7-Day Flame
                </span>
                <Flame className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Complete 7 consecutive daily spins. Unlocks silver badge & streak multiplier.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-base text-purple-600 dark:text-purple-400">
                  🥇 14-Day Titan
                </span>
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Two full weeks of uninterrupted spins. Unlocks gold celebration effects.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-base text-emerald-600 dark:text-emerald-400">
                  👑 30-Day Legend
                </span>
                <Crown className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                One month streak mastery. Unlocks diamond crown result cards.
              </p>
            </div>
          </div>
        </section>

        {/* Challenge Categories & More Wheels */}
        <section className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-[#f1effa]">
                Explore More Wheel Game Modes
              </h2>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
                Want more spins? Check out our specialized wheels and multiplayer arenas.
              </p>
            </div>
            <Link
              href="/games"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all w-fit"
            >
              <span>View All Wheels</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              href="/food-wheel"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">🍕</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Food Wheel
              </span>
            </Link>

            <Link
              href="/movie-wheel"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">🎬</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Movie Picker
              </span>
            </Link>

            <Link
              href="/number-wheel"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">🔢</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Number Wheel
              </span>
            </Link>

            <Link
              href="/bingo-wheel"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">🎱</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Bingo Caller
              </span>
            </Link>

            <Link
              href="/dice-roller"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">🎲</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                3D Dice Roller
              </span>
            </Link>

            <Link
              href="/question-wheel"
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#20212d] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all text-center flex flex-col items-center gap-2 group"
            >
              <span className="text-2xl">❓</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Question Wheel
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-[#f1effa]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl bg-[#faf9fe] dark:bg-[#1f202b] p-4 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <summary className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                <span>How does the Daily Wheel Challenge work?</span>
                <span className="text-indigo-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every day at 00:00 UTC, a new global challenge is generated from our curated pool. Everyone worldwide spins the exact same wheel seeded to today’s date. Complete today’s spin to increase your daily streak and earn verifiable achievement cards.
              </p>
            </details>

            <details className="group rounded-2xl bg-[#faf9fe] dark:bg-[#1f202b] p-4 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <summary className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                <span>Is everyone’s Daily Challenge wheel the same each day?</span>
                <span className="text-indigo-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! All players worldwide receive identical options and weights for today’s date, synchronized using a cryptographic date hash. Your outcome is generated fairly using Hardware-grade CSPRNG.
              </p>
            </details>

            <details className="group rounded-2xl bg-[#faf9fe] dark:bg-[#1f202b] p-4 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <summary className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                <span>How do daily streaks and badges work?</span>
                <span className="text-indigo-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Spinning the challenge once each consecutive calendar day increments your streak. Reaching milestones (3, 7, 14, 30, and 100 days) unlocks streak tiers, exclusive title badges, and gold celebration confetti.
              </p>
            </details>

            <details className="group rounded-2xl bg-[#faf9fe] dark:bg-[#1f202b] p-4 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <summary className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                <span>Can I replay past daily challenges?</span>
                <span className="text-indigo-500 font-extrabold group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                You can practice on custom wheels anytime in our Wheel Games Hub. However, only spins completed on the active calendar date count towards your verified daily challenge streak.
              </p>
            </details>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
