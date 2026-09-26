'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Dice5,
  Dices,
  Shield,
  RotateCcw,
  Zap,
  CheckCircle2,
  Share2,
  Copy,
  ExternalLink,
  Layers,
  Award,
  Box,
  Palette
} from 'lucide-react';
import DiceScene3D, { DiceTheme } from './DiceScene3D';
import { rollSingleDie, SingleDieResult } from './diceMath';

export interface DiceCardSpec {
  id: string;
  name: string;
  shortName: string;
  polyhedraType: string;
  sides: number;
  theme: DiceTheme;
  colorName: string;
  hexPrimary: string;
  hexAccent: string;
  faces: number;
  vertices: number;
  edges: number;
  meanValue: number;
  route: string;
  description: string;
  tabletopUse: string;
  materialFinish: string;
}

export const DICE_COLLECTION_SPECS: DiceCardSpec[] = [
  {
    id: 'd2',
    name: 'D2 Decision Coin',
    shortName: 'D2',
    polyhedraType: 'Cylindrical Coin',
    sides: 2,
    theme: 'silvergold',
    colorName: 'Silver & Gold',
    hexPrimary: '#94a3b8',
    hexAccent: '#ffd700',
    faces: 2,
    vertices: 0,
    edges: 2,
    meanValue: 1.5,
    route: '/dice-roller',
    description: 'High-relief dual metal decision coin with mirror polish and engraved metallic gold numerals.',
    tabletopUse: 'Coin flips, binary decisions, 50/50 outcome resolution, initiative ties',
    materialFinish: 'Silver & Gold Dual-Metal'
  },
  {
    id: 'd6-sapphire',
    name: 'D6 Sapphire Blue Crystal',
    shortName: 'D6 Sapphire',
    polyhedraType: 'Regular Hexahedron',
    sides: 6,
    theme: 'sapphire',
    colorName: 'Sapphire Blue',
    hexPrimary: '#1d4ed8',
    hexAccent: '#fef08a',
    faces: 6,
    vertices: 8,
    edges: 12,
    meanValue: 3.5,
    route: '/dice-roller',
    description: 'Chamfered sapphire blue acrylic cube with indented circular pips and radiant refractive gloss.',
    tabletopUse: 'Board games, Yahtzee, probability models, standard 6-sided rolls',
    materialFinish: 'Sapphire Blue Crystal Glass'
  },
  {
    id: 'd6-ruby',
    name: 'D6 Ruby Red Gemstone',
    shortName: 'D6 Ruby',
    polyhedraType: 'Regular Hexahedron',
    sides: 6,
    theme: 'ruby',
    colorName: 'Ruby Red',
    hexPrimary: '#dc2626',
    hexAccent: '#fef08a',
    faces: 6,
    vertices: 8,
    edges: 12,
    meanValue: 3.5,
    route: '/dice-roller',
    description: 'Translucent ruby gemstone hexahedron with indented gold pips and smooth corner bevels.',
    tabletopUse: 'Damage rolls, stat generation (4d6 drop lowest), board games',
    materialFinish: 'Ruby Red Translucent Gemstone'
  },
  {
    id: 'd6-emerald',
    name: 'D6 Emerald Green Gemstone',
    shortName: 'D6 Emerald',
    polyhedraType: 'Regular Hexahedron',
    sides: 6,
    theme: 'emerald',
    colorName: 'Emerald Green',
    hexPrimary: '#047857',
    hexAccent: '#fef08a',
    faces: 6,
    vertices: 8,
    edges: 12,
    meanValue: 3.5,
    route: '/dice-roller',
    description: 'Emerald green crystal hexahedron with gold inlaid pips and mirror polish finish.',
    tabletopUse: 'Tabletop gaming, board games, probability simulations',
    materialFinish: 'Emerald Green Polish'
  }
];

