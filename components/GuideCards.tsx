'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function GuideCards() {
  const guides = [
    {
      title: 'How to Use a Random Picker',
      description: 'Step-by-step guide to adding entries, customizing probability weights, and drawing winners.',
      category: 'Tutorial',
      path: '/random-picker'
    },
    {
      title: 'How to Run a Fair Giveaway',
      description: 'Best practices for verifiable prize drawings, removing previous winners, and streaming raffles.',
      category: 'Giveaways',
      path: '/giveaways'
    },
    {
      title: 'How to Create Random Teams',
      description: 'Split classes or sports leagues into balanced random groups without biased picking.',
      category: 'Teams',
      path: '/team-generator'
    },
    {
      title: 'How to Use a Wheel in the Classroom',
      description: 'Cold-calling students, gamifying lesson reviews, and managing classroom jobs effectively.',
      category: 'Education',
      path: '/classroom'
    },
    {
      title: 'How Weighted Wheels Work',
      description: 'Understand slice angles, probability distribution, and custom weight multipliers.',
      category: 'Mathematics',
      path: '/fairness'
    },
    {
      title: 'How to Make a Decision With a Wheel',
      description: 'Overcome choice fatigue and settle group arguments quickly using structured random pickers.',
      category: 'Decisions',
      path: '/decisions'
    },
    {
      title: 'OBS Streamer Mode & Browser Source Guide',
      description: 'Add a transparent wheel or 3D dice overlay (?stream=1) to OBS Studio and Streamlabs with live remote control.',
      category: 'Streaming',
      path: '/stream-wheel'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Helpful Guides
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-1">
            Tips, Tutorials &amp; Decision Guides
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] max-w-md">
          Learn how to get the most out of random pickers for classroom management, team building, and giveaways.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((g, idx) => (
          <Link
            key={idx}
            href={g.path}
            className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-5 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f8f7fd] dark:hover:bg-[#1f202c] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                {g.category}
              </span>
              <h3 className="font-headline font-bold text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                {g.title}
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                {g.description}
              </p>
            </div>

            <div className="text-xs font-semibold text-[#4648d4] dark:text-[#8587ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
