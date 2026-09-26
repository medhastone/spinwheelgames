'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Dice5,
  Dices,
  RotateCcw,
  Sparkles,
  Info,
  HelpCircle,
  Check,
  Copy
} from 'lucide-react';
import { executeDiceRoll, RollResult } from './diceMath';
import { DiceTheme, DICE_THEMES } from './DiceScene3D';

const DiceScene3D = dynamic(() => import('./DiceScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-52 rounded-2xl bg-slate-100 dark:bg-[#12131a] flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-[#222330]">
      <Dice5 className="w-8 h-8 text-[#4648d4] animate-spin" />
      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Loading 3D Canvas...</span>
    </div>
  )
});

interface UnusualPreset {
  sides: number;
  label: string;
  name: string;
  desc: string;
  conversion: string;
}

const UNUSUAL_PRESETS: UnusualPreset[] = [
  { sides: 2, label: 'd2', name: 'Coin Flip', desc: 'Binary 2-sided decision coin', conversion: 'Standard 2-sided coin toss' },
  { sides: 3, label: 'd3', name: '3-Sided Die', desc: 'Roll a d6, divide result by 2 (round up)', conversion: 'Mapped from d6 (1-2=1, 3-4=2, 5-6=3)' },
  { sides: 5, label: 'd5', name: '5-Sided Die', desc: 'Roll a d10, divide result by 2 (round up)', conversion: 'Mapped from d10 (1-2=1, 3-4=2, 5-6=3, 7-8=4, 9-10=5)' },
  { sides: 7, label: 'd7', name: '7-Sided Die', desc: 'Roll a d8, reroll on an 8', conversion: 'Reroll rejection method on d8' },
  { sides: 14, label: 'd14', name: '14-Sided Die', desc: 'Heptagonal bipyramid or d20 reroll', conversion: 'Reroll rejection on d20 or 14-sided roll' },
  { sides: 24, label: 'd24', name: '24-Sided Die', desc: 'Tetrakis hexahedron or deltoidal icositetrahedron', conversion: 'True 24-sided polyhedron' },
  { sides: 30, label: 'd30', name: '30-Sided Die', desc: 'Rhombic triacontahedron for random tables', conversion: 'True 30-sided polyhedron' },
  { sides: 60, label: 'd60', name: '60-Sided Die', desc: 'Deltoidal hexecontahedron for time calculations', conversion: 'Mapped or 60-sided roll' }
];

