'use client';
import { SITE_COUNTS } from "@/lib/siteConfig";

import React from 'react';
import { Play, Sparkles, LayoutGrid } from 'lucide-react';

interface HeroBannerProps {
  onSpinClick: () => void;
  onExploreClick: () => void;
}

export default function HeroBanner({ onSpinClick, onExploreClick }: HeroBannerProps) {
  return (
    <section className="relative w-full px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3 overflow-hidden bg-[#fbf8ff] dark:bg-[#12131a] transition-colors">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4648d4]/10 dark:bg-[#8587ff]/12 blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-[28rem] h-[28rem] rounded-full bg-[#6cf8bb]/15 dark:bg-[#005236]/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-2.5">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
          <span className="text-[11px] sm:text-[12px] font-bold text-[#1a1b22] dark:text-[#f1effa] tracking-wide">
            Interactive Spin Wheel &amp; Truly Fair Random Decision Studio
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-headline text-[32px] sm:text-[44px] md:text-[52px] tracking-tight font-black leading-[1.05] flex flex-wrap justify-center gap-x-2 sm:gap-x-3">
          <span className="text-[#4648d4] dark:text-[#8587ff]">Spin.</span>
          <span className="text-[#007a4d] dark:text-[#4edea3]">Pick.</span>
          <span className="text-[#b45309] dark:text-[#fbbf24]">Decide.</span>
          <span className="text-[#be185d] dark:text-[#f472b6]">Play.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="font-body text-[14px] sm:text-[16px] text-[#464554] dark:text-[#c7c4d7] max-w-xl leading-snug">
          Free customizable wheel games for names, decisions, teams, food, classrooms, parties, and giveaways.
        </p>

        {/* Quick CTA Actions */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onSpinClick}
            id="hero-spin-now-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-[13px] sm:text-[14px] font-extrabold shadow-sm hover:shadow-md active:scale-[0.98] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Spin The Wheel</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white">
              Space
            </kbd>
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e8e7f1] dark:bg-[#292a39] hover:bg-[#dad9e3] dark:hover:bg-[#313345] text-[#1a1b22] dark:text-white text-[13px] sm:text-[14px] font-bold transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Explore {SITE_COUNTS.wheelsFormatted} Wheels</span>
          </button>
        </div>
      </div>
    </section>
  );
}