export default function DiceAssetShowcase() {
  const [activeDieId, setActiveDieId] = useState<string>('d6-sapphire');
  const [activeRolls, setActiveRolls] = useState<Record<string, SingleDieResult>>({
    'd2': rollSingleDie(2),
    'd6-sapphire': rollSingleDie(6),
    'd6-ruby': rollSingleDie(6),
    'd6-emerald': rollSingleDie(6)
  });
  const [rollingMap, setRollingMap] = useState<Record<string, boolean>>({});
  const [showCopyNotice, setShowCopyNotice] = useState<boolean>(false);

  const selectedSpec = DICE_COLLECTION_SPECS.find((d) => d.id === activeDieId) || DICE_COLLECTION_SPECS[0];

  const handleRollDie = (id: string, sides: number) => {
    setRollingMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActiveRolls((prev) => ({ ...prev, [id]: rollSingleDie(sides) }));
    }, 400);
  };

  const handleRollAll = () => {
    const newRolling: Record<string, boolean> = {};
    DICE_COLLECTION_SPECS.forEach((d) => {
      newRolling[d.id] = true;
    });
    setRollingMap(newRolling);

    setTimeout(() => {
      const newRolls: Record<string, SingleDieResult> = {};
      DICE_COLLECTION_SPECS.forEach((d) => {
        newRolls[d.id] = rollSingleDie(d.sides);
      });
      setActiveRolls(newRolls);
      setRollingMap({});
    }, 500);
  };

  const handleCopyPaletteSpecs = () => {
    const text = `SpinWheelGames.org Official 3D RPG Dice Color System:
• D2 (Silver & Gold): Primary #94a3b8 | Accent #ffd700
• D4 (Ruby Red): Primary #dc2626 | Accent #fef08a
• D6 (Sapphire Blue): Primary #1d4ed8 | Accent #fef08a
• D8 (Purple Crystal): Primary #6d28d9 | Accent #fef08a
• D10 (Emerald Green): Primary #047857 | Accent #fef08a
• D12 (Cyan Blue): Primary #0284c7 | Accent #fef08a
• D20 (Amber Gold): Primary #d97706 | Accent #ffffff
• D100 (Magenta Crystal): Primary #be185d | Accent #fef08a`;

    navigator.clipboard.writeText(text);
    setShowCopyNotice(true);
    setTimeout(() => setShowCopyNotice(false), 2500);
  };

  return (
    <div className="w-full space-y-10">
      {/* 1. Hero Master Collection Showcase Box */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12131f] via-[#1a1c2e] to-[#0c0d16] border border-[#2b2d42] p-6 sm:p-10 shadow-2xl text-white">
        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Official SpinWheelGames.org Asset Pack</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-purple-200">
              3D RPG Gemstone Dice Collection
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              A complete, world-class 3D polyhedral dice icon suite and WebGL physics system. Built with crystal glass translucency, metallic gold engraved numerals, and realistic studio illumination.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleRollAll}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Roll D6 &amp; D2 Collection</span>
              </button>

              <button
                onClick={handleCopyPaletteSpecs}
                className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Color Palette Specs</span>
              </button>
            </div>

            {showCopyNotice && (
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Color palette specs copied to clipboard!</span>
              </div>
            )}
          </div>

          {/* Right Featured 3D WebGL Arena Box */}
          <div className="lg:col-span-5 bg-[#0e0f18] rounded-2xl p-4 border border-[#222438] shadow-inner space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Box className="w-4 h-4" />
                <span>Focus Die: {selectedSpec.name}</span>
              </span>
              <span className="text-slate-500 uppercase font-mono">{selectedSpec.colorName}</span>
            </div>

            <div className="h-[260px] sm:h-[300px] w-full rounded-xl overflow-hidden border border-slate-800">
              <DiceScene3D
                dice={[activeRolls[selectedSpec.id] || rollSingleDie(selectedSpec.sides)]}
                sides={selectedSpec.sides}
                isRolling={!!rollingMap[selectedSpec.id]}
                theme={selectedSpec.theme}
                onAnimationComplete={() => setRollingMap((prev) => ({ ...prev, [selectedSpec.id]: false }))}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Result: <strong className="text-amber-400 text-sm font-black">{activeRolls[selectedSpec.id]?.value}</strong></span>
              <button
                onClick={() => handleRollDie(selectedSpec.id, selectedSpec.sides)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Roll {selectedSpec.shortName}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid of 8 Gemstone Dice Cards */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-500" />
              <span>Official RPG Polyhedra Collection (8-Piece Set)</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click any die card to preview live in 3D, view geometry specs, or open its dedicated generator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Filter Theme:</span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
              Crystal Gemstones
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DICE_COLLECTION_SPECS.map((spec) => {
            const isSelected = activeDieId === spec.id;
            const currentRoll = activeRolls[spec.id] || rollSingleDie(spec.sides);
            const isRolling = !!rollingMap[spec.id];

            return (
              <div
                key={spec.id}
                onClick={() => setActiveDieId(spec.id)}
                className={`group relative rounded-2xl transition-all duration-300 p-5 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-amber-500/80 ring-2 ring-amber-500/30 shadow-xl'
                    : 'bg-white dark:bg-[#181924] text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wide uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-all">
                    {spec.shortName}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: spec.hexPrimary }}
                    title={spec.colorName}
                  />
                </div>

                {/* 3D Render Tile */}
                <div className="h-[180px] w-full rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800 bg-[#0c0d14] relative mb-3">
                  <DiceScene3D
                    dice={[currentRoll]}
                    sides={spec.sides}
                    isRolling={isRolling}
                    theme={spec.theme}
                    onAnimationComplete={() => setRollingMap((prev) => ({ ...prev, [spec.id]: false }))}
                  />

                  {/* Result Overlay Badge */}
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-mono text-xs font-bold border border-white/10">
                    Roll: {currentRoll.value}
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-base leading-snug group-hover:text-amber-400 transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {spec.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Primary: <code className="font-mono">{spec.hexPrimary}</code></span>
                    <Link
                      href={spec.route}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Open Tool</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Deep Technical Specifications Table */}
      <div className="rounded-2xl bg-white dark:bg-[#181924] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <span>Geometric Polyhedra & Material Specifications</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Technical parameters, math properties, and tabletop application usage guidelines for tabletop game designers.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 uppercase font-mono tracking-wider text-[11px] text-slate-500 dark:text-slate-400">
                <th className="p-3.5 rounded-l-xl">Die</th>
                <th className="p-3.5">Polyhedron Geometry</th>
                <th className="p-3.5">Faces</th>
                <th className="p-3.5">Vertices</th>
                <th className="p-3.5">Edges</th>
                <th className="p-3.5">Expected Mean</th>
                <th className="p-3.5">Color System</th>
                <th className="p-3.5 rounded-r-xl">Primary Tabletop Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {DICE_COLLECTION_SPECS.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.hexPrimary }} />
                    <span>{s.shortName}</span>
                  </td>
                  <td className="p-3.5 font-medium">{s.polyhedraType}</td>
                  <td className="p-3.5 font-mono">{s.faces}</td>
                  <td className="p-3.5 font-mono">{s.vertices}</td>
                  <td className="p-3.5 font-mono">{s.edges}</td>
                  <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400">{s.meanValue}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800">
                      {s.colorName}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400 max-w-xs">{s.tabletopUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
