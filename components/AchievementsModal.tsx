'use client';

import React, { useState } from 'react';
import { UserStats, Achievement } from '@/lib/types';
import { loadUserStats, loadAchievements, resetGamificationData } from '@/lib/storage';
import {
  Trophy,
  Flame,
  Zap,
  Target,
  Award,
  Calendar,
  Sparkles,
  Swords,
  Gauge,
  HelpCircle,
  Lock,
  CheckCircle2,
  X,
  Trash2,
  RefreshCw,
  type LucideIcon
} from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatsReset?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Target,
  Flame,
  Zap,
  Calendar,
  Trophy,
  Award,
  Gauge,
  HelpCircle,
  Swords
};

export default function AchievementsModal({
  isOpen,
  onClose,
  onStatsReset
}: AchievementsModalProps) {
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  const handleResetData = () => {
    resetGamificationData();
    setStats(loadUserStats());
    setAchievements(loadAchievements());
    setConfirmReset(false);
    onStatsReset?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div role="dialog" aria-modal="true" aria-label="Achievements and Badges" className="relative w-full max-w-2xl bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-[22px] text-[#1a1b22] dark:text-[#f1effa]">
                Personal Stats &amp; Trophy Room
              </h3>
              <p className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                100% Local-first records. Zero fake leaderboards.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Stats vs Achievements */}
        <div className="flex bg-[#f4f2fd] dark:bg-[#1d1e28] p-1 rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-sm'
                : 'text-[#464554] dark:text-[#c7c4d7]'
            }`}
          >
            Personal Stats &amp; Records
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-sm'
                : 'text-[#464554] dark:text-[#c7c4d7]'
            }`}
          >
            Achievements ({unlockedCount}/{achievements.length})
          </button>
        </div>

        {/* View 1: Personal Stats */}
        {activeTab === 'stats' && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            {/* Top Milestones Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Total Spins
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 block">
                  {stats.totalSpins}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  Active Daily Streak
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                  <Flame className="w-6 h-6 text-amber-500 fill-current" />
                  {stats.currentDailyStreak} <span className="text-xs font-normal text-slate-500">Days</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  Best Daily Streak
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 block">
                  {stats.bestDailyStreak} <span className="text-xs font-normal text-slate-500">Days</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Daily Challenges
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 block">
                  {stats.dailyChallengesCompleted}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                  Tournaments Won
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 block">
                  {stats.tournamentsWon}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Best-of-3 Victories
                </span>
                <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 mt-1 block">
                  {stats.bestOf3Won}
                </span>
              </div>
            </div>

            {/* Favorite Wheel Card */}
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] block">
                  Favorite Wheel
                </span>
                <span className="font-headline font-bold text-base text-[#1a1b22] dark:text-[#f1effa] mt-0.5 block">
                  {stats.favoriteWheelTitle || 'Quick Food Decider'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-[#767586] dark:text-[#908fa1] block">
                  Session Streak
                </span>
                <span className="font-mono font-bold text-sm text-[#4648d4] dark:text-[#8587ff]">
                  {stats.currentSessionStreak} (Best: {stats.bestSessionStreak})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Achievements Trophy Room */}
        {activeTab === 'achievements' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Progress Bar */}
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#1a1b22] dark:text-[#f1effa]">
                  Overall Completion
                </span>
                <span className="text-[#4648d4] dark:text-[#8587ff]">
                  {unlockedCount} / {achievements.length} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Badges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => {
                const IconComponent = ICON_MAP[ach.icon] || Trophy;
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                      ach.unlocked
                        ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30'
                        : 'bg-white dark:bg-[#12131a] border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        ach.unlocked
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ach.unlocked ? (
                        <IconComponent className="w-5 h-5" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-headline font-bold text-sm text-[#1a1b22] dark:text-[#f1effa] truncate">
                          {ach.title}
                        </h4>
                        {ach.unlocked && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                            UNLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5 leading-snug">
                        {ach.description}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                        Badge: {ach.badgeName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer / Privacy & Reset Options */}
        <div className="pt-3 border-t border-[#eeedf7] dark:border-[#292a39] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#767586]">
          <span>All statistics are stored locally on your device.</span>

          {confirmReset ? (
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-semibold">Are you sure?</span>
              <button
                type="button"
                onClick={handleResetData}
                className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold cursor-pointer"
              >
                Yes, Reset All
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Local Stats</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
