'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Shield,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Dice5,
  SlidersHorizontal,
  Plus,
  Minus,
  HelpCircle,
  Dices
} from 'lucide-react';
import { executeDiceRoll, get4d6DropLowestStats } from './diceMath';
import { DiceTheme, DICE_THEMES } from './DiceScene3D';

const DiceScene3D = dynamic(() => import('./DiceScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 rounded-2xl bg-slate-100 dark:bg-[#12131a] flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-[#222330]">
      <Dice5 className="w-8 h-8 text-[#4648d4] animate-spin" />
      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Loading 3D Canvas...</span>
    </div>
  )
});

export type StatRule = '4d6dl1' | '3d6' | 'standard_array' | 'point_buy';

export interface AbilityScore {
  name: string;
  key: string;
  score: number;
  rolls?: number[];
  dropped?: number;
  droppedVal?: number;
  droppedIndex?: number;
  modifier: number;
}

const ABILITY_NAMES = [
  { key: 'STR', name: 'Strength', desc: 'Physical power and athletic ability' },
  { key: 'DEX', name: 'Dexterity', desc: 'Agility, reflexes, balance, and stealth' },
  { key: 'CON', name: 'Constitution', desc: 'Health, stamina, and vital force' },
  { key: 'INT', name: 'Intelligence', desc: 'Mental acuity, accuracy of recall, and reasoning' },
  { key: 'WIS', name: 'Wisdom', desc: 'Awareness, intuition, and insight' },
  { key: 'CHA', name: 'Charisma', desc: 'Confidence, eloquence, and leadership' }
];

const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
};

