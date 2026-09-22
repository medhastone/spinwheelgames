'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { WheelItem, WheelMode, ResultCardData, SurpriseModifier } from '@/lib/types';
import { playWinnerFanfare, announceWinnerTTS } from '@/lib/sound';
import { getRandomSurpriseModifier } from '@/lib/gamification';
import { loadUserStats } from '@/lib/storage';
import ResultCardModal from './ResultCardModal';
import {
  X,
  Trophy,
  Info,
  RotateCcw,
  Trash2,
  Copy,
  Check,
  Flame,
  Sparkles,
  Share2,
  Swords,
  Dice5
} from 'lucide-react';

interface WinnerModalProps {
  isOpen?: boolean;
  winner: WheelItem | null;
  oddsPercent?: string;
  seed?: string;
  spinNumber?: number;
  currentMode?: WheelMode;
  soundEnabled?: boolean;
  soundPack?: string;
  volume?: number;
  ttsEnabled?: boolean;
  onClose: () => void;
  onSpinAgain: () => void;
  onRemoveWinner: (item: WheelItem) => void;
  onStartBestOfThree?: () => void;
}

export default function WinnerModal({
  isOpen = true,
  winner,
  oddsPercent = '12.5',
  seed = '0x94F2B01E',
  spinNumber = 1,
  currentMode = 'standard',
  soundEnabled = true,
  soundPack = 'carnival',
  volume = 0.7,
  ttsEnabled = false,
  onClose,
  onSpinAgain,
  onRemoveWinner,
  onStartBestOfThree
}: WinnerModalProps) {
  const [copied, setCopied] = useState(false);
  const [surpriseModifier, setSurpriseModifier] = useState<SurpriseModifier | null>(null);
  const [surpriseWinnerId, setSurpriseWinnerId] = useState<string | null>(null);
  const [resultCardOpen, setResultCardOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !winner) return;

    // Launch celebratory confetti with multiple bursts
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch {
      // Confetti fallback safely ignored
    }

    // Play fanfare chime
    if (soundEnabled) {
      playWinnerFanfare(soundEnabled, soundPack, volume);
    }

    // Announce via Web Speech API if TTS enabled
    if (ttsEnabled) {
      announceWinnerTTS(winner.text);
    }
  }, [isOpen, winner, soundEnabled, volume, soundPack, ttsEnabled]);

  if (!isOpen || !winner) return null;

  const activeModifier = surpriseWinnerId === winner.id ? surpriseModifier : null;
  const stats = loadUserStats();
  const streak = stats.currentDailyStreak || 1;

  const handleDrawSurprise = () => {
    const mod = getRandomSurpriseModifier();
    setSurpriseModifier(mod);
    setSurpriseWinnerId(winner.id);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    const text = `🎉 Winner: ${winner.text} (Odds: ${oddsPercent}%, Seed: ${seed}, Streak: 🔥${streak} Days) - SpinWheelGames.org`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resultCardData: ResultCardData = {
    winner: winner.text,
    streak,
    challengeName: currentMode === 'standard' ? 'Provably Fair Wheel' : `${currentMode.toUpperCase()} Decision`,
    oddsPercent,
    seed,
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org',
    modifier: activeModifier
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="relative w-full max-w-md bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl animate-bounceIn flex flex-col items-center text-center max-h-[92vh] overflow-y-auto">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
            aria-label="Close winner dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Victory Trophy Badge with Streak Indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4648d4] to-[#6063ee] text-white flex items-center justify-center shadow-lg shadow-[#4648d4]/30 animate-pulse">
              <Trophy className="w-8 h-8" />
            </div>

            {/* Streak Chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-current" />
              <span>{streak} Day Streak</span>
            </div>
          </div>

          {/* Header */}
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#4648d4] dark:text-[#8587ff]">
            We Have a Winner!
          </span>

          {/* Winner Highlight Text */}
          <h2 className="font-headline font-extrabold text-[28px] sm:text-[32px] text-[#1a1b22] dark:text-[#f1effa] mt-1 mb-3 leading-tight max-w-full break-words">
            {winner.text}
          </h2>

          {/* Cryptographic Selection Stats */}
          <div className="w-full bg-[#f4f2fd] dark:bg-[#1d1e28] rounded-xl p-3 border border-[#eeedf7] dark:border-[#292a39] mb-4 grid grid-cols-3 gap-2 text-left">
            <div>
              <span className="block text-[10px] font-semibold text-[#767586] dark:text-[#908fa1] uppercase">
                Calculated Odds
              </span>
              <span className="font-mono font-bold text-[13px] text-[#006c49] dark:text-[#4edea3]">
                {oddsPercent}%
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-[#767586] dark:text-[#908fa1] uppercase">
                Spin Count
              </span>
              <span className="font-mono font-bold text-[13px] text-[#1a1b22] dark:text-[#f1effa]">
                #{spinNumber}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-[#767586] dark:text-[#908fa1] uppercase">
                Entropy Seed
              </span>
              <span className="font-mono font-bold text-[11px] text-[#4648d4] dark:text-[#8587ff] truncate block">
                {seed}
              </span>
            </div>
          </div>

          {/* Surprise Twist Card Reveal (Core Loop Surprise Mechanic) */}
          <div className="w-full mb-4">
            {!activeModifier ? (
              <button
                type="button"
                onClick={handleDrawSurprise}
                className="w-full py-2 px-3 rounded-xl border border-purple-300 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Dice5 className="w-4 h-4 text-purple-500" />
                <span>Draw Surprise Twist / Modifier?</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-left flex items-start gap-2.5 animate-fadeIn">
                <Sparkles className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                      Surprise Twist Drawn!
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-200 font-bold">
                      {activeModifier.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white mt-0.5">
                    {activeModifier.title}
                  </h4>
                  <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-0.5">
                    {activeModifier.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mode specific elimination hint */}
          {currentMode === 'elimination' && (
            <p className="text-[12px] text-amber-600 dark:text-amber-400 mb-3 font-medium flex items-center justify-center gap-1.5">
              <Info className="w-4 h-4 shrink-0" />
              <span>Elimination mode: Winner can now be removed for the next round.</span>
            </p>
          )}

          {/* Primary Action Buttons */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onSpinAgain}
                className="flex-1 py-3 px-4 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-[14px] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Spin Again</span>
              </button>

              <button
                type="button"
                onClick={() => setResultCardOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[14px] shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Card</span>
              </button>
            </div>

            {/* Optional Best of 3 / Elimination row */}
            <div className="flex gap-2">
              {onStartBestOfThree && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartBestOfThree();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Best-of-3 Duel</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onRemoveWinner(winner)}
                className="flex-1 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 text-red-600 dark:text-red-300 font-bold text-xs border border-red-200 dark:border-red-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Winner</span>
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Result'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold transition-all cursor-pointer"
              >
                Keep &amp; Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card Modal */}
      <ResultCardModal
        isOpen={resultCardOpen}
        onClose={() => setResultCardOpen(false)}
        data={resultCardData}
      />
    </>
  );
}

