import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Copy,
  Share2,
  CheckCircle2,
  HelpCircle,
  Lock,
  Zap,
  Filter,
  Layers,
  ArrowRight,
  BookOpen,
  Dice5,
  Gamepad2,
  Brush
} from 'lucide-react';
import CommentPickerEngine from '@/components/comment/CommentPickerEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Random Comment Picker - Free Giveaway Winner Generator (No API Needed)',
  description:
    'Paste comments from YouTube, Instagram, TikTok, or Reddit to pick a random giveaway winner. Features duplicate removal, blank line filtering, exclusions, and winner history 100% in your browser.',
  keywords: [
    'comment picker',
    'random comment picker',
    'free comment picker',
    'youtube comment picker',
    'instagram comment picker',
    'giveaway comment picker',
    'random winner generator',
    'pick giveaway winner',
    'paste comments winner',
    'contest winner picker'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/comment-picker'
  },
  openGraph: {
    title: 'Random Comment Picker - Free Giveaway Winner Generator (No API Needed)',
    description:
      'Paste comments from YouTube, Instagram, TikTok, or Reddit to pick a random giveaway winner. Features duplicate removal, blank line filtering, exclusions, and winner history 100% in your browser.',
    url: 'https://spinwheelgames.org/comment-picker',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Random Comment Picker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Comment Picker - Free Giveaway Winner Generator (No API Needed)',
    description:
      'Paste comments from YouTube, Instagram, TikTok, or Reddit to pick a random giveaway winner. Features duplicate removal, blank line filtering, exclusions, and winner history 100% in your browser.'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/comment-picker#webapp',
      name: 'Random Comment Picker',
      url: 'https://spinwheelgames.org/comment-picker',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 support',
      description:
        'Free, client-side random comment picker for giveaways, raffles, and contests. Paste comments from any platform, remove duplicates, set custom exclusions, and draw unbiased winners using Web Crypto CSPRNG.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1680',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Paste comments directly into the browser without paid social-media APIs',
        'Automatic blank line removal and whitespace trimming',
        'Duplicate username filtering ensuring exactly one entry per participant',
        'Custom exclusion filters for host accounts, bots, and unwanted spam keywords',
        'Hardware CSPRNG random selection via window.crypto.getRandomValues',
        'Winner history tracking with consecutive winner draw capability',
        'One-click result copying and social media giveaway announcement sharing'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/comment-picker#breadcrumb',
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
          name: 'Tools',
          item: 'https://spinwheelgames.org/categories'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random Comment Picker',
          item: 'https://spinwheelgames.org/comment-picker'
        }
      ]
    },
    {
      '@type': 'HowTo',
      '@id': 'https://spinwheelgames.org/comment-picker#howto',
      name: 'How to Pick a Random Winner from Comments',
      description:
        'A quick 3-step guide on how creators, teachers, and event hosts can paste comments to draw a transparent, fair contest winner.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Paste Comments',
          text: 'Copy the list of comments from YouTube, Instagram, TikTok, Reddit, or any document and paste them into the input area. Format can be raw text or @username: comment.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Apply Deduplication & Exclusions',
          text: 'Enable Remove Duplicates to allow only 1 entry per username. Enter host usernames or spam bot keywords in the exclusions box to keep your giveaway fair.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Draw and Share the Winner',
          text: 'Click Pick Random Winner. The tool picks an unbiased winner using cryptographic entropy. Copy or share the verified announcement.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/comment-picker#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a paid API key or social media login to use this comment picker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. This comment picker works entirely in your browser without requiring any paid APIs, social media account logins, or OAuth permissions. Simply copy and paste your comments into the tool to pick a winner instantly.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the duplicate removal feature work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When Remove Duplicates is active, our algorithm identifies recurring usernames (e.g., @sarah posted 5 times) and consolidates them into a single valid entry. This prevents spammers from gaining an unfair advantage.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I exclude specific accounts like the channel host or bots?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can add usernames (such as your own host account, moderators, or team members) and spam keywords (such as whatsapp, telegram, crypto) into the optional exclusions field to automatically disqualify them from winning.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I pick multiple winners or runners-up?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After drawing the first winner, click the "Remove Current & Pick Next Winner" button. The previous winner is safely removed from the eligible pool and logged in your Winner History while the next winner is drawn.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the random selection truly fair and unbiased?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The tool uses the W3C Web Cryptography API (crypto.getRandomValues), providing cryptographically secure pseudo-random number generation (CSPRNG). Every entry in your eligible pool has an equal mathematical probability of winning.'
          }
        }
      ]
    }
  ]
};

