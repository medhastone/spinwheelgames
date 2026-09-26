'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dice5,
  Dices,
  Shield,
  Calculator,
  Layers
} from 'lucide-react';

const DICE_ROUTES = [
  { href: '/d2', label: 'd2 (Coin)', short: 'd2', sides: 2 },
  { href: '/4d6', label: '4d6', short: '4d6', sides: 6 },
  { href: '/d8', label: 'd8', short: 'd8', sides: 8 },
  { href: '/d10', label: 'd10', short: 'd10', sides: 10 },
  { href: '/d12', label: 'd12', short: 'd12', sides: 12 },
  { href: '/d20', label: 'd20', short: 'd20', sides: 20 },
  { href: '/d100', label: 'd100', short: 'd100', sides: 100 }
];

const TOOL_ROUTES = [
  { href: '/dnd-stats', label: 'D&D Stat Roller', icon: Shield, badge: '5e' },
  { href: '/dice-average', label: 'Dice Average Calc', icon: Calculator, badge: 'Math' }
];

export default function DiceNavHeader() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeItem = el.querySelector('[data-active="true"]');
    if (activeItem) {
      (activeItem as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [pathname]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <header className="w-full bg-white/95 dark:bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1f2130] sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand & major tools row */}
        <div className="flex items-center justify-between h-14 border-b border-slate-100 dark:border-[#181a26]">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Dice5 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-wide">
                  ROLL DICE
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium hidden sm:inline">
                  RPG &amp; Tabletop Dice Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Quick tool buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                pathname === '/'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#151722] text-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#1f2130] border border-slate-200 dark:border-[#27293d]'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full 3D Suite</span>
              <span className="sm:hidden">Suite</span>
            </Link>

            {TOOL_ROUTES.map((tool) => {
              const Icon = tool.icon;
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#151722] text-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#1f2130] border border-slate-200 dark:border-[#27293d]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tool.label}</span>
                  {tool.badge && (
                    <span className="text-[9px] px-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800/40 hidden md:inline font-bold">
                      {tool.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dedicated 8 Polyhedral Dice Sub-Navigation */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex items-center gap-1.5 py-2 overflow-x-auto scroll-smooth touch-pan-x overscroll-x-contain no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 pr-2 shrink-0 select-none">
            <Layers className="w-3 h-3 text-indigo-500" />
            <span>Dice:</span>
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {DICE_ROUTES.map((die) => {
              const isActive = pathname === die.href;
              return (
                <Link
                  key={die.href}
                  href={die.href}
                  data-active={isActive}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all shrink-0 flex items-center gap-1 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 border border-indigo-500'
                      : 'bg-slate-100 dark:bg-[#12131c] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1c1e2b] border border-slate-200 dark:border-[#212333]'
                  }`}
                >
                  <span>{die.short}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
