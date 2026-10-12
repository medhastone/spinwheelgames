'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ClassroomMode } from './ClassroomWheelEngine';

interface ClassroomPresetButtonProps {
  mode: ClassroomMode;
  label: string;
  emoji?: string;
  groupSize?: number;
  className?: string;
}

export default function ClassroomPresetButton({
  mode,
  label,
  emoji,
  groupSize,
  className
}: ClassroomPresetButtonProps) {
  const handleLaunch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('launch-classroom-mode', {
          detail: { mode, groupSize }
        })
      );
      const toolEl = document.getElementById('tool-interactive');
      if (toolEl) {
        toolEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleLaunch}
      className={
        className ||
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0'
      }
      title={`Switch classroom spinner to ${label}`}
    >
      {emoji ? <span className="text-xs">{emoji}</span> : <Sparkles className="w-3 h-3" />}
      <span>{label}</span>
    </button>
  );
}