export function getDndModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export default function DndStatRollerComponent() {
  const [rule, setRule] = useState<StatRule>('4d6dl1');
  const [theme] = useState<DiceTheme>('obsidian');
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Stats State
  const [stats, setStats] = useState<AbilityScore[]>([
    { key: 'STR', name: 'Strength', score: 15, rolls: [6, 5, 4, 1], dropped: 1, modifier: 2 },
    { key: 'DEX', name: 'Dexterity', score: 14, rolls: [5, 5, 4, 2], dropped: 2, modifier: 2 },
    { key: 'CON', name: 'Constitution', score: 13, rolls: [5, 4, 4, 1], dropped: 1, modifier: 1 },
    { key: 'INT', name: 'Intelligence', score: 12, rolls: [4, 4, 4, 2], dropped: 2, modifier: 1 },
    { key: 'WIS', name: 'Wisdom', score: 10, rolls: [4, 3, 3, 1], dropped: 1, modifier: 0 },
    { key: 'CHA', name: 'Charisma', score: 8, rolls: [3, 3, 2, 1], dropped: 1, modifier: -1 }
  ]);

  // Point Buy state
  const [pointBuyScores, setPointBuyScores] = useState<Record<string, number>>({
    STR: 8,
    DEX: 8,
    CON: 8,
    INT: 8,
    WIS: 8,
    CHA: 8
  });

  const totalPointsUsed = Object.values(pointBuyScores).reduce(
    (sum, score) => sum + (POINT_BUY_COSTS[score] || 0),
    0
  );
  const pointsRemaining = 27 - totalPointsUsed;

  const handlePointBuyChange = (key: string, delta: number) => {
    const current = pointBuyScores[key] || 8;
    const next = current + delta;
    if (next < 8 || next > 15) return;

    const currentCost = POINT_BUY_COSTS[current] || 0;
    const nextCost = POINT_BUY_COSTS[next] || 0;
    const costDiff = nextCost - currentCost;

    if (pointsRemaining - costDiff < 0) return;

    const nextScores = { ...pointBuyScores, [key]: next };
    setPointBuyScores(nextScores);

    // Update stats table
    setStats(
      ABILITY_NAMES.map((ability) => {
        const sc = nextScores[ability.key] || 8;
        return {
          key: ability.key,
          name: ability.name,
          score: sc,
          modifier: getDndModifier(sc)
        };
      })
    );
  };

  // Roll All 6 Stats
  const handleRollAll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    const newStats: AbilityScore[] = ABILITY_NAMES.map((ability) => {
      if (rule === '4d6dl1') {
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        const minVal = Math.min(...rolls);
        const sum = rolls.reduce((a, b) => a + b, 0) - minVal;
        return {
          key: ability.key,
          name: ability.name,
          score: sum,
          rolls,
          dropped: minVal,
          modifier: getDndModifier(sum)
        };
      } else if (rule === '3d6') {
        const rolls = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
        const sum = rolls.reduce((a, b) => a + b, 0);
        return {
          key: ability.key,
          name: ability.name,
          score: sum,
          rolls,
          modifier: getDndModifier(sum)
        };
      } else {
        return {
          key: ability.key,
          name: ability.name,
          score: 10,
          modifier: 0
        };
      }
    });

    setStats(newStats);
    setTimeout(() => setIsRolling(false), 900);
  }, [rule, isRolling]);

  const handleApplyStandardArray = () => {
    const stdScores = [15, 14, 13, 12, 10, 8];
    const stdStats: AbilityScore[] = ABILITY_NAMES.map((ability, idx) => {
      const score = stdScores[idx];
      return {
        key: ability.key,
        name: ability.name,
        score,
        modifier: getDndModifier(score)
      };
    });
    setStats(stdStats);
  };

  const handleCopyStats = () => {
    const text = stats.map((s) => `${s.name} (${s.key}): ${s.score} [${formatModifier(s.modifier)}]`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalScore = stats.reduce((acc, curr) => acc + curr.score, 0);
  const totalModifier = stats.reduce((acc, curr) => acc + curr.modifier, 0);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-4 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-[#222330]">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                D&amp;D 5e Character Ability Score Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Roll 6 core ability scores using official 5e rules: 4d6 Drop Lowest, Standard Array, or Point Buy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyStats}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1e202f] dark:hover:bg-[#282a3e] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2a2c3f] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Stats'}</span>
            </button>
          </div>
        </div>

        {/* Rule Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 dark:bg-[#0b0c10] p-1.5 rounded-2xl border border-slate-200 dark:border-[#1e202c]">
          <button
            type="button"
            onClick={() => {
              setRule('4d6dl1');
              handleRollAll();
            }}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
              rule === '4d6dl1'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-[#151622]'
            }`}
          >
            4d6 Drop Lowest
          </button>

          <button
            type="button"
            onClick={() => {
              setRule('3d6');
            }}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
              rule === '3d6'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-[#151622]'
            }`}
          >
            3d6 Standard
          </button>

          <button
            type="button"
            onClick={() => {
              setRule('standard_array');
              handleApplyStandardArray();
            }}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
              rule === 'standard_array'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-[#151622]'
            }`}
          >
            Standard Array
          </button>

          <button
            type="button"
            onClick={() => {
              setRule('point_buy');
            }}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
              rule === 'point_buy'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-[#151622]'
            }`}
          >
            Point Buy (27 pts)
          </button>
        </div>

        {/* 3D Dice Viewport */}
        {(rule === '4d6dl1' || rule === '3d6') && (
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#222330]">
            <div className="h-56 sm:h-64 w-full bg-slate-900">
              <DiceScene3D
                count={rule === '4d6dl1' ? 4 : 3}
                sides={6}
                dice={(stats[0]?.rolls || (rule === '4d6dl1' ? [6, 5, 4, 1] : [6, 5, 4])).map((val, idx) => ({
                  value: val,
                  originalValue: val,
                  isDropped: rule === '4d6dl1' && idx === stats[0]?.droppedIndex
                }))}
                isRolling={isRolling}
                theme={theme}
              />
            </div>
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
              3D Tray: {rule === '4d6dl1' ? '4d6 Drop Lowest' : '3d6'}
            </div>
          </div>
        )}

        {/* Action Button */}
        {rule !== 'point_buy' && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleRollAll}
              disabled={isRolling}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{rule === 'standard_array' ? 'Reset Standard Array' : 'Roll All 6 Stats'}</span>
            </button>
          </div>
        )}

        {/* Point Buy Budget Bar */}
        {rule === 'point_buy' && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181a24] border border-slate-200 dark:border-[#2a2c3d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Point Buy Budget:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {pointsRemaining} / 27
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">points remaining</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const reset: Record<string, number> = {};
                ABILITY_NAMES.forEach((a) => (reset[a.key] = 8));
                setPointBuyScores(reset);
                setStats(
                  ABILITY_NAMES.map((a) => ({
                    key: a.key,
                    name: a.name,
                    score: 8,
                    modifier: -1
                  }))
                );
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-[#222433] dark:hover:bg-[#2b2d40] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Budget</span>
            </button>
          </div>
        )}
      </div>

      {/* Ability Score Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="p-5 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all shadow-sm dark:shadow-lg flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  {stat.key}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{stat.name}</h3>
              </div>

              {/* Modifier Badge */}
              <div
                className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold font-mono text-sm border ${
                  stat.modifier >= 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                    : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                }`}
              >
                <span className="text-[10px] uppercase font-sans text-slate-500 dark:text-slate-400 leading-none">
                  MOD
                </span>
                <span>{formatModifier(stat.modifier)}</span>
              </div>
            </div>

            {/* Score & Controls */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0b0c10] p-3 rounded-2xl border border-slate-200 dark:border-[#1f202c]">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Score</span>

              {rule === 'point_buy' ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePointBuyChange(stat.key, -1)}
                    disabled={stat.score <= 8}
                    className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-[#1a1c26] text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer border border-slate-300 dark:border-transparent font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="text-xl font-black text-slate-900 dark:text-white font-mono w-8 text-center">
                    {stat.score}
                  </span>

                  <button
                    type="button"
                    onClick={() => handlePointBuyChange(stat.key, 1)}
                    disabled={stat.score >= 15 || pointsRemaining <= 0}
                    className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-[#1a1c26] text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer border border-slate-300 dark:border-transparent font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{stat.score}</span>
              )}
            </div>

            {/* Individual Dice Roll Breakdown */}
            {stat.rolls && stat.rolls.length > 0 && (
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-[#1e202c]">
                <span>Dice Rolls:</span>
                <div className="flex items-center gap-1 font-mono">
                  {stat.rolls.map((r, i) => {
                    const isDropped = r === stat.dropped && i === stat.rolls?.indexOf(stat.dropped);
                    return (
                      <span
                        key={i}
                        className={`px-1.5 py-0.5 rounded ${
                          isDropped
                            ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400/50 line-through'
                            : 'bg-slate-100 text-slate-900 dark:bg-[#181a26] dark:text-white font-bold'
                        }`}
                      >
                        {r}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Complete Ability Score & Dice Rolls Table */}
      <div className="rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] shadow-sm dark:shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#222330] flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>D&amp;D Ability Score &amp; Dice Roll Breakdown Table</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete tabular breakdown of all 6 attributes, individual rolls, dropped low dice, final scores, and 5e modifiers.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Rule: {rule === '4d6dl1' ? '4d6 Drop Lowest' : rule.toUpperCase()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#0b0c10] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c] font-mono uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 font-bold">Ability Score</th>
                <th className="py-3.5 px-4 font-bold text-center">Score</th>
                <th className="py-3.5 px-4 font-bold text-center">Modifier</th>
                {(rule === '4d6dl1' || rule === '3d6') && (
                  <th className="py-3.5 px-4 font-bold">Individual 4d6 Rolls</th>
                )}
                <th className="py-3.5 px-4 sm:px-6 font-bold">Primary Class Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1a1c28]">
              {stats.map((stat) => {
                const info = ABILITY_NAMES.find((a) => a.key === stat.key);
                const firstDroppedIndex = stat.rolls && stat.dropped !== undefined ? stat.rolls.indexOf(stat.dropped) : -1;

                return (
                  <tr
                    key={stat.key}
                    className="hover:bg-slate-50/80 dark:hover:bg-[#161724] transition-colors"
                  >
                    {/* Ability Name */}
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-black flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shrink-0">
                          {stat.key}
                        </span>
                        <div>
                          <span className="block text-sm font-bold text-slate-900 dark:text-white">
                            {stat.name}
                          </span>
                          <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                            {info?.desc}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4 text-center font-mono font-black text-base text-slate-900 dark:text-white">
                      {stat.score}
                    </td>

                    {/* Modifier */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl text-xs font-bold border ${
                          stat.modifier >= 0
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                        }`}
                      >
                        {formatModifier(stat.modifier)}
                      </span>
                    </td>

                    {/* Dice Rolls */}
                    {(rule === '4d6dl1' || rule === '3d6') && (
                      <td className="py-3.5 px-4 font-mono">
                        {stat.rolls && stat.rolls.length > 0 ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {stat.rolls.map((r, i) => {
                              const isDropped = rule === '4d6dl1' && i === firstDroppedIndex;
                              return (
                                <span
                                  key={i}
                                  className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                                    isDropped
                                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/40 line-through'
                                      : 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-[#1a1c2a] dark:text-white dark:border-[#27293d]'
                                  }`}
                                >
                                  {r}
                                  {isDropped && <span className="text-[9px] text-rose-500 ml-1 font-sans no-underline font-semibold">(dropped)</span>}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Fixed value</span>
                        )}
                      </td>
                    )}

                    {/* Class Recommendation */}
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {info?.key === 'STR' && 'Barbarian, Fighter, Paladin'}
                      {info?.key === 'DEX' && 'Rogue, Ranger, Monk, Fighter'}
                      {info?.key === 'CON' && 'All Classes (Hit Points)'}
                      {info?.key === 'INT' && 'Wizard, Artificer'}
                      {info?.key === 'WIS' && 'Cleric, Druid, Ranger, Monk'}
                      {info?.key === 'CHA' && 'Bard, Paladin, Sorcerer, Warlock'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Score Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0e0f17] border border-slate-200 dark:border-[#1e202d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] uppercase font-mono text-slate-500 dark:text-slate-400">Total Score Sum:</span>
            <p className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalScore}</p>
          </div>
          <div>
            <span className="text-[11px] uppercase font-mono text-slate-500 dark:text-slate-400">Net Ability Modifiers:</span>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {formatModifier(totalModifier)}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Rule: <span className="font-bold text-slate-800 dark:text-slate-200">{rule === '4d6dl1' ? '4d6 Drop Lowest' : rule}</span>
        </div>
      </div>
    </div>
  );
}
