'use client';

import React, { useState } from 'react';
import { WheelConfig, COLOR_PALETTES } from '@/lib/presets';
import { PlusCircle, X } from 'lucide-react';

interface CreateWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWheel: (wheel: WheelConfig) => void;
}

export default function CreateWheelModal({
  isOpen,
  onClose,
  onCreateWheel
}: CreateWheelModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Custom');
  const [itemsText, setItemsText] = useState('Option 1\nOption 2\nOption 3\nOption 4');
  const [paletteKey, setPaletteKey] = useState('arcade');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim() || 'My Custom Wheel';
    const lines = itemsText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      alert('Please enter at least 2 items.');
      return;
    }

    const items = lines.map((text, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      text,
      weight: 1
    }));

    const newWheel: WheelConfig = {
      id: `custom-${Date.now()}`,
      title: trimmedTitle,
      category,
      description: 'Custom user-created spinner.',
      palette: COLOR_PALETTES[paletteKey]?.colors || COLOR_PALETTES.arcade.colors,
      items
    };

    onCreateWheel(newWheel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-[#181922] rounded-2xl shadow-2xl p-6 relative border border-[#eeedf7] dark:border-[#313345] animate-bounceIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeedf7] dark:border-[#222330]">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <h3 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white">
              Create New Custom Wheel
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#767586] hover:bg-[#eeedf7] dark:hover:bg-[#292a39] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7] block mb-1">
              Wheel Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekend Activity Decider"
              className="w-full px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[13px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7] block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[13px]"
              >
                <option value="Decision">Decision</option>
                <option value="Games">Games</option>
                <option value="Classroom">Classroom</option>
                <option value="Food">Food</option>
                <option value="Raffle">Raffle</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7] block mb-1">
                Palette
              </label>
              <select
                value={paletteKey}
                onChange={(e) => setPaletteKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[13px]"
              >
                <option value="arcade">Arcade Neon</option>
                <option value="pastel">Pastel Minimal</option>
                <option value="vibrant">Vibrant Sunset</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7] block mb-1">
              Options (one per line)
            </label>
            <textarea
              rows={5}
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#eeedf7] dark:border-[#222330]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#eeedf7] dark:bg-[#292a39] text-[#1a1b22] dark:text-white text-[13px] font-semibold hover:bg-[#dad9e3] dark:hover:bg-[#313345] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-bold cursor-pointer"
            >
              Create Wheel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
