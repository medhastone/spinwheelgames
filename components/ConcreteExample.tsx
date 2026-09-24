import React from 'react';
import { SeoConcreteExample } from '@/lib/seoArchitecture';
import { Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ConcreteExampleProps {
  example: SeoConcreteExample;
  className?: string;
}

export default function ConcreteExample({
  example,
  className = ''
}: ConcreteExampleProps) {
  return (
    <section
      aria-labelledby="concrete-example-heading"
      className={`rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-[#006c49] dark:text-emerald-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <h2
          id="concrete-example-heading"
          className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white"
        >
          {example.title || 'Step-by-Step Example'}
        </h2>
      </div>

      <p className="text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
        {example.scenario}
      </p>

      {/* Input Choices vs Output Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* User Input Items */}
        <div className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
            Example Input List
          </span>
          <div className="flex flex-wrap gap-1.5">
            {example.userChoices.map((choice, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-xs font-medium text-[#1a1b22] dark:text-[#f1effa]"
              >
                {choice}
              </span>
            ))}
          </div>
        </div>

        {/* Selected Result */}
        <div className="rounded-xl bg-gradient-to-br from-[#f4f2fd] to-white dark:from-[#1d1e28] dark:to-[#181922] border border-[#4648d4]/20 dark:border-[#8587ff]/30 p-4 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              Selected Outcome
            </span>
            <div className="mt-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#006c49] dark:text-emerald-400" />
              <span className="text-lg font-bold text-[#1a1b22] dark:text-white font-headline">
                {example.result}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed pt-2 border-t border-[#eeedf7] dark:border-[#292a39]">
            {example.explanation}
          </p>
        </div>
      </div>
    </section>
  );
}
