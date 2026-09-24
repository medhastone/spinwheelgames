import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  ShieldCheck,
  Cpu,
  Zap,
  Users,
  EyeOff,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Code,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Our Mission & Cryptographic Architecture | SpinWheelGames',
  description:
    'Learn about SpinWheelGames.org, our mission to provide ad-free, 100% client-side, provably fair random decision wheels with hardware-seeded Web Cryptography.',
  alternates: {
    canonical: 'https://spinwheelgames.org/about'
  },
  openGraph: {
    title: 'About SpinWheelGames.org - Mission & Technology',
    description:
      'Search-first, ad-free random decision engine powered by the Web Cryptography API (CSPRNG).',
    url: 'https://spinwheelgames.org/about',
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
        item: 'https://spinwheelgames.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://spinwheelgames.org/about'
      }
    ]
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'SpinWheelGames.org',
      url: 'https://spinwheelgames.org',
      logo: 'https://spinwheelgames.org/spinwheel-logo.webp',
      description:
        'A browser-native random decision wheel engine built on modern Web Cryptography API (CSPRNG), providing ad-free tools for education, giveaways, and decision making.',
      foundingDate: '2024',
      knowsAbout: [
        'Web Cryptography API (CSPRNG)',
        'Random Number Generation',
        'Classroom Student Management',
        'Decision Theory',
        'Client-Side Privacy'
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <SubpageHeader activePage="/about" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering &amp; Philosophy
          </div>
          <h1 className="font-headline text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Building the Open Web’s Most Reliable Random Decision Engine
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            SpinWheelGames was created to replace bloated, ad-cluttered spinner websites with a fast, private, 100% client-side decision platform backed by true hardware cryptography.
          </p>
        </section>

        {/* Core Values / 4 Pillar Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              1. Cryptographically Provable Randomness
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Unlike legacy wheels that use outdated pseudorandom generators like <code className="bg-[#f4f2fd] dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs">Math.random()</code>, every spin on our platform draws 53 bits of hardware and thermal entropy directly from the browser’s <code className="bg-[#f4f2fd] dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs">window.crypto.getRandomValues()</code> CSPRNG.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006c49]/10 text-[#006c49] dark:text-[#4edea3] flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              2. Zero-Knowledge / 100% Client-Side Privacy
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Your classroom student rosters, giveaway participant names, raffle entries, and confidential team votes never leave your device. All calculations, physics rendering, and storage occur directly in your browser.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              3. Zero-Lag 60 FPS Physics
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Whether you have 2 options or 500 entries, our vector SVG and HTML5 Canvas rendering engine uses quintic deceleration curves and dynamic radial label packing to ensure zero dropped frames on laptops, interactive smartboards, and mobile phones.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
              4. Built for Teachers, Streamers &amp; Teams
            </h2>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              From classroom student splitters and winner elimination to tournament brackets, synchronized multi-wheels, and live battle simulators, our tools are tailored for real-world workflows without requiring accounts or sign-ins.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-6">
          <h2 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#1a1b22] dark:text-white">
            Why We Built SpinWheelGames
          </h2>
          <div className="space-y-4 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            <p>
              When teachers pick students in classrooms or creators run live prize giveaways on Twitch and YouTube, fair randomness is critical. Unfortunately, the vast majority of online spinner tools are loaded with disruptive popup ads, slow tracking scripts, and outdated pseudorandom algorithms that can be easily predicted or manipulated.
            </p>
            <p>
              We founded <strong>SpinWheelGames.org</strong> with a simple mission: create a fast, ad-free, mathematically verified random decision platform that respects user privacy and works flawlessly on any screen.
            </p>
            <p>
              By encoding custom wheels into URL hashes and local browser storage, you can create, share, and embed interactive wheels anywhere without ever sending personal data or class rosters across external networks.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#eeedf7] dark:border-[#222330]">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No Account or Sign-Up Required</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Offline-Capable Architecture</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1a1b22] dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free for Commercial &amp; School Use</span>
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
                Technical Specifications &amp; Compliance
              </h2>
              <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                Grounded in industry cryptography and web accessibility standards
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[13px]">
            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">CSPRNG Entropy</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                IEEE-754 53-bit uniform float conversion from 64-bit hardware entropy array.
              </div>
            </div>

            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">A11y (WCAG 2.1 AA)</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                Keyboard shortcuts (<kbd>Space</kbd>, <kbd>F</kbd>), ARIA live announcements &amp; Web Speech TTS.
              </div>
            </div>

            <div className="bg-white dark:bg-[#181922] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
              <div className="font-bold text-[#1a1b22] dark:text-white mb-1">Zero Tracking</div>
              <div className="text-[#464554] dark:text-[#c7c4d7]">
                No third-party advertising cookies, behavioral tracking pixels, or data collection.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/fairness"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-semibold hover:bg-[#3b3dbb] transition-all"
            >
              Audit Our Cryptographic Algorithm
              <ArrowRight className="w-4 h-4" />
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
