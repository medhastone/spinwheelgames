'use client';

import React from 'react';
import Link from 'next/link';
import { Dice5, CheckCircle2, Layers, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function DiceFooter() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#0c0d14] border-t border-slate-200 dark:border-[#181a24] text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Links & Dice Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Dice5 className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-wide">
                3D DICE ROLLER
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cryptographically fair 3D physics dice roller for Dungeons &amp; Dragons (D&amp;D 5e), Pathfinder, Warhammer, and tabletop RPGs. Powered by 3D physics and Web Crypto API.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cryptographic Uniformity</span>
            </div>
          </div>

          {/* Dedicated Dice Pages */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Dedicated Dice Rollers</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li>
                <Link href="/dice/d2" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll a d2 (Coin)
                </Link>
              </li>
              <li>
                <Link href="/dice/d4" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll 1d4 / d4 Roller
                </Link>
              </li>
              <li>
                <Link href="/dice/d6" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll a D6 (Cube)
                </Link>
              </li>
              <li>
                <Link href="/roll-4d6" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll 4d6 Online
                </Link>
              </li>
              <li>
                <Link href="/dice/d8" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll a d8 / 1d8
                </Link>
              </li>
              <li>
                <Link href="/dice/d10" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll d10 / Decahedron
                </Link>
              </li>
              <li>
                <Link href="/dice/d12" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll 1d12 / Dodecahedron
                </Link>
              </li>
              <li>
                <Link href="/dice/d20" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll 1d20 / Advantage
                </Link>
              </li>
              <li>
                <Link href="/dice/d100" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Roll 1d100 / Percentile
                </Link>
              </li>
            </ul>
          </div>

          {/* D&D Tools & Math */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>D&amp;D 5e &amp; Probability Tools</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/dnd-stat-roller"
                  className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  <span>D&amp;D Stat Roller (4d6 Drop Lowest)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dice-average-calculator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  <span>Dice Average Calculator</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Keyword Searches */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Popular Fast Rolls</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'roll 4d6', href: '/roll-4d6' },
                { label: '1d20', href: '/dice/d20' },
                { label: 'dnd stats', href: '/dnd-stat-roller' },
                { label: 'roll a d8', href: '/dice/d8' },
                { label: 'roll d10', href: '/dice/d10' },
                { label: 'd4 roller', href: '/dice/d4' },
                { label: 'roll 1d100', href: '/dice/d100' },
                { label: 'roll 3d6', href: '/roll-3d6' },
                { label: 'roll a d6', href: '/dice/d6' },
                { label: 'roll 2d12', href: '/roll-2d12' }
              ].map((kw) => (
                <Link
                  key={kw.label}
                  href={kw.href}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-[#11121b] dark:hover:bg-indigo-600 dark:hover:text-white text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e202d] transition-all"
                >
                  {kw.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-slate-200 dark:border-[#151620] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} 3D Dice Roller &amp; Tabletop Suite. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
