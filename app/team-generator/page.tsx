import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  Shuffle,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Gamepad2,
  Trophy,
  Share2,
  Copy,
  Zap,
  Download
} from 'lucide-react';
import TeamGeneratorEngine from '@/components/team/TeamGeneratorEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Team Generator Wheel | SpinWheelGames',
  description:
    'Easily split names into balanced, fair teams or spin the live draft wheel. Perfect for sports, classroom projects, video game squads, and hackathons!',
  keywords: [
    'random team generator wheel',
    'random team generator',
    'team generator',
    'group maker',
    'random group generator',
    'team picker wheel',
    'team divider',
    'split into teams',
    'random squad divider',
    'draft order randomizer',
    'classroom group maker'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/team-generator'
  },
  openGraph: {
    title: 'Team Generator Wheel | SpinWheelGames',
    description:
      'Easily split names into balanced, fair teams or spin the live draft wheel. Perfect for sports, classroom projects, video game squads, and hackathons!',
    url: 'https://spinwheelgames.org/team-generator',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Team Generator Wheel | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Generator Wheel | SpinWheelGames',
    description:
      'Easily split names into balanced, fair teams or spin the live draft wheel. Perfect for sports, classroom projects, video game squads, and hackathons!',
    images: ['https://spinwheelgames.org/spinwheel-logo.webp']
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/team-generator#webapp',
      name: 'Team Generator Wheel - Random Group Maker',
      url: 'https://spinwheelgames.org/team-generator',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online random team generator and team picker wheel. Split names into fair groups, assign captains, and draft live with hardware cryptographic randomness.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1580',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Instant random team division by number of teams or group size',
        'Interactive live wheel draft spinner for snake drafts and events',
        'Custom themed team names (Animals, Mythical Beasts, Cyberpunk, Sports)',
        'Copy to clipboard in Markdown, text, and direct CSV file download',
        'Browser Web Crypto API cryptographic randomness'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/team-generator#breadcrumb',
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
          name: 'Random Team Generator',
          item: 'https://spinwheelgames.org/team-generator'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/team-generator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Random Team Generator create fair groups?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our team generator uses the browser Web Cryptography API (crypto.getRandomValues) combined with a modern Fisher-Yates shuffle algorithm. This ensures that every participant has an exactly equal probability of landing in any team without bias or server-side logging.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I split by number of teams or members per team?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can toggle between splitting by "Number of Teams" (e.g., divide 20 people into 4 teams of 5) or "Members per Team" (e.g., make teams of 3, automatically creating the right number of groups).'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I export the generated teams to CSV, Markdown, or Excel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! With a single click, you can copy formatted Markdown or plain text for Slack, Discord, and Notion, or download a CSV spreadsheet file ready for Excel and Google Sheets.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is participant data kept private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100% of data processing is client-side in your web browser. No participant names, rosters, or email lists are uploaded to our servers, keeping student and corporate data completely private.'
          }
        }
      ]
    }
  ]
};

export default function TeamGeneratorPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/team-generator" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-4 sm:space-y-5 pb-12">
        {/* Top Header & Breadcrumbs Section */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-22 space-y-2 sm:space-y-3">
          <Breadcrumbs
            items={[
              { label: 'Group Tools', href: '/categories' },
              { label: 'Random Team Generator' }
            ]}
          />

          {/* Compact Hero Banner Header (like Home Page) */}
          <div className="text-center max-w-3xl mx-auto space-y-1.5 pt-0 pb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold border border-blue-500/20">
              <Users className="w-3 h-3" />
              <span>Fair Team Splitter • Live Wheel Draft • Export CSV</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-black text-gray-950 dark:text-white tracking-tight leading-[1.1]">
              Random Team Generator
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Instantly divide names into random, balanced teams or spin the live draft wheel. Fast, fair, and ready for classrooms, sports, hackathons, and games.
            </p>
          </div>

          {/* Interactive Tool Engine Container */}
          <div id="interactive-workspace" className="w-full pt-1">
            <TeamGeneratorEngine />
          </div>
        </section>

        {/* Provable Fairness & Privacy Bar (Home Page style) */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
          <div className="rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-3 sm:p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Client-Side Web Cryptography (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#696779] dark:text-slate-400">
                <Shuffle className="w-3 h-3 text-blue-500" />
                <span>Uniform Random Distribution • Zero Bias</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Zero Account Required • Multi-Format Export • 100% Free</span>
            </div>
          </div>
        </section>

        {/* Features Overview Grid */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
                <Shuffle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Instant Balanced Split</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Divide by exact team count or maximum members per squad with even distribution across all groups.
              </p>
            </div>

            <div className="bg-white dark:bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Live Wheel Draft</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Turn team selection into an exciting live event with real-time wheel spins and sound effects.
              </p>
            </div>

            <div className="bg-white dark:bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Web Crypto Randomness</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Powered by native browser cryptographic randomness (crypto.getRandomValues) with uniform probability.
              </p>
            </div>

            <div className="bg-white dark:bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center font-bold">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Multi-Format Export</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Export teams to CSV spreadsheets, Markdown, Slack text, or print-ready cards with one click.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Guide & Use Cases Section */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
          <div className="bg-white dark:bg-[#12131a] rounded-2xl p-4 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] space-y-4">
            <div className="max-w-3xl space-y-1.5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Why Use a Cryptographic Random Team Generator?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you are organizing a classroom project, running a weekend basketball pickup game, or kicking off a corporate hackathon, creating unbiased groups manually is time-consuming and often invites complaints of unfairness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Classroom & Group Projects</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Prevent student cliques and encourage peer collaboration by creating fresh, unbiased study groups and lab partner pairs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Sports & Scrimmages</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Generate 5v5 basketball teams, 11v11 soccer squads, or 3v3 streetball brackets instantly without captain politics.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Gamepad2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Gaming & Trivia Nights</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Organize pub trivia tables, board game teams, and competitive gaming custom lobbies (Valorant, CS2, League of Legends).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step How-To Section */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
          <div className="bg-white dark:bg-[#12131a] rounded-2xl p-4 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              How to Generate Teams in 3 Easy Steps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50/70 dark:bg-[#181922]/70 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Input Your Roster</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Type or paste participant names directly into the text box (one name per line), or pick a preset.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50/70 dark:bg-[#181922]/70 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Choose Division Mode</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Select either total number of teams (e.g., 4 teams) or target group size (e.g., 5 per team).
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50/70 dark:bg-[#181922]/70 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Generate & Share</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Click Generate to shuffle instantly, or switch to Live Wheel Draft to pick players one by one!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6">
          <div className="bg-white dark:bg-[#12131a] rounded-2xl p-4 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <HelpCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">FAQ</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  How does the randomizer prevent bias?
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We utilize the native browser Web Cryptography API (`crypto.getRandomValues`) paired with the Fisher-Yates shuffle algorithm for uniform distribution.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  Can I manually adjust team members after generation?
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes! Use the quick drop-down on any player to swap or move them to another team, or rename team titles directly.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  What happens if my roster doesn&apos;t divide evenly?
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our algorithm balances remaining participants evenly across teams so no team has more than a 1-member difference.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  Is my participant roster private?
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, 100%. All shuffling and team rendering occurs entirely in your browser session. No names are sent to any server.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Wheels & Tools */}
        <section className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 space-y-2.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Explore Related Wheels & Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <Link
              href="/classroom-wheel"
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Classroom Wheel
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Student picker & jobs</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/wheel-of-names"
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Wheel of Names
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Random name picker</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/number-wheel"
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Number Wheel
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Random number generator</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/random-object-generator"
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Random Object Generator
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Drawing & prompt picker</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
