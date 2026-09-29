import { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { Sparkles, Cpu, EyeOff, Zap, Users, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.brandName} - Mission, Randomness & Architecture`,
  description:
    `Learn about ${SITE_CONFIG.fullBrandName}: our commitment to client-side randomness, minimal data collection, accessible design, and classroom utilities.`,
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/about`
  },
  openGraph: {
    title: `About ${SITE_CONFIG.fullBrandName} - Mission & Technology`,
    description:
      'Engineered for teachers, streamers, and organizers who value client-side randomness and minimal data collection.',
    url: `${SITE_CONFIG.baseUrl}/about`,
    type: 'website'
  }
};

export default function AboutPage() {
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
        name: 'About Us',
        item: `${SITE_CONFIG.baseUrl}/about`
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SubpageHeader activePage="/about" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Header Section */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering &amp; Values
          </div>
          <h1 className="font-headline text-[32px] sm:text-[46px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Built for Transparent Randomness &amp; Privacy
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            {SITE_CONFIG.brandName} was created to provide teachers, presenters, content creators, and teams with responsive, unbiased decision tools designed to minimize data collection and run smoothly in any modern web browser.
          </p>
        </section>

        {/* 4 Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              1. Hardware-Grade Cryptographic RNG
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Spins utilize the W3C Web Cryptography API (<code className="text-xs">crypto.getRandomValues</code>) to derive unbiased pseudorandom angles from operating system entropy sources, providing statistically uniform odds without server manipulation.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006c49]/10 text-[#006c49] dark:text-[#4edea3] flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              2. Local Browser Processing
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Designed to minimize collection of user-provided wheel data. Custom participant lists, classroom rosters, raffle entries, and spin physics run locally inside your browser session without unnecessary remote transmission.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              3. Fluid Canvas Rendering
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Whether you have 2 options or 200 entries, our vector-optimized HTML5 Canvas rendering engine employs physics-inspired deceleration curves, legible radial text layouts, and smooth animations across desktop, tablet, and mobile screens.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              4. Built for Classrooms, Streamers &amp; Teams
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              From classroom student splitters and elimination modes to tournament brackets, synchronized multi-wheels, and casual battle simulators, our tools support practical everyday activities without requiring user accounts or sign-ins.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-6">
          <h2 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#1a1b22] dark:text-white">
            Why We Built {SITE_CONFIG.brandName}
          </h2>
          <div className="space-y-4 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            <p>
              When teachers pick students in classrooms or creators run prize giveaways on live streams, straightforward and fair random selection is essential. Many legacy spinner sites are cluttered with aggressive tracking scripts and outdated pseudorandom generators.
            </p>
            <p>
              We built <strong>{SITE_CONFIG.fullBrandName}</strong> to provide a fast, responsive, privacy-conscious alternative focused on user privacy, mathematical clarity, and smooth accessibility across all devices.
            </p>
            <p>
              By utilizing local browser storage and optional URL hash compression, you can create, share, and embed interactive wheels while keeping participant rosters in your local session.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#eeedf7] dark:border-[#222330]">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No Account or Sign-Up Required</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Client-Side Execution Model</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free for Educational &amp; Community Use</span>
            </div>
          </div>
        </section>

        {/* Technical Standards */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4648d4] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
                Technical Specifications &amp; Design Principles
              </h2>
              <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                Grounded in web standards, cryptographic randomness, and WCAG accessibility principles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[13px]">
            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">CSPRNG Entropy</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                53-bit uniform float conversion derived from native browser cryptographic entropy arrays.
              </div>
            </div>

            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">Accessibility Principles</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                Designed with WCAG 2.1 accessibility principles, keyboard shortcuts (<kbd className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">Space</kbd>, <kbd className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">F</kbd>), ARIA live announcements, and contrast legibility.
              </div>
            </div>

            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">Minimal Data Model</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                Designed to minimize collection of user-provided wheel data with local browser processing.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/fairness"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-semibold hover:bg-[#3b3dbb] transition-all"
            >
              Review Randomness Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/accessibility"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[#1a1b22] dark:text-white text-[13px] font-semibold hover:bg-[#eeedf7] dark:hover:bg-[#222330] transition-all"
            >
              Accessibility Details
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[#1a1b22] dark:text-white text-[13px] font-semibold hover:bg-[#eeedf7] dark:hover:bg-[#222330] transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
