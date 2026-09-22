'use client';

import React, { useState, useRef } from 'react';
import { WheelConfig, WheelItem } from '@/lib/types';
import {
  sanitizeString,
  sanitizeTitle,
  sanitizeHexColor,
  sanitizeWheelItems,
  parseSafeTextEntries,
  MAX_FILE_SIZE_BYTES
} from '@/lib/security';
import {
  ArrowLeftRight,
  X,
  UploadCloud,
  AlertCircle,
  FileCode,
  Table
} from 'lucide-react';

interface ImportExportProps {
  currentWheel: WheelConfig;
  onImportItems: (items: WheelItem[], newTitle?: string) => void;
  onClose: () => void;
}

export default function ImportExport({
  currentWheel,
  onImportItems,
  onClose
}: ImportExportProps) {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [rawText, setRawText] = useState('');
  const [format, setFormat] = useState<'txt' | 'csv' | 'json'>('txt');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse text or uploaded file content safely with sanitization
  const handleProcessImport = (textToParse: string, fmt: 'txt' | 'csv' | 'json') => {
    setErrorMsg(null);
    try {
      if (!textToParse.trim()) {
        throw new Error('Please enter or paste data to import.');
      }

      if (fmt === 'json') {
        const parsed = JSON.parse(textToParse);
        if (Array.isArray(parsed)) {
          const items = sanitizeWheelItems(parsed);
          if (items.length === 0) throw new Error('No valid items found in JSON array');
          onImportItems(items);
          onClose();
          return;
        } else if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
          const items = sanitizeWheelItems(parsed.items);
          if (items.length === 0) throw new Error('No valid items found in wheel items');
          const cleanTitle = parsed.title ? sanitizeTitle(parsed.title) : undefined;
          onImportItems(items, cleanTitle);
          onClose();
          return;
        } else {
          throw new Error('JSON must contain an array of items or a wheel object with an "items" array.');
        }
      } else if (fmt === 'csv') {
        const lines = textToParse.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) throw new Error('CSV is empty');

        const rawRows: { text: string; weight: number; color?: string }[] = [];
        for (let i = 0; i < lines.length; i++) {
          if (i === 0 && lines[0].toLowerCase().includes('text') && lines[0].includes(',')) {
            continue;
          }
          const parts = lines[i].split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
          const cleanText = sanitizeString(parts[0]);
          const rawWeight = parseFloat(parts[1]);
          const weight = !isNaN(rawWeight) && rawWeight > 0 ? rawWeight : 1;
          const color = parts[2] ? sanitizeHexColor(parts[2]) : undefined;
          if (cleanText) {
            rawRows.push({ text: cleanText, weight, color });
          }
        }
        const items = sanitizeWheelItems(rawRows);
        if (items.length === 0) throw new Error('No valid rows found in CSV');
        onImportItems(items);
        onClose();
      } else {
        // TXT (newline separated)
        const lines = parseSafeTextEntries(textToParse);
        if (lines.length === 0) throw new Error('Please enter at least one valid line of text');

        const items: WheelItem[] = lines.map((line, idx) => ({
          id: `txt-${Date.now()}-${idx}`,
          text: line,
          weight: 1
        }));
        onImportItems(items);
        onClose();
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to parse data');
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg('File size exceeds the 2MB safety limit.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) return;
      let detectedFormat: 'txt' | 'csv' | 'json' = 'txt';
      if (file.name.endsWith('.json')) detectedFormat = 'json';
      else if (file.name.endsWith('.csv')) detectedFormat = 'csv';
      setFormat(detectedFormat);
      setRawText(content);
      handleProcessImport(content, detectedFormat);
    };
    reader.readAsText(file);
  };

  // Export handlers
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentWheel, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentWheel.title.toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const rows = ['"text","weight","color"'];
    currentWheel.items.forEach((item) => {
      rows.push(`"${item.text.replace(/"/g, '""')}",${item.weight},"${item.color || ''}"`);
    });
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentWheel.title.toLowerCase().replace(/\s+/g, '-')}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-7 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-4 animate-bounceIn">
        {/* Header & Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-[#f1effa]">
              Import & Export Wheel
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 bg-[#f4f2fd] dark:bg-[#12131a] p-1 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'bg-[#4648d4] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7]'
            }`}
          >
            Import Data
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'bg-[#4648d4] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7]'
            }`}
          >
            Export Wheel
          </button>
        </div>

        {/* Tab 1: Import */}
        {activeTab === 'import' && (
          <div className="flex flex-col gap-3">
            {/* Format Selector */}
            <div className="flex items-center gap-2 text-[12px] text-[#464554] dark:text-[#c7c4d7]">
              <span className="font-semibold">Format:</span>
              {(['txt', 'csv', 'json'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`px-2.5 py-1 rounded-lg uppercase font-bold text-[11px] border transition-all cursor-pointer ${
                    format === fmt
                      ? 'bg-[#4648d4] text-white border-[#4648d4]'
                      : 'border-[#c7c4d7] dark:border-[#464554] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Drag & Drop File Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center transition-all ${
                isDragging
                  ? 'border-[#4648d4] bg-[#f4f2fd] dark:bg-[#222330]'
                  : 'border-[#c7c4d7] dark:border-[#464554] hover:border-[#4648d4]'
              }`}
            >
              <UploadCloud className="w-7 h-7 text-[#4648d4] dark:text-[#8587ff]" />
              <span className="text-[13px] font-bold text-[#1a1b22] dark:text-[#f1effa]">
                Drop file here or click to browse
              </span>
              <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                Supports .txt, .csv, and .json files
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.csv,.json"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="sr-only"
              />
            </div>

            {/* Direct Paste Area */}
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7]">
                Or Paste Options Directly:
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={4}
                placeholder={
                  format === 'json'
                    ? '[\n  {"text": "Pizza", "weight": 2},\n  {"text": "Burger", "weight": 1}\n]'
                    : format === 'csv'
                    ? 'Pizza, 2, #f43f5e\nBurger, 1, #3b82f6'
                    : 'Pizza\nBurger\nBiryani\nPasta'
                }
                className="w-full p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[12px] font-mono text-[#1a1b22] dark:text-[#f1effa] placeholder:text-[#908fa1] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40"
              />
            </div>

            {errorMsg && (
              <p className="text-[12px] text-red-500 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="button"
              onClick={() => handleProcessImport(rawText, format)}
              disabled={!rawText.trim()}
              className="w-full py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[14px] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all cursor-pointer"
            >
              Load Into Wheel
            </button>
          </div>
        )}

        {/* Tab 2: Export */}
        {activeTab === 'export' && (
          <div className="flex flex-col gap-4 py-2">
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              Export your current wheel with all {currentWheel.items.length} options, weights, and
              custom colors.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#1d1e28] hover:border-[#4648d4] flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <FileCode className="w-8 h-8 text-[#4648d4] dark:text-[#8587ff]" />
                <span className="text-[14px] font-bold text-[#1a1b22] dark:text-[#f1effa]">
                  Export JSON
                </span>
                <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                  Complete wheel config & weights
                </span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#1d1e28] hover:border-[#006c49] flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <Table className="w-8 h-8 text-[#006c49] dark:text-[#4edea3]" />
                <span className="text-[14px] font-bold text-[#1a1b22] dark:text-[#f1effa]">
                  Export CSV
                </span>
                <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                  Spreadsheet friendly format
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
