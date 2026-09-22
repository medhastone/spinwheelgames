'use client';

import React, { useState } from 'react';
import { WheelConfig, WheelItem, ResultCardData } from '@/lib/types';
import { MULTI_WHEEL_DEFAULT_PRESETS } from '@/lib/presets';
import { selectWeightedWinner } from '@/lib/random';
import { recordSpinInStats, loadUserStats } from '@/lib/storage';
import WheelCanvas from './WheelCanvas';
import confetti from 'canvas-confetti';
import { Layers, RotateCw, Loader2, Share2 } from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface MultiWheelEngineProps {
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
}

export default function MultiWheelEngine({
  soundEnabled,
  soundPack,
  volume
}: MultiWheelEngineProps) {
  const [wheelA, setWheelA] = useState<WheelConfig>(MULTI_WHEEL_DEFAULT_PRESETS.wheelA);
  const [wheelB, setWheelB] = useState<WheelConfig>(MULTI_WHEEL_DEFAULT_PRESETS.wheelB);
  const [wheelC, setWheelC] = useState<WheelConfig>(MULTI_WHEEL_DEFAULT_PRESETS.wheelC);

  const [spinningA, setSpinningA] = useState(false);
  const [spinningB, setSpinningB] = useState(false);
  const [spinningC, setSpinningC] = useState(false);

  const [winnerA, setWinnerA] = useState<WheelItem | null>(null);
  const [winnerB, setWinnerB] = useState<WheelItem | null>(null);
  const [winnerC, setWinnerC] = useState<WheelItem | null>(null);

  const [preSelectedA, setPreSelectedA] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [preSelectedB, setPreSelectedB] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [preSelectedC, setPreSelectedC] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isAnySpinning = spinningA || spinningB || spinningC;

  // Spin Wheel A individually
  const handleSpinA = () => {
    if (spinningA) return;
    const selection = selectWeightedWinner(wheelA.items);
    setPreSelectedA(selection);
    setSpinningA(true);
  };

  // Spin Wheel B individually
  const handleSpinB = () => {
    if (spinningB) return;
    const selection = selectWeightedWinner(wheelB.items);
    setPreSelectedB(selection);
    setSpinningB(true);
  };

  // Spin Wheel C individually
  const handleSpinC = () => {
    if (spinningC) return;
    const selection = selectWeightedWinner(wheelC.items);
    setPreSelectedC(selection);
    setSpinningC(true);
  };

  // Master SPIN ALL
  const handleSpinAll = () => {
    if (isAnySpinning) return;
    setWinnerA(null);
    setWinnerB(null);
    setWinnerC(null);

    // Preselect all 3 cryptographic winners simultaneously
    const selA = selectWeightedWinner(wheelA.items);
    const selB = selectWeightedWinner(wheelB.items);
    const selC = selectWeightedWinner(wheelC.items);

    setPreSelectedA(selA);
    setPreSelectedB(selB);
    setPreSelectedC(selC);

    setSpinningA(true);
    // Stagger starts slightly for authentic casino / gameshow choreography
    setTimeout(() => setSpinningB(true), 250);
    setTimeout(() => setSpinningC(true), 500);
  };

  // Trigger grand celebration when all 3 have landed
  const onWheelAEnd = (item: WheelItem) => {
    setSpinningA(false);
    setWinnerA(item);
    checkGrandFinish(item, winnerB, winnerC);
  };

  const onWheelBEnd = (item: WheelItem) => {
    setSpinningB(false);
    setWinnerB(item);
    checkGrandFinish(winnerA, item, winnerC);
  };

  const onWheelCEnd = (item: WheelItem) => {
    setSpinningC(false);
    setWinnerC(item);
    checkGrandFinish(winnerA, winnerB, item);
  };

  const checkGrandFinish = (a: WheelItem | null, b: WheelItem | null, c: WheelItem | null) => {
    if (a && b && c) {
      recordSpinInStats('Multi-Wheel Trilogy', false, false);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }
  };

  const stats = loadUserStats();

  const shareData: ResultCardData = {
    winner: winnerA && winnerB && winnerC ? `${winnerA.text} + ${winnerB.text} + ${winnerC.text}` : 'Trilogy Spin',
    score: 'Triple Wheel Synchronization',
    streak: stats.currentDailyStreak || 1,
    challengeName: 'Multi-Wheel Synchronized Mission',
    oddsPercent: '1.2',
    seed: winnerA && winnerB && winnerC ? `MULTI-${winnerA.id.slice(0, 4)}-${winnerB.id.slice(0, 4)}-${winnerC.id.slice(0, 4)}` : 'MULTI-SYNC',
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner with Master SPIN ALL Button */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold">
          <Layers className="w-4 h-4" />
          <span>Multi-Wheel Synchronization Engine</span>
        </div>

        <h2 className="font-headline font-extrabold text-[24px] sm:text-[30px] text-[#1a1b22] dark:text-[#f1effa]">
          Spin Person + Challenge + Location
        </h2>

        {/* Master Spin All CTA */}
        <button
          type="button"
          onClick={handleSpinAll}
          disabled={isAnySpinning}
          className={`py-4 px-10 rounded-2xl font-headline font-bold text-[18px] sm:text-[20px] text-white tracking-wide shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer ${
            isAnySpinning
              ? 'bg-gray-400 cursor-not-allowed opacity-80'
              : 'bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#4648d4] hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(70,72,212,0.4)]'
          }`}
        >
          {isAnySpinning ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <RotateCw className="w-6 h-6" />
          )}
          <span>{isAnySpinning ? 'SPINNING ALL WHEELS...' : 'SPIN ALL 3 WHEELS'}</span>
        </button>

        {/* Combined Result Readout Banner */}
        {winnerA && winnerB && winnerC && (
          <div className="w-full max-w-2xl bg-gradient-to-r from-[#f4f2fd] via-[#ffffff] to-[#f4f2fd] dark:from-[#1d1e28] dark:via-[#222330] dark:to-[#1d1e28] p-5 rounded-2xl border-2 border-[#4648d4] dark:border-[#8587ff] shadow-lg animate-bounceIn flex flex-col items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              Combined Mission Result
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[18px] sm:text-[22px] font-extrabold text-[#1a1b22] dark:text-[#f1effa]">
              <span className="px-3 py-1 rounded-xl bg-[#4648d4] text-white shadow-xs">
                {winnerA.text}
              </span>
              <span className="text-[#4648d4] dark:text-[#8587ff]">+</span>
              <span className="px-3 py-1 rounded-xl bg-[#dc2c4f] text-white shadow-xs">
                {winnerB.text}
              </span>
              <span className="text-[#4648d4] dark:text-[#8587ff]">+</span>
              <span className="px-3 py-1 rounded-xl bg-[#006c49] text-white shadow-xs">
                {winnerC.text}
              </span>
            </div>
            <p className="text-[13px] text-[#767586] dark:text-[#908fa1] mt-1">
              {winnerA.text} must {winnerB.text} in the {winnerC.text}!
            </p>
            <button
              type="button"
              onClick={() => setShareModalOpen(true)}
              className="mt-2 py-2.5 px-5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Combo Result Card</span>
            </button>
          </div>
        )}
      </div>

      {/* 3 Synchronized Wheels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wheel A: Person */}
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
              {wheelA.title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] text-[11px] font-bold">
              {wheelA.items.length} choices
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <WheelCanvas
              items={wheelA.items}
              palette={wheelA.palette}
              isSpinning={spinningA}
              preSelectedWinner={preSelectedA}
              onSpinStart={handleSpinA}
              onSpinEnd={onWheelAEnd}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
              duration={4}
            />
          </div>

          <button
            type="button"
            onClick={handleSpinA}
            disabled={spinningA}
            className="w-full py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-[13px] disabled:opacity-50 transition-all cursor-pointer"
          >
            {spinningA ? 'Spinning...' : winnerA ? `Landed: ${winnerA.text}` : 'Spin Wheel A'}
          </button>
        </div>

        {/* Wheel B: Challenge */}
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
              {wheelB.title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#dc2c4f] text-[11px] font-bold">
              {wheelB.items.length} choices
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <WheelCanvas
              items={wheelB.items}
              palette={wheelB.palette}
              isSpinning={spinningB}
              preSelectedWinner={preSelectedB}
              onSpinStart={handleSpinB}
              onSpinEnd={onWheelBEnd}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
              duration={5}
            />
          </div>

          <button
            type="button"
            onClick={handleSpinB}
            disabled={spinningB}
            className="w-full py-2.5 rounded-xl bg-[#dc2c4f] hover:bg-[#e63956] text-white font-bold text-[13px] disabled:opacity-50 transition-all cursor-pointer"
          >
            {spinningB ? 'Spinning...' : winnerB ? `Landed: ${winnerB.text}` : 'Spin Wheel B'}
          </button>
        </div>

        {/* Wheel C: Location */}
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
              {wheelC.title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#006c49] text-[11px] font-bold">
              {wheelC.items.length} choices
            </span>
          </div>

          <div className="w-full max-w-[280px]">
            <WheelCanvas
              items={wheelC.items}
              palette={wheelC.palette}
              isSpinning={spinningC}
              preSelectedWinner={preSelectedC}
              onSpinStart={handleSpinC}
              onSpinEnd={onWheelCEnd}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
              duration={6}
            />
          </div>

          <button
            type="button"
            onClick={handleSpinC}
            disabled={spinningC}
            className="w-full py-2.5 rounded-xl bg-[#006c49] hover:bg-[#00875c] text-white font-bold text-[13px] disabled:opacity-50 transition-all cursor-pointer"
          >
            {spinningC ? 'Spinning...' : winnerC ? `Landed: ${winnerC.text}` : 'Spin Wheel C'}
          </button>
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
