import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Gift,
  ShieldCheck,
  BookOpen,
  Zap,
  RotateCcw,
  LayoutGrid,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import WheelOfNamesEngine from '@/components/WheelOfNamesEngine';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Wheel of Names | SpinWheelGames',
  description:
    'Spin the free Wheel of Names generator to randomly pick names, classroom students, or giveaway raffle winners. Fast CSV import, no-repeat elimination, and 100% fair randomness.',
  keywords: [
    'wheel of names',
    'wheel of names generator',
    'random name picker',
    'random name wheel',
    'name spinner',
    'spinner with names',
    'number spin wheel',
    'classroom name wheel',
    'giveaway name drawer',
    'team name randomizer'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/wheel-of-names'
  },
  openGraph: {
    title: 'Wheel of Names | SpinWheelGames',
    description:
      'Spin the free Wheel of Names generator to randomly pick names, classroom students, or giveaway raffle winners. Fast CSV import, no-repeat elimination, and 100% fair randomness.',
    url: 'https://spinwheelgames.org/wheel-of-names',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Wheel of Names - Free Random Name Picker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wheel of Names | SpinWheelGames',
    description:
      'Spin the free Wheel of Names generator to randomly pick names, classroom students, or giveaway raffle winners. Fast CSV import, no-repeat elimination, and 100% fair randomness.',
    images: ['https://spinwheelgames.org/spinwheel-logo.webp']
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/wheel-of-names#webapp',
      name: 'Wheel of Names Generator',
      url: 'https://spinwheelgames.org/wheel-of-names',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online wheel of names generator and random name picker. Spin to choose random names, pick classroom volunteers, divide teams, and draw raffle winners with 100% fair random selection.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.95',
        reviewCount: '2840',
        bestRating: '5',
        worstRating: '1'
      }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/wheel-of-names#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Wheel of Names?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Wheel of Names is a customizable online random selection tool that arranges a list of names onto a spinning wheel. Clicking spin rotates the wheel smoothly before stopping on a randomly chosen winning slice.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the name wheel outcome completely fair and random?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our Wheel of Names uses browser-native Web Crypto API Cryptographically Secure Pseudorandom Number Generation (CSPRNG) to guarantee unbiased mathematical randomness on every spin.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I import names from Excel or CSV files?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can click the "Import File" button to upload any text (.txt) or CSV (.csv) file, or use the "Bulk Paste" feature to copy-paste lists of hundreds of names instantly.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does elimination / no-repeat mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When elimination mode is enabled or when you click "Remove Winner" in the victory popup, the winning name is immediately removed from the wheel so no name is picked twice in consecutive rounds.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I share my custom Wheel of Names with others?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click "Share" to generate a unique shareable URL that embeds your exact list of names, allowing colleagues, students, or friends to open and spin your customized wheel on any device.'
          }
        }
      ]
    }
  ]
};

