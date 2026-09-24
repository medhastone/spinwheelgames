'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame } from 'lucide-react';

export default function PopularWheels() {
  const popularPicks = [
    {
      name: 'Wheel of Names',
      category: 'Names',
      description: 'Random student & raffle drawer with TTS name calling.',
      path: '/wheel-of-names',
      tag: 'Featured'
    },
    {
      name: 'Decision Wheel',
      category: 'Decisions',
      description: 'Multi-option solver to break analysis paralysis.',
      path: '/decision-wheel',
      tag: 'Popular'
    },
    {
      name: 'Yes or No Wheel',
      category: 'Decisions',
      description: 'Fast 50/50 binary decision maker.',
      path: '/yes-or-no-wheel',
      tag: 'Fast'
    },
    {
      name: 'Food Wheel',
      category: 'Food',
      description: 'Settle what to eat tonight—takeout, restaurants & recipes.',
      path: '/food-wheel',
      tag: 'Trending'
    },
    {
      name: 'Random Number Wheel',
      category: 'Numbers',
      description: 'CSPRNG number drawing between 1-100 or custom range.',
      path: '/number-wheel',
      tag: 'Utility'
    },
    {
      name: 'Random Object Generator',
      category: 'Creativity',
      description: 'Everyday item prompts for drawing, charades & games.',
      path: '/random-object-generator',
      tag: 'New'
    },
    {
      name: 'Classroom Wheel',
      category: 'Education',
      description: 'Teacher tool for student calling & team assignments.',
      path: '/classroom-wheel',
      tag: 'Essential'
    },
    {
      name: 'Bingo Spin Wheel',
      category: 'Games',
      description: '75 & 90-ball bingo number generator without repeats.',
      path: '/bingo-wheel',
      tag: 'New'
    },
    {
      name: 'Truth or Dare Wheel',
      category: 'Party',
      description: 'Party game spinner with clean & spicy prompts.',
      path: '/party-wheel',
      tag: 'Party'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Popular Picks
            </h2>
            <p className="text-xs text-[#767586] dark:text-[#908fa1]">
              Curated everyday deciders &amp; random tools chosen by our community.
            </p>
          </div>
        </div>

        <Link
          href="/sitemap-directory"
          className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
        >
          <span>All Tools</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {popularPicks.map((pick, idx) => (
          <Link
            key={idx}
            href={pick.path}
            className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f8f7fd] dark:hover:bg-[#1f202c] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                  {pick.category}
                </span>
                <span className="text-[10px] font-semibold text-[#767586] dark:text-[#908fa1] px-1.5 py-0.5 rounded bg-[#eeedf7]/60 dark:bg-[#2a2c3a]">
                  {pick.tag}
                </span>
              </div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors flex items-center justify-between">
                <span>{pick.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#767586] dark:text-[#908fa1] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed mt-1">
                {pick.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
