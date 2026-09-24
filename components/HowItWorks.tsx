'use client';

import React from 'react';
import { Sliders, Play, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Add or Choose Your Options',
      description: 'Select a pre-made template or type/bulk-paste custom names, decisions, items, or numbers.',
      icon: Sliders
    },
    {
      step: '2',
      title: 'Spin the Wheel',
      description: 'Click SPIN or hit Spacebar. Enjoy canvas physics with audio tick feedback.',
      icon: Play
    },
    {
      step: '3',
      title: 'Get Your Result',
      description: 'See your winner highlighted with celebratory confetti. Spin again or share with one click.',
      icon: Trophy
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
          Simple &amp; Instant
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
          How It Works
        </h2>
        <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
          Start with a ready-made wheel or create your own in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <div
              key={idx}
              className="relative p-6 rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-black text-base">
                  {s.step}
                </div>
                <div className="p-2.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#222330] text-[#767586] dark:text-[#908fa1]">
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-headline font-bold text-lg text-[#1a1b22] dark:text-white">
                {s.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
