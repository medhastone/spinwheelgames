'use client';

import React, { useState } from 'react';
import { WheelConfig, WheelItem, ResultCardData } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound } from '@/lib/sound';
import { recordBattleWin, loadUserStats } from '@/lib/storage';
import WheelCanvas from './WheelCanvas';
import confetti from '@/lib/confetti';
import {
  Swords,
  RotateCcw,
  Crown,
  Share2,
  Plus,
  Trash2,
  Settings2,
  Sparkles,
  Sliders,
  Palette,
  X,
  Target
} from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface WheelBattleEngineProps {
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
}

// Color Palette Presets for Customization
const BATTLE_PALETTES = {
  blueHero: ['#2563eb', '#1d4ed8', '#3b82f6', '#60a5fa', '#1e40af'],
  redChampion: ['#dc2626', '#b91c1c', '#ef4444', '#f87171', '#991b1b'],
  cyberNeon: ['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899'],
  fireFlame: ['#ea580c', '#f97316', '#eab308', '#dc2626', '#b45309'],
  emeraldForest: ['#059669', '#10b981', '#34d399', '#047857', '#065f46'],
  royalGold: ['#d97706', '#f59e0b', '#fbbf24', '#b45309', '#78350f'],
  purpleShadow: ['#7c3aed', '#8b5cf6', '#a855f7', '#6d28d9', '#581c87'],
  darkTitan: ['#334155', '#475569', '#64748b', '#1e293b', '#0f172a']
};

