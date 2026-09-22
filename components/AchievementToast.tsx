'use client';

import React, { useEffect } from 'react';
import { Achievement } from '@/lib/types';
import { Trophy, X, Sparkles } from 'lucide-react';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({
  achievement,
  onDismiss
}: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn max-w-sm w-full">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 rounded-2xl shadow-2xl border border-amber-300/40 flex items-start gap-3 relative overflow-hidden">
        {/* Glow sheen */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none" />

        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner">
          <Trophy className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-100 font-extrabold">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Achievement Unlocked!</span>
          </div>
          <h4 className="font-headline font-black text-sm text-white truncate mt-0.5">
            {achievement.title}
          </h4>
          <p className="text-xs text-amber-50 leading-tight mt-0.5">
            {achievement.description}
          </p>
          <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-white font-bold">
            Badge: {achievement.badgeName}
          </span>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
