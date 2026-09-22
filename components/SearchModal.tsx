'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { WheelConfig } from '@/lib/presets';
import { searchWheelIndex } from '@/lib/searchIndex';
import { Search, ArrowRight, Sparkles, Tag, Layers } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWheel: (wheel: WheelConfig) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectWheel
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    return searchWheelIndex(query, 16);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-[#181922] rounded-2xl shadow-2xl overflow-hidden border border-[#eeedf7] dark:border-[#313345] animate-bounceIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#eeedf7] dark:border-[#222330]">
          <Search className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff] mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 106+ wheels, categories, food, names, games..."
            className="flex-1 bg-transparent text-[#1a1b22] dark:text-white text-[15px] focus:outline-none"
          />
          <kbd className="text-[11px] px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#292a39] text-[#767586] font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Hint Header */}
        <div className="px-4 py-2 bg-[#f4f2fd] dark:bg-[#1d1e28] text-[11px] font-semibold text-[#767586] flex items-center justify-between">
          <span>{query ? `Matching Results (${searchResults.length})` : 'Instant Template Index (106+ Wheels)'}</span>
          <span className="flex items-center gap-1 text-[#4648d4] dark:text-[#8587ff]">
            <Sparkles className="w-3 h-3" />
            Zero Network Delay
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#f4f2fd] dark:divide-[#222330]">
          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-[#767586] text-[13px]">
              No matching wheels found for &ldquo;{query}&rdquo;. Try &ldquo;food&rdquo;, &ldquo;game&rdquo;, &ldquo;decision&rdquo;, or &ldquo;classroom&rdquo;.
            </div>
          ) : (
            searchResults.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => {
                  onSelectWheel(result.wheelConfig);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28] flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div className="pr-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[14px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] truncate">
                      {result.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eeedf7] dark:bg-[#292a39] text-[#464554] dark:text-[#c7c4d7] font-semibold shrink-0">
                      {result.category}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#464554] dark:text-[#c7c4d7] line-clamp-1 mt-0.5">
                    {result.purpose}
                  </div>
                  <div className="text-[11px] text-[#767586] dark:text-[#8e8ca0] truncate mt-1 flex items-center gap-1">
                    <span className="font-medium">{result.entriesCount} choices:</span>
                    <span>{result.sampleEntries.join(', ')}...</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[#767586] group-hover:text-[#4648d4]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
