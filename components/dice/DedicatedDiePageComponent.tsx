'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Dice5,
  Dices,
  Volume2,
  VolumeX,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Scale,
  Calculator,
  BookOpen,
  Cpu,
  Shield,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Layers,
  History,
  Info,
  Home,
  ChevronRight,
  Tv
} from 'lucide-react';
import { openViralStreamerSetupModal } from '@/lib/viralToolsData';
import {
  DiePageConfig,
  QuantityPreset,
  DiePageFaq
} from './diePageConfigs';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  calculateDiceDistribution,
  calculateDiceStatistics,
  SingleDieResult,
  RollResult,
  DiceDistributionItem
} from './diceMath';
import { DiceTheme, DICE_THEMES } from './DiceScene3D';
import DiceInspectorModal from './DiceInspectorModal';
import confetti from '@/lib/confetti';

// Dynamically import 3D scene (client-only WebGL)
const DiceScene3D = dynamic(() => import('./DiceScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl bg-slate-100 dark:bg-[#0c0d14] flex flex-col items-center justify-center gap-3 border border-slate-200 dark:border-[#1d1f2b]">
      <Dice5 className="w-10 h-10 text-indigo-500 animate-spin" />
      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Loading 3D Canvas...</span>
    </div>
  )
});

interface DedicatedDiePageComponentProps {
  config: DiePageConfig;
}

