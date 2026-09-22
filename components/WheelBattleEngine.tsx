'use client';

import React, { useState } from 'react';
import { WheelConfig, WheelItem, ResultCardData } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound } from '@/lib/sound';
import { recordBattleWin, loadUserStats } from '@/lib/storage';
import WheelCanvas from './WheelCanvas';
import confetti from 'canvas-confetti';
import {
  Swords,
  Trophy,
  RotateCcw,
  Crown,
  Share2,
  Users,
  Flame,
  ShieldAlert,
  Play
} from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface WheelBattleEngineProps {
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
}

export default function WheelBattleEngine({
  soundEnabled,
  soundPack,
  volume
}: WheelBattleEngineProps) {
  // Team Blue Wheel
  const [wheelBlue, setWheelBlue] = useState<WheelConfig>({
    id: 'battle-blue',
    title: 'Team Blue',
    category: 'Battle',
    description: 'Player 1 Combat Wheel',
    palette: ['#3b82f6', '#1d4ed8', '#60a5fa', '#2563eb'],
    items: [
      { id: 'b1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'b2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'b3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'b4', text: 'Quick Jab (+1)', weight: 2 }
    ]
  });

  // Team Red Wheel
  const [wheelRed, setWheelRed] = useState<WheelConfig>({
    id: 'battle-red',
    title: 'Team Red',
    category: 'Battle',
    description: 'Player 2 Combat Wheel',
    palette: ['#ef4444', '#b91c1c', '#f87171', '#dc2626'],
    items: [
      { id: 'r1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'r2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'r3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'r4', text: 'Quick Jab (+1)', weight: 2 }
    ]
  });

  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [targetScore, setTargetScore] = useState(5);
  const [activeTurn, setActiveTurn] = useState<'blue' | 'red' | 'both'>('both');

  const [spinningBlue, setSpinningBlue] = useState(false);
  const [spinningRed, setSpinningRed] = useState(false);

  const [preSelectedBlue, setPreSelectedBlue] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [preSelectedRed, setPreSelectedRed] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);

  const [lastActionBlue, setLastActionBlue] = useState<string | null>(null);
  const [lastActionRed, setLastActionRed] = useState<string | null>(null);

  const [champion, setChampion] = useState<'blue' | 'red' | null>(null);
  const [shareCardOpen, setShareCardOpen] = useState(false);

  // Parse points from result text
  const parsePoints = (text: string): number => {
    if (text.includes('+2')) return 2;
    if (text.includes('+1')) return 1;
    return 0;
  };

  // Simultaneous Duel Spin
  const handleSpinSimultaneous = () => {
    if (spinningBlue || spinningRed || champion) return;

    if (soundEnabled) {
      playTickSound(soundEnabled, soundPack, volume);
    }

    const selB = selectWeightedWinner(wheelBlue.items);
    const selR = selectWeightedWinner(wheelRed.items);

    setPreSelectedBlue(selB);
    setPreSelectedRed(selR);

    setSpinningBlue(true);
    setSpinningRed(true);
  };

  const onBlueSpinEnd = (winner: WheelItem) => {
    setSpinningBlue(false);
    setLastActionBlue(winner.text);
    const pts = parsePoints(winner.text);
    const nextScore = scoreBlue + pts;
    setScoreBlue(nextScore);

    if (nextScore >= targetScore && !champion) {
      declareWinner('blue');
    }
  };

  const onRedSpinEnd = (winner: WheelItem) => {
    setSpinningRed(false);
    setLastActionRed(winner.text);
    const pts = parsePoints(winner.text);
    const nextScore = scoreRed + pts;
    setScoreRed(nextScore);

    if (nextScore >= targetScore && !champion) {
      declareWinner('red');
    }
  };

  const declareWinner = (team: 'blue' | 'red') => {
    setChampion(team);
    if (soundEnabled) {
      playWinnerFanfare(soundEnabled, soundPack, volume);
    }
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    recordBattleWin();
  };

  const handleResetBattle = () => {
    setScoreBlue(0);
    setScoreRed(0);
    setChampion(null);
    setLastActionBlue(null);
    setLastActionRed(null);
  };

  const stats = loadUserStats();

  const shareData: ResultCardData = {
    winner: champion === 'blue' ? 'Team Blue Champion' : 'Team Red Champion',
    score: `${scoreBlue} - ${scoreRed} (Target: ${targetScore})`,
    streak: stats.currentDailyStreak || 1,
    challengeName: 'Head-to-Head Wheel Battle',
    oddsPercent: '50.0',
    seed: champion ? `BATTLE-${champion.toUpperCase()}-${scoreBlue}v${scoreRed}` : 'BATTLE-ARENA',
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[12px] font-bold mb-2">
            <Swords className="w-4 h-4" />
            <span>2-Player Head-to-Head Duel Mode</span>
          </div>
          <h2 className="font-headline font-extrabold text-[24px] sm:text-[30px] text-[#1a1b22] dark:text-[#f1effa]">
            Wheel Battle Arena
          </h2>
          <p className="text-[13px] text-[#767586] dark:text-[#908fa1]">
            Face off in a turn-based or synchronized clash. First team to reach {targetScore} points claims the championship!
          </p>
        </div>

        {/* Target score selector & reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetBattle}
            className="px-3.5 py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Match</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blue Team Score Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            champion === 'blue'
              ? 'bg-blue-500/15 border-blue-500 shadow-md ring-2 ring-blue-500/40'
              : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="font-headline font-bold text-lg text-blue-700 dark:text-blue-300">
                Team Blue
              </h3>
            </div>
            {champion === 'blue' && (
              <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                <Crown className="w-3.5 h-3.5" /> Winner!
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-headline font-extrabold text-4xl text-blue-600 dark:text-blue-400">
              {scoreBlue} <span className="text-sm font-normal text-slate-400">/ {targetScore} pts</span>
            </span>
            {lastActionBlue && (
              <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-300 bg-white dark:bg-[#12131a] px-2 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                {lastActionBlue}
              </span>
            )}
          </div>
        </div>

        {/* Red Team Score Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            champion === 'red'
              ? 'bg-red-500/15 border-red-500 shadow-md ring-2 ring-red-500/40'
              : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <h3 className="font-headline font-bold text-lg text-red-700 dark:text-red-300">
                Team Red
              </h3>
            </div>
            {champion === 'red' && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/50 px-2 py-0.5 rounded-full">
                <Crown className="w-3.5 h-3.5" /> Winner!
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-headline font-extrabold text-4xl text-red-600 dark:text-red-400">
              {scoreRed} <span className="text-sm font-normal text-slate-400">/ {targetScore} pts</span>
            </span>
            {lastActionRed && (
              <span className="text-xs font-mono font-semibold text-red-600 dark:text-red-300 bg-white dark:bg-[#12131a] px-2 py-1 rounded-md border border-red-200 dark:border-red-800">
                {lastActionRed}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* The Two Dueling Wheels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-2">
        {/* Blue Wheel */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-full max-w-[300px]">
            <WheelCanvas
              items={wheelBlue.items}
              palette={wheelBlue.palette}
              isSpinning={spinningBlue}
              preSelectedWinner={preSelectedBlue}
              onSpinStart={() => setSpinningBlue(true)}
              onSpinEnd={onBlueSpinEnd}
              duration={4}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
            />
          </div>
        </div>

        {/* Red Wheel */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-full max-w-[300px]">
            <WheelCanvas
              items={wheelRed.items}
              palette={wheelRed.palette}
              isSpinning={spinningRed}
              preSelectedWinner={preSelectedRed}
              onSpinStart={() => setSpinningRed(true)}
              onSpinEnd={onRedSpinEnd}
              duration={4}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
            />
          </div>
        </div>
      </div>

      {/* Primary Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        {!champion ? (
          <button
            type="button"
            onClick={handleSpinSimultaneous}
            disabled={spinningBlue || spinningRed}
            className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 hover:brightness-110 text-white font-headline font-extrabold text-[16px] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Swords className={`w-5 h-5 ${spinningBlue || spinningRed ? 'animate-spin' : ''}`} />
            <span>{spinningBlue || spinningRed ? 'DUEL IN PROGRESS...' : 'SPIN CLASH (BOTH TEAMS)'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShareCardOpen(true)}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Battle Victory</span>
            </button>
            <button
              type="button"
              onClick={handleResetBattle}
              className="py-3 px-6 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Rematch</span>
            </button>
          </div>
        )}
      </div>

      {/* Victory Card Modal */}
      <ResultCardModal
        isOpen={shareCardOpen}
        onClose={() => setShareCardOpen(false)}
        data={shareData}
      />
    </div>
  );
}
