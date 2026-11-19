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
      href: '/dnd-stat-roller',
      badge: 'D&D 5e',
      icon: <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      color: 'from-indigo-500/5 dark:from-indigo-500/10 via-purple-500/5 dark:via-purple-500/10 to-transparent border-indigo-200/80 dark:border-indigo-500/20'
    },
    {
      id: 'dice-average',
      title: 'Dice Average Calculator',
      desc: 'Calculate exact averages, variance, and discrete probability bell curves for any NdX formula.',
      href: '/dice-average-calculator',
      badge: 'Dice Math',
      icon: <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'from-emerald-500/5 dark:from-emerald-500/10 via-teal-500/5 dark:via-teal-500/10 to-transparent border-emerald-200/80 dark:border-emerald-500/20'
    },
    {
      id: 'd20-roller',
      title: '1d20 Advantage Roller',
      desc: 'Roll 1d20 with Advantage, Disadvantage, Natural 20 critical detection, and DC check analytics.',
      href: '/dice/d20',
      badge: '20-Sided',
      icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      color: 'from-amber-500/5 dark:from-amber-500/10 via-orange-500/5 dark:via-orange-500/10 to-transparent border-amber-200/80 dark:border-amber-500/20'
    },
    {
      id: 'd6-suite',
      title: 'D6 & Fireball Roller',
      desc: 'Roll 1d6, 3d6, 4d6, 8d6 (Fireball), or 10d6 with full mathematical proof of why D6 average is 3.5.',
      href: '/dice/d6',
      badge: '6-Sided',
      icon: <Dice5 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      color: 'from-cyan-500/5 dark:from-cyan-500/10 via-blue-500/5 dark:via-blue-500/10 to-transparent border-cyan-200/80 dark:border-cyan-500/20'
    }
  ];

  const polyhedralPills = [
    { name: 'Roll d2 (Coin)', href: '/dice/d2', desc: '50/50 decisions' },
    { name: 'Roll 1d4 (Tetrahedron)', href: '/dice/d4', desc: 'Magic Missile, Heals' },
    { name: 'Roll 3d6 / 4d6 (Cube)', href: '/dice/d6', desc: 'Stats, Fireball' },
    { name: 'Roll a d8 (Octahedron)', href: '/dice/d8', desc: 'Divine Smite, Longswords' },
    { name: 'Roll d10 (Decahedron)', href: '/dice/d10', desc: 'Eldritch Blast' },
    { name: 'Roll 1d12 (Dodecahedron)', href: '/dice/d12', desc: 'Greataxe Damage' },
    { name: 'Roll 1d20 (Advantage)', href: '/dice/d20', desc: 'Attacks & Saves' },
    { name: 'Roll 1d100 (Percentile)', href: '/dice/d100', desc: 'Wild Magic Tables' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#f8f7fe] via-[#f1effc] to-[#f8f7fe] dark:from-[#0b0c10] dark:via-[#12131a] dark:to-[#0b0c10] text-[#1a1b22] dark:text-white border-y border-[#e5e3f4] dark:border-[#292a39] relative overflow-hidden transition-colors duration-200">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Virtual Dice &amp; Tabletop RPG Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1a1b22] dark:text-white">
              Roll 3D Polyhedral Dice Online &amp; Calculate RPG Odds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5d5b70] dark:text-gray-400 max-w-2xl leading-relaxed">
              Realistic 3D virtual dice rollers for all 8 standard tabletop dice types (d2, d4, d6, d8, d10, d12, d20, d100), D&amp;D character stat generators, and dice average calculators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dice-roller"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-colors shrink-0"
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
              className={`group p-5 rounded-2xl bg-white dark:bg-[#181924] border border-[#e5e3f4] dark:border-[#292a39] hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 transition-colors duration-200 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b ${tool.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-gray-300 border border-slate-200/60 dark:border-transparent">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1a1b22] dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-1.5">
                  {tool.title}
                </h3>
                <p className="text-xs text-[#5d5b70] dark:text-gray-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eeedf7] dark:border-white/5 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                <span>Open Dedicated Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Dedicated 8 Polyhedral Dice Directory Grid */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-[#14151f] border border-[#e5e3f4] dark:border-[#292a39] shadow-xs space-y-4 backdrop-blur-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-[#1a1b22] dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Dedicated 8 Polyhedral Dice Pages (with Math &amp; Odds)</span>
            </span>
            <span className="text-[11px] text-[#555466] dark:text-slate-400 font-mono font-medium">100% Cryptographic Fairness</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {polyhedralPills.map((die, idx) => (
              <Link
                key={idx}
                href={die.href}
                className="p-3 rounded-2xl bg-[#f7f6fc] dark:bg-[#0d0e14] hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 border border-[#e5e3f4] dark:border-[#202230] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors flex flex-col group shadow-2xs"
              >
                <span className="text-xs font-bold text-[#1a1b22] dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 font-mono transition-colors">
                  {die.name}
                </span>
                <span className="text-[10px] text-[#555466] dark:text-slate-400 mt-0.5">{die.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
