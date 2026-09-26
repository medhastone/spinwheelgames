'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  Dice5,
  Dices,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  TrendingUp,
  Scale,
  Calculator,
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
  Palette
} from 'lucide-react';
import DiceNavHeader from '@/components/navigation/DiceNavHeader';
import DiceFooter from '@/components/navigation/DiceFooter';
import {
  calculateDiceDistribution,
  SingleDieResult,
  RollResult
} from '@/components/dice/diceMath';
import { DiceTheme, DICE_THEMES } from '@/components/dice/DiceScene3D';
import DiceInspectorModal from '@/components/dice/DiceInspectorModal';

// Dynamically import 3D scene
const DiceScene3D = dynamic(() => import('@/components/dice/DiceScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl bg-slate-100 dark:bg-[#0c0d14] flex flex-col items-center justify-center gap-3 border border-slate-200 dark:border-[#1d1f2b]">
      <Dice5 className="w-10 h-10 text-indigo-500 animate-spin" />
      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Loading 3D Canvas...</span>
    </div>
  )
});

export default function FourD6Page() {
  const [dropLowest, setDropLowest] = useState<boolean>(false);
  const [modifier, setModifier] = useState<number>(0);
  const [theme, setTheme] = useState<DiceTheme>('ruby');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<RollResult | null>(null);
  const [rollHistory, setRollHistory] = useState<RollResult[]>([]);

  // 3D Physical dice objects for 4d6
  const [currentDice, setCurrentDice] = useState<SingleDieResult[]>([
    { id: 'die-0', value: 6, originalValue: 6, isDropped: false },
    { id: 'die-1', value: 5, originalValue: 5, isDropped: false },
    { id: 'die-2', value: 4, originalValue: 4, isDropped: false },
    { id: 'die-3', value: 2, originalValue: 2, isDropped: false }
  ]);

  // Inspector modal
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectedDieIndex, setInspectedDieIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Distribution for 4d6 (sum of four d6 dice)
  const distribution = useMemo(() => {
    return calculateDiceDistribution(4, 6);
  }, []);

  const triggerRoll = useCallback((useDropLowestParam?: boolean) => {
    if (isRolling) return;
    setIsRolling(true);

    const isDropping = useDropLowestParam !== undefined ? useDropLowestParam : dropLowest;
    const rolls: number[] = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);

    let droppedIndex = -1;
    if (isDropping) {
      let minVal = 7;
      rolls.forEach((val, idx) => {
        if (val < minVal) {
          minVal = val;
          droppedIndex = idx;
        }
      });
    }

    const newDice: SingleDieResult[] = rolls.map((val, idx) => ({
      id: `die-${Date.now()}-${idx}`,
      value: val,
      originalValue: val,
      isDropped: idx === droppedIndex
    }));

    setCurrentDice(newDice);

    const keptRolls = newDice.filter((d) => !d.isDropped).map((d) => d.value);
    const sumKept = keptRolls.reduce((a, b) => a + b, 0);
    const total = sumKept + modifier;

    const resultObj: RollResult = {
      dice: newDice,
      activeCount: isDropping ? 3 : 4,
      sides: 6,
      modifier,
      subtotal: sumKept,
      total,
      average: isDropping ? 12.24 : 14.0,
      minPossible: isDropping ? 3 : 4,
      maxPossible: isDropping ? 18 : 24,
      notation: isDropping ? '4d6dl1' : '4d6',
      timestamp: Date.now()
    };

    setLastResult(resultObj);
    setRollHistory((prev) => [resultObj, ...prev.slice(0, 19)]);
  }, [dropLowest, modifier, isRolling]);

  const handlePhysicsComplete = useCallback(() => {
    setIsRolling(false);
  }, []);

  const activeSum = useMemo(() => {
    const kept = currentDice.filter((d) => !d.isDropped);
    const sum = kept.reduce((acc, curr) => acc + curr.value, 0);
    return sum + modifier;
  }, [currentDice, modifier]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Roll 4d6 Online - 3D Four 6-Sided Dice Roller',
        url: 'https://spinwheelgames.org/4d6',
        applicationCategory: 'GameApplication',
        description: 'Free 3D 4D6 dice roller with optional Drop Lowest for D&D ability scores, exact probability tables, and averages.',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does 4d6 mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In dice notation, 4d6 means rolling four six-sided dice and adding their results together. The sum ranges from 4 to 24 with an expected average of 14.0.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the average roll of 4d6?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The expected average of straight 4d6 is 4 × 3.5 = 14.0. If rolling 4d6 and dropping the lowest single die, the expected average is 12.24.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you roll 4d6 drop lowest for D&D stats?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Roll four 6-sided dice, remove the one die showing the lowest value, and add the three remaining dice together. Repeat this 6 times to generate your character attributes.'
            }
          }
        ]
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
            name: '4D6',
            item: 'https://spinwheelgames.org/4d6'
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <DiceNavHeader />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* H1: Primary Keyword & Value Proposition */}
          <header className="space-y-4 border-b border-slate-200 dark:border-[#1c1d29] pb-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Dice Roller', href: '/dice-roller' },
                { label: 'Roll 4d6 (Drop Lowest)' }
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3 flex-wrap">
                  <span>Roll 4 D6 Online - 3D Multi-Dice Roller</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-200 dark:border-indigo-500/30">
                    Four 6-Sided Dice
                  </span>
                </h1>
                <div className="mt-3 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                  <p>
                    Welcome to the SpinWheelGames 3D 4D6 Roller. Whether you are generating classic character attributes in tabletop RPGs, resolving multi-die spell attacks, or exploring probability curves, this virtual four-dice roller delivers authentic 3D tumbling and rolling right in your browser.
                  </p>
                  <p>
                    Track each individual die face, calculate instant totals and averages, toggle the popular D&amp;D "Drop Lowest" rule, and inspect the probability table of all 1,296 possible 4d6 outcomes.
                  </p>
                </div>
              </div>

              {/* Quick Summary Badge */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] flex items-center gap-4 shrink-0 shadow-sm dark:shadow-lg">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Expected Total (4d6)
                  </span>
                  <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                    {dropLowest ? '12.24 (dl1)' : '14.0'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Interactive 3D 4D6 Roller */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 3D Roll Arena (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 to-[#0a0b12] border border-slate-800 p-4 shadow-xl overflow-hidden flex flex-col justify-between text-white">
                {/* Controls overlay */}
                <div className="flex items-center justify-between z-10 gap-2 flex-wrap mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-200 px-3 py-1 rounded-lg bg-[#161722] border border-[#262838]">
                      4D6 {dropLowest && '(Drop Lowest)'} {modifier !== 0 && (modifier > 0 ? `+${modifier}` : modifier)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        soundEnabled
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                          : 'bg-[#181924] text-slate-400 border border-[#262838]'
                      }`}
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInspectedDieIndex(0);
                        setIsInspectorOpen(true);
                      }}
                      className="p-2 rounded-xl bg-[#181924] text-slate-200 hover:text-white hover:bg-indigo-600/40 border border-[#262838] transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-indigo-400" />
                      <span className="hidden sm:inline">360° Inspect</span>
                    </button>
                  </div>
                </div>

                {/* 3D Scene */}
                <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-radial from-[#131524] to-[#080910]">
                  <DiceScene3D
                    dice={currentDice}
                    sides={6}
                    count={4}
                    isRolling={isRolling}
                    theme={theme}
                    soundEnabled={soundEnabled}
                    onPhysicsRollComplete={handlePhysicsComplete}
                  />
                </div>

                {/* Bottom Result & Big Roll Button */}
                <div className="mt-4 pt-4 border-t border-[#1a1b28] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {dropLowest ? 'Sum of 3 Highest Dice' : '4D6 Total Sum'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                        {activeSum}
                      </span>
                      {lastResult && (
                        <span className="text-xs text-slate-400 font-mono">
                          (Die avg: {lastResult.average})
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isRolling}
                    onClick={() => triggerRoll()}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm tracking-wide shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                    <span>{isRolling ? 'Rolling...' : 'Roll 4d6'}</span>
                  </button>
                </div>
              </div>

              {/* Individual Faces Display */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0d0e15] border border-slate-200 dark:border-[#1b1c28] flex items-center gap-2 flex-wrap shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mr-2">Individual 4d6 Faces:</span>
                {currentDice.map((d, idx) => (
                  <button
                    key={d.id || idx}
                    type="button"
                    onClick={() => {
                      setInspectedDieIndex(idx);
                      setIsInspectorOpen(true);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-sm font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      d.isDropped
                        ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400/50 dark:border-rose-900/30 line-through'
                        : d.value === 6
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 shadow-xs'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400 dark:bg-[#181a26] dark:text-white dark:border-[#27293d] dark:hover:border-indigo-500/50'
                    }`}
                  >
                    <span>{d.value}</span>
                    {d.isDropped && <span className="text-[10px] text-rose-500 font-sans ml-1">(Dropped)</span>}
                  </button>
                ))}
              </div>

              {/* Roll History */}
              {rollHistory.length > 0 && (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0a0b10] border border-slate-200 dark:border-[#181926] space-y-2 shadow-xs">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Recent 4d6 Roll History:</span>
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {rollHistory.map((h, hIdx) => (
                      <div
                        key={h.timestamp + hIdx}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#12131d] border border-slate-200 dark:border-[#1e202f] shrink-0 font-mono text-xs flex items-center gap-2"
                      >
                        <span className="text-slate-500 dark:text-slate-400">{h.notation}:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{h.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Rolling Mode Selector */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] space-y-4 shadow-sm dark:shadow-xl">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>4D6 Rolling Modes</span>
                </h3>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDropLowest(false);
                      triggerRoll(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      !dropLowest
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-[#090a0f] border-slate-200 dark:border-[#1b1c28] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-slate-900 dark:text-white">Straight 4d6 (Sum of 4)</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Sum ranges from 4 to 24 (Average 14.0)</span>
                    </div>
                    {!dropLowest && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDropLowest(true);
                      triggerRoll(true);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      dropLowest
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-[#090a0f] border-slate-200 dark:border-[#1b1c28] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-slate-900 dark:text-white">4d6 Drop Lowest (D&amp;D 5e Stat)</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Discards lowest die; sum of 3 highest (Average 12.24)</span>
                    </div>
                    {dropLowest && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                </div>
              </div>

              {/* Modifier & Theme */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1017] border border-slate-200 dark:border-[#202230] space-y-5 shadow-sm dark:shadow-xl">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-500" />
                  <span>Modifiers &amp; Appearance</span>
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Flat Modifier:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {modifier > 0 ? `+${modifier}` : modifier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[-5, -2, -1, 0, 1, 2, 3, 5].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setModifier(m)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          modifier === m
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#141520] text-slate-700 dark:text-slate-400 dark:hover:text-white'
                        }`}
                      >
                        {m > 0 ? `+${m}` : m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1a1c2a]">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Dice Material:</span>
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.entries(DICE_THEMES).slice(0, 4) as [DiceTheme, (typeof DICE_THEMES)[DiceTheme]][]).map(([tId, t]) => (
                      <button
                        key={tId}
                        type="button"
                        onClick={() => setTheme(tId)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          theme === tId
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-[#10111a] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1f2130] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* H2: Roll a 4d6 Online */}
          <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-500" />
              <span>Roll a 4D6 Online: How to Use the Tool</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Rolling 4d6 online on SpinWheelGames provides full visibility into every die:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1c28] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <span>Click "Roll 4d6" or tap Spacebar to roll all four dice across the 3D tray.</span>
              </li>
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1c28] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <span>Toggle "4d6 Drop Lowest" to automatically discard the single lowest roll and calculate D&amp;D ability scores.</span>
              </li>
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1c28] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <span>Review your roll history to compare consecutive rolls and observe average convergence.</span>
              </li>
              <li className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1a1c28] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                <span>Use the 360° inspector to look around each die and check numbers from every angle.</span>
              </li>
            </ul>
          </section>

          {/* H2: What Is 4D6? */}
          <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-4 shadow-sm dark:shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-500" />
              <span>What Is 4D6?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              In standard tabletop dice notation (NdX), <strong>4d6</strong> specifies rolling <strong>four six-sided dice</strong> (N = 4, X = 6). Each die has faces numbered from 1 to 6. Rolling four dice simultaneously produces outcomes spanning totals from a minimum of 4 (1+1+1+1) to a maximum of 24 (6+6+6+6).
            </p>
          </section>

          {/* H2: 4D6 Results and Probability */}
          <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-500" />
                <span>4D6 Results and Probability Distribution</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                At-a-glance summary and outcome chances across all 1,296 combinations of straight 4d6.
              </p>
            </div>

            {/* At a glance table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                    <th className="py-3 px-4 font-bold">Dice Count</th>
                    <th className="py-3 px-4 font-bold">Sides per Die</th>
                    <th className="py-3 px-4 font-bold">Minimum Total</th>
                    <th className="py-3 px-4 font-bold">Maximum Total</th>
                    <th className="py-3 px-4 font-bold">Expected Average</th>
                    <th className="py-3 px-4 font-bold">Most Likely Sum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-[#090a0f] text-slate-800 dark:text-slate-200">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">4</td>
                    <td className="py-3 px-4 font-mono">6</td>
                    <td className="py-3 px-4 font-mono">4</td>
                    <td className="py-3 px-4 font-mono">24</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">14.0</td>
                    <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-300">14 (11.27% chance)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Discrete Probability Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                    <th className="py-3 px-4 font-bold">Sum Result</th>
                    <th className="py-3 px-4 font-bold">Ways / 1,296</th>
                    <th className="py-3 px-4 font-bold">Exact Probability</th>
                    <th className="py-3 px-4 font-bold">Cumulative (≤ X)</th>
                    <th className="py-3 px-4 font-bold">Bell Curve Distribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171822]">
                  {distribution.map((row) => (
                    <tr key={row.value} className="hover:bg-slate-50 dark:hover:bg-[#13141f] transition-colors bg-white dark:bg-transparent">
                      <td className="py-2.5 px-4 font-bold font-mono text-slate-900 dark:text-white">{row.value}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-300">{row.ways}</td>
                      <td className="py-2.5 px-4 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{row.probability}%</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500 dark:text-slate-400">{row.cumulativeProbability}%</td>
                      <td className="py-2.5 px-4 w-1/3">
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#181a24] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(2, row.probability * 4))}%`
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* H2: Average Roll of 4D6 */}
          <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Average Roll of 4D6 (Expected Value)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simple average calculation for four six-sided dice.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Because the average of a single six-sided die is 3.5, rolling 4 dice simply multiplies that average by 4:
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#07080c] border border-slate-200 dark:border-[#1f202d] font-mono text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Expected Value Formula for 4d6:</p>
                <p className="text-amber-700 dark:text-amber-300 font-bold">
                  Expected Total = 4 × 3.5 = 14.0
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  Range: Minimum 4 (1+1+1+1) to Maximum 24 (6+6+6+6).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#0a0b12] border border-slate-200 dark:border-[#1d1f2e] space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  4d6 Drop Lowest Math (Character Stat Rolling):
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  When rolling 4d6 and dropping the lowest single die, the expected average rises from 10.5 (straight 3d6) to <strong>12.24</strong>. The probability of rolling a score of 13 or higher is 56.8%, and the chance of rolling an 18 (triple 6s) is 1.62% (compared to only 0.46% on straight 3d6).
                </p>
              </div>
            </div>
          </section>

          {/* H2: Common Uses for 4D6 */}
          <section className="bg-white dark:bg-[#0f1017] rounded-3xl border border-slate-200 dark:border-[#202230] p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Common Uses for 4D6
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tabletop roleplaying games, wargaming pools, and math education.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1e2a] space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>D&amp;D 5e Ability Score Generation</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  The standard method in D&amp;D 5e: roll 4d6 drop the lowest die six times to determine Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1e2a] space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Spell Damage &amp; Area Attacks</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Mid-tier spells and breath attacks deal 4d6 fire, cold, or lightning damage in tabletop combat.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1e2a] space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Warhammer &amp; Wargame Volleys</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Small squad firing volleys and morale checks roll 4d6 pools to determine armor saves and wound thresholds.
                </p>
              </div>
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
                  Frequently Asked Questions (4D6)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick answers to common questions about 4d6 rolls, averages, and mechanics.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: 'What does 4d6 mean?',
                  answer: 'In dice notation, 4d6 means rolling four six-sided dice and adding their results together. The sum ranges from 4 to 24 with an expected average of 14.0.'
                },
                {
                  question: 'What is the average roll of 4d6?',
                  answer: 'The expected average of straight 4d6 is 4 × 3.5 = 14.0. If rolling 4d6 and dropping the lowest single die, the expected average is 12.24.'
                },
                {
                  question: 'What is the most likely total on 4d6?',
                  answer: 'The single most probable total is 14 (occurring 146 out of 1,296 ways, or 11.27%). Sums from 12 to 16 account for over 50% of all rolls.'
                },
                {
                  question: 'How do you roll 4d6 drop lowest for D&D stats?',
                  answer: 'Roll four 6-sided dice, remove the one die showing the lowest value, and add the three remaining dice together. Repeat this 6 times to generate your character attributes.'
                },
                {
                  question: 'What is the chance of rolling an 18 on 4d6 drop lowest?',
                  answer: 'The probability of rolling an 18 on 4d6 drop lowest (at least three 6s) is 21 out of 1,296 combinations, which is approximately 1.62%.'
                }
              ].map((faq, fIdx) => (
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
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Related Dice &amp; Tools</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore single-die 3D rollers, full stat generation tools, and average calculators.
                </p>
              </div>
              <Link
                href="/"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Launch Full Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { href: '/d6', label: '1D6 Roller' },
                { href: '/dnd-stats', label: 'D&D 5e Stat Roller' },
                { href: '/dice-average', label: 'Dice Average Calc' },
                { href: '/d20', label: 'D20 Roller' },
                { href: '/d8', label: 'D8 Roller' },
                { href: '/d10', label: 'D10 Roller' },
                { href: '/d12', label: 'D12 Roller' },
                { href: '/d4', label: 'D4 Roller' },
                { href: '/d100', label: 'D100 Roller' }
              ].map((linkItem) => (
                <Link
                  key={linkItem.href}
                  href={linkItem.href}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#13141e] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#222435] transition-all shadow-2xs"
                >
                  {linkItem.label}
                </Link>
              ))}
            </div>
          </section>

          {/* About SpinWheelGames Section */}
          <footer className="p-6 rounded-3xl bg-slate-100 dark:bg-[#090a10] border border-slate-200 dark:border-[#1b1c28] text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">About SpinWheelGames.org</h3>
            <p className="leading-relaxed">
              SpinWheelGames.org provides free, interactive 3D virtual dice rollers and tabletop gaming tools. Our dice rollers give players, educators, and game masters clean, fair, and instant results on any phone, tablet, or computer.
            </p>
          </footer>
        </div>

        {/* 360° Face Inspector Modal */}
        {isInspectorOpen && (
          <DiceInspectorModal
            dice={currentDice}
            sides={6}
            initialDieIndex={inspectedDieIndex}
            theme={theme}
            onClose={() => setIsInspectorOpen(false)}
          />
        )}
      </div>

      <DiceFooter />
    </main>
  );
}
