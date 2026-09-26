'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Dice5,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  History,
  Trash2,
  Play,
  Terminal,
  Info,
  Eye
} from 'lucide-react';
import {
  DieType,
  DIE_DEFINITIONS,
  RollOptions,
  RollResult,
  executeDiceRoll,
  parseDiceNotation,
  SingleDieResult
} from './diceMath';
import { DiceTheme, DICE_THEMES } from './DiceScene3D';
import { RollTelemetry } from './cannonPhysics';
import DiceShareModal from './DiceShareModal';
import DeveloperPhysicsModal from './DeveloperPhysicsModal';
import DiceInspectorModal from './DiceInspectorModal';

// Dynamically import the 3D scene to optimize client bundle
const DiceScene3D = dynamic(() => import('./DiceScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] rounded-3xl bg-[#12131a] flex flex-col items-center justify-center gap-3 border border-[#222330]">
      <Dice5 className="w-10 h-10 text-[#4648d4] animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading 3D Dice Tray...</span>
    </div>
  )
});

interface DiceRollerEngineProps {
  initialCount?: number;
  initialSides?: number;
  initialDropLowest?: number;
  initialModifier?: number;
  lockSides?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  suggestedPresets?: { label: string; count: number; sides: number; dropLowest?: number; modifier?: number }[];
}

const STORAGE_KEY_HISTORY = 'spinwheelgames_dice_history';
const STORAGE_KEY_THEME = 'spinwheelgames_dice_theme';

