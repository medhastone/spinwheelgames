'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_WHEEL_EXPERIENCES, WheelExperience } from '@/lib/wheelLibrary';
import {
  Sparkles,
  Play,
  ArrowRight,
  Search,
  Sliders,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface CategoryWheelExplorerProps {
  categoryKey: string;
  categoryName: string;
  onSelectExperience?: (exp: WheelExperience) => void;
  className?: string;
}

// Map common category keys to wheel library category types
const CATEGORY_MAP: Record<string, string[]> = {
  decisions: ['DECISIONS'],
  decision: ['DECISIONS'],
  names: ['NAMES'],
  name: ['NAMES'],
  classroom: ['CLASSROOM'],
  education: ['CLASSROOM'],
  party: ['PARTY'],
  food: ['FOOD'],
  dining: ['FOOD'],
  entertainment: ['ENTERTAINMENT'],
  movies: ['ENTERTAINMENT'],
  media: ['ENTERTAINMENT'],
  gaming: ['GAMING'],
  games: ['GAMING'],
  sports: ['SPORTS'],
  numbers: ['NUMBERS'],
  probability: ['NUMBERS'],
  workout: ['WORKOUT'],
  fitness: ['WORKOUT'],
  travel: ['TRAVEL'],
  giveaway: ['GIVEAWAY'],
  giveaways: ['GIVEAWAY'],
  creativity: ['CREATIVITY & WRITING'],
  writing: ['CREATIVITY & WRITING'],
  productivity: ['PRODUCTIVITY & HABITS'],
  habits: ['PRODUCTIVITY & HABITS'],
  wellness: ['WELLNESS & MINDFULNESS'],
  mindfulness: ['WELLNESS & MINDFULNESS'],
  'date-night': ['DATE NIGHT & COUPLES'],
  couples: ['DATE NIGHT & COUPLES'],
  icebreakers: ['ICEBREAKERS & TEAM BUILDING'],
  teams: ['ICEBREAKERS & TEAM BUILDING'],
  finance: ['FINANCE & BUDGETING'],
  budgeting: ['FINANCE & BUDGETING']
};

export default function CategoryWheelExplorer({
  categoryKey,
  categoryName,
  onSelectExperience,
  className = ''
}: CategoryWheelExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryExperiences = useMemo(() => {
    const normalizedKey = categoryKey.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const matchedCategories = CATEGORY_MAP[normalizedKey] || [categoryKey.toUpperCase()];

    return ALL_WHEEL_EXPERIENCES.filter((exp) =>
      matchedCategories.some(
        (cat) => exp.category.toUpperCase() === cat.toUpperCase()
      )
    );
  }, [categoryKey]);

  const filteredExperiences = useMemo(() => {
    if (!searchTerm.trim()) return categoryExperiences;
    const q = searchTerm.toLowerCase();
    return categoryExperiences.filter(
      (exp) =>
        exp.name.toLowerCase().includes(q) ||
        exp.purpose.toLowerCase().includes(q) ||
        exp.defaultEntries.some((e) => e.toLowerCase().includes(q))
    );
  }, [categoryExperiences, searchTerm]);

  if (categoryExperiences.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="category-explorer-heading"
      className={`rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-5 sm:p-7 shadow-xs space-y-6 ${className}`}
    >
      {/* Header & Internal Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
              <Layers className="w-4 h-4" />
            </div>
            <h2
              id="category-explorer-heading"
              className="text-xl sm:text-2xl font-headline font-bold text-[#1a1b22] dark:text-white"
            >
              All {categoryName} Wheels &amp; Games ({categoryExperiences.length})
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-1">
            Browse and launch all interactive decision wheels and game templates in this category with 1-click.
          </p>
        </div>

        {/* In-category Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#767586] dark:text-[#908fa1]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Filter ${categoryName} games...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-[#f1effa] placeholder-[#767586] focus:outline-none focus:border-[#4648d4] dark:focus:border-[#8587ff]"
            aria-label={`Search within ${categoryName} games`}
          />
        </div>
      </div>

      {/* Grid of Category Wheel Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExperiences.map((exp) => {
          const dedicatedPath = `/${exp.id}`;
          return (
            <div
              key={exp.id}
              className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] p-4 flex flex-col justify-between hover:border-[#4648d4]/40 dark:hover:border-[#8587ff]/40 shadow-2xs transition-all group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#1a1b22] dark:text-[#f1effa] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors leading-snug">
                    {exp.name} Wheel
                  </h3>
                  <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1d1e28] text-[#4648d4] dark:text-[#8587ff] border border-[#eeedf7] dark:border-[#292a39]">
                    {exp.defaultEntries.length} Slices
                  </span>
                </div>

                <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed line-clamp-2">
                  {exp.purpose}
                </p>

                {/* Sample Entries Preview Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.defaultEntries.slice(0, 4).map((entry, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[10px] text-[#464554] dark:text-[#c7c4d7]"
                    >
                      {entry}
                    </span>
                  ))}
                  {exp.defaultEntries.length > 4 && (
                    <span className="text-[10px] text-[#767586] dark:text-[#908fa1] self-center">
                      +{exp.defaultEntries.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330] flex items-center justify-between gap-2">
                <Link
                  href={dedicatedPath}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#4648d4] dark:text-[#8587ff] hover:underline"
                >
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {onSelectExperience ? (
                  <button
                    type="button"
                    onClick={() => onSelectExperience(exp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4648d4] text-white hover:bg-[#3b3dbb] shadow-2xs transition-all cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Spin This Wheel</span>
                  </button>
                ) : (
                  <Link
                    href={dedicatedPath}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4648d4] text-white hover:bg-[#3b3dbb] shadow-2xs transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Spin Wheel</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