// Preset Battle Decks
const BATTLE_PRESETS = [
  {
    id: 'classic',
    name: 'Classic Combat',
    description: 'Balanced strikes, critical hits, and shields',
    itemsBlue: [
      { id: 'b1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'b2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'b3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'b4', text: 'Quick Jab (+1)', weight: 2 }
    ],
    itemsRed: [
      { id: 'r1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'r2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'r3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'r4', text: 'Quick Jab (+1)', weight: 2 }
    ]
  },
  {
    id: 'high-stakes',
    name: 'High Stakes Chaos',
    description: 'High power moves with self-damage penalty risk',
    itemsBlue: [
      { id: 'b1', text: 'Mega Finisher (+3)', weight: 1 },
      { id: 'b2', text: 'Double Slash (+2)', weight: 2 },
      { id: 'b3', text: 'Glancing Blow (+1)', weight: 2 },
      { id: 'b4', text: 'Evade Dodge (+0)', weight: 1 },
      { id: 'b5', text: 'Backfire Stumble (-1)', weight: 1 }
    ],
    itemsRed: [
      { id: 'r1', text: 'Mega Finisher (+3)', weight: 1 },
      { id: 'r2', text: 'Double Slash (+2)', weight: 2 },
      { id: 'r3', text: 'Glancing Blow (+1)', weight: 2 },
      { id: 'r4', text: 'Evade Dodge (+0)', weight: 1 },
      { id: 'r5', text: 'Backfire Stumble (-1)', weight: 1 }
    ]
  },
  {
    id: 'rpg-magic',
    name: 'RPG Spell Duel',
    description: 'Elemental magic spells, shields, and mana drain',
    itemsBlue: [
      { id: 'b1', text: 'Inferno Fireball (+3)', weight: 1 },
      { id: 'b2', text: 'Lightning Bolt (+2)', weight: 2 },
      { id: 'b3', text: 'Arcane Missiles (+1)', weight: 2 },
      { id: 'b4', text: 'Mana Barrier (+0)', weight: 1 },
      { id: 'b5', text: 'Fizzled Spell (-1)', weight: 1 }
    ],
    itemsRed: [
      { id: 'r1', text: 'Inferno Fireball (+3)', weight: 1 },
      { id: 'r2', text: 'Lightning Bolt (+2)', weight: 2 },
      { id: 'r3', text: 'Arcane Missiles (+1)', weight: 2 },
      { id: 'r4', text: 'Mana Barrier (+0)', weight: 1 },
      { id: 'r5', text: 'Fizzled Spell (-1)', weight: 1 }
    ]
  },
  {
    id: 'penalty-shootout',
    name: 'Soccer Penalty Shootout',
    description: 'Top corner goals, goalkeeper saves, and misses',
    itemsBlue: [
      { id: 'b1', text: 'Top Bin Golazo (+2)', weight: 1 },
      { id: 'b2', text: 'Clean Goal (+1)', weight: 3 },
      { id: 'b3', text: 'Saved by Keeper (+0)', weight: 2 },
      { id: 'b4', text: 'Crossbar Miss (-1)', weight: 1 }
    ],
    itemsRed: [
      { id: 'r1', text: 'Top Bin Golazo (+2)', weight: 1 },
      { id: 'r2', text: 'Clean Goal (+1)', weight: 3 },
      { id: 'r3', text: 'Saved by Keeper (+0)', weight: 2 },
      { id: 'r4', text: 'Crossbar Miss (-1)', weight: 1 }
    ]
  }
];

export default function WheelBattleEngine({
  soundEnabled,
  soundPack,
  volume
}: WheelBattleEngineProps) {
  // Team Blue Configuration
  const [teamBlueName, setTeamBlueName] = useState('Team Blue');
  const [wheelBlue, setWheelBlue] = useState<WheelConfig>({
    id: 'battle-blue',
    title: 'Team Blue',
    category: 'Battle',
    description: 'Player 1 Combat Wheel',
    palette: BATTLE_PALETTES.blueHero,
    items: [
      { id: 'b1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'b2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'b3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'b4', text: 'Quick Jab (+1)', weight: 2 }
    ]
  });

  // Team Red Configuration
  const [teamRedName, setTeamRedName] = useState('Team Red');
  const [wheelRed, setWheelRed] = useState<WheelConfig>({
    id: 'battle-red',
    title: 'Team Red',
    category: 'Battle',
    description: 'Player 2 Combat Wheel',
    palette: BATTLE_PALETTES.redChampion,
    items: [
      { id: 'r1', text: 'Critical Hit (+2)', weight: 1 },
      { id: 'r2', text: 'Direct Strike (+1)', weight: 2 },
      { id: 'r3', text: 'Shield Block (+0)', weight: 1 },
      { id: 'r4', text: 'Quick Jab (+1)', weight: 2 }
    ]
  });

  // Match State
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [targetScore, setTargetScore] = useState(5);
  const [spinDuration] = useState(3.5);

  const [spinningBlue, setSpinningBlue] = useState(false);
  const [spinningRed, setSpinningRed] = useState(false);

  const [preSelectedBlue, setPreSelectedBlue] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [preSelectedRed, setPreSelectedRed] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);

  const [lastActionBlue, setLastActionBlue] = useState<string | null>(null);
  const [lastActionRed, setLastActionRed] = useState<string | null>(null);

  const [champion, setChampion] = useState<'blue' | 'red' | null>(null);
  const [shareCardOpen, setShareCardOpen] = useState(false);

  // Customization Drawers / Modals
  const [editingTeam, setEditingTeam] = useState<'blue' | 'red' | null>(null);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  // Parse points from result text (supports +5, +3, +2, +1, +0, -1, -2, etc.)
  const parsePoints = (text: string): number => {
    const match = text.match(/([+-]\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
    if (text.toLowerCase().includes('crit') || text.toLowerCase().includes('mega')) return 2;
    if (text.toLowerCase().includes('strike') || text.toLowerCase().includes('hit') || text.toLowerCase().includes('goal')) return 1;
    if (text.toLowerCase().includes('block') || text.toLowerCase().includes('shield') || text.toLowerCase().includes('save')) return 0;
    if (text.toLowerCase().includes('miss') || text.toLowerCase().includes('penalty') || text.toLowerCase().includes('fail')) return -1;
    return 1;
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
    const nextScore = Math.max(0, scoreBlue + pts);
    setScoreBlue(nextScore);

    if (nextScore >= targetScore && !champion) {
      declareWinner('blue');
    }
  };

  const onRedSpinEnd = (winner: WheelItem) => {
    setSpinningRed(false);
    setLastActionRed(winner.text);
    const pts = parsePoints(winner.text);
    const nextScore = Math.max(0, scoreRed + pts);
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
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 }
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

  // Apply a preset battle deck
  const handleApplyPreset = (preset: typeof BATTLE_PRESETS[0]) => {
    setWheelBlue(prev => ({
      ...prev,
      items: [...preset.itemsBlue]
    }));
    setWheelRed(prev => ({
      ...prev,
      items: [...preset.itemsRed]
    }));
    setShowPresetsMenu(false);
    handleResetBattle();
  };

  // Slice editing helpers for Blue and Red
  const handleUpdateSliceText = (team: 'blue' | 'red', index: number, text: string) => {
    const targetWheel = team === 'blue' ? wheelBlue : wheelRed;
    const setTargetWheel = team === 'blue' ? setWheelBlue : setWheelRed;
    const updated = [...targetWheel.items];
    updated[index] = { ...updated[index], text };
    setTargetWheel({ ...targetWheel, items: updated });
  };

  const handleUpdateSliceWeight = (team: 'blue' | 'red', index: number, weight: number) => {
    const targetWheel = team === 'blue' ? wheelBlue : wheelRed;
    const setTargetWheel = team === 'blue' ? setWheelBlue : setWheelRed;
    const updated = [...targetWheel.items];
    updated[index] = { ...updated[index], weight: Math.max(1, weight) };
    setTargetWheel({ ...targetWheel, items: updated });
  };

  const handleAddSlice = (team: 'blue' | 'red') => {
    const targetWheel = team === 'blue' ? wheelBlue : wheelRed;
    const setTargetWheel = team === 'blue' ? setWheelBlue : setWheelRed;
    const newItem: WheelItem = {
      id: `${team}-${Date.now()}`,
      text: 'New Attack (+1)',
      weight: 1
    };
    setTargetWheel({ ...targetWheel, items: [...targetWheel.items, newItem] });
  };

  const handleRemoveSlice = (team: 'blue' | 'red', index: number) => {
    const targetWheel = team === 'blue' ? wheelBlue : wheelRed;
    const setTargetWheel = team === 'blue' ? setWheelBlue : setWheelRed;
    if (targetWheel.items.length <= 2) return; // Keep at least 2 slices
    const updated = targetWheel.items.filter((_, i) => i !== index);
    setTargetWheel({ ...targetWheel, items: updated });
  };

  const handleSetPalette = (team: 'blue' | 'red', paletteColors: string[]) => {
    if (team === 'blue') {
      setWheelBlue(prev => ({ ...prev, palette: paletteColors }));
    } else {
      setWheelRed(prev => ({ ...prev, palette: paletteColors }));
    }
  };

  const stats = loadUserStats();

  const shareData: ResultCardData = {
    winner: champion === 'blue' ? `${teamBlueName} Champion` : `${teamRedName} Champion`,
    score: `${scoreBlue} - ${scoreRed} (Target: ${targetScore})`,
    streak: stats.currentDailyStreak || 1,
    challengeName: 'Wheel Battle Arena Clash',
    oddsPercent: '50.0',
    seed: champion ? `BATTLE-${champion.toUpperCase()}-${scoreBlue}v${scoreRed}` : 'BATTLE-ARENA',
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  const isAnySpinning = spinningBlue || spinningRed;

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4 sm:gap-6 overflow-hidden">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4 sm:pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] sm:text-[12px] font-bold mb-1.5 border border-indigo-500/20">
            <Swords className="w-3.5 h-3.5 text-indigo-500" />
            <span>2-Player Head-to-Head Clash Arena</span>
          </div>
          <h2 className="font-headline font-black text-xl sm:text-3xl lg:text-4xl text-[#1a1b22] dark:text-[#f1effa] tracking-tight">
            Wheel Battle Arena
          </h2>
          <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-1">
            Customize combat wheels, choose victory target, and spin simultaneously. First to reach {targetScore} points wins!
          </p>
        </div>

        {/* Action Controls: Presets, Target Score, Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Target Score Selector */}
          <div className="flex items-center gap-1.5 bg-[#f4f2fd] dark:bg-[#20212d] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[11px] sm:text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">Goal:</span>
            <select
              value={targetScore}
              onChange={e => setTargetScore(Number(e.target.value))}
              disabled={isAnySpinning}
              className="bg-transparent text-[11px] sm:text-xs font-extrabold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
            >
              <option value={3} className="dark:bg-[#181922]">3 Pts (Quick)</option>
              <option value={5} className="dark:bg-[#181922]">5 Pts (Standard)</option>
              <option value={7} className="dark:bg-[#181922]">7 Pts (Extended)</option>
              <option value={10} className="dark:bg-[#181922]">10 Pts (Championship)</option>
              <option value={15} className="dark:bg-[#181922]">15 Pts (Marathon)</option>
            </select>
          </div>

          {/* Battle Presets Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              disabled={isAnySpinning}
              className="px-3 py-1.5 sm:py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#20212d] border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:border-indigo-500 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Battle Decks</span>
            </button>

            {showPresetsMenu && (
              <div className="absolute right-0 mt-2 w-64 max-w-[90vw] bg-white dark:bg-[#20212d] border border-[#eeedf7] dark:border-[#2f3044] rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Preset Deck
                </div>
                {BATTLE_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{preset.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{preset.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Match Button */}
          <button
            type="button"
            onClick={handleResetBattle}
            disabled={isAnySpinning}
            className="px-3 py-1.5 sm:py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Match</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Blue Team Score Card */}
        <div
          className={`p-3.5 sm:p-5 rounded-2xl border transition-all ${
            champion === 'blue'
              ? 'bg-blue-500/15 border-blue-500 shadow-lg ring-2 ring-blue-500/40'
              : 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-blue-500 shadow-sm shrink-0" />
              <h3 className="font-headline font-bold text-base sm:text-lg text-blue-700 dark:text-blue-300 truncate">
                {teamBlueName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingTeam(editingTeam === 'blue' ? null : 'blue')}
                disabled={isAnySpinning}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 flex items-center gap-1 transition-all cursor-pointer min-h-[32px]"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{editingTeam === 'blue' ? 'Close' : 'Customize'}</span>
              </button>
              {champion === 'blue' && (
                <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full animate-bounce">
                  <Crown className="w-3 h-3 text-amber-500" /> Win!
                </span>
              )}
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="font-headline font-extrabold text-3xl sm:text-5xl text-blue-600 dark:text-blue-400">
              {scoreBlue} <span className="text-sm sm:text-base font-normal text-slate-400">/ {targetScore} pts</span>
            </span>
            {lastActionBlue && (
              <span className="text-[11px] sm:text-xs font-mono font-bold text-blue-600 dark:text-blue-300 bg-white dark:bg-[#12131a] px-2.5 py-1 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm truncate max-w-full">
                {lastActionBlue}
              </span>
            )}
          </div>
        </div>

        {/* Red Team Score Card */}
        <div
          className={`p-3.5 sm:p-5 rounded-2xl border transition-all ${
            champion === 'red'
              ? 'bg-red-500/15 border-red-500 shadow-lg ring-2 ring-red-500/40'
              : 'bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500 shadow-sm shrink-0" />
              <h3 className="font-headline font-bold text-base sm:text-lg text-red-700 dark:text-red-300 truncate">
                {teamRedName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingTeam(editingTeam === 'red' ? null : 'red')}
                disabled={isAnySpinning}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 hover:bg-red-200 dark:bg-red-900/60 dark:hover:bg-red-800 text-red-700 dark:text-red-200 flex items-center gap-1 transition-all cursor-pointer min-h-[32px]"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{editingTeam === 'red' ? 'Close' : 'Customize'}</span>
              </button>
              {champion === 'red' && (
                <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full animate-bounce">
                  <Crown className="w-3 h-3 text-amber-500" /> Win!
                </span>
              )}
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="font-headline font-extrabold text-3xl sm:text-5xl text-red-600 dark:text-red-400">
              {scoreRed} <span className="text-sm sm:text-base font-normal text-slate-400">/ {targetScore} pts</span>
            </span>
            {lastActionRed && (
              <span className="text-[11px] sm:text-xs font-mono font-bold text-red-600 dark:text-red-300 bg-white dark:bg-[#12131a] px-2.5 py-1 rounded-xl border border-red-200 dark:border-red-800 shadow-sm truncate max-w-full">
                {lastActionRed}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Team Customization Drawer / Panel (if open) */}
      {editingTeam && (
        <div className="bg-[#f9f8fe] dark:bg-[#1f202b] rounded-2xl p-4 sm:p-5 border border-indigo-200 dark:border-indigo-900/50 shadow-inner flex flex-col gap-4 sm:gap-5 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                Customizing {editingTeam === 'blue' ? teamBlueName : teamRedName} Combat Wheel
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setEditingTeam(null)}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Team Name & Theme Color */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Team / Player Name
                </label>
                <input
                  type="text"
                  value={editingTeam === 'blue' ? teamBlueName : teamRedName}
                  onChange={e =>
                    editingTeam === 'blue'
                      ? setTeamBlueName(e.target.value)
                      : setTeamRedName(e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#14151e] border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Color Theme</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(BATTLE_PALETTES).map(([key, colors]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSetPalette(editingTeam, colors)}
                      className="h-8 sm:h-9 rounded-xl border border-slate-300 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden hover:scale-105 transition-all cursor-pointer shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
                      }}
                      title={key}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Slices & Points Editor */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Wheel Slices & Point Values
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSlice(editingTeam)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all min-h-[30px]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Slice</span>
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
                {(editingTeam === 'blue' ? wheelBlue.items : wheelRed.items).map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-white dark:bg-[#14151e] p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    <input
                      type="text"
                      value={item.text}
                      onChange={e => handleUpdateSliceText(editingTeam, idx, e.target.value)}
                      placeholder="e.g. Strike (+1)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#1c1d28] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />

                    {/* Weight Selector */}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                      <span>W:</span>
                      <select
                        value={item.weight}
                        onChange={e => handleUpdateSliceWeight(editingTeam, idx, Number(e.target.value))}
                        className="px-1.5 py-1 rounded bg-slate-50 dark:bg-[#1c1d28] border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200"
                      >
                        <option value={1}>1x</option>
                        <option value={2}>2x</option>
                        <option value={3}>3x</option>
                        <option value={5}>5x</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSlice(editingTeam, idx)}
                      disabled={(editingTeam === 'blue' ? wheelBlue.items.length : wheelRed.items.length) <= 2}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-30 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large Dueling Wheels Arena Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-items-center py-2 relative">
        {/* Blue Team Wheel (Fluid responsive up to 460px) */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-center">
            <span className="font-headline font-black text-lg sm:text-xl text-blue-600 dark:text-blue-400 tracking-wide">
              {teamBlueName}
            </span>
          </div>

          <div className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] aspect-square relative flex items-center justify-center p-1 sm:p-2 rounded-full transition-all duration-300">
            {/* Spinning Glow Effect */}
            {spinningBlue && (
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />
            )}
            <WheelCanvas
              items={wheelBlue.items}
              palette={wheelBlue.palette}
              isSpinning={spinningBlue}
              preSelectedWinner={preSelectedBlue}
              onSpinStart={() => setSpinningBlue(true)}
              onSpinEnd={onBlueSpinEnd}
              duration={spinDuration}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
            />
          </div>
        </div>

        {/* Center Clash "VS" Badge (Floating Desktop Badge) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-600 p-1 shadow-2xl flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#181922] flex items-center justify-center">
              <span className="font-headline font-black text-lg bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                VS
              </span>
            </div>
          </div>
        </div>

        {/* Red Team Wheel (Fluid responsive up to 460px) */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-center">
            <span className="font-headline font-black text-lg sm:text-xl text-red-600 dark:text-red-400 tracking-wide">
              {teamRedName}
            </span>
          </div>

          <div className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] aspect-square relative flex items-center justify-center p-1 sm:p-2 rounded-full transition-all duration-300">
            {/* Spinning Glow Effect */}
            {spinningRed && (
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl animate-pulse" />
            )}
            <WheelCanvas
              items={wheelRed.items}
              palette={wheelRed.palette}
              isSpinning={spinningRed}
              preSelectedWinner={preSelectedRed}
              onSpinStart={() => setSpinningRed(true)}
              onSpinEnd={onRedSpinEnd}
              duration={spinDuration}
              soundEnabled={soundEnabled}
              soundPack={soundPack}
              volume={volume}
            />
          </div>
        </div>
      </div>

      {/* Main Duel Spin Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-[#eeedf7] dark:border-[#292a39]">
        {!champion ? (
          <button
            type="button"
            onClick={handleSpinSimultaneous}
            disabled={isAnySpinning}
            className="w-full sm:w-auto sm:min-w-[320px] max-w-full py-3.5 sm:py-4 px-4 sm:px-10 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 hover:brightness-110 active:scale-98 text-white font-headline font-black text-sm sm:text-lg tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]"
          >
            <Swords className={`w-5 h-5 sm:w-6 sm:h-6 ${isAnySpinning ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isAnySpinning ? 'DUEL IN PROGRESS...' : 'SPIN CLASH (BOTH TEAMS)'}</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShareCardOpen(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-white font-headline font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[44px]"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Victory Card</span>
            </button>
            <button
              type="button"
              onClick={handleResetBattle}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-headline font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[44px]"
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