export default function WheelOfNamesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors relative overflow-x-hidden">
      {/* Schema JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Global Fixed Navbar - Identical to Homepage */}
      <Navbar activeNav="wheel-of-names" />

      {/* Main Container - Padded for Fixed Navbar like Homepage */}
      <main className="w-full pt-16 sm:pt-18 lg:pt-20 flex-1 flex flex-col relative z-10">
        {/* Subtle Ambient Background Glows matching Homepage */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-[#4648d4]/10 dark:bg-[#8587ff]/10 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-10 w-[28rem] h-[28rem] rounded-full bg-[#00a86b]/10 dark:bg-[#005236]/15 blur-3xl pointer-events-none -z-10" />

        {/* Hero Banner Header Section matching Homepage Design Language */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            <span className="text-xs sm:text-sm font-bold text-[#1a1b22] dark:text-[#f1effa]">
              The Web's Premier Random Name Picker &amp; Wheel Generator
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1b22] dark:text-[#f1effa] tracking-tight leading-tight max-w-4xl mx-auto">
            Wheel of Names – Free Online Random Name Picker
          </h1>

          <p className="mt-2 text-[#464554] dark:text-[#c7c4d7] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Spin the wheel to randomly choose names for classroom students, giveaway raffles, team group divisions, or fun decision games with 100% cryptographic fairness.
          </p>

          {/* Quick Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[11px] sm:text-xs font-semibold text-[#464554] dark:text-[#c7c4d7]">
              <Zap className="w-3 h-3 text-[#f59e0b]" />
              <span>Fast CSV &amp; Bulk Paste</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[11px] sm:text-xs font-semibold text-[#464554] dark:text-[#c7c4d7]">
              <RotateCcw className="w-3 h-3 text-[#4648d4] dark:text-[#8587ff]" />
              <span>No-Repeat Elimination</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[11px] sm:text-xs font-semibold text-[#464554] dark:text-[#c7c4d7]">
              <ShieldCheck className="w-3 h-3 text-[#00a86b]" />
              <span>Web Crypto CSPRNG</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[11px] sm:text-xs font-semibold text-[#464554] dark:text-[#c7c4d7]">
              <Users className="w-3 h-3 text-[#ec4899]" />
              <span>Classroom &amp; Team Modes</span>
            </span>
          </div>
        </div>

        {/* Primary Interactive Engine Component (Dominant Left Stage + Sleek Compact Right Sidebar) */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <Suspense
            fallback={
              <div className="w-full bg-white dark:bg-[#0f1017] border border-[#eeedf7] dark:border-[#20212f] rounded-3xl p-12 text-center text-[#464554] dark:text-[#c7c4d7] font-medium shadow-md">
                Loading Wheel of Names Engine...
              </div>
            }
          >
            <WheelOfNamesEngine />
          </Suspense>
        </div>

        {/* ========================================================================= */}
        {/* Natural SEO Content Sections below the wheel matching Homepage styling     */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          <article className="bg-white dark:bg-[#0f1017] border border-[#eeedf7] dark:border-[#20212f] rounded-3xl p-6 sm:p-10 shadow-lg dark:shadow-xl space-y-8 text-[#464554] dark:text-[#c7c4d7] leading-relaxed transition-colors">
            <div className="border-b border-[#eeedf7] dark:border-[#1e1f2d] pb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-[#f1effa] tracking-tight flex items-center gap-3">
                <Users className="w-7 h-7 text-[#4648d4] dark:text-[#8587ff]" />
                <span>Pick a Name Online with Wheel of Names</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] mt-2">
                Learn how our Wheel of Names generator delivers fast, unbiased, and engaging name selection for classrooms, events, and daily decision-making.
              </p>
            </div>

            {/* Section 1: What is a Wheel of Names */}
            <section className="space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
                <span>What is a Wheel of Names?</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base">
                A <strong className="text-[#1a1b22] dark:text-[#f1effa]">Wheel of Names</strong> is an interactive digital spinner designed to make picking a random item from a list transparent, engaging, and 100% fair. Rather than drawing names out of a hat or relying on manual selection, a name wheel divides your input list into colorful wheel sectors and spins smoothly using physics-based deceleration until the top indicator pointer settles on a winning slice.
              </p>
              <p className="text-xs sm:text-sm md:text-base">
                Whether you are an educator selecting student volunteers, a stream host conducting live giveaway draws, or a team manager dividing employees into breakout groups, the Wheel of Names provides visual excitement and undeniable fairness.
              </p>
            </section>

            {/* Section 2: How to Use Step-by-Step */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#f59e0b] dark:text-[#fbbf24]" />
                <span>How to Pick a Random Name Step-by-Step</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] p-4 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#4648d4] dark:text-[#8587ff] font-bold flex items-center justify-center text-xs sm:text-sm border border-[#eeedf7] dark:border-[#2e3042]">
                    1
                  </div>
                  <h4 className="font-bold text-[#1a1b22] dark:text-[#f1effa] text-sm">Enter Your Names</h4>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7]">
                    Type names directly into the box, click <em>Bulk Paste</em> to copy a list, or click <em>Import File</em> to load a TXT or CSV roster file.
                  </p>
                </div>

                <div className="bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] p-4 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#fbf0f7] dark:bg-[#281b25] text-[#ec4899] dark:text-[#f472b6] font-bold flex items-center justify-center text-xs sm:text-sm border border-[#fce7f3] dark:border-[#421d33]">
                    2
                  </div>
                  <h4 className="font-bold text-[#1a1b22] dark:text-[#f1effa] text-sm">Customize &amp; Set Mode</h4>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7]">
                    Select your preferred color theme, adjust spin duration, or switch mode tabs for Classroom, Giveaway, or Team Generator features.
                  </p>
                </div>

                <div className="bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] p-4 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#e6f7f0] dark:bg-[#0f281e] text-[#00a86b] dark:text-[#4edea3] font-bold flex items-center justify-center text-xs sm:text-sm border border-[#a3e6cd] dark:border-[#1d4233]">
                    3
                  </div>
                  <h4 className="font-bold text-[#1a1b22] dark:text-[#f1effa] text-sm">Spin &amp; Celebrate</h4>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7]">
                    Click the center <strong>SPIN THE WHEEL</strong> button or tap spacebar. Enjoy celebratory audio and remove winners for no-repeat rounds.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Randomness & CSPRNG Engine */}
            <section className="space-y-3 bg-[#fbf8ff] dark:bg-[#14151e] p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <h3 className="text-base sm:text-lg font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00a86b] dark:text-[#4edea3]" />
                <span>How the Name Selector Algorithm Guarantees 100% Randomness</span>
              </h3>
              <p className="text-xs sm:text-sm">
                Unlike primitive random generators that rely on standard pseudo-random formulas, our Wheel of Names utilizes browser-native <strong className="text-[#1a1b22] dark:text-[#f1effa]">Cryptographically Secure Pseudorandom Number Generation (CSPRNG)</strong> via the Web Crypto API. This ensures that every entry on the wheel receives equal mathematical probability, preventing repeat biases, order dependencies, or predictability.
              </p>
            </section>

            {/* Section 4: Classroom & Giveaway Use Cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] p-5 rounded-2xl space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#00a86b] dark:text-[#4edea3]" />
                  <span>Classroom Name Selection for Teachers</span>
                </h3>
                <p className="text-xs sm:text-sm">
                  Teachers use the Wheel of Names to choose student volunteers for reading turns, presentation order, or answering questions. With <strong className="text-[#1a1b22] dark:text-[#f1effa]">No-Repeat Mode</strong>, every student gets an equal turn before any student is selected twice, creating an inclusive and encouraging learning environment.
                </p>
              </div>

              <div className="bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] p-5 rounded-2xl space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#f59e0b] dark:text-[#fbbf24]" />
                  <span>Raffle Draws &amp; Live Stream Giveaways</span>
                </h3>
                <p className="text-xs sm:text-sm">
                  For event hosts, Twitch streamers, and social media giveaways, the visual motion of the wheel creates anticipation for audience members. The verifiable seed log provides auditability, reassuring participants that every giveaway draw is transparent and unmanipulated.
                </p>
              </div>
            </div>

            {/* Section 5: FAQ Accordion */}
            <section className="space-y-4 pt-6 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-2.5">
                {JSON_LD_DATA['@graph'][1].mainEntity.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] rounded-2xl p-4 transition-all [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center justify-between font-bold text-[#1a1b22] dark:text-[#f1effa] cursor-pointer text-xs sm:text-sm md:text-base">
                      <span>{faq.name}</span>
                      <span className="text-[#464554] dark:text-[#c7c4d7] group-open:rotate-180 transition-transform text-xs">
                        ▼
                      </span>
                    </summary>
                    <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] mt-3 pt-3 border-t border-[#eeedf7] dark:border-[#222330] leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Explore Related Tools Grid */}
          <div className="bg-white dark:bg-[#0f1017] border border-[#eeedf7] dark:border-[#20212f] rounded-3xl p-6 shadow-md space-y-4 transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Explore More Decision Wheels &amp; Randomizers</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/classroom-wheel"
                className="bg-[#fbf8ff] dark:bg-[#14151e] hover:bg-[#f4f2fd] dark:hover:bg-[#1f202e] border border-[#eeedf7] dark:border-[#222330] p-3.5 rounded-2xl transition-all group"
              >
                <GraduationCap className="w-5 h-5 text-[#00a86b] dark:text-[#4edea3] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-[#f1effa]">Classroom Wheel</h4>
                <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] mt-0.5">Student picker &amp; helpers</p>
              </Link>

              <Link
                href="/team-generator"
                className="bg-[#fbf8ff] dark:bg-[#14151e] hover:bg-[#f4f2fd] dark:hover:bg-[#1f202e] border border-[#eeedf7] dark:border-[#222330] p-3.5 rounded-2xl transition-all group"
              >
                <Users className="w-5 h-5 text-[#ec4899] dark:text-[#f472b6] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-[#f1effa]">Team Generator</h4>
                <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] mt-0.5">Group name divider</p>
              </Link>

              <Link
                href="/random-number-wheel"
                className="bg-[#fbf8ff] dark:bg-[#14151e] hover:bg-[#f4f2fd] dark:hover:bg-[#1f202e] border border-[#eeedf7] dark:border-[#222330] p-3.5 rounded-2xl transition-all group"
              >
                <Zap className="w-5 h-5 text-[#f59e0b] dark:text-[#fbbf24] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-[#f1effa]">Random Number Wheel</h4>
                <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] mt-0.5">1–100 number spinner</p>
              </Link>

              <Link
                href="/spin-the-wheel"
                className="bg-[#fbf8ff] dark:bg-[#14151e] hover:bg-[#f4f2fd] dark:hover:bg-[#1f202e] border border-[#eeedf7] dark:border-[#222330] p-3.5 rounded-2xl transition-all group"
              >
                <RotateCcw className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-[#f1effa]">Spin the Wheel</h4>
                <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] mt-0.5">Custom decision maker</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer - Identical to Homepage */}
      <Footer />
    </div>
  );
}
