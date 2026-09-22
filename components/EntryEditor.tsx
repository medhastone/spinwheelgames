'use client';

import React, { useState, useMemo } from 'react';
import { WheelItem } from '@/lib/types';
import {
  ListOrdered,
  Palette,
  Upload,
  AlertTriangle,
  Plus,
  Search,
  Check,
  Edit3,
  Trash2
} from 'lucide-react';

interface EntryEditorProps {
  items: WheelItem[];
  palette: string[];
  onAddItem: (text: string) => void;
  onUpdateItem: (id: string, text: string, color?: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onDeduplicate: () => void;
  onRandomizeColors: () => void;
  onOpenBulkImport: () => void;
}

export default function EntryEditor({
  items,
  palette,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onClearAll,
  onDeduplicate,
  onRandomizeColors,
  onOpenBulkImport
}: EntryEditorProps) {
  const [newText, setNewText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // Duplicate detection
  const duplicateCounts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => {
      const clean = item.text.trim().toLowerCase();
      map.set(clean, (map.get(clean) || 0) + 1);
    });
    return map;
  }, [items]);

  const hasDuplicates = useMemo(() => {
    for (const count of duplicateCounts.values()) {
      if (count > 1) return true;
    }
    return false;
  }, [duplicateCounts]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((i) => i.text.toLowerCase().includes(q));
  }, [items, searchQuery]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onAddItem(newText.trim());
    setNewText('');
  };

  const startEdit = (item: WheelItem) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  const saveEdit = (id: string) => {
    if (editingText.trim()) {
      onUpdateItem(id, editingText.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-[#eeedf7] dark:border-[#222330] shadow-sm flex flex-col gap-4">
      {/* Header with Title and Entry Count */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
          <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
            Wheel Entries
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold">
            {items.length}
          </span>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRandomizeColors}
            className="p-1.5 rounded-lg text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] flex items-center gap-1 cursor-pointer"
            title="Randomize slice colors"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Color Shuffle</span>
          </button>
          <button
            type="button"
            onClick={onOpenBulkImport}
            className="p-1.5 rounded-lg text-[#4648d4] dark:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold flex items-center gap-1 cursor-pointer"
            title="Import TXT, CSV, or JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>
        </div>
      </div>

      {/* Duplicate Warning & 1-Click Fix */}
      {hasDuplicates && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-[12px]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Duplicate items detected on the wheel</span>
          </div>
          <button
            type="button"
            onClick={onDeduplicate}
            className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer"
          >
            Deduplicate
          </button>
        </div>
      )}

      {/* Add New Entry Form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Type an option and press Enter..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[13px] text-[#1a1b22] dark:text-[#f1effa] placeholder:text-[#908fa1] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40"
        />
        <button
          type="submit"
          disabled={!newText.trim()}
          className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-1 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Search Filter when > 8 items */}
      {items.length > 8 && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#908fa1] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="w-full pl-9 pr-3 py-1.5 text-[12px] rounded-lg bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-[#f1effa] placeholder:text-[#908fa1] focus:outline-none focus:ring-1 focus:ring-[#4648d4]"
          />
        </div>
      )}

      {/* Entries Scrollable List */}
      <div className="flex flex-col gap-1.5 max-h-[320px] overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <p className="text-center py-6 text-[13px] text-[#767586] dark:text-[#908fa1]">
            No entries match your search.
          </p>
        ) : (
          filteredItems.map((item, index) => {
            const isEditing = editingId === item.id;
            const clean = item.text.trim().toLowerCase();
            const isDup = (duplicateCounts.get(clean) || 0) > 1;
            const sliceColor = item.color || palette[index % palette.length];

            return (
              <div
                key={item.id}
                className="group flex items-center justify-between gap-2 p-2 rounded-xl bg-[#f4f2fd]/60 dark:bg-[#12131a]/60 hover:bg-[#eeedf7] dark:hover:bg-[#222330] border border-[#eeedf7] dark:border-[#292a39] transition-colors"
              >
                {/* Left: Color dot & Text */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Color Picker trigger */}
                  <label className="relative cursor-pointer shrink-0">
                    <span
                      className="block w-4 h-4 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: sliceColor }}
                    />
                    <input
                      type="color"
                      value={sliceColor}
                      onChange={(e) => onUpdateItem(item.id, item.text, e.target.value)}
                      className="sr-only"
                    />
                  </label>

                  {/* Text editing or display */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onBlur={() => saveEdit(item.id)}
                      autoFocus
                      className="flex-1 px-2 py-0.5 text-[13px] bg-white dark:bg-[#181922] border border-[#4648d4] rounded text-[#1a1b22] dark:text-white focus:outline-none"
                    />
                  ) : (
                    <span
                      onClick={() => startEdit(item)}
                      className="text-[13px] font-medium text-[#1a1b22] dark:text-[#f1effa] truncate cursor-pointer hover:text-[#4648d4] dark:hover:text-[#8587ff]"
                      title="Click to edit"
                    >
                      {item.text}
                    </span>
                  )}

                  {/* Duplicate pill badge */}
                  {isDup && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                      Dup
                    </span>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => (isEditing ? saveEdit(item.id) : startEdit(item))}
                    className="p-1 rounded text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] cursor-pointer"
                    title="Edit entry"
                  >
                    {isEditing ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Edit3 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 rounded text-[#464554] dark:text-[#c7c4d7] hover:text-red-500 transition-colors cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer count and clear all */}
      <div className="flex items-center justify-between text-[12px] text-[#767586] dark:text-[#908fa1] pt-2 border-t border-[#eeedf7] dark:border-[#292a39]">
        <span>{items.length} total options</span>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-red-500 hover:text-red-600 font-semibold transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
