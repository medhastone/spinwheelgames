'use client';

import React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Users,
  GraduationCap,
  PartyPopper,
  Utensils,
  Trophy,
  Gamepad2,
  Film,
  Hash,
  Palette,
  Dumbbell,
  Gift,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

export default function CategoryGrid() {
  const savedWheels = useSavedWheels();

  const handleFavoriteCategory = (cat: typeof categories[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWheelFavorite({
      id: `cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${cat.name} Category`,
      category: cat.name,
      description: cat.description,
      items: [
        { id: 'item-1', text: `${cat.name} Choice A`, weight: 1 },
        { id: 'item-2', text: `${cat.name} Choice B`, weight: 1 }
      ]
    });
  };
  const categories = [
    {
      name: 'Decisions',
      count: '14 Wheels',
      description: 'Yes/No, A vs B, priority sorters & dilemma deciders.',
      icon: HelpCircle,
      color: 'text-indigo-500 bg-indigo-500/10',
      path: '/decisions'
    },
    {
      name: 'Names & Rosters',
      count: '16 Wheels',
      description: 'Wheel of Names, student callers & raffle drafters.',
      icon: Users,
      color: 'text-purple-500 bg-purple-500/10',
      path: '/names'
    },
    {
      name: 'Classroom',
      count: '12 Wheels',
      description: 'Cold-calling, student grouping & lesson icebreakers.',
      icon: GraduationCap,
      color: 'text-blue-500 bg-blue-500/10',
      path: '/classroom'
    },
    {
      name: 'Party & Games',
      count: '18 Wheels',
      description: 'Truth or Dare, Would You Rather & drinking games.',
      icon: PartyPopper,
      color: 'text-pink-500 bg-pink-500/10',
      path: '/party'
    },
    {
      name: 'Food & Meals',
      count: '12 Wheels',
      description: 'Dinner, takeout, fast food, cuisines & snack pickers.',
      icon: Utensils,
      color: 'text-orange-500 bg-orange-500/10',
      path: '/food'
    },
    {
      name: 'Sports & Teams',
      count: '10 Wheels',
      description: 'Team generators, draft order & sports challenges.',
      icon: Trophy,
      color: 'text-emerald-500 bg-emerald-500/10',
      path: '/sports'
    },
    {
      name: 'Gaming & Stream',
      count: '15 Wheels',
      description: 'Gamer roles, loadouts & streamer audience participation.',
      icon: Gamepad2,
      color: 'text-cyan-500 bg-cyan-500/10',
      path: '/games'
    },
    {
      name: 'Entertainment',
      count: '11 Wheels',
      description: 'Movie Wheel Spin, TV genres, anime & books.',
      icon: Film,
      color: 'text-rose-500 bg-rose-500/10',
      path: '/entertainment'
    },
    {
      name: 'Numbers & RNG',
      count: '8 Wheels',
      description: 'Random numbers, 1-100 drawings & lotteries.',
      icon: Hash,
      color: 'text-teal-500 bg-teal-500/10',
      path: '/numbers'
    },
    {
      name: 'Drawing & Art',
      count: '6 Wheels',
      description: 'Drawing challenges, color generators & prompt tools.',
      icon: Palette,
      color: 'text-amber-500 bg-amber-500/10',
      path: '/creativity'
    },
    {
      name: 'Workout & Fitness',
      count: '7 Wheels',
      description: 'HIIT moves, exercise randomizers & gym routines.',
      icon: Dumbbell,
      color: 'text-red-500 bg-red-500/10',
      path: '/workout'
    },
    {
      name: 'Giveaways',
      count: '9 Wheels',
      description: 'Fair prize spinners & verifiable promo pickers.',
      icon: Gift,
      color: 'text-yellow-500 bg-yellow-500/10',
      path: '/giveaways'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
            Template Library Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-1">
            Explore 100+ Wheel Games
          </h2>
        </div>

        <Link
          href="/games"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#3b3dbb] transition-colors self-start sm:self-auto"
        >
          <span>Explore All Wheel Games</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <Link
              key={idx}
              href={cat.path}
              className="group p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f8f7fd] dark:hover:bg-[#1f202c] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${cat.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleFavoriteCategory(cat, e)}
                      title={
                        savedWheels.some((w) => w.category === cat.name || w.title.includes(cat.name))
                          ? 'Saved in Profile Favorites'
                          : 'Save to Profile Favorites'
                      }
                      aria-label="Save category to profile favorites"
                      className="p-1.5 rounded-lg text-[#767586] dark:text-[#a09eaf] hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          savedWheels.some((w) => w.category === cat.name || w.title.includes(cat.name))
                            ? 'fill-rose-500 text-rose-500'
                            : ''
                        }`}
                      />
                    </button>
                    <span className="text-[11px] font-bold text-[#767586] dark:text-[#908fa1] px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330]">
                      {cat.count}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline font-bold text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="text-xs font-semibold text-[#4648d4] dark:text-[#8587ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
