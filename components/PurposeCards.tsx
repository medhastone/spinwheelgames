'use client';

import React from 'react';
import Link from 'next/link';
import {
  Utensils,
  User,
  Users,
  Film,
  GraduationCap,
  Gift,
  Heart,
  PartyPopper,
  Hash,
  Target,
  ArrowRight
} from 'lucide-react';

export default function PurposeCards() {
  const purposes = [
    {
      title: 'Choose Food',
      description: 'Settle what to eat—pizza, tacos, sushi, burgers & takeout.',
      icon: Utensils,
      color: 'from-orange-500/10 to-amber-500/5 text-orange-600 dark:text-orange-400 border-orange-500/20',
      badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      path: '/food-wheel'
    },
    {
      title: 'Pick a Name',
      description: 'Fair random name drawer for raffles, students & rosters.',
      icon: User,
      color: 'from-indigo-500/10 to-purple-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      path: '/wheel-of-names'
    },
    {
      title: 'Make Teams',
      description: 'Instantly split groups into balanced random teams & drafts.',
      icon: Users,
      color: 'from-emerald-500/10 to-teal-500/5 text-[#006c49] dark:text-emerald-400 border-emerald-500/20',
      badgeColor: 'bg-emerald-500/10 text-[#006c49] dark:text-emerald-400',
      path: '/team-generator'
    },
    {
      title: 'Choose a Movie',
      description: 'Pick what to stream tonight by genre, mood or watchlist.',
      icon: Film,
      color: 'from-rose-500/10 to-red-500/5 text-rose-600 dark:text-rose-400 border-rose-500/20',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      path: '/movie-wheel'
    },
    {
      title: 'Classroom Activity',
      description: 'Engage students with fair cold-calling & lesson games.',
      icon: GraduationCap,
      color: 'from-blue-500/10 to-sky-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      path: '/classroom-wheel'
    },
    {
      title: 'Pick a Winner',
      description: 'Run verifiable giveaways & prize draws with elimination.',
      icon: Gift,
      color: 'from-amber-500/10 to-yellow-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      path: '/giveaway-wheel'
    },
    {
      title: 'Make a Decision',
      description: 'Break analysis paralysis on any everyday crossroad.',
      icon: Heart,
      color: 'from-purple-500/10 to-pink-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      path: '/decision-wheel'
    },
    {
      title: 'Play a Party Game',
      description: 'Truth or Dare, icebreakers & fun group challenges.',
      icon: PartyPopper,
      color: 'from-fuchsia-500/10 to-pink-500/5 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
      badgeColor: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
      path: '/party-wheel'
    },
    {
      title: 'Pick a Number',
      description: 'RNG number drawings between 1 and 100 or custom ranges.',
      icon: Hash,
      color: 'from-cyan-500/10 to-blue-500/5 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      path: '/number-wheel'
    },
    {
      title: 'Random Challenge',
      description: 'Daily spin challenges & interactive goal streaks.',
      icon: Target,
      color: 'from-red-500/10 to-orange-500/5 text-red-600 dark:text-red-400 border-red-500/20',
      badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400',
      path: '/challenges'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[12px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
            Task-First Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-1">
            What are you trying to choose?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#555466] dark:text-[#908fa1] max-w-md">
          Select your goal below to launch the exact purpose-built wheel experience immediately.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {purposes.map((p, idx) => {
          const IconComponent = p.icon;
          const isAnchor = p.path.startsWith('#');
          const CardContent = (
            <div className={`group relative h-full rounded-2xl border p-4 bg-white dark:bg-[#181922] bg-gradient-to-br ${p.color} hover:shadow-md hover:-translate-y-0.5 transition-transform flex flex-col justify-between space-y-3 cursor-pointer`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${p.badgeColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#555466] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed line-clamp-2">
                  {p.description}
                </p>
              </div>
            </div>
          );

          if (isAnchor) {
            return (
              <a key={idx} href={p.path} className="block h-full">
                {CardContent}
              </a>
            );
          }

          return (
            <Link key={idx} href={p.path} className="block h-full">
              {CardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
