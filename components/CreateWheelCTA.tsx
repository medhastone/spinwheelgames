'use client';

import React from 'react';
import {
  PlusCircle,
  Palette,
  Scale,
  EyeOff,
  Volume2,
  Share2,
  FileSpreadsheet,
  Sliders,
  RefreshCw
} from 'lucide-react';

interface CreateWheelCTAProps {
  onCreateClick?: () => void;
}

export default function CreateWheelCTA({ onCreateClick }: CreateWheelCTAProps) {
  const handleClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/?create=true';
    }
  };

  const features = [
    { icon: Sliders, label: 'Custom Entries', desc: 'Type or paste unlimited choices' },
    { icon: Palette, label: 'Colors', desc: 'Arcade neon, pastel & dark themes' },
    { icon: Scale, label: 'Weights', desc: 'Assign custom probability weights' },
    { icon: RefreshCw, label: 'No Repeat', desc: 'Fair non-duplicating draws' },
    { icon: EyeOff, label: 'Elimination', desc: 'Auto-hide winners after each spin' },
    { icon: Volume2, label: 'Sounds', desc: 'Spin sounds & Voice winner speech' },
    { icon: Share2, label: 'Share', desc: 'Share your exact wheel via URL' },
    { icon: FileSpreadsheet, label: 'Import / Export', desc: 'Quick paste from CSV & TXT' }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-gradient-to-br from-[#4648d4] via-[#3b3dbb] to-[#202288] text-white p-6 sm:p-12 shadow-xl space-y-8">
        {/* Decorative Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            Zero Limits Custom Builder
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Create Your Own Wheel
          </h2>

          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Add names, choices, teams, prizes or anything else and spin your custom wheel in seconds.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleClick}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#0c1424] font-black text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 fill-current" />
              <span>Create a Free Wheel</span>
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-white">{f.label}</span>
                </div>
                <p className="text-[11px] text-indigo-100/80 leading-normal">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
