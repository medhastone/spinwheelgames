'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  Minimize2,
  Heart,
  Grid,
  Play,
  Sparkles,
  Shuffle,
  Printer,
  Plus,
  CheckCircle2,
  Trophy,
  History,
  Info,
  Layers,
  Award,
  Eye,
  Radio,
  Gamepad2,
  Flame,
  Zap
} from 'lucide-react';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';
import {
  playTickSound,
  playWinnerFanfare,
  unlockAudioContext,
  announceWinnerTTS
} from '@/lib/sound';

// Hardware-grade CSPRNG
function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }
  return Math.random();
}

export type BingoMode = '75-ball' | '90-ball' | '30-ball';

export interface BingoNumber {
  num: number;
  letter: 'B' | 'I' | 'N' | 'G' | 'O' | '';
  color: string;
}

export function getBingoLetterAndColor(num: number, mode: BingoMode): { letter: 'B' | 'I' | 'N' | 'G' | 'O' | ''; color: string } {
  if (mode === '75-ball') {
    if (num <= 15) return { letter: 'B', color: 'bg-blue-600 text-white dark:bg-blue-500' };
    if (num <= 30) return { letter: 'I', color: 'bg-rose-600 text-white dark:bg-rose-500' };
    if (num <= 45) return { letter: 'N', color: 'bg-purple-600 text-white dark:bg-purple-500' };
    if (num <= 60) return { letter: 'G', color: 'bg-emerald-600 text-white dark:bg-emerald-500' };
    return { letter: 'O', color: 'bg-amber-600 text-white dark:bg-amber-500' };
  }
  if (mode === '90-ball') {
    const col = Math.floor((num - 1) / 18);
    const colors = [
      'bg-blue-600 text-white',
      'bg-rose-600 text-white',
      'bg-purple-600 text-white',
      'bg-emerald-600 text-white',
      'bg-amber-600 text-white'
    ];
    return { letter: '', color: colors[col % colors.length] };
  }
  // 30-ball mini bingo
  if (num <= 6) return { letter: 'B', color: 'bg-blue-600 text-white' };
  if (num <= 12) return { letter: 'I', color: 'bg-rose-600 text-white' };
  if (num <= 18) return { letter: 'N', color: 'bg-purple-600 text-white' };
  if (num <= 24) return { letter: 'G', color: 'bg-emerald-600 text-white' };
  return { letter: 'O', color: 'bg-amber-600 text-white' };
}

// Generate a random 5x5 Bingo Card for 75-ball
function generate75BallCard(): (number | 'FREE')[][] {
  const getRandomUnique = (min: number, max: number, count: number) => {
    const pool: number[] = [];
    for (let i = min; i <= max; i++) pool.push(i);
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(getCryptoRandomFloat() * pool.length);
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  };

  const bCols = getRandomUnique(1, 15, 5);
  const iCols = getRandomUnique(16, 30, 5);
  const nCols = getRandomUnique(31, 45, 5);
  const gCols = getRandomUnique(46, 60, 5);
  const oCols = getRandomUnique(61, 75, 5);

  const grid: (number | 'FREE')[][] = [];
  for (let r = 0; r < 5; r++) {
    const row: (number | 'FREE')[] = [
      bCols[r],
      iCols[r],
      r === 2 ? 'FREE' : nCols[r],
      gCols[r],
      oCols[r]
    ];
    grid.push(row);
  }
  return grid;
}

