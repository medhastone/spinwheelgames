'use client';

import React, { useState } from 'react';
import {
  useSavedWheels,
  removeSavedWheel,
  SavedWheel
} from '@/lib/storage';
import { WheelConfig, COLOR_PALETTES } from '@/lib/presets';
import { getShortShareUrl } from '@/lib/shortener';
import {
  Heart,
  Search,
  Play,
  Trash2,
  X,
  Sparkles,
  Calendar,
  Layers,
  Plus,
  Share2,
  Check
} from 'lucide-react';

interface SavedWheelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWheel?: (wheel: WheelConfig) => void;
  onOpenCreate?: () => void;
}

export default function SavedWheelsModal({
  isOpen,
  onClose,
  onSelectWheel,
  onOpenCreate
}: SavedWheelsModalProps) {
  const savedWheels = useSavedWheels();

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = savedWheels.filter((w) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      w.title.toLowerCase().includes(q) ||
      (w.category && w.category.toLowerCase().includes(q)) ||
      w.items.some((it) => it.text.toLowerCase().includes(q))
    );
  });

  const handleLaunch = async (wheel: SavedWheel) => {
    if (onSelectWheel) {
      const config: WheelConfig = {
        id: wheel.id,
        title: wheel.title,
        category: wheel.category || 'Saved Favorites',
        description: wheel.description || `${wheel.items.length} options custom wheel`,
        themeKey: wheel.paletteKey,
        palette: wheel.palette || (wheel.paletteKey && COLOR_PALETTES[wheel.paletteKey]?.colors) || COLOR_PALETTES.arcade.colors,
        items: wheel.items
      };
      onSelectWheel(config);
      onClose();
    } else if (typeof window !== 'undefined') {
      // If we are on a standalone subpage, redirect to home with the wheel data
      const config: WheelConfig = {
        id: wheel.id,
        title: wheel.title,
        category: wheel.category || 'Saved Favorites',
        description: wheel.description || `${wheel.items.length} options custom wheel`,
        themeKey: wheel.paletteKey,
        palette: wheel.palette || (wheel.paletteKey && COLOR_PALETTES[wheel.paletteKey]?.colors) || COLOR_PALETTES.arcade.colors,
        items: wheel.items
      };
      const url = await getShortShareUrl(config);
      window.location.assign(url);
    }
  };

  const handleCopyLink = async (wheel: SavedWheel, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined') return;
    const config: WheelConfig = {
      id: wheel.id,
      title: wheel.title,
      category: wheel.category || 'Saved Favorites',
      description: wheel.description || `${wheel.items.length} options custom wheel`,
      themeKey: wheel.paletteKey,
      palette: wheel.palette || (wheel.paletteKey && COLOR_PALETTES[wheel.paletteKey]?.colors) || COLOR_PALETTES.arcade.colors,
      items: wheel.items
    };
    const url = await getShortShareUrl(config);
    navigator.clipboard.writeText(url);
    setCopiedId(wheel.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#181922] rounded-3xl shadow-2xl p-5 sm:p-7 relative border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eeedf7] dark:border-[#222330]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-[18px] sm:text-[20px] text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-2">
                <span>My Saved Wheels</span>
                <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                  {savedWheels.length}
                </span>
              </h2>
              <p className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                Quickly access and spin your favorited spinner wheels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCreate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCreate();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4648d4] text-white text-[12px] font-bold hover:bg-[#3b3dbb] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Wheel</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#767586] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {savedWheels.length > 0 && (
          <div className="relative">
            <Search className="w-4 h-4 text-[#908fa1] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your saved wheels by title, category, or entry..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[13px] text-[#1a1b22] dark:text-[#f1effa] placeholder:text-[#908fa1] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40"
            />
          </div>
        )}

        {/* Wheel List Scroll Container */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-[220px] max-h-[420px]">
          {savedWheels.length === 0 ? (
            <div className="text-center py-12 px-4 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-400 flex items-center justify-center">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
                  No Saved Wheels Yet
                </h3>
                <p className="text-[13px] text-[#767586] dark:text-[#908fa1] max-w-sm mt-1">
                  Click the heart icon on any spin wheel, preset, or custom spinner to save it to your profile for 1-click access!
                </p>
              </div>
              {onOpenCreate && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCreate();
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold hover:bg-[#3b3dbb] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Custom Wheel</span>
                </button>
              )}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-[13px] text-[#767586] dark:text-[#908fa1]">
              No saved wheels match &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filtered.map((wheel) => {
              return (
                <div
                  key={wheel.id}
                  onClick={() => handleLaunch(wheel)}
                  className="group p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] hover:bg-[#f4f2fd] dark:hover:bg-[#1f202b] border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4]/40 dark:hover:border-[#8587ff]/40 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                >
                  {/* Wheel Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] dark:bg-[#222330] flex items-center justify-center text-[#4648d4] dark:text-[#8587ff] shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-headline font-bold text-[15px] text-[#1a1b22] dark:text-[#f1effa] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors truncate">
                          {wheel.title}
                        </h4>
                        {wheel.category && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#eeedf7] dark:bg-[#292a39] text-[#464554] dark:text-[#c7c4d7]">
                            {wheel.category}
                          </span>
                        )}
                      </div>

                      {/* Entries preview snippet */}
                      <p className="text-[12px] text-[#767586] dark:text-[#908fa1] mt-1 line-clamp-1">
                        {wheel.items.map((it) => it.text).join(' • ')}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-[#908fa1] mt-1.5">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {wheel.items.length} options
                        </span>
                        {wheel.savedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(wheel.savedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-2 self-end sm:self-center shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(wheel, e)}
                      title="Copy Share Link"
                      className="p-2 rounded-xl text-[#767586] hover:text-[#4648d4] dark:text-[#908fa1] dark:hover:text-[#8587ff] hover:bg-white dark:hover:bg-[#292a39] border border-transparent hover:border-[#eeedf7] dark:hover:border-[#383a4c] transition-all cursor-pointer"
                    >
                      {copiedId === wheel.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedWheel(wheel.id);
                      }}
                      title="Remove from saved favorites"
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaunch(wheel)}
                      className="px-3 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-[12px] font-bold shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Spin</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#eeedf7] dark:border-[#222330] text-[12px] text-[#767586] dark:text-[#908fa1]">
          <span>Saved locally to your browser profile</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg hover:bg-[#f4f2fd] dark:hover:bg-[#222330] font-semibold text-[#1a1b22] dark:text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
