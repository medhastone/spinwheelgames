'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FairRandomness() {
  const trustBadges = [
    'No signup for basic use',
    'Works in your browser',
    'Custom wheels',
    'Shareable wheels',
    'Mobile friendly'
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#006c49] dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparent Browser Entropy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Fair Random Selection
            </h2>

            <p className="text-sm sm:text-base text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              SpinWheelGames uses your browser&apos;s <strong>Web Crypto API</strong> to select random results. The selected result is then displayed through the wheel animation. Weighted mode intentionally changes probabilities according to the weights you set.
            </p>

            <div className="pt-1">
              <Link
                href="/fairness"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline"
              >
                <span>How Random Selection Works →</span>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#f8f7fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-3 md:w-80 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1a1b22] dark:text-white">
              <Cpu className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Web Crypto API Standards</span>
            </div>
            <ul className="text-xs text-[#464554] dark:text-[#c7c4d7] space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Client-side execution (zero server bias)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Uniform probability distribution</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Optional customizable weights</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact "Simple by Default" Section */}
        <div className="pt-6 border-t border-[#f4f2fd] dark:border-[#222330] space-y-3">
          <span className="text-[11px] font-bold text-[#555466] dark:text-[#908fa1] uppercase tracking-wider block">
            Simple by Default
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] border border-[#eeedf7] dark:border-[#313345] text-xs font-semibold text-[#1a1b22] dark:text-[#e2e0f0]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
