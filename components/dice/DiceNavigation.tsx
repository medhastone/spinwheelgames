'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dice5,
  Dices,
  Calculator,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const DICE_NAV_ITEMS = [
  { href: '/dice-roller', label: '3D Physics Roller', icon: Dice5, description: 'Interactive 3D customizable physics dice roller' },
  { href: '/dice/d20', label: 'Roll d20', icon: Sparkles, description: '20-sided icosahedron die' },
  { href: '/dice/d100', label: 'Roll d100', icon: Sparkles, description: 'Percentile dice' },
  { href: '/dice/d12', label: 'Roll d12', icon: Dices, description: '12-sided dodecahedron' },
  { href: '/dice/d10', label: 'Roll d10', icon: Dices, description: '10-sided trapezohedron' },
  { href: '/dice/d8', label: 'Roll d8', icon: Dices, description: '8-sided octahedron' },
  { href: '/dice/d6', label: 'Roll d6', icon: Dices, description: '6-sided cubic die' },
  { href: '/dice/d4', label: 'Roll d4', icon: Dices, description: '4-sided tetrahedron die' },
  { href: '/dice/d2', label: 'Roll d2', icon: Dice5, description: '2-sided coin flip' },
  { href: '/roll-d3', label: 'Roll d3', icon: Dices, description: '3-sided prism die' },
  { href: '/roll-3d6', label: 'Roll 3d6', icon: Dices, description: '3d6 bell curve roller' },
  { href: '/roll-4d6', label: 'Roll 4d6', icon: Dices, description: '4d6 with optional Drop Lowest for stats' },
  { href: '/roll-5d6', label: 'Roll 5d6', icon: Dices, description: '5d6 Yahtzee & pool roller' },
  { href: '/roll-2d12', label: 'Roll 2d12', icon: Dices, description: '2d12 Hope & Fear roller' },
  { href: '/dnd-stat-roller', label: 'D&D Stat Roller', icon: Shield, description: 'Roll 6 ability scores with transparent math' },
  { href: '/dice-average-calculator', label: 'Average Calculator', icon: Calculator, description: 'Calculate exact averages & probability curves' },
  { href: '/dice-collection', label: '3D Collection', icon: Sparkles, description: 'Official 3D RPG Gemstone Dice Collection' },
  { href: '/unusual-dice', label: 'Unusual Dice', icon: Sparkles, description: 'Odd-sided dice (d3, d5, d7, d13, d24, d30...)' }
];

const RELATED_DICE_MAP: Record<string, string[]> = {
  '/dice/d2': ['/roll-d3', '/dice/d4', '/dice/d6', '/unusual-dice', '/dice-roller', '/dice/d20', '/dice-collection'],
  '/dice/d4': ['/roll-d3', '/dice/d6', '/dice/d2', '/dice/d8', '/dice-roller', '/unusual-dice', '/dice-average-calculator'],
  '/dice/d6': ['/roll-3d6', '/roll-4d6', '/roll-5d6', '/dice/d8', '/dice/d4', '/dice-roller', '/dice-average-calculator'],
  '/dice/d8': ['/dice/d6', '/dice/d10', '/dice/d12', '/dice/d20', '/dice-roller', '/dice-average-calculator', '/dnd-stat-roller'],
  '/dice/d10': ['/dice/d100', '/dice/d12', '/dice/d8', '/dice/d20', '/dice-roller', '/dice-average-calculator', '/roll-2d12'],
  '/dice/d12': ['/roll-2d12', '/dice/d20', '/dice/d10', '/dice/d8', '/dice-roller', '/dice-average-calculator', '/dice-collection'],
  '/dice/d20': ['/dice/d100', '/dice/d12', '/dice/d8', '/dnd-stat-roller', '/dice-average-calculator', '/roll-2d12', '/dice-roller'],
  '/dice/d100': ['/dice/d10', '/dice/d20', '/dice-roller', '/dice-average-calculator', '/unusual-dice', '/dice-collection', '/roll-2d12'],
  '/roll-d3': ['/dice/d4', '/dice/d2', '/dice/d6', '/unusual-dice', '/roll-3d6', '/dice-average-calculator', '/dice-roller'],
  '/roll-3d6': ['/roll-4d6', '/roll-5d6', '/dice/d6', '/dnd-stat-roller', '/dice-average-calculator', '/roll-d3', '/dice-roller'],
  '/roll-4d6': ['/dnd-stat-roller', '/roll-3d6', '/roll-5d6', '/dice/d6', '/dice-average-calculator', '/dice/d20', '/dice-roller'],
  '/roll-5d6': ['/roll-3d6', '/roll-4d6', '/dice/d6', '/dice-average-calculator', '/dice-collection', '/roll-2d12', '/dice-roller'],
  '/roll-2d12': ['/dice/d12', '/dice/d20', '/dice/d100', '/dice-average-calculator', '/dnd-stat-roller', '/roll-5d6', '/dice-roller'],
  '/dnd-stat-roller': ['/roll-4d6', '/roll-3d6', '/dice-average-calculator', '/dice/d20', '/dice/d6', '/roll-2d12', '/dice-roller'],
  '/dice-average-calculator': ['/dnd-stat-roller', '/roll-4d6', '/roll-3d6', '/roll-2d12', '/dice/d20', '/dice/d6', '/dice-roller'],
  '/unusual-dice': ['/roll-d3', '/dice/d2', '/dice/d4', '/dice/d100', '/dice-collection', '/roll-2d12', '/dice-roller'],
  '/dice-collection': ['/dice-roller', '/dice/d20', '/dice/d100', '/dice/d12', '/dice/d6', '/unusual-dice', '/roll-5d6'],
  '/dice-roller': ['/dice/d20', '/dice/d6', '/roll-4d6', '/dnd-stat-roller', '/dice-average-calculator', '/roll-3d6', '/unusual-dice']
};