export default function UnusualDiceComponent() {
  const [selectedSides, setSelectedSides] = useState<number>(6);
  const [customSidesInput, setCustomSidesInput] = useState<string>('6');
  const [diceCount, setDiceCount] = useState<number>(1);
  const [theme] = useState<DiceTheme>('obsidian');
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<RollResult | null>(null);

  const activePreset = UNUSUAL_PRESETS.find((p) => p.sides === selectedSides) || {
    sides: selectedSides,
    label: `d${selectedSides}`,
    name: `${selectedSides}-Sided Custom Die`,
    desc: `Custom ${selectedSides}-sided mathematical randomizer`,
    conversion: `Roll nearest larger die (such as d${Math.pow(2, Math.ceil(Math.log2(selectedSides)))}), reroll outcomes over ${selectedSides}`
  };

  const handleRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    const result = executeDiceRoll({
      count: diceCount,
      sides: selectedSides
    });

    setCurrentResult(result);
    setTimeout(() => setIsRolling(false), 1000);
  }, [diceCount, selectedSides, isRolling]);

  const handleCustomSidesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customSidesInput, 10);
    if (val && val >= 2 && val <= 1000) {
      setSelectedSides(val);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 3D Rolling Canvas Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#222330]">
          <div>
            <div className="flex items-center gap-2">
              <Dices className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Unusual &amp; Custom Sided Dice Roller
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Roll unique dice like d3, d5, d7, d14, d30, or any custom number of sides with 3D animation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRoll}
            disabled={isRolling}
            className="px-6 py-3 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Rolling...' : `Roll ${diceCount}d${selectedSides}`}</span>
          </button>
        </div>

        {/* 3D Scene Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <div className="h-56 sm:h-64 w-full">
            <DiceScene3D
              dice={
                currentResult
                  ? currentResult.dice
                  : Array.from({ length: diceCount }, (_, i) => ({
                      value: Math.ceil(selectedSides / 2),
                      originalValue: Math.ceil(selectedSides / 2),
                      isDropped: false
                    }))
              }
              sides={selectedSides > 20 ? 20 : selectedSides}
              isRolling={isRolling}
              theme={theme}
            />
          </div>

          {/* Outcome Overlay */}
          {currentResult && (
            <div className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-right text-white shadow-lg">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Outcome Total</span>
              <span className="text-2xl font-black font-mono text-indigo-400">
                {currentResult.total}
              </span>
            </div>
          )}
        </div>

        {/* Custom Sides Input Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <form onSubmit={handleCustomSidesSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">d</span>
              <input
                type="number"
                min="2"
                max="1000"
                value={customSidesInput}
                onChange={(e) => setCustomSidesInput(e.target.value)}
                placeholder="Sides (e.g. 17)"
                className="w-full pl-7 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0b0c10] border border-slate-300 dark:border-[#2a2c3d] text-slate-900 dark:text-white font-mono text-xs font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1e202f] dark:hover:bg-[#282a3e] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#2a2c3f] transition-all cursor-pointer shrink-0"
            >
              Set Die Sides
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#0b0c10] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#1e202c]">
            <span>Dice Quantity:</span>
            <div className="flex items-center gap-2 font-mono">
              {[1, 2, 3, 4, 6].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setDiceCount(q)}
                  className={`w-6 h-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    diceCount === q
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-[#181a26] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Non-Standard Dice Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {UNUSUAL_PRESETS.map((preset) => (
          <button
            key={preset.sides}
            type="button"
            onClick={() => {
              setSelectedSides(preset.sides);
              setCustomSidesInput(String(preset.sides));
            }}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer shadow-2xs ${
              selectedSides === preset.sides
                ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-950 dark:text-white'
                : 'bg-white dark:bg-[#12131a] border-slate-200 dark:border-[#1e202c] text-slate-800 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-black font-mono text-indigo-600 dark:text-indigo-400">
                {preset.label}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{preset.sides} Sides</span>
            </div>
            <h3 className="text-xs font-bold mt-1 text-slate-900 dark:text-slate-100">{preset.name}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{preset.desc}</p>
          </button>
        ))}
      </div>

      {/* Math & Conversion Table */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-sm dark:shadow-xl transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Active Die Physical Specifications: {activePreset.name}
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1d1f2b]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1d1f2b]">
                <th className="py-3 px-4 font-bold">Property</th>
                <th className="py-3 px-4 font-bold">Mathematical Value</th>
                <th className="py-3 px-4 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#171822]">
              <tr className="bg-white dark:bg-transparent">
                <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">Faces / Range</td>
                <td className="py-2.5 px-4 font-mono text-indigo-600 dark:text-indigo-400 font-bold">1 to {selectedSides}</td>
                <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">Discrete uniform distribution</td>
              </tr>
              <tr className="bg-white dark:bg-transparent">
                <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">Expected Average</td>
                <td className="py-2.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {((selectedSides + 1) / 2).toFixed(2)}
                </td>
                <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">(1 + {selectedSides}) ÷ 2</td>
              </tr>
              <tr className="bg-white dark:bg-transparent">
                <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">Odds per Face</td>
                <td className="py-2.5 px-4 font-mono text-slate-800 dark:text-slate-200 font-bold">
                  {((1 / selectedSides) * 100).toFixed(2)}%
                </td>
                <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">1 in {selectedSides} exact chance</td>
              </tr>
              <tr className="bg-white dark:bg-transparent">
                <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">Physical Realization</td>
                <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300" colSpan={2}>
                  {activePreset.conversion}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
