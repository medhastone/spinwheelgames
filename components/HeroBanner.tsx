'use client';

import React from 'react';
import { CheckCircle2, Volume2, Play, LayoutGrid } from 'lucide-react';

interface HeroBannerProps {
  onSpinClick: () => void;
  onExploreClick: () => void;
}

export default function HeroBanner({ onSpinClick, onExploreClick }: HeroBannerProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-12 overflow-hidden bg-[#fbf8ff] dark:bg-[#12131a] transition-colors">
      {/* Subtle Background Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4648d4]/8 dark:bg-[#8587ff]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-[30rem] h-[30rem] rounded-full bg-[#6cf8bb]/15 dark:bg-[#005236]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Trust / Status Pill */}
        <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] shadow-sm mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#006c49] dark:text-[#4edea3] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#4edea3] animate-pulse" />
            Zero Lag
          </span>
          <span className="text-[#c7c4d7] dark:text-[#464554] text-[12px]">•</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#464554] dark:text-[#c7c4d7]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            Web Crypto API RNG
          </span>
          <span className="text-[#c7c4d7] dark:text-[#464554] text-[12px]">•</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#464554] dark:text-[#c7c4d7]">
            <Volume2 className="w-3.5 h-3.5 text-[#464554] dark:text-[#c7c4d7]" />
            Sound FX Ready
          </span>
        </div>

        {/* Main Catchphrase */}
        <h1 className="font-headline text-[34px] sm:text-[48px] md:text-[56px] text-[#1a1b22] dark:text-white max-w-4xl tracking-tight font-extrabold leading-[1.12]">
          Spin the Wheel &amp; <span className="text-[#4648d4] dark:text-[#8587ff]">Decide</span> in Seconds
        </h1>

        {/* Subtitle */}
        <p className="mt-3 font-body text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] max-w-2xl leading-relaxed">
          Free wheel games, random pickers, and certified fair decision tools for classrooms, parties, raffles, agile standups, and everyday dinner choices.
        </p>

        {/* Primary Action Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onSpinClick}
            id="hero-spin-now-btn"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[14px] sm:text-[15px] font-semibold shadow-md hover:shadow-lg active:translate-y-px transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Spinning Now</span>
            <kbd className="ml-1 text-[11px] px-2 py-0.5 rounded bg-white/20 text-white font-mono">
              Space
            </kbd>
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl bg-[#e8e7f1] dark:bg-[#292a39] hover:bg-[#dad9e3] dark:hover:bg-[#313345] text-[#1a1b22] dark:text-white text-[14px] sm:text-[15px] font-semibold transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Explore 100+ Wheel Games</span>
          </button>
        </div>
      </div>
    </section>
  );
}
