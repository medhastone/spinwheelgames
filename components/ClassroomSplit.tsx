'use client';

import React, { useState } from 'react';
import { WheelConfig } from '@/lib/presets';
import { Flame, Tv, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface ClassroomSplitProps {
  onSpinDailyChallenge: (wheel: WheelConfig) => void;
  onOpenBulkPaste: () => void;
}

export default function ClassroomSplit({
  onSpinDailyChallenge,
  onOpenBulkPaste
}: ClassroomSplitProps) {
  const [livePin, setLivePin] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGeneratePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setLivePin(pin);
    setCopied(false);
  };

  const handleCopyPin = () => {
    if (livePin) {
      navigator.clipboard?.writeText?.(livePin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const productivityWheel: WheelConfig = {
    id: 'daily-productivity',
    title: 'Daily 30-Day Productivity Spin',
    category: 'Productivity',
    description: 'High-impact daily focus prompt.',
    palette: ['#006c49', '#4648d4', '#dc2c4f', '#6063ee', '#10b981', '#f59e0b'],
    items: [
      { id: 'p1', text: '⚡ 45m Deep Work Sprint (Zero Tabs)', weight: 1 },
      { id: 'p2', text: '📥 Clear Inbox to Zero (15m)', weight: 1 },
      { id: 'p3', text: '🚶 15-Min Walk & Fresh Hydration', weight: 1 },
      { id: 'p4', text: '🎯 Ship Most Avoided Task First', weight: 1 },
      { id: 'p5', text: '🧹 Organize Desktop & Physical Desk', weight: 1 },
      { id: 'p6', text: '🤝 Send a Grateful Message to Colleague', weight: 1 }
    ]
  };

  return (
    <section className="w-full px-4 sm:px-6 py-10 sm:py-14 bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-y border-[#eeedf7] dark:border-[#222330]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Daily Challenge Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1d1e28] p-5 sm:p-6 rounded-2xl shadow-sm border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] px-2.5 py-1 rounded-full bg-[#6cf8bb]/30 dark:bg-[#005236] text-[#006c49] dark:text-[#4edea3] font-bold">
              <Flame className="w-3.5 h-3.5 text-[#006c49] dark:text-[#4edea3]" />
              <span>Daily Streak: Day 7</span>
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#767586] font-mono">
              Resets in 08:24:12
            </span>
          </div>

          <div>
            <h3 className="font-headline text-[20px] sm:text-[22px] font-bold text-[#1a1b22] dark:text-white">
              Daily 30-Day Productivity Spin
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] mt-1 leading-relaxed">
              Spin once every morning to lock in your high-impact micro-task for the workday.
            </p>
          </div>

          {/* Inline Visual Mini Progress Ring */}
          <div className="p-3.5 rounded-xl bg-[#eeedf7] dark:bg-[#222330] flex items-center gap-3">
            <svg className="w-14 h-14 -rotate-90 flex-shrink-0" viewBox="0 0 36 36">
              <path
                className="text-[#dad9e3] dark:text-[#313345]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#4648d4] dark:text-[#8587ff]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="70, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div>
              <div className="text-[14px] font-bold text-[#1a1b22] dark:text-white">
                21 of 30 Completed (70%)
              </div>
              <div className="text-[12px] text-[#464554] dark:text-[#c7c4d7]">
                Today&apos;s prize: Double spin multiplier token
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSpinDailyChallenge(productivityWheel)}
            className="w-full py-3 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] sm:text-[14px] font-bold shadow-sm transition-colors cursor-pointer"
          >
            Spin Today&apos;s Challenge
          </button>
        </div>

        {/* Classroom & Remote Team Sync Highlight (7 Cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#e8e7f1] dark:bg-[#222330] border border-[#dad9e3] dark:border-[#292a39] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] sm:text-[12px] text-[#4648d4] dark:text-[#8587ff] font-bold uppercase tracking-wider">
                Education &amp; Enterprise
              </span>
              {livePin && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#181922] text-[#006c49] dark:text-[#4edea3] text-[12px] font-mono font-bold shadow-sm">
                  <span>ROOM PIN: {livePin}</span>
                  <button
                    type="button"
                    onClick={handleCopyPin}
                    className="text-[#4648d4] hover:underline ml-1"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            <h3 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#1a1b22] dark:text-white mt-1">
              Classroom Mode &amp; Remote Live Sync
            </h3>
            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] mt-2 max-w-xl leading-relaxed">
              Stream the wheel directly to Zoom, Google Meet, or an interactive whiteboard. Students or remote colleagues can join with a 6-digit pin to participate in real-time draws without creating accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            <div className="p-3.5 bg-white dark:bg-[#181922] rounded-xl shadow-sm border border-[#eeedf7] dark:border-[#292a39]">
              <Tv className="w-6 h-6 text-[#4648d4] dark:text-[#8587ff]" />
              <div className="text-[13px] font-bold text-[#1a1b22] dark:text-white mt-1">
                Projector Friendly
              </div>
              <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] leading-tight mt-0.5">
                High-contrast ultra-bold typography for back-of-room clarity.
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-[#181922] rounded-xl shadow-sm border border-[#eeedf7] dark:border-[#292a39]">
              <ShieldCheck className="w-6 h-6 text-[#006c49] dark:text-[#4edea3]" />
              <div className="text-[13px] font-bold text-[#1a1b22] dark:text-white mt-1">
                Clean Classroom Mode
              </div>
              <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] leading-tight mt-0.5">
                Zero distracting external trackers, designed with student privacy in mind.
              </p>
            </div>

            <div
              onClick={onOpenBulkPaste}
              className="p-3.5 bg-white dark:bg-[#181922] rounded-xl shadow-sm border border-[#eeedf7] dark:border-[#292a39] cursor-pointer hover:border-[#dc2c4f] transition-colors"
            >
              <FileSpreadsheet className="w-6 h-6 text-[#dc2c4f]" />
              <div className="text-[13px] font-bold text-[#1a1b22] dark:text-white mt-1">
                CSV &amp; Roster Sync
              </div>
              <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7] leading-tight mt-0.5">
                Copy-paste student lists from Google Sheets in one keystroke.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dad9e3] dark:border-[#292a39] flex items-center justify-between">
            <span className="text-[12px] text-[#464554] dark:text-[#c7c4d7]">
              Need live audience participation?
            </span>
            <button
              type="button"
              onClick={handleGeneratePin}
              className="px-3.5 py-1.5 rounded-lg bg-[#4648d4] hover:bg-[#6063ee] text-white text-[12px] font-semibold transition-colors cursor-pointer"
            >
              {livePin ? 'Generate New Room PIN' : 'Start Live Classroom Session'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
