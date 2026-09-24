import React from 'react';
import { SeoQuickFacts } from '@/lib/seoArchitecture';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  Sliders,
  DollarSign,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface QuickFactsProps {
  facts: SeoQuickFacts;
  className?: string;
}

export default function QuickFacts({ facts, className = '' }: QuickFactsProps) {
  return (
    <section
      aria-labelledby="quick-facts-heading"
      className={`rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-5 sm:p-6 shadow-xs space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2
            id="quick-facts-heading"
            className="text-base sm:text-lg font-headline font-bold text-[#1a1b22] dark:text-white"
          >
            Quick Facts: {facts.toolName}
          </h2>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#006c49] dark:text-emerald-400 font-semibold border border-emerald-500/20">
          100% Free
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm">
        {/* Purpose */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <Zap className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Primary Purpose</span>
          </div>
          <p className="text-[#1a1b22] dark:text-[#f1effa] font-medium leading-snug">
            {facts.purpose}
          </p>
        </div>

        {/* Best For */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49] dark:text-emerald-400" />
            <span>Best For</span>
          </div>
          <p className="text-[#1a1b22] dark:text-[#f1effa] font-medium leading-snug">
            {facts.bestFor}
          </p>
        </div>

        {/* Modes */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Available Modes</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {facts.modes.map((mode, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1e1f2b] border border-[#eeedf7] dark:border-[#292a39] text-[11px] text-[#464554] dark:text-[#c7c4d7]"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        {/* Customization */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Customization</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {facts.customization.map((c, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1e1f2b] border border-[#eeedf7] dark:border-[#292a39] text-[11px] text-[#464554] dark:text-[#c7c4d7]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Account & Cost */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Account &amp; Pricing</span>
          </div>
          <p className="text-[#1a1b22] dark:text-[#f1effa] font-medium leading-snug">
            {facts.accountRequired} • {facts.cost}
          </p>
        </div>

        {/* Randomness Engine */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#767586] dark:text-[#908fa1] font-semibold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Randomness Method</span>
          </div>
          <p className="text-[#1a1b22] dark:text-[#f1effa] font-medium leading-snug">
            {facts.selectionMethod}
          </p>
        </div>
      </div>
    </section>
  );
}
