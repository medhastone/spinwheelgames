'use client';

import React from 'react';
import { FoodPresetId } from '@/lib/food/types';
import { Sparkles } from 'lucide-react';

interface PresetLaunchButtonProps {
  presetId: FoodPresetId;
  label: string;
  emoji?: string;
  className?: string;
}

export default function PresetLaunchButton({
  presetId,
  label,
  emoji,
  className
}: PresetLaunchButtonProps) {
  const handleLaunch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('launch-food-preset', {
          detail: { presetId }
        })
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleLaunch}
      className={
        className ||
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer'
      }
      title={`Launch ${label} on Food Wheel`}
    >
      {emoji ? <span>{emoji}</span> : <Sparkles className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </button>
  );
}