export function getRelatedDiceItems(pathname: string) {
  const relatedHrefs = RELATED_DICE_MAP[pathname] || RELATED_DICE_MAP['/dice-roller'];
  const items = relatedHrefs
    .map((href) => DICE_NAV_ITEMS.find((item) => item.href === href))
    .filter((item): item is (typeof DICE_NAV_ITEMS)[number] => Boolean(item));
  return items.slice(0, 7);
}

export default function DiceNavigation({ currentPath }: { currentPath?: string } = {}) {
  const routerPathname = usePathname();
  const pathname = currentPath || routerPathname || '/dice-roller';

  const visibleItems = useMemo(() => getRelatedDiceItems(pathname), [pathname]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const hasMovedRef = useRef(false);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);

    const activeItem = el.querySelector('[data-active="true"]');
    if (activeItem) {
      (activeItem as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, checkScrollability]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(220, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScrollability();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftState - walk;
    checkScrollability();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full bg-[#f4f2fd]/90 dark:bg-[#181922]/90 backdrop-blur-md border-b border-[#eeedf7] dark:border-[#222330] py-2 px-2 sm:px-4 select-none relative group/nav">
      <div className="max-w-7xl mx-auto flex items-center gap-2 relative">
        <div className="flex items-center shrink-0 pl-2 pr-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff] flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
            <Dice5 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
            <span className="whitespace-nowrap font-headline">Related Dice:</span>
          </span>
        </div>

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll tags left"
            className="absolute left-28 sm:left-32 z-10 p-1.5 rounded-xl bg-white/95 dark:bg-[#1f202e]/95 text-[#4648d4] dark:text-[#9fa1ff] border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {canScrollLeft && (
          <div className="pointer-events-none absolute left-24 sm:left-28 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f4f2fd] dark:from-[#181922] to-transparent z-5" />
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onClickCapture={handleClickCapture}
          className={`flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1 px-1 touch-pan-x overscroll-x-contain no-scrollbar flex-1 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab sm:cursor-default'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {visibleItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                draggable={false}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 select-none ${
                  active
                    ? 'bg-[#4648d4] text-white shadow-xs scale-[1.02] ring-2 ring-indigo-400/30'
                    : 'text-[#464554] dark:text-[#c7c4d7] bg-white/60 dark:bg-[#14151e]/60 hover:bg-white dark:hover:bg-[#222330] hover:text-[#4648d4] dark:hover:text-white border border-transparent hover:border-indigo-100 dark:hover:border-[#2b2c3d]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {canScrollRight && (
          <div className="pointer-events-none absolute right-8 sm:right-10 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f4f2fd] dark:from-[#181922] to-transparent z-5" />
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll tags right"
            className="p-1.5 rounded-xl bg-white/95 dark:bg-[#1f202e]/95 text-[#4648d4] dark:text-[#9fa1ff] border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:scale-110 active:scale-95 transition-all shrink-0 cursor-pointer backdrop-blur-xs flex items-center justify-center z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
