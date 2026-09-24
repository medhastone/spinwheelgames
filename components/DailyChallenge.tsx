'use client';

import React from 'react';
import ChallengeEngine from './ChallengeEngine';
import { Flame, Calendar, Trophy, Share2 } from 'lucide-react';

interface DailyChallengeProps {
  soundEnabled?: boolean;
}

export default function DailyChallenge({ soundEnabled = true }: DailyChallengeProps) {
  return (
    <section id="daily-challenge" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-gradient-to-br from-white via-[#f8f7fd] to-[#f2effd] dark:from-[#181922] dark:via-[#151620] dark:to-[#12131a] p-6 sm:p-10 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#222330] pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
              <Flame className="w-6 h-6 fill-current animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  Daily Habit Booster
                </span>
                <span className="text-xs text-[#767586] dark:text-[#908fa1] flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-1">
                🔥 Daily Spin Challenge
              </h2>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] max-w-xs leading-relaxed">
            Can you complete today&apos;s goal? Spin once per day to build your personal streak and share your result with friends.
          </div>
        </div>

        {/* Embedded Deterministic Challenge Engine */}
        <ChallengeEngine soundEnabled={soundEnabled} soundPack="pop" volume={0.8} />
      </div>
    </section>
  );
}
