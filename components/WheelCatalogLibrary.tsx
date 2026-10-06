'use client';
import { SITE_COUNTS } from "@/lib/siteConfig";

import React, { useState, useMemo } from 'react';
import {
  ALL_WHEEL_EXPERIENCES,
  WheelExperience,
  experienceToWheelConfig,
  CATEGORY_METADATA
} from '@/lib/wheelLibrary';
import { WheelConfig } from '@/lib/presets';
import {
  useSavedWheels,
  toggleWheelFavorite
} from '@/lib/storage';
import {
  Search,
  Sparkles,
  Play,
  Share2,
  Sliders,
  CheckCircle,
  HelpCircle,
  Wrench,
  Gauge,
  Flame,
  Filter,
  Layers,
  ThumbsUp,
  UserCheck,
  GraduationCap,
  PartyPopper,
  Utensils,
  Film,
  Gamepad2,
  Trophy,
  Hash,
  Dumbbell,
  Compass,
  Gift,
  PenTool,
  Heart,
  Users,
  PiggyBank,
  Check,
  Copy,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface WheelCatalogLibraryProps {
  onSelectWheel: (wheel: WheelConfig) => void;
}

export default function WheelCatalogLibrary({ onSelectWheel }: WheelCatalogLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<WheelExperience | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedWheels = useSavedWheels();

  const handleFavoriteClick = (exp: WheelExperience, e: React.MouseEvent) => {
    e.stopPropagation();
    const config = experienceToWheelConfig(exp);
    toggleWheelFavorite({
      id: config.id,
      title: config.title,
      category: config.category,
      description: config.description,
      items: config.items,
      palette: config.palette
    });
  };

  // Category Icon mapper
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'DECISIONS': return ThumbsUp;
      case 'NAMES': return UserCheck;
      case 'CLASSROOM': return GraduationCap;
      case 'PARTY': return PartyPopper;
      case 'FOOD': return Utensils;
      case 'ENTERTAINMENT': return Film;
      case 'GAMING': return Gamepad2;
      case 'SPORTS': return Trophy;
      case 'NUMBERS': return Hash;
      case 'WORKOUT': return Dumbbell;
      case 'TRAVEL': return Compass;
      case 'GIVEAWAY': return Gift;
      case 'CREATIVITY & WRITING': return PenTool;
      case 'PRODUCTIVITY & HABITS': return CheckCircle;
      case 'WELLNESS & MINDFULNESS': return Heart;
      case 'DATE NIGHT & COUPLES': return Sparkles;
      case 'ICEBREAKERS & TEAM BUILDING': return Users;
      case 'FINANCE & BUDGETING': return PiggyBank;
      default: return Layers;
    }
  };

  // Filtered wheel experiences
  const filteredExperiences = useMemo(() => {
    return ALL_WHEEL_EXPERIENCES.filter((exp) => {
      const matchesCategory = selectedCategory === 'ALL' || exp.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        exp.name.toLowerCase().includes(q) ||
        exp.purpose.toLowerCase().includes(q) ||
        exp.targetAudience.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        exp.uniqueValueProposition.toLowerCase().includes(q) ||
        exp.defaultEntries.some((entry) => entry.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleLaunchWheel = (exp: WheelExperience) => {
    const config = experienceToWheelConfig(exp);
    onSelectWheel(config);
    // Smooth scroll to workspace
    document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyShareLink = (exp: WheelExperience, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `🎡 Check out the "${exp.name} Wheel" on SpinWheelGames.org!\n🎯 ${exp.purpose}\n✨ ${exp.uniqueValueProposition}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(exp.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="wheel-catalogs" className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#fbf8ff] dark:bg-[#12131a] border-t border-[#eeedf7] dark:border-[#222330] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e1e0ff] dark:bg-[#292a39] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Complete 106+ Wheel Experience Library</span>
            </div>
            <h2 className="font-headline text-[28px] sm:text-[38px] font-extrabold text-[#1a1b22] dark:text-white tracking-tight">
              {SITE_COUNTS.wheelExperiences} Purpose-Built Wheel Games & Pickers
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#464554] dark:text-[#c7c4d7] max-w-2xl mt-2 leading-relaxed">
              Every wheel in our taxonomy offers an authentic real-world purpose, unique entry data, game modes, instructions, and verifiable cryptographic fairness. Zero duplicate keyword stuffing.
            </p>
          </div>

          {/* Quick Search & Count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <div className="relative w-full sm:w-auto sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#767586] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 106+ wheels..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-[14px] text-[#1a1b22] dark:text-white placeholder-[#767586] focus:outline-none focus:ring-2 focus:ring-[#4648d4] dark:focus:ring-[#8587ff] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#767586] hover:text-[#1a1b22] dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-[13px] font-semibold text-[#464554] dark:text-[#c7c4d7] text-center shadow-xs">
              <span className="text-[#4648d4] dark:text-[#8587ff] font-bold">{filteredExperiences.length}</span> / {ALL_WHEEL_EXPERIENCES.length} Wheels
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
          {Object.entries(CATEGORY_METADATA).map(([catKey, catMeta]) => {
            const isSelected = selectedCategory === catKey;
            const IconComponent = getCategoryIcon(catKey);

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#4648d4] text-white shadow-sm ring-2 ring-[#4648d4]/30'
                    : 'bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{catMeta.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eeedf7] dark:bg-[#292a39] text-[#767586] dark:text-[#a09eaf]'
                  }`}
                >
                  {catMeta.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Meta Summary */}
        {selectedCategory !== 'ALL' && CATEGORY_METADATA[selectedCategory] && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-[12px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Category Taxonomy • {CATEGORY_METADATA[selectedCategory].label}
              </span>
              <p className="text-[14px] text-[#1a1b22] dark:text-[#f1effa] font-medium mt-0.5">
                {CATEGORY_METADATA[selectedCategory].description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="text-[12px] text-[#4648d4] dark:text-[#8587ff] hover:underline font-semibold self-start sm:self-auto cursor-pointer"
            >
              View all 18 categories
            </button>
          </div>
        )}

        {/* Grid of Wheel Experiences */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#181922] rounded-3xl border border-[#eeedf7] dark:border-[#292a39]">
            <Filter className="w-10 h-10 text-[#767586] mx-auto mb-3 opacity-60" />
            <h3 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white">
              No matching wheels found
            </h3>
            <p className="text-[14px] text-[#767586] mt-1 max-w-md mx-auto">
              We couldn&apos;t find any wheel matching &ldquo;{searchQuery}&rdquo;. Try another term or clear your category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold cursor-pointer hover:bg-[#6063ee]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperiences.map((exp) => {
              const IconComponent = getCategoryIcon(exp.category);

              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className="group relative p-5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Bar: Icon + Category Badge + Share button */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-[#f4f2fd] dark:bg-[#222330] flex items-center justify-center text-[#4648d4] dark:text-[#8587ff] group-hover:bg-[#4648d4] group-hover:text-white transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#464554] dark:text-[#c7c4d7]">
                          {exp.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {exp.difficulty && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            exp.difficulty === 'Expert' || exp.difficulty === 'Challenging'
                              ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                              : exp.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}>
                            {exp.difficulty}
                          </span>
                        )}

                        {/* Heart Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => handleFavoriteClick(exp, e)}
                          title={
                            savedWheels.some(
                              (w) =>
                                w.id === exp.id ||
                                w.title.trim().toLowerCase() === exp.name.trim().toLowerCase()
                            )
                              ? 'Saved in Profile Favorites'
                              : 'Save to Profile Favorites'
                          }
                          aria-label="Save wheel to favorites"
                          className={`p-1.5 rounded-lg transition-colors ${
                            savedWheels.some(
                              (w) =>
                                w.id === exp.id ||
                                w.title.trim().toLowerCase() === exp.name.trim().toLowerCase()
                            )
                              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                              : 'text-[#767586] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              savedWheels.some(
                                (w) =>
                                  w.id === exp.id ||
                                  w.title.trim().toLowerCase() === exp.name.trim().toLowerCase()
                              )
                                ? 'fill-rose-500'
                                : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyShareLink(exp, e)}
                          title="Copy shareable details"
                          className="p-1.5 rounded-lg text-[#767586] hover:text-[#4648d4] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors"
                        >
                          {copiedId === exp.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Wheel Title */}
                    <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors leading-snug">
                      {exp.name}
                    </h3>

                    {/* Purpose Statement */}
                    <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] mt-1.5 line-clamp-2 leading-relaxed">
                      {exp.purpose}
                    </p>

                    {/* Default Entries Preview Chips */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {exp.defaultEntries.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#a09eaf] truncate max-w-[170px]"
                        >
                          {item}
                        </span>
                      ))}
                      {exp.defaultEntries.length > 3 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md text-[#767586] font-semibold">
                          +{exp.defaultEntries.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 pt-3 border-t border-[#eeedf7] dark:border-[#222330] flex items-center justify-between gap-2">
                    <span className="text-[12px] text-[#767586] font-medium flex items-center gap-1">
                      <span>{exp.targetAudience.split(',')[0]}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExperience(exp);
                        }}
                        className="text-[12px] text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] font-semibold px-2 py-1 rounded-lg hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchWheel(exp);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[12px] font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Spin</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Modal for Selected Experience */}
        {selectedExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-2xl bg-white dark:bg-[#181922] rounded-3xl shadow-2xl border border-[#eeedf7] dark:border-[#313345] overflow-hidden max-h-[90vh] flex flex-col animate-bounceIn">
              {/* Modal Header */}
              <div className="p-6 border-b border-[#eeedf7] dark:border-[#222330] flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#e1e0ff] dark:bg-[#292a39] text-[#4648d4] dark:text-[#8587ff]">
                      {selectedExperience.category}
                    </span>
                    {selectedExperience.difficulty && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {selectedExperience.difficulty}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-[22px] sm:text-[26px] font-extrabold text-[#1a1b22] dark:text-white">
                    {selectedExperience.name}
                  </h3>
                  <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] mt-1 leading-relaxed">
                    {selectedExperience.purpose}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExperience(null)}
                  className="p-2 rounded-xl text-[#767586] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body Scrollable */}
              <div className="p-6 overflow-y-auto space-y-5 text-[14px]">
                {/* Unique Value Proposition */}
                <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39]">
                  <span className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider block mb-1">
                    Unique Value Proposition
                  </span>
                  <p className="text-[#1a1b22] dark:text-[#f1effa] font-semibold leading-relaxed">
                    {selectedExperience.uniqueValueProposition}
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-[12px] font-bold text-[#767586] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#4648d4]" />
                    <span>How to Use</span>
                  </h4>
                  <p className="text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                    {selectedExperience.instructions}
                  </p>
                </div>

                {/* Target Audience */}
                <div>
                  <h4 className="text-[12px] font-bold text-[#767586] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#4648d4]" />
                    <span>Target Audience</span>
                  </h4>
                  <p className="text-[#464554] dark:text-[#c7c4d7]">
                    {selectedExperience.targetAudience}
                  </p>
                </div>

                {/* Default Entries Preview */}
                <div>
                  <h4 className="text-[12px] font-bold text-[#767586] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Default Entries ({selectedExperience.defaultEntries.length} Items)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-[#fbf8ff] dark:bg-[#14151e] rounded-xl border border-[#eeedf7] dark:border-[#222330]">
                    {selectedExperience.defaultEntries.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[12px] font-medium text-[#1a1b22] dark:text-white flex items-center gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#f4f2fd] dark:bg-[#292a39] text-[#4648d4] dark:text-[#8587ff] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modes & Tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330]">
                    <span className="text-[11px] font-bold text-[#767586] uppercase tracking-wider block mb-1.5">
                      Optional Modes
                    </span>
                    <ul className="space-y-1 text-[12px] text-[#464554] dark:text-[#c7c4d7]">
                      {selectedExperience.optionalModes.map((mode, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]" />
                          <span>{mode}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330]">
                    <span className="text-[11px] font-bold text-[#767586] uppercase tracking-wider block mb-1.5">
                      Related Companion Tools
                    </span>
                    <ul className="space-y-1 text-[12px] text-[#464554] dark:text-[#c7c4d7]">
                      {selectedExperience.relatedTools.map((tool, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Wrench className="w-3 h-3 text-[#006c49]" />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shareable Result Concept */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 text-[13px] text-amber-900 dark:text-amber-200">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-0.5">
                    Shareable Social Result Badge
                  </span>
                  {selectedExperience.shareableResultConcept}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-6 border-t border-[#eeedf7] dark:border-[#222330] bg-[#fbf8ff] dark:bg-[#15161f] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedExperience(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#1d1e28] text-[13px] font-semibold transition-all cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleLaunchWheel(selectedExperience);
                    setSelectedExperience(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Load & Spin This Wheel</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
