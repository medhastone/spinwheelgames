'use client';

import React, { useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { WheelItem, WheelConfig, DailyChallengeState, ResultCardData } from '@/lib/types';
import { DAILY_CHALLENGE_POOL } from '@/lib/presets';
import { createDateSeededPRNG } from '@/lib/random';
import {
  saveDailyChallenge,
  recordDailyChallengeComplete,
  subscribeDailyChallenge,
  getDailyChallengeSnapshot,
  getDailyChallengeServerSnapshot
} from '@/lib/storage';
import WheelCanvas from './WheelCanvas';
import confetti from 'canvas-confetti';
import { Globe, Flame, CheckCircle2, Play, Share2 } from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface ChallengeEngineProps {
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
}

export default function ChallengeEngine({
  soundEnabled,
  soundPack,
  volume
}: ChallengeEngineProps) {
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  const [localChallenge, setLocalChallenge] = useState<DailyChallengeState | null>(null);

  const getSnapshot = useCallback(() => getDailyChallengeSnapshot(todayStr), [todayStr]);
  const getServerSnapshot = useCallback(() => getDailyChallengeServerSnapshot(todayStr), [todayStr]);

  const clientChallenge = useSyncExternalStore(
    subscribeDailyChallenge,
    getSnapshot,
    getServerSnapshot
  );

  const challengeState = localChallenge || clientChallenge;

  const setChallengeState = (newState: DailyChallengeState) => {
    setLocalChallenge(newState);
  };

  const [isSpinning, setIsSpinning] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [preSelected, setPreSelected] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);

  // Build the deterministic wheel for today using date-seeded PRNG
  const dailyWheel: WheelConfig = useMemo(() => {
    const rng = createDateSeededPRNG(todayStr);
    // Shuffle pool deterministically for today
    const pool = [...DAILY_CHALLENGE_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const todayItems: WheelItem[] = pool.slice(0, 6).map((text, idx) => ({
      id: `daily-${idx}`,
      text,
      weight: 1
    }));

    return {
      id: `daily-wheel-${todayStr}`,
      title: `Daily Productivity Challenge (${todayStr})`,
      category: 'Daily Challenge',
      description: 'Synchronized worldwide daily goal randomizer.',
      palette: ['#006c49', '#4648d4', '#dc2c4f', '#6063ee', '#10b981', '#f59e0b'],
      items: todayItems
    };
  }, [todayStr]);

  // Spin the deterministic daily wheel
  const handleSpinDaily = () => {
    if (isSpinning || challengeState.completed) return;

    // Deterministic selection based on date seed
    const rng = createDateSeededPRNG(todayStr + '-spin');
    const winnerIdx = Math.floor(rng() * dailyWheel.items.length);
    const winner = dailyWheel.items[winnerIdx];

    setPreSelected({
      winner,
      winnerIndex: winnerIdx,
      seed: `SEED-${todayStr}`,
      oddsPercent: ((1 / dailyWheel.items.length) * 100).toFixed(1)
    });
    setIsSpinning(true);
  };

  const onDailySpinEnd = (winner: WheelItem) => {
    setIsSpinning(false);
    const updatedStreak = (challengeState.streakCount || 0) + 1;
    const newState: DailyChallengeState = {
      dateKey: todayStr,
      completed: true,
      spunResult: winner,
      streakCount: updatedStreak,
      lastSpunDate: todayStr
    };

    setChallengeState(newState);
    saveDailyChallenge(newState);
    recordDailyChallengeComplete();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const shareData: ResultCardData = {
    winner: challengeState.spunResult?.text || 'Daily Goal',
    streak: challengeState.streakCount || 1,
    challengeName: `Daily Challenge (${todayStr})`,
    oddsPercent: '16.7',
    seed: `DAILY-${todayStr}`,
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
      {/* Header with Streak and Deterministic Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006c49]/10 text-[#006c49] dark:text-[#4edea3] text-[12px] font-bold mb-2">
            <Globe className="w-4 h-4" />
            <span>Worldwide Synchronized Daily Seed: {todayStr}</span>
          </div>
          <h2 className="font-headline font-extrabold text-[24px] sm:text-[30px] text-[#1a1b22] dark:text-[#f1effa]">
            Today&apos;s Focus Challenge
          </h2>
          <p className="text-[13px] text-[#767586] dark:text-[#908fa1]">
            Every visitor across the globe receives the exact same daily prompt. Build your daily streak!
          </p>
        </div>

        {/* Streak Counter Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              Active Streak
            </span>
            <span className="font-headline font-extrabold text-[22px] text-[#1a1b22] dark:text-[#f1effa]">
              {challengeState.streakCount} {challengeState.streakCount === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Wheel Stage or Completion State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Wheel Canvas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[380px]">
            <WheelCanvas
              items={dailyWheel.items}
              palette={dailyWheel.palette}
              isSpinning={isSpinning}
              preSelectedWinner={preSelected}
              onSpinStart={handleSpinDaily}
              onSpinEnd={onDailySpinEnd}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
              duration={5}
            />
          </div>
        </div>

        {/* Right Info & Action (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {challengeState.completed && challengeState.spunResult ? (
            <div className="p-6 rounded-2xl bg-[#006c49]/10 border-2 border-[#006c49]/30 flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-[#006c49] dark:text-[#4edea3]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold text-[14px]">Today&apos;s Challenge Assigned!</span>
              </div>
              <h3 className="font-headline font-bold text-[20px] text-[#1a1b22] dark:text-[#f1effa]">
                {challengeState.spunResult.text}
              </h3>
              <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7]">
                You have claimed your daily spin. Come back tomorrow for the next global challenge to
                keep your {challengeState.streakCount}-day streak alive!
              </p>

              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share My Score</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-2">
                <span className="text-[12px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase">
                  Daily Seed Verification
                </span>
                <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7]">
                  Today&apos;s challenge uses mathematical seed{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white dark:bg-[#12131a] font-mono text-[11px] font-bold">
                    {todayStr}
                  </code>
                  . Slices and results are identical on all devices.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSpinDaily}
                disabled={isSpinning}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#006c49] to-[#10b981] hover:brightness-110 text-white font-headline font-bold text-[16px] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isSpinning ? "Spinning Today's Challenge..." : "Play Today's Challenge"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ResultCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        data={shareData}
      />
    </div>
  );
}

