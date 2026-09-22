'use client';

import React from 'react';
import { Timer, RefreshCw, Play } from 'lucide-react';

interface SpinButtonProps {
  onSpin: () => void;
  isSpinning: boolean;
  disabled?: boolean;
  countdownNumber?: number | null;
}

export default function SpinButton({
  onSpin,
  isSpinning,
  disabled = false,
  countdownNumber = null
}: SpinButtonProps) {
  const isCountingDown = countdownNumber !== null && countdownNumber > 0;

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto">
      <button
        type="button"
        onClick={onSpin}
        disabled={disabled || isSpinning || isCountingDown}
        id="main-spin-button"
        className={`relative w-full py-4 px-8 rounded-2xl font-headline font-bold text-[18px] sm:text-[20px] tracking-wide shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer select-none ${
          isSpinning || isCountingDown
            ? 'bg-gradient-to-r from-[#5052e4] to-[#7678f5] text-white opacity-90 cursor-not-allowed scale-[0.98]'
            : disabled
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
            : 'bg-gradient-to-r from-[#4648d4] via-[#5b5de8] to-[#4648d4] hover:from-[#5052e4] hover:to-[#6a6cf8] active:scale-[0.97] text-white shadow-[0_8px_24px_rgba(70,72,212,0.38)]'
        }`}
      >
        {isCountingDown ? (
          <div className="flex items-center gap-2 animate-pulse text-[22px]">
            <Timer className="w-6 h-6 animate-bounce" />
            <span>Spinning in {countdownNumber}...</span>
          </div>
        ) : isSpinning ? (
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>DECIDING WINNER...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Play className="w-6 h-6 fill-current" />
            <span>SPIN THE WHEEL</span>
          </div>
        )}
      </button>

      <div className="flex items-center gap-2 text-[12px] text-[#767586] dark:text-[#908fa1]">
        <kbd className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#222330] border border-[#c7c4d7] dark:border-[#464554] font-mono text-[11px] font-bold">
          SPACE
        </kbd>
        <span>or Click to Spin</span>
      </div>
    </div>
  );
}