export default function DedicatedDiePageComponent({ config }: DedicatedDiePageComponentProps) {
  // Dice Roll State
  const [count, setCount] = useState<number>(config.defaultCount || 1);
  const [modifier, setModifier] = useState<number>(0);
  const [dropLowest, setDropLowest] = useState<number>(0);
  const [keepHighest, setKeepHighest] = useState<number>(0);
  const [theme, setTheme] = useState<DiceTheme>('ruby');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<RollResult | null>(null);
  const [rollHistory, setRollHistory] = useState<RollResult[]>([]);

  // 3D Physical dice objects
  const [currentDice, setCurrentDice] = useState<SingleDieResult[]>(() => {
    return Array.from({ length: config.defaultCount || 1 }, (_, i) => ({
      id: `die-${i}`,
      value: config.sides === 2 ? 1 : Math.ceil(config.sides / 2),
      originalValue: config.sides === 2 ? 1 : Math.ceil(config.sides / 2),
      isDropped: false
    }));
  });

  // 360° Face Inspector Modal State
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectedDieIndex, setInspectedDieIndex] = useState<number>(0);

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Compute distribution table dynamically for the active count
  const distribution = useMemo(() => {
    return calculateDiceDistribution(count, config.sides);
  }, [count, config.sides]);

  const stats = useMemo(() => {
    return calculateDiceStatistics(count, config.sides, modifier);
  }, [count, config.sides, modifier]);

  // Roll execution: Launch physics without pre-generating premature results
  const triggerRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
  }, [isRolling]);

  // Synchronize result strictly from 3D physics settled face normal
  const handlePhysicsComplete = useCallback(
    (settledResults: SingleDieResult[]) => {
      const rawValues =
        settledResults && settledResults.length > 0
          ? settledResults.map((r) => r.value)
          : Array.from({ length: count }, () => Math.floor(Math.random() * config.sides) + 1);

      let droppedIndices: number[] = [];
      if (dropLowest > 0 && rawValues.length > dropLowest) {
        const indexed = rawValues.map((val, idx) => ({ val, idx }));
        indexed.sort((a, b) => a.val - b.val);
        droppedIndices = indexed.slice(0, dropLowest).map((item) => item.idx);
      } else if (keepHighest > 0 && rawValues.length > keepHighest) {
        const indexed = rawValues.map((val, idx) => ({ val, idx }));
        indexed.sort((a, b) => b.val - a.val);
        const keepIndices = new Set(indexed.slice(0, keepHighest).map((item) => item.idx));
        droppedIndices = indexed.filter((item) => !keepIndices.has(item.idx)).map((item) => item.idx);
      }

      const newDice: SingleDieResult[] = rawValues.map((val, idx) => ({
        id: `die-${Date.now()}-${idx}`,
        value: val,
        originalValue: val,
        isDropped: droppedIndices.includes(idx)
      }));

      setCurrentDice(newDice);

      const keptRolls = newDice.filter((d) => !d.isDropped).map((d) => d.value);
      const sumKept = keptRolls.reduce((a, b) => a + b, 0);
      const total = sumKept + modifier;

      const resultObj: RollResult = {
        dice: newDice,
        activeCount: count,
        sides: config.sides,
        modifier,
        subtotal: sumKept,
        total,
        average: stats.theoreticalAverage,
        minPossible: stats.min,
        maxPossible: stats.max,
        notation: `${count}${config.dieType}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''}`,
        timestamp: Date.now()
      };

      setLastResult(resultObj);
      setRollHistory((prev) => [resultObj, ...prev.slice(0, 19)]);
      setIsRolling(false);

      // Natural 20 Celebration (Critical Hit)
      if (config.sides === 20 && keptRolls.some((v) => v === 20)) {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    },
    [count, config.sides, config.dieType, dropLowest, keepHighest, modifier, stats]
  );

  // Spacebar hotkey to roll dice
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        triggerRoll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerRoll]);

  // Quick Preset Handler
  const handleApplyPreset = (preset: QuantityPreset) => {
    setCount(preset.count);
    setDropLowest(preset.dropLowest || 0);
    setKeepHighest(preset.keepHighest || 0);
    setModifier(preset.modifier || 0);

    const newDice: SingleDieResult[] = Array.from({ length: preset.count }, (_, i) => ({
      id: `die-${i}`,
      value: config.sides === 2 ? 1 : Math.ceil(config.sides / 2),
      originalValue: config.sides === 2 ? 1 : Math.ceil(config.sides / 2),
      isDropped: false
    }));
    setCurrentDice(newDice);
  };

  const activeSum = useMemo(() => {
    const kept = currentDice.filter((d) => !d.isDropped);
    const sum = kept.reduce((acc, curr) => acc + curr.value, 0);
    return sum + modifier;
  }, [currentDice, modifier]);

  // Schema.org Structured Data
  const jsonLd = useMemo(() => {
    const canonicalPath =
      config.dieType === '4d6'
        ? '/roll-4d6'
        : `/dice/${config.dieType}`;
    const fullCanonicalUrl = `https://spinwheelgames.org${canonicalPath}`;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: `${config.name} - 3D Dice Roller`,
          url: fullCanonicalUrl,
          applicationCategory: 'GameApplication',
          description: config.metaDescription,
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: (config.faqs || []).map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://spinwheelgames.org'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Dice Roller',
              item: 'https://spinwheelgames.org/dice-roller'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: config.dieType.toUpperCase(),
              item: fullCanonicalUrl
            }
          ]
        }
      ]
    };
  }, [config]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 transition-colors">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full space-y-4 sm:space-y-5">
        {/* H1: Primary Keyword & Value Proposition - Compact & Responsive */}
        <header className="space-y-2.5 border-b border-slate-200 dark:border-[#1c1d29] pb-3.5">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dice Roller', href: '/dice-roller' },
              { label: config.dieType.toUpperCase() }
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                <span>{config.h1Title || config.metaTitle.split('|')[0].trim()}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-200 dark:border-indigo-500/30">
                  {config.shape}
                </span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {config.introParagraphs[0]}
              </p>
            </div>

            {/* Quick Summary Badge */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] flex items-center gap-3 shrink-0 shadow-xs">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Average (1{config.dieType})
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                  {config.expectedValue}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Interactive 3D Roller Section - Compact & Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* 3D Roll Arena (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-[#0a0b12] border border-slate-800 p-3 sm:p-4 shadow-lg overflow-hidden flex flex-col justify-between text-white">
              {/* Top Controls Overlay */}
              <div className="flex items-center justify-between z-10 gap-2 flex-wrap mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-slate-200 px-2.5 py-0.5 rounded-lg bg-[#161722] border border-[#262838]">
                    {count}{config.dieType.toUpperCase()}
                    {modifier !== 0 && (modifier > 0 ? `+${modifier}` : modifier)}
                  </span>
                  {dropLowest > 0 && (
                    <span className="text-[11px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Drop {dropLowest}L
                    </span>
                  )}
                  {keepHighest > 0 && (
                    <span className="text-[11px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Keep {keepHighest}H
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      soundEnabled
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'bg-[#181924] text-slate-400 border border-[#262838]'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInspectedDieIndex(0);
                      setIsInspectorOpen(true);
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-[#181924] text-slate-200 hover:text-white hover:bg-indigo-600/40 border border-[#262838] transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">Inspect 360°</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openViralStreamerSetupModal({
                        title: `${count}${config.dieType.toUpperCase()} Dice Roller`,
                        items: Array.from(
                          { length: Math.min(config.sides, 20) },
                          (_, i) => ({
                            id: `die-face-${i + 1}`,
                            text: String(i + 1),
                            weight: 1
                          })
                        ),
                        toolKind: 'dice',
                        diceConfig: {
                          sides: config.sides,
                          count,
                          dropLowest,
                          keepHighest,
                          modifier,
                          notation: `${count}${config.dieType}`
                        }
                      })
                    }
                    className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:text-white hover:bg-emerald-600 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
                    title="Open Streamer Mode / OBS Browser Source Setup"
                    aria-label="Streamer mode / OBS"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Streamer mode / OBS</span>
                  </button>
                </div>
              </div>

              {/* 3D Scene Viewport - Viewport-Friendly Height */}
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-xl overflow-hidden bg-radial from-[#131524] to-[#080910]">
                <DiceScene3D
                  dice={currentDice}
                  sides={config.sides}
                  count={count}
                  isRolling={isRolling}
                  theme={theme}
                  soundEnabled={soundEnabled}
                  onPhysicsRollComplete={handlePhysicsComplete}
                />
              </div>

              {/* Bottom Result & Big Roll Button */}
              <div className="mt-3 pt-3 border-t border-[#1a1b28] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Current Total
                  </span>
                  <div className="flex items-baseline gap-2">
                    {isRolling ? (
                      <span className="text-xl sm:text-2xl font-black font-mono text-indigo-400 flex items-center gap-2 animate-pulse">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                        Rolling...
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                          {activeSum}
                        </span>
                        {lastResult && (
                          <span className="text-xs text-slate-400 font-mono">
                            (Avg: {lastResult.average})
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isRolling}
                  onClick={() => triggerRoll()}
                  className="px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>{isRolling ? 'Rolling...' : `Roll ${count}${config.dieType.toUpperCase()}`}</span>
                </button>
              </div>
            </div>

            {/* Individual Dice Face Results */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#0d0e15] border border-slate-200 dark:border-[#1b1c28] flex items-center gap-1.5 flex-wrap shadow-2xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mr-1">Faces:</span>
              {isRolling ? (
                <div className="flex items-center gap-2 py-0.5 text-xs text-indigo-500 dark:text-indigo-400 font-mono animate-pulse">
                  <Dices className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating physics on felt bed...</span>
                </div>
              ) : (
                currentDice.map((d, idx) => (
                  <button
                    key={d.id || idx}
                    type="button"
                    onClick={() => {
                      setInspectedDieIndex(idx);
                      setIsInspectorOpen(true);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                      d.isDropped
                        ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400/50 dark:border-rose-900/30 line-through'
                        : d.value === config.sides
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 shadow-xs'
                        : d.value === 1
                        ? 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400 dark:bg-[#181a26] dark:text-white dark:border-[#27293d] dark:hover:border-indigo-500/50'
                    }`}
                  >
                    <span>{d.value}</span>
                    {d.value === config.sides && <Sparkles className="w-3 h-3 text-amber-500" />}
                  </button>
                ))
              )}
            </div>

            {/* Critical Hit / Fumble Celebration Banner for D20 */}
            {!isRolling && lastResult && config.sides === 20 && lastResult.dice.some((d) => !d.isDropped && d.value === 20) && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border-2 border-amber-400/60 flex items-center justify-between text-amber-300 dark:text-amber-200 shadow-lg shadow-amber-500/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="font-extrabold text-sm tracking-wide uppercase text-amber-300">
                    Natural 20! Critical Hit!
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-400/30 text-amber-100 border border-amber-300/40">
                  Max Roll
                </span>
              </div>
            )}

            {!isRolling && lastResult && config.sides === 20 && lastResult.dice.length === 1 && lastResult.dice[0].value === 1 && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/20 via-red-500/15 to-rose-500/20 border-2 border-rose-500/60 flex items-center justify-between text-rose-300 dark:text-rose-200 shadow-lg shadow-rose-500/10">
                <div className="flex items-center gap-2">
                  <span className="text-base">💀</span>
                  <span className="font-extrabold text-sm tracking-wide uppercase text-rose-300">
                    Natural 1 — Critical Fumble!
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/30 text-rose-100 border border-rose-400/40">
                  Min Roll
                </span>
              </div>
            )}

            {/* Roll History */}
            {rollHistory.length > 0 && (
              <div className="p-3 rounded-xl bg-white dark:bg-[#0a0b10] border border-slate-200 dark:border-[#181926] space-y-1.5 shadow-2xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <History className="w-3 h-3 text-indigo-500" />
                  <span>Recent Roll History:</span>
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {rollHistory.map((h, hIdx) => (
                    <div
                      key={h.timestamp + hIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#12131d] border border-slate-200 dark:border-[#1e202f] shrink-0 font-mono text-[11px] flex items-center gap-1.5"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{h.notation}:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{h.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Presets & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Presets */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Popular {config.dieType.toUpperCase()} Presets</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.quantityPresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 dark:bg-[#090a0f] dark:hover:bg-[#161724] border border-slate-200 hover:border-indigo-400 dark:border-[#1b1c28] dark:hover:border-indigo-500/40 text-left transition-all group flex flex-col justify-between cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                        {p.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    {p.sublabel && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                        {p.sublabel}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Formula & Modifiers */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] space-y-3.5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-purple-500" />
                <span>Custom Roll Configuration</span>
              </h3>

              {/* Number of Dice Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Number of Dice:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{count}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={count}
                  onChange={(e) => {
                    setCount(Number(e.target.value));
                    setDropLowest(0);
                    setKeepHighest(0);
                  }}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-[#1a1b28] rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  <span>1 die</span>
                  <span>10 dice</span>
                  <span>20 dice</span>
                </div>
              </div>

              {/* Modifier */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Flat Modifier (+/-):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {modifier > 0 ? `+${modifier}` : modifier}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setModifier((prev) => prev - 1)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181a26] dark:hover:bg-[#202334] text-slate-800 dark:text-white font-bold border border-slate-200 dark:border-[#27293d] transition-colors cursor-pointer"
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    onClick={() => setModifier(0)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181a26] dark:hover:bg-[#202334] text-slate-600 dark:text-slate-400 text-xs border border-slate-200 dark:border-[#27293d] transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setModifier((prev) => prev + 1)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181a26] dark:hover:bg-[#202334] text-slate-800 dark:text-white font-bold border border-slate-200 dark:border-[#27293d] transition-colors cursor-pointer"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* Theme Picker */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">3D Gemstone Material:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['ruby', 'sapphire', 'emerald', 'obsidian', 'amethyst', 'silvergold'] as DiceTheme[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`p-2 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                        theme === t
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#141520] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#222434] hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Editorial Guide & Tabletop RPG Context - Compact */}
        <section className="bg-white dark:bg-[#0f1017] rounded-2xl border border-slate-200 dark:border-[#202230] p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                About the {config.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tabletop roleplaying context, mechanical significance, and practical gameplay guide.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {config.introParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {config.howToUse && config.howToUse.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-[#1c1d29] space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>How to Roll {config.dieType.toUpperCase()} Online</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                {config.howToUse.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141520] border border-slate-200/60 dark:border-[#202232]">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* H2: [DX] Results and Probability ("At a glance" + table) */}
        <section className="bg-white dark:bg-[#0f1017] rounded-2xl border border-slate-200 dark:border-[#202230] p-4 sm:p-6 space-y-4 shadow-xs">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-500" />
              <span>{config.dieType.toUpperCase()} Results and Probability</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              At-a-glance statistical summary and discrete outcome chances for a balanced {config.sides}-sided die.
            </p>
          </div>

          {/* At-a-glance summary table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                  <th className="py-3 px-4 font-bold">Die Type</th>
                  <th className="py-3 px-4 font-bold">Number of Sides</th>
                  <th className="py-3 px-4 font-bold">Minimum Result</th>
                  <th className="py-3 px-4 font-bold">Maximum Result</th>
                  <th className="py-3 px-4 font-bold">Expected Average</th>
                  <th className="py-3 px-4 font-bold">Probability per Face</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-[#090a0f] text-slate-800 dark:text-slate-200">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{config.dieType.toUpperCase()}</td>
                  <td className="py-3 px-4 font-mono">{config.sides}</td>
                  <td className="py-3 px-4 font-mono">{config.minResult}</td>
                  <td className="py-3 px-4 font-mono">{config.maxResult}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{config.expectedValue}</td>
                  <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-300">
                    {((1 / config.sides) * 100).toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Discrete Probability Distribution Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {count}{config.dieType.toUpperCase()} Discrete Sum Distribution
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Quick count:</span>
                {[1, 2, 3, 4].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setCount(q)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      count === q
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-[#181a24] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-transparent'
                    }`}
                  >
                    {q}d{config.sides}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                    <th className="py-3 px-4 font-bold">Sum Result</th>
                    <th className="py-3 px-4 font-bold">Combinations / Ways</th>
                    <th className="py-3 px-4 font-bold">Exact Probability</th>
                    <th className="py-3 px-4 font-bold">Cumulative (≤ X)</th>
                    <th className="py-3 px-4 font-bold">Odds Bar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171822]">
                  {distribution.slice(0, 20).map((row) => (
                    <tr key={row.value} className="hover:bg-slate-50 dark:hover:bg-[#13141f] transition-colors bg-white dark:bg-transparent">
                      <td className="py-2.5 px-4 font-bold font-mono text-slate-900 dark:text-white">{row.value}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-300">{row.ways.toLocaleString()}</td>
                      <td className="py-2.5 px-4 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{row.probability}%</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500 dark:text-slate-400">{row.cumulativeProbability}%</td>
                      <td className="py-2.5 px-4 w-1/3">
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#181a24] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(2, row.probability * 3))}%`
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* H2: Average Roll of a [DX] */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Average Roll of a {config.dieType.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mathematical expectation and discrete probability derivation.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              For any fair polyhedral die, the theoretical average (or expected value) is the arithmetic mean of all possible outcomes. When all faces have an identical chance of occurring, the average is calculated using the simple formula:
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#07080c] border border-slate-200 dark:border-[#1f202d] font-mono text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Average Formula:</p>
              <p className="text-amber-700 dark:text-amber-300 font-bold">
                Average = (Minimum + Maximum) ÷ 2 = ({config.minResult} + {config.maxResult}) ÷ 2 = {config.expectedValue}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Full Arithmetic: {config.arithmeticFormula}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Step-by-Step Calculation:
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-1">
                {config.arithmeticSteps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* H2: [DX] Dice Notation */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <span>{config.dieType.toUpperCase()} Dice Notation Guide</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Understanding standard tabletop notation (NdX) where N is the number of dice and X is the sides.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                  <th className="py-3 px-4 font-bold">Notation</th>
                  <th className="py-3 px-4 font-bold">Dice Count</th>
                  <th className="py-3 px-4 font-bold">Minimum Total</th>
                  <th className="py-3 px-4 font-bold">Maximum Total</th>
                  <th className="py-3 px-4 font-bold">Expected Average</th>
                  <th className="py-3 px-4 font-bold">Tabletop Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#171822]">
                {config.notationGuide.map((nItem, nIdx) => (
                  <tr key={nIdx} className="hover:bg-slate-50 dark:hover:bg-[#13141f] transition-colors bg-white dark:bg-transparent">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{nItem.notation}</td>
                    <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">{nItem.count}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{nItem.min}</td>
                    <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{nItem.max}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{nItem.expected}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{nItem.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* H2: How the 3D Dice Roll Works */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                How the 3D Dice Roll Works
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simple, transparent explanation of how our virtual dice generate results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1b28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>1. Fair & Unbiased Random Toss</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Every toss starts with a fresh random spin, ensuring that each side has an exact, equal chance of landing face up.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1b28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>2. Realistic Tumbling & Bouncing</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                The 3D dice spin, collide, and bounce naturally across the tray, creating the authentic feel of rolling real dice at a game table.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1b28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>3. Smooth 3D Visuals & Sounds</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Clean 3D models with crisp numbers and custom color themes are animated smoothly at full frame rate on both desktop and mobile devices.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1b28] space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>4. Automatic Top-Face Detection</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                As soon as the dice settle flat on the tray, the system immediately reads the upward-facing number and calculates your total score.
              </p>
            </div>
          </div>
        </section>

        {/* H2: Common Uses */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Common Uses for a {config.dieType.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tabletop RPGs, board games, classroom probability, and decision making.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.commonUses.map((use, uIdx) => (
              <div
                key={uIdx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1e2a] space-y-2 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{use.title}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{use.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* H2: Frequently Asked Questions */}
        <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Frequently Asked Questions ({config.dieType.toUpperCase()})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clear answers to common questions about {config.name} rolls, math, and fairness.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {(config.faqs || []).map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl bg-slate-50 dark:bg-[#0a0b10] border border-slate-200 dark:border-[#1b1c28] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-[#12131d] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      openFaqIndex === fIdx ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === fIdx && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-[#171822] bg-white dark:bg-[#0c0d14]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* H2: Related Dice */}
        <section className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-white dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-[#0c0d14] border border-indigo-200 dark:border-indigo-500/20 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Related Polyhedral Dice</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore dedicated 3D rollers, probability charts, and formulas for all tabletop dice.
              </p>
            </div>
            <Link
              href="/dice-roller"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Launch Full Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { type: 'd2', label: 'Roll d2 (Coin Flip)', href: '/dice/d2' },
              { type: 'd3', label: 'Roll d3 (3-Sided)', href: '/roll-d3' },
              { type: 'd4', label: 'Roll d4 (Tetrahedron)', href: '/dice/d4' },
              { type: 'd6', label: 'Roll d6 (Six-Sided Cube)', href: '/dice/d6' },
              { type: '3d6', label: 'Roll 3d6 (Bell Curve)', href: '/roll-3d6' },
              { type: '4d6', label: 'Roll 4d6 Drop Lowest', href: '/roll-4d6' },
              { type: '5d6', label: 'Roll 5d6 (Yahtzee Pool)', href: '/roll-5d6' },
              { type: 'd8', label: 'Roll d8 (Octahedron)', href: '/dice/d8' },
              { type: 'd10', label: 'Roll d10 (Decahedron)', href: '/dice/d10' },
              { type: 'd12', label: 'Roll d12 (Dodecahedron)', href: '/dice/d12' },
              { type: '2d12', label: 'Roll 2d12 (Hope & Fear)', href: '/roll-2d12' },
              { type: 'd20', label: 'Roll d20 (Icosahedron)', href: '/dice/d20' },
              { type: 'd100', label: 'Roll d100 (Percentile)', href: '/dice/d100' },
              { type: 'dnd-stat-roller', label: 'D&D 5e Stat Roller', href: '/dnd-stat-roller' },
              { type: 'dice-average-calculator', label: 'Dice Average Calculator', href: '/dice-average-calculator' }
            ]
              .filter((d) => d.type !== config.dieType)
              .slice(0, 7)
              .map((d) => (
                <Link
                  key={d.type}
                  href={d.href}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#13141e] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#222435] transition-all shadow-2xs"
                >
                  {d.label}
                </Link>
              ))}
          </div>
        </section>
      </div>

      {/* 360° Face Inspector Modal */}
      {isInspectorOpen && (
        <DiceInspectorModal
          dice={currentDice}
          sides={config.sides}
          initialDieIndex={inspectedDieIndex}
          theme={theme}
          onClose={() => setIsInspectorOpen(false)}
        />
      )}
    </div>
  );
}
