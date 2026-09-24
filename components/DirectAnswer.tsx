import React from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';

interface DirectAnswerProps {
  question?: string;
  answer: string;
  className?: string;
}

export default function DirectAnswer({
  question,
  answer,
  className = ''
}: DirectAnswerProps) {
  return (
    <div
      className={`rounded-2xl border border-[#4648d4]/20 dark:border-[#8587ff]/20 bg-gradient-to-r from-[#f4f2fd] to-white dark:from-[#1d1e28] dark:to-[#181922] p-4 sm:p-5 shadow-xs ${className}`}
      aria-label="Direct Answer Definition"
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          {question && (
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              {question}
            </h2>
          )}
          <p className="text-sm sm:text-base text-[#1a1b22] dark:text-[#f1effa] font-medium leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
