'use client';

import React, { useState } from 'react';
import { WheelItem, BestOfThreeSeries, ResultCardData } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound } from '@/lib/sound';
import { recordBestOf3Win, loadUserStats } from '@/lib/storage';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  X,
  Swords,
  Crown,
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface BestOfThreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableItems: WheelItem[];
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
  onSeriesWon?: (champion: WheelItem) => void;
}

export default function BestOfThreeModal({
  isOpen,
  onClose,
  availableItems,
  soundEnabled,
  soundPack,
  volume,
  onSeriesWon
}: BestOfThreeModalProps) {
  // Select default 2 items
  const [itemA, setItemA] = useState<WheelItem>(() => availableItems[0] || { id: 'a', text: 'Option A', weight: 1 });
  const [itemB, setItemB] = useState<WheelItem>(() => availableItems[1] || { id: 'b', text: 'Option B', weight: 1 });

  const [seriesState, setSeriesState] = useState<BestOfThreeSeries>({
    itemA,
    itemB,
    scoreA: 0,
    scoreB: 0,
    currentRound: 1,
    roundHistory: [],
    champion: null,
    targetWins: 2
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [lastRoundWinner, setLastRoundWinner] = useState<WheelItem | null>(null);
  const [shareCardOpen, setShareCardOpen] = useState(false);

  if (!isOpen) return null;

  const handleStartNewSeries = (newItemA = itemA, newItemB = itemB) => {
    setSeriesState({
      itemA: newItemA,
      itemB: newItemB,
      scoreA: 0,
      scoreB: 0,
      currentRound: 1,
      roundHistory: [],
      champion: null,
      targetWins: 2
    });
    setLastRoundWinner(null);
  };

  const handleSpinRound = () => {
    if (isSpinning || seriesState.champion) return;
    setIsSpinning(true);

    if (soundEnabled) {
      playTickSound(soundEnabled, soundPack, volume);
    }

    // Two-option duel with 50/50 fair cryptographic odds
    const duelPool = [seriesState.itemA, seriesState.itemB];
    const selection = selectWeightedWinner(duelPool);
    const roundWinner = selection.winner;

    // Simulate animated duel spin (1.4s)
    setTimeout(() => {
      setIsSpinning(false);
      setLastRoundWinner(roundWinner);

      const isA = roundWinner.id === seriesState.itemA.id;
      const newScoreA = isA ? seriesState.scoreA + 1 : seriesState.scoreA;
      const newScoreB = !isA ? seriesState.scoreB + 1 : seriesState.scoreB;

      const newHistory = [
        ...seriesState.roundHistory,
        { round: seriesState.currentRound, winner: roundWinner }
      ];

      let newChampion: WheelItem | null = null;
      if (newScoreA >= seriesState.targetWins) {
        newChampion = seriesState.itemA;
      } else if (newScoreB >= seriesState.targetWins) {
        newChampion = seriesState.itemB;
      }

      setSeriesState({
        ...seriesState,
        scoreA: newScoreA,
        scoreB: newScoreB,
        currentRound: seriesState.currentRound + 1,
        roundHistory: newHistory,
        champion: newChampion
      });

      if (newChampion) {
        if (soundEnabled) {
          playWinnerFanfare(soundEnabled, soundPack, volume);
        }
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        recordBestOf3Win();
        onSeriesWon?.(newChampion);
      }
    }, 1400);
  };

  const stats = loadUserStats();

  const shareData: ResultCardData = {
    winner: seriesState.champion?.text || 'Series Champ',
    score: `${seriesState.scoreA} - ${seriesState.scoreB}`,
    streak: stats.currentDailyStreak || 1,
    challengeName: 'Best-of-3 Series Championship',
    oddsPercent: '50.0',
    seed: seriesState.champion ? `BO3-${seriesState.champion.id.slice(0, 8)}` : 'BO3-FINAL',
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-[20px] text-[#1a1b22] dark:text-[#f1effa]">
                Best-of-3 Series
              </h3>
              <p className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                First contender to win 2 rounds claims the crown!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Series Scoreboard */}
        <div className="grid grid-cols-2 gap-4 items-center bg-[#f4f2fd] dark:bg-[#1d1e28] p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
          {/* Contender A */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all ${
              seriesState.champion?.id === seriesState.itemA.id
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 shadow-sm'
                : 'bg-white dark:bg-[#12131a] border-[#eeedf7] dark:border-[#292a39]'
            }`}
          >
            {seriesState.champion?.id === seriesState.itemA.id && (
              <Crown className="w-5 h-5 text-amber-500 mb-1 animate-bounce" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
              Contender 1
            </span>
            <span className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa] truncate w-full mt-0.5">
              {seriesState.itemA.text}
            </span>
            <div className="mt-2 flex items-center gap-1.5">
              {[...Array(seriesState.targetWins)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all ${
                    i < seriesState.scoreA
                      ? 'bg-indigo-600 text-white shadow-sm scale-110'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {i < seriesState.scoreA ? '✓' : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Contender B */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all ${
              seriesState.champion?.id === seriesState.itemB.id
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 shadow-sm'
                : 'bg-white dark:bg-[#12131a] border-[#eeedf7] dark:border-[#292a39]'
            }`}
          >
            {seriesState.champion?.id === seriesState.itemB.id && (
              <Crown className="w-5 h-5 text-amber-500 mb-1 animate-bounce" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
              Contender 2
            </span>
            <span className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa] truncate w-full mt-0.5">
              {seriesState.itemB.text}
            </span>
            <div className="mt-2 flex items-center gap-1.5">
              {[...Array(seriesState.targetWins)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all ${
                    i < seriesState.scoreB
                      ? 'bg-rose-600 text-white shadow-sm scale-110'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {i < seriesState.scoreB ? '✓' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Round Status Banner */}
        <div className="text-center py-2">
          {seriesState.champion ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center gap-1.5 animate-fadeIn">
              <Trophy className="w-7 h-7 text-amber-500" />
              <h4 className="font-headline font-extrabold text-[20px] text-[#1a1b22] dark:text-[#f1effa]">
                {seriesState.champion.text} Wins the Series!
              </h4>
              <p className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                Series finalized in {seriesState.roundHistory.length} rounds.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[13px] font-bold text-[#4648d4] dark:text-[#8587ff]">
                Round {seriesState.currentRound}
                {seriesState.scoreA === 1 && seriesState.scoreB === 1
                  ? ' • FINAL DECIDING ROUND!'
                  : seriesState.scoreA === 1 || seriesState.scoreB === 1
                  ? ' • MATCH POINT!'
                  : ''}
              </span>
              {lastRoundWinner && (
                <span className="text-[12px] text-emerald-600 dark:text-emerald-400">
                  Last round won by: <strong>{lastRoundWinner.text}</strong>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {!seriesState.champion ? (
            <button
              type="button"
              onClick={handleSpinRound}
              disabled={isSpinning}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#6063ee] hover:brightness-110 text-white font-headline font-bold text-[16px] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Swords className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'DUELING...' : `SPIN ROUND ${seriesState.currentRound}`}</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setShareCardOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[14px] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Create Victory Card</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartNewSeries()}
                className="flex-1 py-3 px-4 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] font-bold text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Rematch</span>
              </button>
            </div>
          )}
        </div>

        {/* Optional Contender Selection */}
        {!seriesState.champion && availableItems.length > 2 && (
          <div className="pt-2 border-t border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between text-xs text-[#767586]">
            <span>Switch contestants:</span>
            <select
              value={seriesState.itemA.id}
              onChange={(e) => {
                const found = availableItems.find((it) => it.id === e.target.value);
                if (found) handleStartNewSeries(found, seriesState.itemB);
              }}
              className="bg-transparent text-indigo-500 font-semibold focus:outline-none"
            >
              {availableItems.map((it) => (
                <option key={it.id} value={it.id} className="dark:bg-[#181922]">
                  1: {it.text}
                </option>
              ))}
            </select>
            <select
              value={seriesState.itemB.id}
              onChange={(e) => {
                const found = availableItems.find((it) => it.id === e.target.value);
                if (found) handleStartNewSeries(seriesState.itemA, found);
              }}
              className="bg-transparent text-rose-500 font-semibold focus:outline-none"
            >
              {availableItems.map((it) => (
                <option key={it.id} value={it.id} className="dark:bg-[#181922]">
                  2: {it.text}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ResultCardModal
        isOpen={shareCardOpen}
        onClose={() => setShareCardOpen(false)}
        data={shareData}
      />
    </div>
  );
}
