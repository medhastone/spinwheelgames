'use client';

import React, { useState } from 'react';
import { WheelItem } from '@/lib/presets';
import { ClipboardList, X } from 'lucide-react';

interface BulkPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyItems: (items: WheelItem[]) => void;
}

export default function BulkPasteModal({
  isOpen,
  onClose,
  onApplyItems
}: BulkPasteModalProps) {
  const [text, setText] = useState('');
  const [replaceExisting, setReplaceExisting] = useState(true);

  if (!isOpen) return null;

  const handleImport = () => {
    const lines = text
      .split(/[\r\n,]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      alert('Please enter at least 2 items to form a wheel.');
      return;
    }

    const newItems: WheelItem[] = lines.map((line, idx) => ({
      id: `bulk-${Date.now()}-${idx}`,
      text: line,
      weight: 1
    }));

    onApplyItems(newItems);
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div role="dialog" aria-modal="true" aria-label="Bulk Paste Options" className="w-full max-w-lg bg-white dark:bg-[#181922] rounded-2xl shadow-2xl p-6 relative border border-[#eeedf7] dark:border-[#313345] animate-bounceIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeedf7] dark:border-[#222330]">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <h3 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white">
              Bulk Paste Options
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

        <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] mt-3">
          Paste lines copied from Google Sheets, Excel, or comma-separated lists. Each line will become a slice on your wheel.
        </p>

        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Wood-Fired Pizza\nFresh Sushi Box\nStreet Tacos\nSmash Burgers\nTonkotsu Ramen`}
          className="w-full mt-3 p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
        />

        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[12px] text-[#464554] dark:text-[#c7c4d7]">
            <input
              type="checkbox"
              checked={replaceExisting}
              onChange={(e) => setReplaceExisting(e.target.checked)}
              className="rounded accent-[#4648d4]"
            />
            <span>Replace current wheel items</span>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#eeedf7] dark:bg-[#292a39] text-[#1a1b22] dark:text-white text-[13px] font-semibold hover:bg-[#dad9e3] dark:hover:bg-[#313345] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-bold cursor-pointer"
            >
              Import Slices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
