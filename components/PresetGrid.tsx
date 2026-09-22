'use client';

import React from 'react';
import { WHEEL_PRESETS, WheelConfig } from '@/lib/presets';
import {
  ThumbsUp,
  UserCheck,
  Trophy,
  Users,
  Utensils,
  PartyPopper,
  Film,
  GraduationCap,
  Gift,
  Hash,
  Dices,
  Heart,
  type LucideIcon
} from 'lucide-react';
import {
  useSavedWheels,
  toggleWheelFavorite
} from '@/lib/storage';

interface PresetGridProps {
  onSelectPreset: (preset: WheelConfig) => void;
}

const PRESET_ICONS: Record<string, { icon: LucideIcon; tag: string; tagColor: string }> = {
  'decision-maker': { icon: ThumbsUp, tag: 'Popular', tagColor: 'bg-[#6063ee] text-white' },
  'pick-a-name': { icon: UserCheck, tag: 'Classroom', tagColor: 'bg-[#006c49] text-white' },
  'pick-a-winner': { icon: Trophy, tag: 'Raffle', tagColor: 'bg-[#dc2c4f] text-white' },
  'make-teams': { icon: Users, tag: 'Agile', tagColor: 'bg-[#6063ee] text-white' },
  'dinner-decider': { icon: Utensils, tag: 'Daily', tagColor: 'bg-[#006c49] text-white' },
  'party-games': { icon: PartyPopper, tag: 'Social', tagColor: 'bg-[#b90538] text-white' },
  'what-to-watch': { icon: Film, tag: 'Streaming', tagColor: 'bg-[#4648d4] text-white' },
  'classroom-activity': { icon: GraduationCap, tag: 'K-12', tagColor: 'bg-[#006c49] text-white' },
  'run-giveaway': { icon: Gift, tag: 'Social Promo', tagColor: 'bg-[#6063ee] text-white' },
  'random-number': { icon: Hash, tag: 'Math & Dice', tagColor: 'bg-[#313345] text-white' }
};

export default function PresetGrid({ onSelectPreset }: PresetGridProps) {
  const savedWheels = useSavedWheels();

  const handleFavoriteClick = (preset: WheelConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWheelFavorite({
      id: preset.id,
      title: preset.title,
      category: preset.category,
      description: preset.description,
      items: preset.items,
      paletteKey: preset.themeKey,
      palette: preset.palette
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 py-10 sm:py-14 bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-y border-[#eeedf7] dark:border-[#222330]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[12px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
              Zero Setup • One Tap Presets
            </span>
            <h2 className="font-headline text-[26px] sm:text-[32px] font-bold text-[#1a1b22] dark:text-white mt-1">
              What are you trying to choose?
            </h2>
          </div>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] max-w-md">
            Select any verified tool below to immediately swap the workspace wheel with tested configurations and rules.
          </p>
        </div>

        {/* 10 Discovery Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHEEL_PRESETS.map((preset) => {
            const meta = PRESET_ICONS[preset.id] || {
              icon: Dices,
              tag: preset.category,
              tagColor: 'bg-[#4648d4] text-white'
            };
            const IconComponent = meta.icon;
            const isSaved = savedWheels.some(
              (w) => w.id === preset.id || w.title.trim().toLowerCase() === preset.title.trim().toLowerCase()
            );

            return (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="preset-card group p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1d1e28] hover:bg-[#4648d4] dark:hover:bg-[#4648d4] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between border border-[#eeedf7] dark:border-[#292a39] min-h-[160px] relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] dark:bg-[#292a39] flex items-center justify-center text-[#4648d4] dark:text-[#8587ff] group-hover:bg-white group-hover:text-[#4648d4] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleFavoriteClick(preset, e)}
                      aria-label={isSaved ? 'Remove from saved favorites' : 'Save wheel to favorites'}
                      title={isSaved ? 'Saved in Profile Favorites' : 'Save to Favorites'}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 group-hover:bg-white group-hover:text-rose-500'
                          : 'text-[#767586] dark:text-[#a09eaf] hover:text-rose-500 group-hover:text-white group-hover:hover:text-rose-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                    </button>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eeedf7] dark:bg-[#313345] text-[#464554] dark:text-[#c7c4d7] group-hover:bg-white/20 group-hover:text-white transition-colors">
                      {meta.tag}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-[16px] font-bold text-[#1a1b22] dark:text-white group-hover:text-white transition-colors">
                    {preset.title.replace(' Wheel', '')}
                  </h3>
                  <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7] group-hover:text-white/80 mt-1 line-clamp-2 transition-colors">
                    {preset.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