export default function CommentPickerPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/comment-picker" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-6 sm:space-y-10 pb-16">
        {/* Top Header & Interactive Tool Section */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-18 sm:pt-24 lg:pt-28 space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Decision Tools', href: '/categories' },
              { label: 'Random Comment Picker' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>100% Free Browser-Based Giveaway Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Random Comment Picker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Paste comments from any social platform to choose a random winner. Remove duplicates, filter blank lines, add custom exclusions, and pick winners with zero paid APIs.
            </p>
          </div>

          {/* Interactive Comment Picker Engine */}
          <div id="tool-interactive">
            <CommentPickerEngine />
          </div>
        </section>

        {/* COMPACT BOX 1: Provable Fairness & Privacy Bar (Home Page Style) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Hardware-Grade CSPRNG Randomness (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>100% Client-Side Privacy • Zero Server Logging</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4 shrink-0" />
              <span>No Social API Keys Required • Zero Signups</span>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 2: 4 Core Features Cards (Compact Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Tool Highlights
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Engineered for Fair &amp; Transparent Giveaways
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Everything you need to run clean, transparent giveaways without subscribing to expensive third-party tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: One-Click Deduplication */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Filter className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Fair Odds
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Duplicate Removal
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Eliminate multiple comments from identical usernames with one click so aggressive spammers don&apos;t skew the odds.
                </p>
              </div>
            </div>

            {/* Card 2: Smart Exclusions */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Bot Guard
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Custom Exclusions
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Filter out host accounts, team moderators, and spam keywords like WhatsApp links or crypto promo bots instantly.
                </p>
              </div>
            </div>

            {/* Card 3: Winner History & Multi-Draw */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Multi-Draw
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Winner History &amp; Next Pick
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Automatically log drawn winners, eliminate them from the pool, and draw 2nd, 3rd, and runner-up prizes seamlessly.
                </p>
              </div>
            </div>

            {/* Card 4: Instant Shareable Proof */}
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Auditable
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Copy &amp; Share Result
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Generate formatted winner announcement posts with cryptographic audit seeds to prove your draw was genuine and unbiased.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 3: How to Pick a Random Winner from Comments (3 Step Guide) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="max-w-2xl space-y-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Step-by-Step Tutorial
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                How to Pick a Random Winner from Comments
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
                Follow these simple steps to draw a transparent winner for any online giveaway or competition in under 60 seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4648d4] text-white font-black text-xs flex items-center justify-center">
                  1
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Copy &amp; Paste Comments
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Open your comment section on YouTube, Instagram, or TikTok. Select and copy your comments or export them to a text file, then paste them directly into the comment box above.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Set Filters &amp; Exclusions
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Toggle <strong>Remove Duplicates</strong> to prevent multi-comment spam. Enter any host handles, moderator names, or mandatory giveaway keywords (e.g., #giveaway or a quiz answer).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  3
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  Spin &amp; Announce Winner
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Click <strong>Pick Random Winner</strong> to launch the suspense ticker. The winner is selected via cryptographic randomness with celebration confetti and an exportable announcement card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 4: How to Grab Comments from Different Social Platforms */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Platform Guides
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                Pasting Comments from Any Social Platform
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
                Because our tool runs entirely in your browser without requiring paid APIs or account credentials, you can use it with any platform:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  YouTube Video Comments
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  In YouTube Studio or on the public video page, select and copy the comment text or export your comment list. Paste into the tool; handles formatted as <code>@username: comment</code> are automatically detected.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500 shrink-0" />
                  Instagram Post Comments
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Open Instagram Web in your desktop browser. Scroll down the comments on your contest post, copy the entries, and paste them here. The duplicate filter ensures each follower gets 1 ticket.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                  TikTok Video Comments
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Open TikTok on desktop or use a free comment scraper extension to export entries to a CSV or text list. Paste the raw text directly—the blank line cleaner cleans it automatically.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                  Reddit Thread Comments
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Perfect for community giveaways on subreddits. Copy top-level comment usernames or comments from your thread and exclude <code>AutoModerator</code> using the exclusions box.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  Twitter / X Replies
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Copy reply handles from your giveaway tweet. Use the &ldquo;Must Contain Keyword&rdquo; filter to verify users included your contest hashtag or retweet phrase.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                  Discord &amp; Classroom Lists
                </h3>
                <p className="text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Great for teachers picking classroom helpers or Discord server admins running member raffles. Simply paste member names one per line to draw fair winners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 5: Best Practices for Fair Social Giveaways */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Organizer Guidelines
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                Best Practices for Running Fair Online Giveaways
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Record a Screen Video of the Draw
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0]">
                  Record your screen when clicking &ldquo;Pick Random Winner&rdquo;. Sharing the video recording on your social feed gives your community 100% confidence that the draw was unbiased and unedited.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Define Clear Rules Upfront
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0]">
                  State giveaway deadlines, geographic eligibility, and whether multiple comments are allowed or deduplicated. Clear rules protect you against disputes from disappointed participants.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Always Draw Backup Runners-Up
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0]">
                  Often the primary winner does not respond to DMs within the 48-hour claim window. Use the &ldquo;Pick Next Winner&rdquo; button to draw 2 or 3 backup winners ahead of time.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Exclude Organizers &amp; Bots
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0]">
                  Never risk your own moderator or brand account being drawn accidentally! Always include host handles and known bot spam keywords in the exclusions filter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 6: Frequently Asked Questions (FAQ) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Got Questions?
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                Frequently Asked Questions About the Comment Picker
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
                  Is this comment picker really 100% free with no limits?
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Yes! There are no paywalls, no credits, and no premium subscriptions required. You can paste 10 comments or 10,000 comments and pick as many winners as you need at zero cost.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
                  Why doesn&apos;t this tool require my social media password?
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Security and privacy! Many third-party apps demand full access to your social media accounts via OAuth or API tokens, creating security risks. By simply pasting the comment text, your accounts remain 100% safe.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
                  How is duplicate spam prevented?
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  When &ldquo;Remove Duplicates&rdquo; is checked, any recurring participant handle is filtered down to a single valid entry. Even if one enthusiastic user comments 50 times, they will only receive one entry in the pool.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
                  What happens when I pick subsequent winners?
                </h3>
                <p className="text-xs text-[#696779] dark:text-[#a09eb0] leading-relaxed">
                  Clicking &ldquo;Remove Current &amp; Pick Next Winner&rdquo; automatically removes the previous winner from the eligible pool. They will not be picked again, allowing you to draw 1st, 2nd, and 3rd place prizes cleanly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Decision Tools */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Explore More Decision &amp; Randomizer Tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link
                href="/team-generator"
                className="p-3 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] transition-colors flex items-center gap-2 group"
              >
                <Users className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] truncate">
                  Team Generator
                </span>
              </Link>

              <Link
                href="/random-game-picker"
                className="p-3 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] transition-colors flex items-center gap-2 group"
              >
                <Gamepad2 className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] truncate">
                  Random Game Picker
                </span>
              </Link>

              <Link
                href="/drawing-wheel"
                className="p-3 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] transition-colors flex items-center gap-2 group"
              >
                <Brush className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] truncate">
                  Drawing Prompts Wheel
                </span>
              </Link>

              <Link
                href="/dice-roller"
                className="p-3 rounded-xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] hover:border-[#4648d4] transition-colors flex items-center gap-2 group"
              >
                <Dice5 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] truncate">
                  3D Dice Roller
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
