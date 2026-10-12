'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { AudienceMode, DifficultyLevel, GameMode } from '@/lib/truthOrDare/types';

interface TruthOrDarePresetLaunchProps {
  gameMode?: GameMode;
  audience?: AudienceMode;
  difficulty?: DifficultyLevel;
  label: string;
  emoji?: string;
  className?: string;
}

export default function PresetLaunchButton({
  gameMode,
  audience,
  difficulty,
  label,
  emoji,
  className
}: TruthOrDarePresetLaunchProps) {
  const handleLaunch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('launch-truth-dare-preset', {
          detail: { gameMode, audience, difficulty }
        })
      );
      // Smooth scroll back to wheel
      const wheelEl = document.getElementById('truth-dare-wheel-section');
      if (wheelEl) {
        wheelEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleLaunch}
      className={
        className ||
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.03] cursor-pointer'
      }
      title={`Launch ${label} on Truth or Dare Generator`}
    >
      {emoji ? <span>{emoji}</span> : <Sparkles className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </button>
  );
}
