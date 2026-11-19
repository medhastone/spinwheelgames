'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame } from 'lucide-react';

export default function PopularWheels() {
  const priorityTools = [
    {
      name: 'Movie Wheel',
      anchorText: 'Try the Movie Wheel for family movie night & watchlists',
      category: 'Entertainment',
      description: 'Filter films by genre (Sci-Fi, Comedy, Horror, Family) or paste your Netflix and Letterboxd queue.',
      path: '/movie-wheel',
      tag: 'Top Pick'
    },
    {
      name: 'Wheel of Names',
      anchorText: 'Spin the Wheel of Names for fair student & raffle picks',
      category: 'Names',
      description: 'Paste any roster for unbiased cold-calling, secret santa draws, and text-to-speech winner announcements.',
      path: '/wheel-of-names',
      tag: 'Most Popular'
    },
    {
      name: 'Icebreaker Wheels',
      anchorText: 'Use the Icebreaker Wheel for remote team warmups',
      category: 'Meetings',
      description: 'Break awkward Zoom and Teams silences with 3-minute standup prompts, retros, and onboarding questions.',
      path: '/icebreakers',
      tag: 'Remote Teams'
    },
    {
      name: 'Never Have I Ever Wheel',
      anchorText: 'Play the Never Have I Ever Wheel for party confessions',
      category: 'Party',
      description: 'Spin clean family editions, college dorm icebreakers, and work-safe prompts with no-repeat elimination.',
      path: '/never-have-i-ever-wheel',
      tag: 'Party Hit'
    },
    {
      name: 'Workout Wheel',
      anchorText: 'Spin the Workout Wheel for HIIT & bodyweight circuits',
      category: 'Fitness',
      description: 'Generate spontaneous EMOM workouts, Tabata finishers, and zero-equipment home exercise rounds.',
      path: '/workout-wheel',
      tag: 'Fitness'
    },
    {
      name: 'Chore Picker Wheel',
      anchorText: 'Use the Chore Picker to split household tasks fairly',
      category: 'Home',
      description: 'Assign dishes, laundry, and weekly cleanup among roommates or kids using Effort-Point weighting.',
      path: '/chore-picker',
      tag: 'Household'
    },
    {
      name: 'Team Picker Wheel',
      anchorText: 'Run a live draft lottery on the Team Picker Wheel',
      category: 'Sports & Drafts',
      description: 'Draw fantasy football draft orders, assign EA FC/2K clubs, or pick captains one by one with weighted odds.',
      path: '/team-picker',
      tag: 'Drafts'
    },
    {
      name: 'Random Wheel',
      anchorText: 'Spin the Random Wheel with auditable CSPRNG odds',
      category: 'Core Tool',
      description: 'Customize weighted slices backed by window.crypto.getRandomValues() with verifiable spin logs.',
      path: '/random-wheel',
      tag: 'Auditable'
    },
    {
      name: 'Food Wheel',
      anchorText: 'Spin the Food Wheel to settle dinner & takeout debates',
      category: 'Dining',
      description: 'Decide what to eat tonight across cuisines, dietary filters, restaurants, and quick home recipes.',
      path: '/food-wheel',
      tag: 'Trending'
    },
    {
      name: 'Decision Wheel',
      anchorText: 'Use the Decision Wheel to break everyday indecision',
      category: 'Decisions',
      description: 'Load 3 to 10 competing options and outsource low-stakes everyday dilemmas in five seconds.',
      path: '/decision-wheel',
      tag: 'Everyday'
    },
    {
      name: 'Yes or No Wheel',
      anchorText: 'Spin the Yes or No Wheel for instant 50/50 choices',
      category: 'Binary',
      description: 'Fast cryptographic coin-flip alternative with optional Maybe slice and Best-of-3 mode.',
      path: '/yes-or-no-wheel',
      tag: 'Fast'
    },
    {
      name: 'Classroom Wheel',
      anchorText: 'Launch the Classroom Wheel for equitable cold-calling',
      category: 'Education',
      description: '7 teacher-built modes for student selection, classroom jobs, group maker, and review games.',
      path: '/classroom-wheel',
      tag: 'Teachers'
    },
    {
      name: 'Truth or Dare Wheel',
      anchorText: 'Play the Truth or Dare Wheel for game night challenges',
      category: 'Party',
      description: 'Two-stage party wheel with family-friendly, teen, and adult truth questions and spontaneous dares.',
      path: '/truth-or-dare-wheel',
      tag: 'Classic'
    },
    {
      name: 'Giveaway Wheel',
      anchorText: 'Draw verified winners on the Giveaway & Raffle Wheel',
      category: 'Contests',
      description: 'Screen-shareable prize draws for Twitch, YouTube, and charity raffles with multi-ticket weighting.',
      path: '/giveaway-wheel',
      tag: 'Raffles'
    },
    {
      name: 'Number Wheel',
      anchorText: 'Spin the Random Number Wheel for 1–100 & custom ranges',
      category: 'Numbers',
      description: 'Pick non-repeating integers, bingo calls, raffle ticket stubs, or dice ranges from 1 to 100+.',
      path: '/number-wheel',
      tag: 'Utility'
    }
  ];

  return (
    <section
      id="priority-wheel-tools"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Featured Spin Wheel Tools
            </h2>
            <p className="text-xs sm:text-sm text-[#555466] dark:text-[#908fa1]">
              Jump directly into our 15 most-used random pickers, party games, and everyday decision wheels.
            </p>
          </div>
        </div>

        <Link
          href="/sitemap"
          className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Browse Full Directory of Wheels</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {priorityTools.map((pick) => (
          <Link
            prefetch={false}
            key={pick.path}
            href={pick.path}
            className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 sm:p-5 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f8f7fd] dark:hover:bg-[#1f202c] shadow-xs hover:shadow-md transition-colors flex flex-col justify-between space-y-2.5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                  {pick.category}
                </span>
                <span className="text-[10px] font-semibold text-[#555466] dark:text-[#908fa1] px-1.5 py-0.5 rounded bg-[#eeedf7]/60 dark:bg-[#2a2c3a]">
                  {pick.tag}
                </span>
              </div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors flex items-start justify-between gap-2 leading-snug">
                <span>{pick.anchorText}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 text-[#555466] dark:text-[#908fa1] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>
              <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed mt-1.5">
                {pick.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
