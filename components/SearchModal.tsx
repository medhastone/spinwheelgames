'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WheelConfig } from '@/lib/presets';
import { searchWheelIndex } from '@/lib/searchIndex';
import { Search, ArrowRight, Sparkles, Tag, Layers, ExternalLink } from 'lucide-react';

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();

  const placeholders = [
    'What do you want to choose?',
    'Who should go first?',
    'What should we eat?',
    'Pick a random student',
    'Choose a movie',
    'Pick a winner'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [placeholders.length]);

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

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      handleSelectResult(searchResults[selectedIndex]);
    }
  };

  const handleSelectResult = (result: (typeof searchResults)[0]) => {
    onClose();
    if (result.fullPath) {
      router.push(result.fullPath);
    } else {
      onSelectWheel(result.wheelConfig);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#181922] rounded-2xl shadow-2xl overflow-hidden border border-[#eeedf7] dark:border-[#313345] animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#eeedf7] dark:border-[#222330]">
          <Search className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff] mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={`Search (e.g. "${placeholders[placeholderIndex]}")`}
            className="flex-1 bg-transparent text-[#1a1b22] dark:text-white text-[15px] focus:outline-none placeholder:text-[#767586] dark:placeholder:text-[#6a6b80] transition-all"
          />
          <kbd className="text-[11px] px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#292a39] text-[#767586] font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Hint Header */}
        <div className="px-4 py-2 bg-[#f4f2fd] dark:bg-[#1d1e28] text-[11px] font-semibold text-[#767586] flex items-center justify-between">
          <span>{query ? `Matching Results (${searchResults.length})` : 'Instant Wheel Index (116+ Wheels & Tools)'}</span>
          <span className="flex items-center gap-1 text-[#4648d4] dark:text-[#8587ff]">
            <Sparkles className="w-3 h-3" />
            Instant Search
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#f4f2fd] dark:divide-[#222330]">
          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-[#767586] text-[13px]">
              No matching wheels found for &ldquo;{query}&rdquo;. Try &ldquo;animal&rdquo;, &ldquo;food&rdquo;, &ldquo;number&rdquo;, or &ldquo;classroom&rdquo;.
            </div>
          ) : (
            searchResults.map((result, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors group cursor-pointer ${
                    isSelected
                      ? 'bg-[#4648d4]/10 dark:bg-[#4648d4]/20 border border-[#4648d4]/30'
                      : 'hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
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
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
