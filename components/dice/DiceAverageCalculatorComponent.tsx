'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  SlidersHorizontal,
  Table,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Dices,
  RotateCcw,
  Check,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import {
  parseDiceNotation,
  calculateDiceDistribution,
  executeDiceRoll,
  RollResult
} from './diceMath';

interface PresetFormula {
  label: string;
  notation: string;
  category: string;
}

const PRESET_FORMULAS: PresetFormula[] = [
  { label: 'Greatsword (2d6)', notation: '2d6', category: 'D&D Weapons' },
  { label: 'Greataxe (1d12)', notation: '1d12', category: 'D&D Weapons' },
  { label: 'Fireball (8d6)', notation: '8d6', category: 'D&D Spells' },
  { label: 'Cure Wounds (1d8 + 3)', notation: '1d8+3', category: 'D&D Spells' },
  { label: '4d6 Drop Lowest', notation: '4d6dl1', category: 'Ability Scores' },
  { label: 'Advantage (2d20kh1)', notation: '2d20kh1', category: 'D&D Checks' },
  { label: 'Disadvantage (2d20kl1)', notation: '2d20kl1', category: 'D&D Checks' },
  { label: 'Standard 3d6', notation: '3d6', category: 'Ability Scores' }
];

export default function DiceAverageCalculatorComponent() {
  const [notation, setNotation] = useState<string>('3d6');
  const [customModifier, setCustomModifier] = useState<number>(0);
  const [testRollResult, setTestRollResult] = useState<RollResult | null>(null);

  // Parse input notation
  const parsed = useMemo(() => {
    return parseDiceNotation(notation);
  }, [notation]);

  const count = parsed?.count ?? 3;
  const sides = parsed?.sides ?? 6;
  const modifier = (parsed?.modifier ?? 0) + customModifier;

  // Distribution calculation
  const distributionData = useMemo(() => {
    const rawDist = calculateDiceDistribution(count, sides);
    return rawDist.map((item) => ({
      ...item,
      adjustedValue: item.value + modifier
    }));
  }, [count, sides, modifier]);

  // Statistical calculations
  const stats = useMemo(() => {
    const min = count + modifier;
    const max = count * sides + modifier;
    const average = count * ((sides + 1) / 2) + modifier;

    // Standard deviation for independent sum of identical dice
    const singleVariance = (sides * sides - 1) / 12;
    const totalStdDev = Math.sqrt(count * singleVariance);

    const maxProbItem = distributionData.reduce(
      (prev, curr) => (curr.probability > prev.probability ? curr : prev),
      distributionData[0] || { adjustedValue: min, probability: 0 }
    );

    return {
      min,
      max,
      average: Number(average.toFixed(2)),
      stdDev: Number(totalStdDev.toFixed(2)),
      mostLikelyValue: maxProbItem.adjustedValue,
      highestProb: maxProbItem.probability
    };
  }, [count, sides, modifier, distributionData]);

  const handleTestRoll = () => {
    if (!parsed) return;
    const result = executeDiceRoll({
      ...parsed,
      modifier
    });
    setTestRollResult(result);
  };

  const maxProbVal = Math.max(...distributionData.map((d) => d.probability), 0.1);

  return (
    <div className="w-full space-y-6">
      {/* Input & Calculator Bar */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] space-y-6 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#202234]">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Dice Formula &amp; Probability Engine
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Type any standard RPG dice formula (e.g. 3d6, 8d6, 2d12+3) to compute exact statistical averages and discrete probability curves.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestRoll}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Dices className="w-4 h-4" />
              <span>Simulate Single Roll</span>
            </button>
          </div>
        </div>

        {/* Formula Input & Presets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Enter Dice Formula / Notation
            </label>
            <div className="relative">
              <input
                type="text"
                value={notation}
                onChange={(e) => setNotation(e.target.value)}
                placeholder="e.g. 4d6, 2d12+3, 1d20"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#0b0c12] border border-slate-300 dark:border-[#2a2c3d] text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <span className={`absolute right-3 top-3.5 text-xs font-mono font-bold ${
                parsed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {parsed ? 'VALID' : 'INVALID'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2">
              <span>Flat Modifier (+ / -):</span>
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setCustomModifier((prev) => prev - 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1a1c26] text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center font-bold border border-slate-200 dark:border-[#282a3c]"
                >
                  -
                </button>
                <span className="w-8 text-center text-slate-900 dark:text-white font-bold text-sm">
                  {customModifier >= 0 ? `+${customModifier}` : customModifier}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomModifier((prev) => prev + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1a1c26] text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center font-bold border border-slate-200 dark:border-[#282a3c]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Test Roll Result Alert */}
            {testRollResult && (
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-[#181a24] border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-between animate-fadeIn">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Sample Roll Result:</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {testRollResult.total}
                </span>
              </div>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="lg:col-span-2 space-y-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Quick RPG Presets:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_FORMULAS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setNotation(preset.notation);
                    setCustomModifier(0);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    notation === preset.notation
                      ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-900 dark:text-white font-semibold'
                      : 'bg-slate-50 dark:bg-[#0b0c10] border-slate-200 dark:border-[#1e202c] text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold block truncate">{preset.label}</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono block mt-0.5">
                    {preset.notation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Statistical Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] text-center shadow-sm dark:shadow-md transition-colors">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Expected Value (Mean)</span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">
            {stats.average}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] text-center shadow-sm dark:shadow-md transition-colors">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Min Possible</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">{stats.min}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] text-center shadow-sm dark:shadow-md transition-colors">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Max Possible</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">{stats.max}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] text-center shadow-sm dark:shadow-md transition-colors">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standard Deviation</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            ±{stats.stdDev}
          </p>
        </div>
      </div>

      {/* SVG Interactive Probability Distribution Bar Chart */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] space-y-4 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#202234]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Probability Distribution Curve</h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Peak: Outcome <strong className="text-slate-800 dark:text-slate-200">{stats.mostLikelyValue}</strong> ({stats.highestProb}%)
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4 pb-2 flex items-end gap-1 sm:gap-2 border-b border-slate-200 dark:border-[#202234]">
          {distributionData.map((item) => {
            const heightPercent = (item.probability / maxProbVal) * 100;
            const isPeak = item.adjustedValue === stats.mostLikelyValue;

            return (
              <div
                key={item.value}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-black/95 text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-lg border border-slate-700 dark:border-indigo-500/50 pointer-events-none whitespace-nowrap z-20">
                  Value: {item.adjustedValue} | {item.probability}%
                </div>

                {/* Bar */}
                <div
                  style={{ height: `${Math.max(4, heightPercent)}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isPeak
                      ? 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/30'
                      : 'bg-slate-200 dark:bg-[#212333] hover:bg-indigo-400 dark:hover:bg-indigo-600/60'
                  }`}
                />

                {/* Value Label */}
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 mt-2 truncate w-full text-center">
                  {item.adjustedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Distribution Table */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#11121c] border border-slate-200 dark:border-[#222436] space-y-4 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#202234]">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Discrete Outcome Breakdown Table</h3>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Total Possible Combinations: <strong>{Math.pow(sides, count).toLocaleString()}</strong>
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#222436]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#161826] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#222436]">
                <th className="py-3 px-4 font-bold">Outcome Value</th>
                <th className="py-3 px-4 font-bold">Ways to Roll (Combinations)</th>
                <th className="py-3 px-4 font-bold">Exact Probability</th>
                <th className="py-3 px-4 font-bold">Visual Odds Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1b1c28] bg-white dark:bg-transparent">
              {distributionData.map((item) => (
                <tr key={item.value} className="hover:bg-slate-50 dark:hover:bg-[#181924] transition-colors">
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-bold text-sm">{item.adjustedValue}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.ways.toLocaleString()}</td>
                  <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-bold">{item.probability}%</td>
                  <td className="py-3 px-4 w-1/3">
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-[#1e202e] overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                        style={{ width: `${(item.probability / maxProbVal) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
