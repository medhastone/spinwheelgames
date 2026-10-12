import { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import AllGamesExplorer from '@/components/AllGamesExplorer';
import FaqSection from '@/components/FaqSection';
import { Sparkles, Dices, Layers, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, SITE_COUNTS } from '@/lib/siteConfig';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: `Wheel Games - ${SITE_COUNTS.wheelsFormatted} Free Online Decision Spinners & Wheels`,
  description:
    `Explore ${SITE_COUNTS.wheelsFormatted} free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. Fair and customizable!`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/games`
  },
  openGraph: {
    title: `Wheel Games - ${SITE_COUNTS.wheelsFormatted} Free Online Decision Spinners & Wheels`,
    description:
      `Explore ${SITE_COUNTS.wheelsFormatted} free online wheel games: food pickers, movie choosers, classroom wheels, random team generators, and party games. Fair and customizable!`,
    url: `${SITE_CONFIG.baseUrl}/games`,
    type: 'website'
  }
};

export default function GamesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `All ${SITE_COUNTS.wheelsFormatted} Wheel Games`,
        item: `${SITE_CONFIG.baseUrl}/games`
      }
    ]
  };

  const gamesFaqs = [
    {
      question: `How many random wheel games are available on ${SITE_CONFIG.brandName}?`,
      answer: `The ${SITE_CONFIG.brandName} library contains ${SITE_COUNTS.wheelsFormatted} verified, free online randomizers spanning ${SITE_COUNTS.categories} distinct categories including decisions, names, dining, classroom education, party games, giveaways, and number RNGs. Every wheel runs client-side with minimal data collection and cryptographically unbiased randomness.`
    },
    {
      question: 'Are all wheel games free to customize and share?',
      answer: 'Yes! Every wheel game is 100% free with no account creation or subscription required. You can edit slice titles, weights, and color palettes, then share or embed your wheel directly.'
    },
    {
      question: 'How do you ensure wheel results are fair and unbiased?',
      answer: 'All wheel spins draw entropy from the W3C Web Cryptography API (crypto.getRandomValues), providing uniform mathematical distribution across all slices without server manipulation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SubpageHeader
        activePage="/games"
        breadcrumbs={[{ label: `All ${SITE_COUNTS.wheelsFormatted} Wheel Games` }]}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Catalog ({SITE_COUNTS.wheelsFormatted} Wheels)
          </div>
          <h1 className="font-headline text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Explore All {SITE_COUNTS.wheelsFormatted} Wheel Games &amp; Decision Spinners
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] max-w-3xl leading-relaxed">
            Search, filter, and discover our full directory of interactive wheel pickers, classroom student callouts, tabletop dice generators, and decision spinners.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/random-game-picker"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all hover:-translate-y-0.5"
            >
              <Dices className="w-4 h-4" />
              <span>Launch Random Game Picker (Party, Board &amp; Card)</span>
            </Link>
          </div>
        </section>

        {/* Dynamic Games Explorer Component */}
        <AllGamesExplorer />

        {/* FAQ Section */}
        <FaqSection title="Frequently Asked Questions" faqs={gamesFaqs} />
      </main>

      <Footer />
    </div>
  );
}
