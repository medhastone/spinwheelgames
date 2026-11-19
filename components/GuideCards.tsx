'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function GuideCards() {
  const guides = [
    {
      title: 'How to Use a Wheel Spinner for Better Decisions',
      cta: 'Read the Decision Wheel Guide',
      description: 'Beat choice paralysis, use the One-Veto rule for movie nights, and spot your gut preference while the wheel spins.',
      category: 'Decision Science',
      path: '/how-to-use-a-wheel'
    },
    {
      title: 'How Random Wheels Work: CSPRNG & Physics',
      cta: 'Explore How Random Wheels Work',
      description: 'Understand why Web Crypto API (crypto.getRandomValues) beats Math.random() for provably fair spins.',
      category: 'Fairness & Tech',
      path: '/how-random-wheels-work'
    },
    {
      title: 'How to Pick a Random Winner Fairly',
      cta: 'Read the Fair Giveaway Drawing Guide',
      description: 'Step-by-step checklist for auditable social media raffles, screen recordings, and multi-tier elimination.',
      category: 'Giveaways',
      path: '/how-to-pick-a-random-winner'
    },
    {
      title: 'Random vs. Weighted Selection Explained',
      cta: 'Compare Equal vs. Weighted Probabilities',
      description: 'Learn exact slice probability math for multi-ticket raffles, weighted draft lotteries, and chore effort points.',
      category: 'Probability',
      path: '/random-vs-weighted-selection'
    },
    {
      title: 'How to Make a Classroom Wheel (Teacher Guide)',
      cta: 'Read the Classroom Participation Guide',
      description: 'Replace popsicle sticks with equitable cold-calling, FERPA-safe local rosters, and anxiety-free partner lifelines.',
      category: 'Education',
      path: '/how-to-make-a-classroom-wheel'
    },
    {
      title: 'OBS Streamer Mode & Browser Source Guide',
      cta: 'Open the OBS Streamer Wheel Guide',
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
        <p className="text-xs sm:text-sm text-[#555466] dark:text-[#908fa1] max-w-md">
          Learn how to get the most out of random pickers for classroom management, team building, and giveaways.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((g) => (
          <Link
            key={g.path}
            href={g.path}
            className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-5 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f8f7fd] dark:hover:bg-[#1f202c] shadow-xs hover:shadow-md transition-colors flex flex-col justify-between space-y-3"
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
              <span>{g.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