export default function DiceRollerEngine({
  initialCount = 2,
  initialSides = 6,
  initialDropLowest = 0,
  initialModifier = 0,
  lockSides = false,
  pageTitle = 'Online Dice Roller',
  pageSubtitle = 'Roll interactive 3D dice online with smooth rolling, realistic bouncing, and instant result totals.',
  suggestedPresets
}: DiceRollerEngineProps) {
  // Config state
  const [count, setCount] = useState<number>(initialCount);
  const [sides, setSides] = useState<number>(initialSides);
  const [modifier, setModifier] = useState<number>(initialModifier);
  const [dropLowest, setDropLowest] = useState<number>(initialDropLowest);
  const [dropHighest, setDropHighest] = useState<number>(0);
  const [keepHighest, setKeepHighest] = useState<number>(0);
  const [keepLowest, setKeepLowest] = useState<number>(0);
  const [rerollOnes, setRerollOnes] = useState<boolean>(false);
  const [exploding, setExploding] = useState<boolean>(false);

  // Custom notation input
  const [notationInput, setNotationInput] = useState<string>('');

  // UI state
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(initialDropLowest > 0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<DiceTheme>('ruby');
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [devModalOpen, setDevModalOpen] = useState<boolean>(false);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  const [inspectorDieIndex, setInspectorDieIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Result state
  const [currentResult, setCurrentResult] = useState<RollResult | null>(null);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [telemetry, setTelemetry] = useState<RollTelemetry[]>([]);

  // Load history & theme from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as DiceTheme;
      if (savedTheme && DICE_THEMES[savedTheme]) {
        setTheme(savedTheme);
      }
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch {
      // Ignore
    }

    const initialRoll = executeDiceRoll({
      count: initialCount,
      sides: initialSides,
      modifier: initialModifier,
      dropLowest: initialDropLowest
    });
    setCurrentResult(initialRoll);
  }, [initialCount, initialSides, initialModifier, initialDropLowest]);

  const handleThemeChange = (newTheme: DiceTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, newTheme);
    } catch {
      // Ignore
    }
  };

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
  }, [isRolling]);

  // Handle physics settlement and compute final scores strictly from physical face normals
  const handlePhysicsRollComplete = useCallback(
    (settledDice: SingleDieResult[]) => {
      const diceWithIndex = settledDice.map((d, index) => ({ ...d, index }));
      diceWithIndex.sort((a, b) => a.value - b.value);

      let dropLowestCount = dropLowest || 0;
      if (keepHighest && keepHighest < count) {
        dropLowestCount = Math.max(dropLowestCount, count - keepHighest);
      }

      let dropHighestCount = dropHighest || 0;
      if (keepLowest && keepLowest < count) {
        dropHighestCount = Math.max(dropHighestCount, count - keepLowest);
      }

      const droppedIndices = new Set<number>();
      for (let i = 0; i < dropLowestCount && i < diceWithIndex.length; i++) {
        droppedIndices.add(diceWithIndex[i].index);
      }
      for (let i = 0; i < dropHighestCount && i < diceWithIndex.length; i++) {
        const highIdx = diceWithIndex.length - 1 - i;
        if (highIdx >= 0) droppedIndices.add(diceWithIndex[highIdx].index);
      }

      const finalDice: SingleDieResult[] = settledDice.map((d, index) => ({
        ...d,
        isDropped: droppedIndices.has(index)
      }));

      const activeDice = finalDice.filter((d) => !d.isDropped);
      const activeCount = activeDice.length;
      const subtotal = activeDice.reduce((acc, d) => acc + d.value, 0);
      const total = subtotal + modifier;

      const minPossible = activeCount * 1 + modifier;
      const maxPossible = activeCount * sides + modifier;
      const average = activeCount > 0 ? Number((subtotal / activeCount).toFixed(2)) : 0;

      let notation = `${count}d${sides}`;
      if (dropLowestCount > 0 && !keepHighest) notation += `dl${dropLowestCount}`;
      if (keepHighest) notation += `kh${keepHighest}`;
      if (dropHighestCount > 0 && !keepLowest) notation += `dh${dropHighestCount}`;
      if (keepLowest) notation += `kl${keepLowest}`;
      if (rerollOnes) notation += 'r1';
      if (exploding) notation += '!';
      if (modifier > 0) notation += `+${modifier}`;
      if (modifier < 0) notation += `${modifier}`;

      let explanation = `Simulated ${count} ${sides}-sided ${count === 1 ? 'die' : 'dice'} with rigid-body collisions`;
      if (dropLowestCount > 0) explanation += `, dropped ${dropLowestCount} lowest`;
      if (modifier !== 0) explanation += `, modifier ${modifier > 0 ? `+${modifier}` : modifier}`;
      explanation += '.';

      const result: RollResult = {
        dice: finalDice,
        activeCount,
        sides,
        modifier,
        subtotal,
        total,
        average,
        minPossible,
        maxPossible,
        notation,
        explanation,
        timestamp: Date.now()
      };

      setCurrentResult(result);
      setIsRolling(false);

      setHistory((prev) => {
        const updated = [result, ...prev.slice(0, 19)];
        try {
          localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });
    },
    [count, sides, modifier, dropLowest, dropHighest, keepHighest, keepLowest, rerollOnes, exploding]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
          handleRoll();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRoll]);

  const handleApplyNotation = () => {
    const parsed = parseDiceNotation(notationInput);
    if (parsed) {
      setCount(parsed.count);
      setSides(parsed.sides);
      setModifier(parsed.modifier || 0);
      setDropLowest(parsed.dropLowest || 0);
      setDropHighest(parsed.dropHighest || 0);
      setKeepHighest(parsed.keepHighest || 0);
      setKeepLowest(parsed.keepLowest || 0);
      setRerollOnes(!!parsed.rerollOnes);
      setExploding(!!parsed.exploding);
      if (parsed.dropLowest || parsed.dropHighest || parsed.keepHighest || parsed.keepLowest) {
        setAdvancedOpen(true);
      }
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // Ignore
    }
  };

  const handleCopyResult = async () => {
    if (!currentResult) return;
    try {
      const text = `${currentResult.notation}: ${currentResult.total} (${currentResult.dice.map((d) => (d.isDropped ? `[${d.value}]` : `${d.value}`)).join(' + ')})`;
      await navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    } catch {
      // Ignore
    }
  };

  const presets = suggestedPresets || [
    { label: '1d6', count: 1, sides: 6 },
    { label: '2d6', count: 2, sides: 6 },
    { label: '3d6', count: 3, sides: 6 },
    { label: '4d6 (Drop Lowest)', count: 4, sides: 6, dropLowest: 1 },
    { label: '1d20', count: 1, sides: 20 },
    { label: '2d20 (Advantage)', count: 2, sides: 20, dropLowest: 1 },
    { label: '1d100', count: 1, sides: 100 },
    { label: '1d2 (Coin)', count: 1, sides: 2 }
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4 space-y-6">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {currentResult && !isRolling
          ? `Dice rolled ${currentResult.notation}. Outcome total is ${currentResult.total}. Individual values: ${currentResult.dice.map((d) => (d.isDropped ? `${d.value} dropped` : `${d.value}`)).join(', ')}.`
          : isRolling
          ? 'Rolling dice...'
          : ''}
      </div>

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#eeedf7] dark:border-[#222330]">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[#1a1b22] dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
              <Dice5 className="w-6 h-6" />
            </span>
            <span>{pageTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-1 max-w-2xl">
            {pageSubtitle}
          </p>
        </div>

        {/* Ambient Settings Bar (Sound, Theme, Developer Telemetry) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#6cf8bb]/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-[#1f202e] border-slate-200 dark:border-slate-800 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Dice Sound' : 'Enable Dice Sound'}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Theme Selector */}
          <div className="relative">
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as DiceTheme)}
              aria-label="Select dice visual theme"
              className="px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] text-xs font-bold text-[#1a1b22] dark:text-white cursor-pointer hover:border-[#4648d4]"
            >
              {Object.entries(DICE_THEMES).map(([k, t]) => (
                <option key={k} value={k}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* 360 Dice Face Inspector Button */}
          <button
            type="button"
            onClick={() => {
              setInspectorDieIndex(0);
              setInspectorOpen(true);
            }}
            className="p-2 px-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect All Sides & Hidden Numbers 360°"
            aria-label="Inspect All Sides"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Inspect All Sides</span>
          </button>

          {/* Developer Physics Inspector Button */}
          <button
            type="button"
            onClick={() => setDevModalOpen(true)}
            className="p-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Open Physics Telemetry & Monte Carlo Tests"
            aria-label="Open Developer Physics Suite"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden md:inline">Physics &amp; Tests</span>
          </button>
        </div>
      </div>

      {/* Two-Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Dominant 3D Rigid-Body Arena (67-70%) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* 3D Dice Stage */}
          <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px]">
            <DiceScene3D
              dice={currentResult ? currentResult.dice : []}
              sides={sides}
              count={count}
              isRolling={isRolling}
              theme={theme}
              soundEnabled={soundEnabled}
              onPhysicsRollComplete={handlePhysicsRollComplete}
              onTelemetryUpdate={setTelemetry}
              onManualThrowTrigger={() => setIsRolling(true)}
            />

            {/* In-Arena Roll Button Overlay */}
            <div className="absolute bottom-5 inset-x-0 flex items-center justify-center pointer-events-auto px-4">
              <button
                type="button"
                onClick={handleRoll}
                disabled={isRolling}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4648d4] via-[#5c5ee8] to-[#4648d4] hover:brightness-110 text-white font-headline text-lg sm:text-xl font-black shadow-2xl active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-5 h-5 fill-current ${isRolling ? 'animate-spin' : ''}`} />
                <span>{isRolling ? 'Rolling...' : `Roll ${count}d${sides}`}</span>
                <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-white/20 text-white">
                  Space
                </kbd>
              </button>
            </div>
          </div>

          {/* Result Showcase Card */}
          {currentResult && (
            <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#222330] shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
              
              {/* Left: Total & Breakdown */}
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto text-center sm:text-left">
                <div className="flex flex-col items-center justify-center p-3.5 px-6 rounded-2xl bg-[#f4f2fd] dark:bg-[#222330] border border-[#eeedf7] dark:border-[#292a39] shrink-0 min-w-[140px] min-h-[92px]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                    Total Score
                  </span>
                  {isRolling ? (
                    <div className="flex items-center gap-2 py-1 text-amber-500 font-headline font-black text-xl sm:text-2xl animate-pulse">
                      <Sparkles className="w-5 h-5 animate-spin text-amber-400" />
                      <span>Rolling...</span>
                    </div>
                  ) : (
                    <span className="font-headline text-4xl sm:text-5xl font-black text-[#4648d4] dark:text-[#8587ff]">
                      {currentResult.total}
                    </span>
                  )}
                </div>

                {/* Individual Dice & Physical Stats */}
                <div className="space-y-1.5 min-w-0">
                  {isRolling ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#767586] dark:text-[#908fa1]">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      <span>Rolling {count} {count === 1 ? 'die' : 'dice'}...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                        {currentResult.dice.map((die, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => {
                              setInspectorDieIndex(i);
                              setInspectorOpen(true);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold font-mono border transition-all cursor-pointer hover:border-indigo-500 hover:scale-105 active:scale-95 ${
                              die.isDropped
                                ? 'opacity-35 line-through bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                                : 'bg-white dark:bg-[#1e2030] text-[#1a1b22] dark:text-white border-[#eeedf7] dark:border-[#292a39] shadow-2xs hover:shadow-md'
                            }`}
                            title={`Die #${i + 1} rolled ${die.value}. Click to inspect all sides 360°`}
                          >
                            <span>{die.value}</span>
                            <Eye className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                          </button>
                        ))}
                        {currentResult.modifier !== 0 && (
                          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                            {currentResult.modifier > 0 ? `+${currentResult.modifier}` : `${currentResult.modifier}`}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                        <span>Average: <strong className="text-[#1a1b22] dark:text-white">{currentResult.average}</strong></span>
                        <span className="mx-2">·</span>
                        <span>Range: <strong className="text-[#1a1b22] dark:text-white">{currentResult.minPossible} – {currentResult.maxPossible}</strong></span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Quick Result Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end shrink-0">
                <button
                  type="button"
                  disabled={isRolling}
                  onClick={() => {
                    setInspectorDieIndex(0);
                    setInspectorOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Inspect All Sides & Numbers 360°"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect 360°</span>
                </button>

                <button
                  type="button"
                  disabled={isRolling}
                  onClick={handleCopyResult}
                  className="px-3.5 py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1e2030] hover:bg-[#f4f2fd] dark:hover:bg-[#25273a] text-xs font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Copy roll summary"
                >
                  {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedNotification ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  disabled={isRolling}
                  onClick={() => setShareModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Card</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Preset Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#767586] dark:text-[#908fa1] uppercase tracking-wider mr-1">
              Presets:
            </span>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setCount(preset.count);
                  setSides(preset.sides);
                  setDropLowest(preset.dropLowest || 0);
                  setDropHighest(0);
                  setKeepHighest(0);
                  setKeepLowest(0);
                  setModifier(preset.modifier || 0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  count === preset.count && sides === preset.sides && dropLowest === (preset.dropLowest || 0)
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[#464554] dark:text-[#c7c4d7] hover:border-[#4648d4]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Controls, Modifiers, Advanced Drop/Keep, History (30-33%) */}
        <div className="lg:col-span-4 flex flex-col gap-5 w-full">
          
          {/* Main Controls Card */}
          <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-5">
            <h2 className="font-headline font-bold text-base text-[#1a1b22] dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Dice Configuration</span>
            </h2>

            {/* 1. Die Type Selector (if not locked) */}
            {!lockSides && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                  Die Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100', 'd2'] as DieType[]).map((dt) => {
                    const cfg = DIE_DEFINITIONS[dt];
                    const active = sides === cfg.sides;
                    return (
                      <button
                        key={dt}
                        type="button"
                        onClick={() => setSides(cfg.sides)}
                        className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                          active
                            ? 'bg-[#4648d4] text-white shadow-xs'
                            : 'bg-[#f4f2fd] dark:bg-[#1e2030] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Quantity & Modifier Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                  Quantity (1–20)
                </label>
                <div className="flex items-center rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] p-1">
                  <button
                    type="button"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-[#1e2030] text-[#1a1b22] dark:text-white font-black hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
                    className="w-full text-center font-bold text-sm bg-transparent text-[#1a1b22] dark:text-white focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setCount((c) => Math.min(20, c + 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-[#1e2030] text-[#1a1b22] dark:text-white font-black hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Modifier */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                  Modifier (+/-)
                </label>
                <div className="flex items-center rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] p-1">
                  <button
                    type="button"
                    onClick={() => setModifier((m) => m - 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-[#1e2030] text-[#1a1b22] dark:text-white font-black hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center font-bold text-sm bg-transparent text-[#1a1b22] dark:text-white focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setModifier((m) => m + 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-[#1e2030] text-[#1a1b22] dark:text-white font-black hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Progressive Disclosure: Advanced Settings */}
            <div className="border-t border-[#eeedf7] dark:border-[#222330] pt-3">
              <button
                type="button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] py-1 cursor-pointer"
              >
                <span>Advanced Rules (Drop / Keep / Formulas)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
              </button>

              {advancedOpen && (
                <div className="space-y-4 pt-3 animate-fadeIn">
                  
                  {/* Drop Lowest / Keep Highest */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#767586] dark:text-[#908fa1]">
                        Drop Lowest
                      </label>
                      <select
                        value={dropLowest}
                        onChange={(e) => {
                          setDropLowest(parseInt(e.target.value, 10));
                          setKeepHighest(0);
                        }}
                        className="w-full p-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs font-bold text-[#1a1b22] dark:text-white"
                      >
                        <option value={0}>None</option>
                        {Array.from({ length: Math.max(0, count - 1) }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Drop {i + 1} lowest
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#767586] dark:text-[#908fa1]">
                        Keep Highest
                      </label>
                      <select
                        value={keepHighest}
                        onChange={(e) => {
                          setKeepHighest(parseInt(e.target.value, 10));
                          setDropLowest(0);
                        }}
                        className="w-full p-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs font-bold text-[#1a1b22] dark:text-white"
                      >
                        <option value={0}>All</option>
                        {Array.from({ length: Math.max(0, count - 1) }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Keep {i + 1} highest
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* RPG Notation Quick Input */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                      Type Dice Formula (e.g. 4d6dl1, 2d20kh1)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 4d6dl1"
                        value={notationInput}
                        onChange={(e) => setNotationInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleApplyNotation();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs font-mono font-bold text-[#1a1b22] dark:text-white focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleApplyNotation}
                        className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 text-[#1a1b22] dark:text-white transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Master Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCount(initialCount);
                  setSides(initialSides);
                  setModifier(initialModifier);
                  setDropLowest(initialDropLowest);
                  setDropHighest(0);
                  setKeepHighest(0);
                  setKeepLowest(0);
                  setRerollOnes(false);
                  setExploding(false);
                }}
                className="py-2.5 px-3 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#767586] dark:text-[#908fa1] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleRoll}
                disabled={isRolling}
                className="py-2.5 px-4 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Roll Dice</span>
              </button>
            </div>
          </div>

          {/* Roll History Card */}
          <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" />
                <h3 className="font-headline font-bold text-sm text-[#1a1b22] dark:text-white">
                  Recent Physical Rolls
                </h3>
              </div>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-[#767586] dark:text-[#908fa1] text-center py-4">
                Roll or drag-and-flick dice in the 3D canvas to record physics history.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {history.slice(0, 8).map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#4648d4] dark:text-[#8587ff]">
                        {h.notation}
                      </span>
                      <span className="text-[#767586] dark:text-[#908fa1] text-[11px]">
                        ({h.dice.map((d) => (d.isDropped ? `[${d.value}]` : `${d.value}`)).join(',')})
                      </span>
                    </div>
                    <span className="font-headline font-black text-sm text-[#1a1b22] dark:text-white">
                      {h.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Randomness & Fairness Transparency Note */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151620] border border-slate-200/80 dark:border-slate-800 text-xs text-[#767586] dark:text-[#908fa1] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1a1b22] dark:text-slate-200 font-bold">
              <Info className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Fair Rolls &amp; Clear Results</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every roll starts with a fresh, unbiased toss and rolls naturally across the tray. When the dice come to a stop, the system automatically reads the winning face number and calculates your total score.
            </p>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <DiceShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={currentResult}
      />

      {/* Developer Physics Telemetry & Monte Carlo Modal */}
      <DeveloperPhysicsModal
        isOpen={devModalOpen}
        onClose={() => setDevModalOpen(false)}
        telemetry={telemetry}
        currentSides={sides}
      />

      {/* 360 Dice Face Inspector Modal */}
      <DiceInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        sides={sides}
        diceResults={currentResult?.dice || [{ value: 1, originalValue: 1, isDropped: false }]}
        initialDieIndex={inspectorDieIndex}
        theme={theme}
      />
    </div>
  );
}
