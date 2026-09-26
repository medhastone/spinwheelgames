'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dice5,
  Dices,
  Shield,
  Calculator,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  RotateCcw
} from 'lucide-react';

export default function HomeDicePromo() {
  const diceTools = [
    {
      id: 'dnd-stats',
      title: 'D&D Stat Roller (4d6dl1)',
      desc: 'Heroic 4d6 Drop Lowest roller with realistic 3D dice, Point Buy, and Standard Array.',
      href: '/dnd-stats',
      badge: 'D&D 5e',
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500/10 via-purple-500/10 to-transparent border-indigo-500/20'
    },
    {
      id: 'dice-average',
      title: 'Dice Average Calculator',
      desc: 'Calculate exact averages, variance, and discrete probability bell curves for any NdX formula.',
      href: '/dice-average',
      badge: 'Dice Math',
      icon: <Calculator className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/10 via-teal-500/10 to-transparent border-emerald-500/20'
    },
    {
      id: 'd20-roller',
      title: '1d20 Advantage Roller',
      desc: 'Roll 1d20 with Advantage, Disadvantage, Natural 20 critical detection, and DC check analytics.',
      href: '/d20',
      badge: '20-Sided',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/10 via-orange-500/10 to-transparent border-amber-500/20'
    },
    {
      id: 'd6-suite',
      title: 'D6 & Fireball Roller',
      desc: 'Roll 1d6, 3d6, 4d6, 8d6 (Fireball), or 10d6 with full mathematical proof of why D6 average is 3.5.',
      href: '/d6',
      badge: '6-Sided',
      icon: <Dice5 className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/10 via-blue-500/10 to-transparent border-cyan-500/20'
    }
  ];

  const polyhedralPills = [
    { name: 'Roll d2 (Coin)', href: '/d2', desc: '50/50 decisions' },
    { name: 'Roll 1d4 (Tetrahedron)', href: '/d4', desc: 'Magic Missile, Heals' },
    { name: 'Roll 3d6 / 4d6 (Cube)', href: '/d6', desc: 'Stats, Fireball' },
    { name: 'Roll a d8 (Octahedron)', href: '/d8', desc: 'Divine Smite, Longswords' },
    { name: 'Roll d10 (Decahedron)', href: '/d10', desc: 'Eldritch Blast' },
    { name: 'Roll 1d12 (Dodecahedron)', href: '/d12', desc: 'Greataxe Damage' },
    { name: 'Roll 1d20 (Advantage)', href: '/d20', desc: 'Attacks & Saves' },
    { name: 'Roll 1d100 (Percentile)', href: '/d100', desc: 'Wild Magic Tables' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0b0c10] via-[#12131a] to-[#0b0c10] text-white border-y border-[#292a39] relative overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Virtual Dice &amp; Tabletop RPG Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Roll 3D Polyhedral Dice Online &amp; Calculate RPG Odds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">
              Realistic 3D virtual dice rollers for all 8 standard tabletop dice types (d2, d4, d6, d8, d10, d12, d20, d100), D&amp;D character stat generators, and dice average calculators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all shrink-0"
            >
              <span>3D Multi-Dice Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Featured Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {diceTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className={`group p-5 rounded-2xl bg-[#181924] border hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden bg-gradient-to-b ${tool.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-gray-300">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-indigo-400 group-hover:text-indigo-300">
                <span>Open Dedicated Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Dedicated 8 Polyhedral Dice Directory Grid */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#14151f] border border-[#292a39] space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Dedicated 8 Polyhedral Dice Pages (with Math & Odds)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">100% Cryptographic Fairness</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {polyhedralPills.map((die, idx) => (
              <Link
                key={idx}
                href={die.href}
                className="p-3 rounded-2xl bg-[#0d0e14] hover:bg-indigo-950/60 border border-[#202230] hover:border-indigo-500/50 transition-all flex flex-col group"
              >
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 font-mono">
                  {die.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">{die.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