export default function BingoWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'bingo-wheel' || w.title.trim().toLowerCase() === 'bingo spin wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'bingo-wheel',
      title: 'Bingo Spin Wheel',
      category: 'Bingo & Games',
      description: 'Random Bingo number caller wheel without repeats. Master board, classroom caller mode, TTS, and player cards.',
      items: Array.from({ length: 15 }, (_, i) => ({ id: `b-${i + 1}`, text: `B-${i + 1}`, weight: 1 })),
      paletteKey: 'neon'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Bingo Wheel to Profile Favorites!' : 'Removed Bingo Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Game Settings & State
  const [bingoMode, setBingoMode] = useState<BingoMode>('75-ball');
  const [spinSpeed, setSpinSpeed] = useState<'fast' | 'standard' | 'dramatic' | 'epic'>('standard');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'caller' | 'board' | 'cards'>('caller');

  // Active spin animation properties
  const [activeDurationMs, setActiveDurationMs] = useState(3500);
  const [activeEasing, setActiveEasing] = useState('cubic-bezier(0.12, 0.8, 0.2, 1)');

  // Bingo Numbers Logic
  const totalNumbers = bingoMode === '75-ball' ? 75 : bingoMode === '90-ball' ? 90 : 30;

  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [currentCall, setCurrentCall] = useState<BingoNumber | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [activeWheelSlices, setActiveWheelSlices] = useState<number[]>([]);

  // Player Cards State
  const [playerCards, setPlayerCards] = useState<
    { id: string; name: string; grid: (number | 'FREE')[][]; daubed: boolean[][] }[]
  >(() => [
    {
      id: 'card-1',
      name: 'Player 1',
      grid: generate75BallCard(),
      daubed: Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => r === 2 && c === 2)
      )
    },
    {
      id: 'card-2',
      name: 'Player 2',
      grid: generate75BallCard(),
      daubed: Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => r === 2 && c === 2)
      )
    }
  ]);

  // Compute remaining pool
  const remainingNumbers = useMemo(() => {
    const pool: number[] = [];
    for (let i = 1; i <= totalNumbers; i++) {
      if (!calledNumbers.includes(i)) pool.push(i);
    }
    return pool;
  }, [totalNumbers, calledNumbers]);

  // Reset Game
  const handleResetGame = () => {
    if (calledNumbers.length > 0) {
      if (!window.confirm('Reset this bingo game and clear all called numbers history?')) {
        return;
      }
    }
    setCalledNumbers([]);
    setCurrentCall(null);
    setWheelAngle(0);
    setActiveWheelSlices([]);
    // Reset daubs on player cards
    setPlayerCards((prev) =>
      prev.map((card) => ({
        ...card,
        daubed: Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => r === 2 && c === 2)
        )
      }))
    );
    setToastMsg('Bingo Game Reset! All numbers restored.');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Call Next Bingo Number with Wheel Spin
  const spinAndCallNumber = () => {
    if (isSpinning) return;
    if (remainingNumbers.length === 0) {
      alert('All numbers have been called! Please click Reset Game to start a new round.');
      return;
    }

    unlockAudioContext();
    setIsSpinning(true);

    // Compute speed and duration parameters
    let duration = 3500; // Standard 3.5s
    let turns = 12 + Math.floor(getCryptoRandomFloat() * 4); // 12-15 full turns
    let easing = 'cubic-bezier(0.12, 0.8, 0.2, 1)';

    if (spinSpeed === 'fast') {
      duration = 1500; // Fast 1.5s
      turns = 8 + Math.floor(getCryptoRandomFloat() * 3);
      easing = 'cubic-bezier(0.1, 0.85, 0.25, 1)';
    } else if (spinSpeed === 'dramatic') {
      duration = 5500; // Dramatic 5.5s
      turns = 18 + Math.floor(getCryptoRandomFloat() * 4);
      easing = 'cubic-bezier(0.1, 0.82, 0.15, 1)';
    } else if (spinSpeed === 'epic') {
      duration = 8500; // Epic Suspense 8.5s
      turns = 26 + Math.floor(getCryptoRandomFloat() * 6);
      easing = 'cubic-bezier(0.08, 0.85, 0.12, 1)';
    }

    setActiveDurationMs(duration);
    setActiveEasing(easing);

    // 1. Pick random target number from remaining pool
    const randomIdx = Math.floor(getCryptoRandomFloat() * remainingNumbers.length);
    const nextNum = remainingNumbers[randomIdx];

    // 2. Prepare slice array (max 24 slices) and determine exact target slice index
    let currentSlices: number[] = [];
    let sliceTargetIndex = 0;

    if (remainingNumbers.length <= 24) {
      currentSlices = [...remainingNumbers];
      sliceTargetIndex = randomIdx;
    } else {
      // Pick 23 random other numbers from remaining pool (excluding nextNum)
      const otherNumbers = remainingNumbers.filter((n) => n !== nextNum);
      const sampledOthers: number[] = [];
      const poolCopy = [...otherNumbers];
      for (let i = 0; i < 23; i++) {
        const randI = Math.floor(getCryptoRandomFloat() * poolCopy.length);
        sampledOthers.push(poolCopy[randI]);
        poolCopy.splice(randI, 1);
      }
      // Randomly assign a slice index (0..23) for nextNum
      sliceTargetIndex = Math.floor(getCryptoRandomFloat() * 24);
      sampledOthers.splice(sliceTargetIndex, 0, nextNum);
      currentSlices = sampledOthers;
    }

    setActiveWheelSlices(currentSlices);

    // 3. Compute exact physical rotation angle so sliceTargetIndex lands under top pointer (0 deg)
    const sliceAngle = 360 / currentSlices.length;
    // Angle of target slice center clockwise from top (0 deg)
    const middleAngle = sliceTargetIndex * sliceAngle + sliceAngle / 2;

    // Calculate rotation required to bring middleAngle to top pointer (0 deg)
    const currentNormalized = ((wheelAngle % 360) + 360) % 360;
    const neededRotation = (360 - middleAngle - currentNormalized + 720) % 360;

    // Small random offset inside target slice (±25% of slice width) for realistic landing variation
    const sliceJitter = (getCryptoRandomFloat() - 0.5) * (sliceAngle * 0.5);

    // Target rotation angle = current angle + (360 * full turns) + alignment delta + jitter
    const targetAngle = wheelAngle + (360 * turns) + neededRotation + sliceJitter;

    setWheelAngle(targetAngle);

    // Realistic Decelerating Audio Tick Loop
    const startTime = Date.now();
    let tickTimeoutId: NodeJS.Timeout | null = null;

    const playDeceleratingTicks = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) return;

      if (soundEnabled) playTickSound();

      // Progress ratio from 0 to 1
      const progress = Math.min(1, elapsed / duration);
      // Interval decelerates exponentially from 40ms to 380ms
      const delay = 40 + Math.pow(progress, 2) * 340;

      tickTimeoutId = setTimeout(playDeceleratingTicks, delay);
    };

    tickTimeoutId = setTimeout(playDeceleratingTicks, 40);

    // Complete spin after duration
    setTimeout(() => {
      if (tickTimeoutId) clearTimeout(tickTimeoutId);
      setIsSpinning(false);

      const info = getBingoLetterAndColor(nextNum, bingoMode);
      const callData: BingoNumber = {
        num: nextNum,
        letter: info.letter,
        color: info.color
      };

      setCurrentCall(callData);
      setCalledNumbers((prev) => [nextNum, ...prev]);

      if (soundEnabled) playWinnerFanfare();

      // TTS Speech Call (e.g., "B 12" or "Number 45")
      if (ttsEnabled) {
        const speechText = info.letter ? `${info.letter}, ${nextNum}` : `Number ${nextNum}`;
        announceWinnerTTS(speechText, ttsEnabled);
      }
    }, duration);
  };

  // Add new player card
  const addPlayerCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      name: `Player ${playerCards.length + 1}`,
      grid: generate75BallCard(),
      daubed: Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => r === 2 && c === 2)
      )
    };
    setPlayerCards((prev) => [...prev, newCard]);
  };

  // Toggle daub on card cell
  const toggleDaub = (cardIdx: number, r: number, c: number) => {
    setPlayerCards((prev) => {
      const updated = [...prev];
      const card = { ...updated[cardIdx] };
      const newDaub = card.daubed.map((rowArr, ri) =>
        rowArr.map((cell, ci) => (ri === r && ci === c ? !cell : cell))
      );
      card.daubed = newDaub;
      updated[cardIdx] = card;
      return updated;
    });
  };

  // Check if player has Bingo on card
  const checkCardBingo = (card: { grid: (number | 'FREE')[][]; daubed: boolean[][] }): boolean => {
    const { daubed } = card;
    // Check rows
    for (let r = 0; r < 5; r++) {
      if (daubed[r].every((v) => v)) return true;
    }
    // Check cols
    for (let c = 0; c < 5; c++) {
      if (daubed.every((row) => row[c])) return true;
    }
    // Check main diagonal
    if (
      daubed[0][0] &&
      daubed[1][1] &&
      daubed[2][2] &&
      daubed[3][3] &&
      daubed[4][4]
    )
      return true;
    // Check anti diagonal
    if (
      daubed[0][4] &&
      daubed[1][3] &&
      daubed[2][2] &&
      daubed[3][1] &&
      daubed[4][0]
    )
      return true;

    return false;
  };

  // Wheel slice segments rendering (Dynamic slice visualization)
  const previewSliceNumbers = useMemo(() => {
    if (remainingNumbers.length <= 24) return remainingNumbers;
    // Pick 24 evenly spaced samples for wheel visualization
    const step = remainingNumbers.length / 24;
    return Array.from({ length: 24 }, (_, i) => remainingNumbers[Math.floor(i * step)]);
  }, [remainingNumbers]);

  const currentWheelSlices = activeWheelSlices.length > 0 ? activeWheelSlices : previewSliceNumbers;

  // Master board render helper
  const renderMasterBoard75 = () => {
    const columns: { letter: 'B' | 'I' | 'N' | 'G' | 'O'; min: number; max: number; color: string }[] = [
      { letter: 'B', min: 1, max: 15, color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30' },
      { letter: 'I', min: 16, max: 30, color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30' },
      { letter: 'N', min: 31, max: 45, color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30' },
      { letter: 'G', min: 46, max: 60, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
      { letter: 'O', min: 61, max: 75, color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30' }
    ];

    return (
      <div className="space-y-3 sm:space-y-4 w-full max-w-full">
        {columns.map((col) => (
          <div key={col.letter} className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 w-full max-w-full">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center font-black text-sm sm:text-lg ${col.color} shrink-0`}
            >
              {col.letter}
            </div>
            <div className="flex-1 grid grid-cols-5 min-[480px]:grid-cols-8 sm:grid-cols-[repeat(15,minmax(0,1fr))] gap-1 sm:gap-1.5 w-full">
              {Array.from({ length: col.max - col.min + 1 }, (_, i) => col.min + i).map((num) => {
                const isCalled = calledNumbers.includes(num);
                const isLatest = currentCall?.num === num;
                return (
                  <div
                    key={num}
                    className={`aspect-square sm:aspect-auto sm:h-9 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold border transition-all ${
                      isLatest
                        ? 'bg-amber-500 text-white font-extrabold border-amber-300 shadow-lg scale-105 animate-bounce'
                        : isCalled
                        ? 'bg-indigo-600 text-white border-indigo-400 font-extrabold shadow-xs'
                        : 'bg-slate-100 dark:bg-[#1f202f] text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-white p-4 sm:p-8 flex flex-col justify-between w-full max-w-full'
          : 'bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 w-full max-w-full overflow-hidden'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Controls Bar */}
      <div className="flex flex-col gap-3 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
        {/* Top Row: Title, Live Badge, and Icon Actions */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 w-full">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
              <Radio className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                <span className="truncate">Bingo Wheel</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0 capitalize">
                  {bingoMode}
                </span>
              </h2>
            </div>
          </div>

          {/* Quick Utility Icon Cluster */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Favorite */}
            <button
              type="button"
              onClick={handleFavoriteGame}
              aria-label={isGameFavorited ? 'Remove bingo wheel from favorites' : 'Save bingo wheel to favorites'}
              className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer min-h-[36px] min-w-[36px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center border ${
                isGameFavorited
                  ? 'bg-rose-500/10 text-rose-500 border-rose-300 dark:border-rose-900/50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute sound FX' : 'Enable sound FX'}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer min-h-[36px] min-w-[36px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center ${
                soundEnabled
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Voice Toggle */}
            <button
              type="button"
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title={ttsEnabled ? 'Mute Voice Caller' : 'Enable Voice Caller (TTS)'}
              className={`p-1.5 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px] sm:min-h-[38px] ${
                ttsEnabled
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{ttsEnabled ? 'Voice ON' : 'Voice OFF'}</span>
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen Mode' : 'Fullscreen'}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer min-h-[36px] min-w-[36px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleResetGame}
              title="Reset Bingo Game"
              className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-bold text-xs border border-rose-500/30 flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px] sm:min-h-[38px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Second Row: Mode Selector + Spin Speed */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 w-full">
          {/* Mode Selector Tabs */}
          <div className="bg-slate-100 dark:bg-[#1a1b26] p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-slate-800 text-xs font-semibold w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setBingoMode('75-ball');
                handleResetGame();
              }}
              className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all min-h-[34px] text-[11px] sm:text-xs flex items-center justify-center cursor-pointer ${
                bingoMode === '75-ball'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              75-Ball (US)
            </button>
            <button
              type="button"
              onClick={() => {
                setBingoMode('90-ball');
                handleResetGame();
              }}
              className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all min-h-[34px] text-[11px] sm:text-xs flex items-center justify-center cursor-pointer ${
                bingoMode === '90-ball'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              90-Ball (UK)
            </button>
            <button
              type="button"
              onClick={() => {
                setBingoMode('30-ball');
                handleResetGame();
              }}
              className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all min-h-[34px] text-[11px] sm:text-xs flex items-center justify-center cursor-pointer ${
                bingoMode === '30-ball'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              30-Ball (Mini)
            </button>
          </div>

          {/* Spin Speed Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs font-semibold scrollbar-none w-full sm:w-auto">
            {(['fast', 'standard', 'dramatic', 'epic'] as const).map((spd) => {
              const labels = {
                fast: 'Fast (1.5s)',
                standard: '3.5s',
                dramatic: '5.5s',
                epic: '8.5s'
              };
              return (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSpinSpeed(spd)}
                  className={`shrink-0 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer min-h-[32px] text-[10px] sm:text-[11px] font-bold ${
                    spinSpeed === spd
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#1a1b26] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {labels[spd]}
                </button>
              );
            })}
            <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium ml-1 shrink-0">
              {remainingNumbers.length}/{totalNumbers} balls
            </span>
          </div>
        </div>
      </div>

      {/* Main View Switcher Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 mb-4 sm:mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none w-full max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab('caller')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'caller'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Bingo Caller Wheel</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('board')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'board'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Master Call Board ({calledNumbers.length}/{totalNumbers})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cards')}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'cards'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Player Cards ({playerCards.length})</span>
        </button>
      </div>

      {/* TAB 1: BINGO CALLER & WHEEL */}
      {activeTab === 'caller' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full max-w-full">
          {/* Wheel & Animation Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full max-w-full">
            {/* Visual Pointer */}
            <div className="z-20 -mb-4 sm:-mb-5 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[10px] sm:border-l-[14px] border-l-transparent border-r-[10px] sm:border-r-[14px] border-r-transparent border-t-[22px] sm:border-t-[28px] border-t-rose-500 filter drop-shadow-md animate-pulse" />
            </div>

            {/* Spinning Wheel Graphic */}
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] aspect-square rounded-full p-2 bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 shadow-2xl flex items-center justify-center touch-manipulation">
              <div
                className="w-full h-full rounded-full relative overflow-hidden transition-all ease-out cursor-pointer"
                onClick={spinAndCallNumber}
                style={{
                  transform: `rotate(${wheelAngle}deg)`,
                  transitionDuration: isSpinning ? `${activeDurationMs}ms` : '0ms',
                  transitionTimingFunction: activeEasing
                }}
              >
                {/* SVG Slice Segments */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {currentWheelSlices.map((num, i) => {
                    const sliceAngle = 360 / currentWheelSlices.length;
                    const startAngle = i * sliceAngle;
                    const endAngle = (i + 1) * sliceAngle;

                    const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                    // Alternating slice colors
                    const sliceColors = [
                      '#2563eb', '#e11d48', '#9333ea', '#10b981', '#f59e0b',
                      '#3b82f6', '#f43f5e', '#a855f7', '#34d399', '#fbbf24'
                    ];
                    const fillColor = sliceColors[i % sliceColors.length];

                    return (
                      <path
                        key={`slice-${num}-${i}`}
                        d={pathData}
                        fill={fillColor}
                        stroke="#ffffff"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                </svg>

                {/* Number Text overlay */}
                {currentWheelSlices.map((num, i) => {
                  const sliceAngle = 360 / currentWheelSlices.length;
                  const middleAngle = i * sliceAngle + sliceAngle / 2;
                  const info = getBingoLetterAndColor(num, bingoMode);

                  return (
                    <div
                      key={`label-${num}-${i}`}
                      className="absolute inset-0 flex flex-col items-center justify-start pt-2 sm:pt-3 pointer-events-none text-white font-extrabold text-[9px] sm:text-xs"
                      style={{
                        transform: `rotate(${middleAngle}deg)`,
                        transformOrigin: '50% 50%'
                      }}
                    >
                      <span className="drop-shadow tracking-wider">
                        {info.letter ? `${info.letter}-${num}` : num}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Central Caller Wheel Hub */}
              <button
                type="button"
                onClick={spinAndCallNumber}
                disabled={isSpinning || remainingNumbers.length === 0}
                aria-label="Spin Bingo Caller"
                className="absolute w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 rounded-full bg-slate-900 border-2 sm:border-4 border-white dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center z-10 cursor-pointer active:scale-95 transition-transform"
              >
                {currentCall ? (
                  <div className="animate-in zoom-in-50 duration-300">
                    {currentCall.letter && (
                      <span className="text-xs sm:text-sm font-black text-rose-400 uppercase tracking-widest block leading-none">
                        {currentCall.letter}
                      </span>
                    )}
                    <span className="text-2xl xs:text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                      {currentCall.num}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mb-0.5 sm:mb-1 animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Ready!
                    </span>
                  </div>
                )}
              </button>
            </div>

            {/* Spin CTA Button */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2.5 sm:gap-3 w-full max-w-full px-2">
              <button
                type="button"
                onClick={spinAndCallNumber}
                disabled={isSpinning || remainingNumbers.length === 0}
                className={`w-full max-w-xs sm:max-w-md py-3.5 sm:py-4 px-4 sm:px-8 rounded-2xl text-sm sm:text-lg font-black tracking-wide shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer text-center ${
                  isSpinning
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : remainingNumbers.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white shadow-rose-500/25 hover:scale-105'
                }`}
              >
                <Shuffle className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${isSpinning ? 'animate-spin' : ''}`} />
                <span className="truncate">{isSpinning ? 'SPINNING BINGO WHEEL...' : 'CALL NEXT BINGO NUMBER'}</span>
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold text-center">
                {remainingNumbers.length} of {totalNumbers} Numbers Remaining in Cage
              </span>
            </div>
          </div>

          {/* Current Call Details & Recent Call Log Panel */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 w-full max-w-full">
            {/* Big Screen Display Box */}
            <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden w-full max-w-full">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Latest Called Number
              </span>

              {currentCall ? (
                <div className="my-2 flex items-center justify-center gap-3">
                  {currentCall.letter && (
                    <span className="text-4xl sm:text-6xl font-black text-rose-500 tracking-tight">
                      {currentCall.letter}
                    </span>
                  )}
                  <span className="text-5xl sm:text-7xl font-black text-white tracking-tight drop-shadow-md">
                    {currentCall.num}
                  </span>
                </div>
              ) : (
                <div className="py-6 text-slate-500 text-sm font-semibold">
                  No numbers called yet. Click above to spin!
                </div>
              )}

              {currentCall && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call #{calledNumbers.length}</span>
                </div>
              )}
            </div>

            {/* Recent Call Sequence Log */}
            <div className="bg-slate-50 dark:bg-[#181924] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 w-full max-w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-indigo-500" />
                  <span>Recent Calls</span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  Total Called: {calledNumbers.length}
                </span>
              </div>

              {calledNumbers.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-48 overflow-y-auto pr-1">
                  {calledNumbers.map((num, idx) => {
                    const info = getBingoLetterAndColor(num, bingoMode);
                    const isLatest = idx === 0;
                    return (
                      <div
                        key={`recent-${num}-${idx}`}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black flex items-center gap-1 border transition-all ${
                          isLatest
                            ? 'bg-rose-500 text-white border-rose-400 shadow-md scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {info.letter && <span className="opacity-70">{info.letter}-</span>}
                        <span>{num}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Recent call list will appear here as you spin.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER CALL BOARD */}
      {activeTab === 'board' && (
        <div className="space-y-4 sm:space-y-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Master Bingo Board</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {calledNumbers.length} / {totalNumbers} Called
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All numbers on the bingo cage matrix. Called numbers are highlighted in dark purple.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161722] p-3 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full max-w-full overflow-hidden">
            {bingoMode === '75-ball' ? (
              renderMasterBoard75()
            ) : (
              <div className="grid grid-cols-5 min-[480px]:grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2 w-full max-w-full">
                {Array.from({ length: totalNumbers }, (_, i) => i + 1).map((num) => {
                  const isCalled = calledNumbers.includes(num);
                  const isLatest = currentCall?.num === num;
                  return (
                    <div
                      key={num}
                      className={`h-9 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-[11px] sm:text-xs font-bold border transition-all ${
                        isLatest
                          ? 'bg-amber-500 text-white border-amber-300 shadow-lg scale-105 font-black animate-pulse'
                          : isCalled
                          ? 'bg-indigo-600 text-white border-indigo-400 font-black'
                          : 'bg-slate-100 dark:bg-[#1f202f] text-slate-400 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PLAYER CARDS & DAUBER */}
      {activeTab === 'cards' && (
        <div className="space-y-4 sm:space-y-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Interactive Player Bingo Cards</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Interactive Marker
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click cells to dab numbers as they are called on the wheel. Auto detects 5-in-a-row BINGO!
              </p>
            </div>

            <button
              type="button"
              onClick={addPlayerCard}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Player Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-full">
            {playerCards.map((card, cardIdx) => {
              const hasBingo = checkCardBingo(card);

              return (
                <div
                  key={card.id}
                  className={`bg-white dark:bg-[#161722] p-3.5 sm:p-5 rounded-2xl border transition-all relative w-full max-w-full overflow-hidden ${
                    hasBingo
                      ? 'border-emerald-500 shadow-2xl ring-2 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPlayerCards((prev) => {
                          const updated = [...prev];
                          updated[cardIdx].name = val;
                          return updated;
                        });
                      }}
                      className="text-sm sm:text-base font-extrabold bg-transparent text-slate-900 dark:text-white focus:outline-none border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 min-w-0"
                    />

                    {hasBingo && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] sm:text-xs font-black shadow-lg animate-bounce shrink-0">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>BINGO!</span>
                      </div>
                    )}
                  </div>

                  {/* 5x5 Bingo Grid Header */}
                  <div className="grid grid-cols-5 gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 text-center font-black text-xs sm:text-sm text-slate-700 dark:text-slate-300 uppercase">
                    <span className="text-blue-600">B</span>
                    <span className="text-rose-600">I</span>
                    <span className="text-purple-600">N</span>
                    <span className="text-emerald-600">G</span>
                    <span className="text-amber-600">O</span>
                  </div>

                  {/* Grid Cells */}
                  <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                    {card.grid.map((rowArr, r) =>
                      rowArr.map((cellVal, c) => {
                        const isDaubed = card.daubed[r][c];
                        const isFree = cellVal === 'FREE';

                        return (
                          <button
                            key={`cell-${r}-${c}`}
                            type="button"
                            onClick={() => toggleDaub(cardIdx, r, c)}
                            className={`aspect-square rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-[11px] sm:text-xs transition-all cursor-pointer ${
                              isDaubed
                                ? 'bg-rose-500 text-white font-extrabold scale-95 shadow-inner'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {isFree ? (
                              <span className="text-[9px] sm:text-[10px] font-black text-amber-500">FREE</span>
                            ) : (
                              cellVal
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
