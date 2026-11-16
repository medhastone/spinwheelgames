'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WheelConfig } from '@/lib/presets';
import { Star, Heart } from 'lucide-react';
import {
  useSavedWheels,
  toggleWheelFavorite
} from '@/lib/storage';

interface CommunityWheelsProps {
  onLoadCommunityWheel: (wheel: WheelConfig) => void;
}

const COMMUNITY_CARDS = [
  {
    id: 'comm-yes-no',
    tag: 'Decision Tool',
    tagColor: 'bg-[#4648d4] text-white',
    rating: '4.9 (42k)',
    title: 'The Ultimate Yes / No / Maybe Wheel',
    description: 'Pre-balanced 50/50 odds or 3-way arbitration for instant quick-fire answers.',
    spins: '4.5M spins conducted',
    btnBg: 'bg-[#4648d4] hover:bg-[#6063ee]',
    imageUrl:
      'https://picsum.photos/seed/spinwheel-decision/800/450',
    category: 'decision',
    config: {
      id: 'comm-yes-no',
      title: 'Ultimate Yes / No / Maybe Wheel',
      category: 'Decision Tool',
      description: 'Quick-fire decision arbitration.',
      palette: ['#4648d4', '#dc2c4f', '#006c49', '#6063ee', '#b90538', '#6cf8bb'],
      items: [
        { id: 'y1', text: '✅ Absolute Yes', weight: 1 },
        { id: 'y2', text: '❌ Definite No', weight: 1 },
        { id: 'y3', text: '🤔 Maybe Later', weight: 1 },
        { id: 'y4', text: '🎯 100% Yes', weight: 1 },
        { id: 'y5', text: '🚫 Hard Pass', weight: 1 },
        { id: 'y6', text: '🎲 Roll Again', weight: 1 }
      ]
    }
  },
  {
    id: 'comm-classroom',
    tag: 'Classroom',
    tagColor: 'bg-[#006c49] text-white',
    rating: '4.95 (18k)',
    title: 'Fair Student Name Caller & Buzzer',
    description: 'Eliminates bias when grading, calling volunteers, or assigning project captains.',
    spins: '2.1M spins conducted',
    btnBg: 'bg-[#006c49] hover:bg-[#00a86b]',
    imageUrl:
      'https://picsum.photos/seed/spinwheel-classroom/800/450',
    category: 'classroom',
    config: {
      id: 'comm-classroom',
      title: 'Fair Student Name Caller',
      category: 'Classroom',
      description: 'Bias-free student selection tool.',
      palette: ['#006c49', '#6063ee', '#dc2c4f', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
      items: [
        { id: 's1', text: 'Emily Rodriguez', weight: 1 },
        { id: 's2', text: 'Lucas Thompson', weight: 1 },
        { id: 's3', text: 'Zoe Martinez', weight: 1 },
        { id: 's4', text: 'David Kim', weight: 1 },
        { id: 's5', text: 'Chloe Patel', weight: 1 },
        { id: 's6', text: 'James Bennett', weight: 1 },
        { id: 's7', text: 'Sophia Washington', weight: 1 },
        { id: 's8', text: 'Nathan Lee', weight: 1 }
      ]
    }
  },
  {
    id: 'comm-party',
    tag: 'Party Game',
    tagColor: 'bg-[#dc2c4f] text-white',
    rating: '4.8 (89k)',
    title: 'Truth or Dare: Extreme Edition',
    description: 'Over 200 fun, safe, high-energy challenges and prompts tailored for gatherings.',
    spins: '890K spins conducted',
    btnBg: 'bg-[#dc2c4f] hover:bg-[#b90538]',
    imageUrl:
      'https://picsum.photos/seed/spinwheel-party/800/450',
    category: 'games',
    config: {
      id: 'comm-party',
      title: 'Truth or Dare: Extreme Edition',
      category: 'Party Game',
      description: 'High-energy party game challenges.',
      palette: ['#dc2c4f', '#6063ee', '#f97316', '#006c49', '#8b5cf6', '#eab308'],
      items: [
        { id: 'td1', text: '🎤 Dare: Sing chorus acapella', weight: 1 },
        { id: 'td2', text: '🤫 Truth: Craziest rumor about you', weight: 1 },
        { id: 'td3', text: '💃 Dare: 30s robot dance battle', weight: 1 },
        { id: 'td4', text: '🎭 Dare: Dramatic celebrity impression', weight: 1 },
        { id: 'td5', text: '📱 Truth: Last text you regret sending', weight: 1 },
        { id: 'td6', text: '🤸 Dare: 15 rapid jumping jacks', weight: 1 }
      ]
    }
  }
];

export default function CommunityWheels({ onLoadCommunityWheel }: CommunityWheelsProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'decision' | 'classroom' | 'games'>('all');

  const savedWheels = useSavedWheels();

  const filteredCards =
    activeFilter === 'all'
      ? COMMUNITY_CARDS
      : COMMUNITY_CARDS.filter((c) => c.category === activeFilter);

  const handleFavoriteClick = (card: typeof COMMUNITY_CARDS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWheelFavorite({
      id: card.config.id,
      title: card.config.title,
      category: card.config.category,
      description: card.config.description,
      items: card.config.items,
      palette: card.config.palette
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 py-12 bg-[#fbf8ff] dark:bg-[#12131a] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[12px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
              Trending Spinners
            </span>
            <h2 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#1a1b22] dark:text-white mt-1">
              Popular Community Wheels
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-[#eeedf7] dark:bg-[#1d1e28] p-1 rounded-xl self-start md:self-auto border border-[#eeedf7] dark:border-[#292a39]">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#4648d4] text-white shadow-sm'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#e8e7f1] dark:hover:bg-[#292a39]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('decision')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeFilter === 'decision'
                  ? 'bg-[#4648d4] text-white shadow-sm'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#e8e7f1] dark:hover:bg-[#292a39]'
              }`}
            >
              Decisions
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('classroom')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeFilter === 'classroom'
                  ? 'bg-[#4648d4] text-white shadow-sm'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#e8e7f1] dark:hover:bg-[#292a39]'
              }`}
            >
              Classroom
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('games')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeFilter === 'games'
                  ? 'bg-[#4648d4] text-white shadow-sm'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#e8e7f1] dark:hover:bg-[#292a39]'
              }`}
            >
              Games
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const isSaved = savedWheels.some(
              (w) => w.id === card.config.id || w.title.trim().toLowerCase() === card.config.title.trim().toLowerCase()
            );

            return (
              <div
                key={card.id}
                className="flex flex-col rounded-2xl bg-white dark:bg-[#181922] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#eeedf7] dark:border-[#222330] relative"
              >
                {/* Card Banner Image */}
                <div className="h-44 w-full relative">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Top floating Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => handleFavoriteClick(card, e)}
                    aria-label={isSaved ? 'Remove from saved favorites' : 'Save to Profile Favorites'}
                    title={isSaved ? 'Saved in Profile' : 'Save to Favorites'}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-black/40 text-white hover:bg-rose-500/80 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${card.tagColor}`}>
                      {card.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {card.rating}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] mt-1.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between bg-[#f4f2fd] dark:bg-[#1d1e28] p-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
                    <span className="text-[12px] font-medium text-[#464554] dark:text-[#c7c4d7]">
                      {card.spins}
                    </span>
                    <button
                      type="button"
                      onClick={() => onLoadCommunityWheel(card.config)}
                      className={`px-3.5 py-1.5 rounded-lg text-white text-[12px] font-bold transition-all shadow-sm cursor-pointer ${card.btnBg}`}
                    >
                      Spin Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
