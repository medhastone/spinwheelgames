import React from 'react';
import type { Metadata } from 'next';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import FairnessSimulator from '@/components/FairnessSimulator';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Binary,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Cryptographic Randomness & Fairness | SpinWheelGames',
  description: 'SpinWheelGames uses the browser Web Crypto API (crypto.getRandomValues()) to generate random values. Learn how our client-side algorithms ensure uniform probability distributions.',
  alternates: {
    canonical: 'https://spinwheelgames.org/fairness'
  },
  openGraph: {
    title: 'Cryptographic Randomness & Fairness | SpinWheelGames',
    description: 'SpinWheelGames uses the browser Web Crypto API (crypto.getRandomValues()) to generate random values. Learn how our client-side algorithms ensure uniform probability distributions.',
    url: 'https://spinwheelgames.org/fairness',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Cryptographic Randomness & Fairness | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptographic Randomness & Fairness | SpinWheelGames',
    description: 'SpinWheelGames uses the browser Web Crypto API (crypto.getRandomValues()) to generate random values. Learn how our client-side algorithms ensure uniform probability distributions.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

export default function FairnessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Browser-Based Cryptographic Randomness on SpinWheelGames',
    description:
      'Technical explanation and live empirical demonstration of Web Crypto API (crypto.getRandomValues()) algorithms powering online decision wheels and 3D dice.',
    author: {
      '@type': 'Organization',
      name: 'SpinWheelGames Engineering Team',
      url: 'https://spinwheelgames.org'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpinWheelGames',
      url: 'https://spinwheelgames.org'
    },
    mainEntityOfPage: 'https://spinwheelgames.org/fairness'
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader activePage="/fairness" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 space-y-8 sm:space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-[#006c49] dark:text-[#4edea3] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Web Crypto API (crypto.getRandomValues())
          </div>
          <h1 className="font-headline text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Browser-Based Cryptographic Randomness
          </h1>
          <p className="text-[15px] sm:text-[18px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            SpinWheelGames uses the browser Web Crypto API (<code className="font-mono text-sm px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">crypto.getRandomValues()</code>) to generate random values. No biased pseudorandom math, no predetermined server outcomes, and zero tracking.
          </p>
        </section>

        {/* Interactive Monte Carlo Chi-Square Simulator Tool */}
        <FairnessSimulator />

        {/* Educational Content: Web Crypto CSPRNG vs Math.random() */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Limitation of Math.random()
            </div>
            <h3 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white">
              Why Standard PRNGs Are Predictable
            </h3>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Most online spinner websites use Javascript’s standard <code className="bg-[#f4f2fd] dark:bg-[#222330] px-1 py-0.5 rounded text-xs">Math.random()</code>. This relies on non-cryptographic PRNG algorithms (such as XorShift128+ in V8).
            </p>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Because internal states in non-cryptographic generators can be determined from prior sequence outputs, standard wheels can be susceptible to pattern repetition and state estimation.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#006c49] dark:text-[#4edea3] text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Our Implementation: Web Crypto API
            </div>
            <h3 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white">
              Cryptographically Secure Random Generation
            </h3>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              SpinWheelGames invokes the browser’s native <code className="bg-[#f4f2fd] dark:bg-[#222330] px-1 py-0.5 rounded text-xs">window.crypto.getRandomValues()</code> interface, which draws entropy directly from underlying operating system cryptographic randomness sources.
            </p>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Every spin and dice outcome is generated in the client browser with cryptographically uncorrelated outputs and uniform probability distribution.
            </p>
          </div>
        </section>

        {/* Code Transparency Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
          <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <Binary className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Mathematical Implementation
          </h2>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7]">
            Here is the algorithm running inside SpinWheelGames to derive a 53-bit IEEE-754 uniform random float from two 32-bit unsigned integers:
          </p>

          <pre className="bg-[#12131a] text-[#8587ff] p-4 sm:p-5 rounded-2xl text-[12px] sm:text-[13px] font-mono overflow-x-auto border border-[#292a39]">
{`// Generate cryptographically secure 53-bit float in [0, 1)
export function getSecureRandomFloat(): number {
  const uintArray = new Uint32Array(2);
  window.crypto.getRandomValues(uintArray);

  // Combine 21 bits from first integer and 32 bits from second
  const highBits = uintArray[0] >>> 11;
  const lowBits = uintArray[1];
  
  return (highBits * 4294967296 + lowBits) / 9007199254740992;
}`}
          </pre>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span className="text-xs text-[#767586] dark:text-[#908fa1]">
              Zero server latency • 100% Client-Side • IEEE-754 mantissa resolution
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline"
            >
              <span>Test with an interactive wheel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
