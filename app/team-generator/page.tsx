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
  title: 'Team Generator Wheel - Random Group Maker & Squad Divider',
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
    title: 'Team Generator Wheel - Random Group Maker & Squad Divider',
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
        alt: 'Team Generator Wheel - Random Group Maker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Generator Wheel - Random Group Maker & Squad Divider',
    description:
      'Easily split names into balanced, fair teams or spin the live draft wheel. Perfect for sports, classroom projects, video game squads, and hackathons!'
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
            { label: 'Tools', href: '/categories' },
            { label: 'Random Team Generator' }
          ]}
        />

        {/* Hero Banner Header: Strictly H1 and subheadings aligned center above wheel container */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Cryptographically Fair Group Maker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Random Team Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Instantly divide names into random, balanced teams or spin the live draft wheel. Fast, fair, customizable, and ready for classrooms, sports, hackathons, and games.
          </p>
        </div>

        {/* Interactive Tool Engine Container */}
        <section id="tool-interactive">
          <TeamGeneratorEngine />
        </section>

        {/* Features Overview Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
              <Shuffle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Instant Balanced Split</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Divide by exact team count or maximum members per squad with even distribution across all groups.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Live Wheel Draft</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Turn team selection into an exciting live event with real-time wheel spins and sound effects.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Web Crypto API Randomness</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Powered by native browser cryptographic randomness (crypto.getRandomValues) with uniform probability.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Multi-Format Export</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Export teams to CSV spreadsheets, Markdown, Slack text, or print-ready cards with one click.
            </p>
          </div>
        </section>

        {/* Detailed Guide & Use Cases Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Why Use a Cryptographic Random Team Generator?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you are organizing a classroom project, running a weekend basketball pickup game, or kicking off a corporate hackathon, creating unbiased groups manually is time-consuming and often invites complaints of unfairness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Classroom & Group Projects</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Prevent student cliques and encourage peer collaboration by creating fresh, unbiased study groups and lab partner pairs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sports & Tournament Scrimmages</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate 5v5 basketball teams, 11v11 soccer squads, or 3v3 streetball brackets instantly without schoolyard captain politics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Gaming, Esports & Trivia Nights</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Organize pub trivia tables, board game teams, and competitive gaming custom lobbies (Valorant, CS2, League of Legends).
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step How-To Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            How to Generate Teams in 3 Easy Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Input Your Roster</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Type or paste participant names directly into the text box (one name per line), or pick a ready-made preset.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Choose Division Mode</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select either the total number of teams you want (e.g., 4 teams) or the target group size (e.g., 5 per team).
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Generate & Share</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Click Generate to shuffle and distribute instantly, or switch to Live Wheel Draft to pick players one by one on screen!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] space-y-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                How does the randomizer prevent bias?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We utilize the native browser Web Cryptography API (`crypto.getRandomValues`) paired with the Fisher-Yates shuffle algorithm. This ensures every permutation of team assignments has equal probability, completely eliminating algorithmic bias.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Can I manually adjust team members after generation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Hover over any player name in a team card and use the quick drop-down to swap or move that player to any other team. You can also rename team titles directly on the board.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                What happens if my roster doesn&apos;t divide evenly?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our algorithm automatically balances the remaining participants evenly across the earlier teams so no team has more than a 1-member difference from any other team.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181922] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Is my participant roster private?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes, 100%. All shuffling and team rendering occurs entirely in your browser session. No names, rosters, or student records are ever transmitted to an external server.
              </p>
            </div>
          </div>
        </section>

        {/* Related Wheels & Tools */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Explore Related Wheels & Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/classroom-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Classroom Wheel
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Student picker & jobs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/wheel-of-names"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Wheel of Names
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Random name picker</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/number-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Number Wheel
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Random number generator</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/random-object-generator"
              className="p-4 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Random Object Generator
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Drawing & prompt picker</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
