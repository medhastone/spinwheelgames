'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  PartyPopper,
  Gift,
  Heart,
  Briefcase,
  Tv,
  ArrowRight
} from 'lucide-react';

export default function UseCaseCards() {
  const useCases = [
    {
      title: 'CLASSROOM',
      badge: 'Education',
      heading: 'Student Cold-Calling & Grouping',
      description: 'Pick students fairly, form random groups, assign class jobs, and run interactive lesson reviews.',
      cta: 'Try Classroom Tools',
      path: '/classroom',
      icon: GraduationCap,
      color: 'border-blue-500/20 text-blue-500 bg-blue-500/10'
    },
    {
      title: 'PARTIES',
      badge: 'Social',
      heading: 'Truth or Dare & Icebreakers',
      description: 'Truth or Dare, Would You Rather, dares, and party game prompts for game nights and gatherings.',
      cta: 'Explore Party Games',
      path: '/party',
      icon: PartyPopper,
      color: 'border-fuchsia-500/20 text-fuchsia-500 bg-fuchsia-500/10'
    },
    {
      title: 'GIVEAWAYS',
      badge: 'Promotions',
      heading: 'Fair Winner Drawings',
      description: 'Pick winners fairly from custom participant lists with instant elimination and audio fanfares.',
      cta: 'Run a Giveaway',
      path: '/giveaways',
      icon: Gift,
      color: 'border-amber-500/20 text-amber-500 bg-amber-500/10'
    },
    {
      title: 'FAMILY & FRIENDS',
      badge: 'Everyday',
      heading: 'Meals, Movies & Weekend Plans',
      description: 'Settle "What should we eat?" or "What should we watch?" without endless group chat debates.',
      cta: 'Solve Family Dilemmas',
      path: '/decisions',
      icon: Heart,
      color: 'border-rose-500/20 text-rose-500 bg-rose-500/10'
    },
    {
      title: 'WORK & TEAMS',
      badge: 'Business',
      heading: 'Standup Speakers & Task Order',
      description: 'Assign tasks, order standup speakers, draft teams, and choose break rooms with zero bias.',
      cta: 'Try Team Generator',
      path: '/team-generator',
      icon: Briefcase,
      color: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'STREAMING',
      badge: 'Creators',
      heading: 'Live Stream Engagement',
      description: 'Engage Twitch and YouTube viewers with interactive wheels for subscriber rewards and gamer challenges.',
      cta: 'Try Streamer Wheels',
      path: '/stream-wheel',
      icon: Tv,
      color: 'border-purple-500/20 text-purple-500 bg-purple-500/10'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
          Proven Solutions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
          Made for Real-World Decisions
        </h2>
        <p className="text-xs sm:text-sm text-[#555466] dark:text-[#908fa1] max-w-xl">
          Purpose-built random wheel workflows tailored for educators, creators, event hosts, and busy teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((uc, idx) => {
          const IconComp = uc.icon;
          return (
            <div
              key={idx}
              className="group rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#555466] dark:text-[#908fa1]">
                    {uc.title}
                  </span>
                  <div className={`p-2.5 rounded-2xl ${uc.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  {uc.heading}
                </h3>

                <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  {uc.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <Link
                  href={uc.path}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4648d4] dark:text-[#8587ff] group-hover:translate-x-1 transition-transform"
                >
                  <span>{uc.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
