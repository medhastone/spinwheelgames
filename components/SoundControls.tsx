'use client';

import React, { useState } from 'react';
import { SoundSettings, SoundPack } from '@/lib/types';
import { playTickSound, playWinnerFanfare, announceWinnerTTS, unlockAudioContext } from '@/lib/sound';
import {
  Volume2,
  VolumeX,
  Sliders,
  Play,
  Mic,
  PartyPopper,
  Gamepad2,
  Wrench,
  Bell,
  Radio,
  type LucideIcon
} from 'lucide-react';

interface SoundControlsProps {
  settings: SoundSettings;
  onChangeSettings: (settings: SoundSettings) => void;
}

export default function SoundControls({ settings, onChangeSettings }: SoundControlsProps) {
  const [isSpeakingTest, setIsSpeakingTest] = useState(false);

  const packs: { id: SoundPack; label: string; icon: LucideIcon }[] = [
    { id: 'carnival', label: 'Carnival Clacker', icon: PartyPopper },
    { id: 'arcade', label: '8-Bit Arcade', icon: Gamepad2 },
    { id: 'ratchet', label: 'Wooden Ratchet', icon: Wrench },
    { id: 'chime', label: 'Gentle Chime', icon: Bell }
  ];

  const handleTestSound = () => {
    unlockAudioContext();
    playWinnerFanfare(true, settings.pack, settings.volume);
  };

  const handleTestVoice = () => {
    unlockAudioContext();
    announceWinnerTTS('Sample Winner 100', {
      enabled: true,
      volume: settings.volume,
      onStart: () => setIsSpeakingTest(true),
      onEnd: () => setIsSpeakingTest(false)
    });
  };

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-[#eeedf7] dark:border-[#222330] shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
          <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
            Audio & Speech Engine
          </h3>
        </div>

        {/* Master Mute Toggle */}
        <button
          type="button"
          onClick={() => onChangeSettings({ ...settings, enabled: !settings.enabled })}
          className={`px-3 py-1 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            settings.enabled
              ? 'bg-[#006c49]/10 text-[#006c49] dark:text-[#4edea3]'
              : 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-300'
          }`}
        >
          {settings.enabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
          <span>{settings.enabled ? 'Sound ON' : 'Muted'}</span>
        </button>
      </div>

      {/* Sound Pack Selection Grid */}
      <div className="grid grid-cols-2 gap-2">
        {packs.map((p) => {
          const isSelected = settings.pack === p.id;
          const IconComp = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onChangeSettings({ ...settings, pack: p.id, enabled: true });
                playTickSound(true, p.id, settings.volume);
              }}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#f4f2fd] dark:bg-[#222330] border-[#4648d4] dark:border-[#8587ff] text-[#4648d4] dark:text-[#8587ff]'
                  : 'bg-transparent border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#fbf8ff] dark:hover:bg-[#1d1e28]'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span className="text-[12px] font-semibold">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Volume Slider & Test Button */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#eeedf7] dark:border-[#292a39]">
        <div className="flex items-center gap-2 flex-1">
          <Sliders className="w-4 h-4 text-[#767586] dark:text-[#908fa1] shrink-0" />
          <span className="text-[12px] text-[#464554] dark:text-[#c7c4d7] font-medium">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.volume}
            onChange={(e) =>
              onChangeSettings({ ...settings, volume: parseFloat(e.target.value), enabled: true })
            }
            className="flex-1 accent-[#4648d4] cursor-pointer"
          />
          <span className="text-[11px] font-mono text-[#767586] dark:text-[#908fa1] w-8 text-right">
            {Math.round(settings.volume * 100)}%
          </span>
        </div>

        <button
          type="button"
          onClick={handleTestSound}
          className="px-3 py-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-1 transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Test Fanfare</span>
        </button>
      </div>

      {/* Text-to-Speech Winner Announcement Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7] dark:border-[#292a39] gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Mic className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
          <div>
            <span className="text-[13px] font-semibold text-[#1a1b22] dark:text-[#f1effa] block">
              Speak Winner Out Loud (TTS)
            </span>
            <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">
              Uses browser Web Speech API to announce winner words upon landing
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTestVoice}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isSpeakingTest
                ? 'bg-[#4648d4] text-white border-[#4648d4]'
                : 'border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
            }`}
            title="Hear voice speak sample winner words"
          >
            {isSpeakingTest ? <Radio className="w-3 h-3 animate-spin" /> : <Volume2 className="w-3 h-3" />}
            <span>Test Voice</span>
          </button>

          <input
            type="checkbox"
            checked={settings.ttsEnabled}
            onChange={(e) => onChangeSettings({ ...settings, ttsEnabled: e.target.checked })}
            className="w-4 h-4 accent-[#4648d4] cursor-pointer ml-1"
          />
        </div>
      </div>
    </div>
  );
}
