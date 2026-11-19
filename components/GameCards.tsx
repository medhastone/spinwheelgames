'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, Sparkles, Trophy, Zap, Dice5, HelpCircle, Palette, Play } from 'lucide-react';

export default function GameCards() {
  const games = [
    {
      title: 'Truth or Dare Wheel',
      cta: 'Play the Truth or Dare Wheel',
      explanation: 'Classic party game spinner with clean family, teen, or wild friend prompts.',
      icon: Sparkles,
      badge: 'Party Classic',
      color: 'from-rose-500/10 via-pink-500/5 to-transparent border-rose-500/20 text-rose-500',
      path: '/truth-or-dare-wheel'
    },
    {
      title: 'Never Have I Ever Wheel',
      cta: 'Spin Never Have I Ever Prompts',
      explanation: 'Play 5-finger party confessions with clean, college dorm, and work-safe editions.',
      icon: HelpCircle,
      badge: 'Group Favorite',
      color: 'from-purple-500/10 via-fuchsia-500/5 to-transparent border-purple-500/20 text-purple-500',
      path: '/never-have-i-ever-wheel'
    },
    {
      title: 'Drawing Ideas Wheel',
      cta: 'Try the Drawing Wheel for Sketch Prompts',
      explanation: 'Random creatures, characters & objects for 30s/60s speed drawing sprints.',
      icon: Palette,
      badge: 'Creative',
      color: 'from-cyan-500/10 via-sky-500/5 to-transparent border-cyan-500/20 text-cyan-500',
      path: '/drawing-wheel'
    },
    {
      title: 'Bingo Spin Wheel',
      cta: 'Launch the 75 & 90-Ball Bingo Wheel',
      explanation: 'Call non-repeating B-I-N-G-O numbers with board tracking and voice callouts.',
      icon: Dice5,
      badge: 'Game Night',
      color: 'from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 text-emerald-500',
      path: '/bingo-wheel'
    },
    {
      title: 'Song & Karaoke Wheel',
      cta: 'Spin the Song & Karaoke Wheel',
      explanation: 'Pick random karaoke genres, decades, and sing-along challenges for parties.',
      icon: Zap,
      badge: 'Music',
      color: 'from-blue-500/10 via-indigo-500/5 to-transparent border-blue-500/20 text-blue-500',
      path: '/song-wheel'
    },
    {
      title: 'Daily Spin Challenges',
      cta: 'Try the Daily Spin Challenge Wheel',
      explanation: 'Complete fun spontaneous daily activity challenges and unlock streaks.',
      icon: Trophy,
      badge: 'Streak',
      color: 'from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/20 text-amber-500',
      path: '/challenges'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
              Interactive Arcade
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Play a Quick Wheel Game
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#555466] dark:text-[#908fa1] max-w-md">
          Turn decisions into delightful mini-games. Play instantly in your browser with zero downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g) => {
          const IconComponent = g.icon;
          return (
            <Link key={g.path} href={g.path} className="block h-full">
              <div className={`group relative rounded-3xl border p-5 bg-white dark:bg-[#181922] bg-gradient-to-br ${g.color} hover:shadow-lg hover:-translate-y-1 transition-transform space-y-4 cursor-pointer flex flex-col justify-between h-full`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#222330] shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 dark:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa] shadow-2xs border border-[#eeedf7] dark:border-[#313345]">
                      {g.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline font-bold text-lg text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed mt-1">
                      {g.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold group-hover:bg-[#3b3dbb] transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{g.cta}</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
