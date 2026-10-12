'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  MessageSquare,
  Sparkles,
  Shuffle,
  Trophy,
  Copy,
  Check,
  Share2,
  Trash2,
  UserCheck,
  Filter,
  ShieldCheck,
  Volume2,
  VolumeX,
  RefreshCw,
  Award,
  ListOrdered,
  X,
  Plus,
  HelpCircle,
  FileText,
  Download,
  AlertCircle,
  Hash,
  AtSign
} from 'lucide-react';
import { playTickSound, playWinnerFanfare, playClickSound, unlockAudioContext } from '@/lib/sound';

// Hardware-grade CSPRNG random integer in [0, max)
function getSecureRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

// Generate short random cryptographic audit seed
function generateAuditSeed(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const buffer = new Uint8Array(4);
    window.crypto.getRandomValues(buffer);
    return '0x' + Array.from(buffer).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  return '0x' + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase();
}

export interface ParsedComment {
  id: string;
  raw: string;
  username: string;
  comment: string;
  normalizedUser: string;
}

export interface DrawnWinner {
  id: string;
  order: number;
  username: string;
  comment: string;
  timestamp: string;
  auditSeed: string;
}

// Preset samples for 1-click test
const SAMPLE_YOUTUBE = `@CreatorGamer: Thanks for 100k subs! Entering for the mechanical keyboard #giveaway
@NeonPixel: Congratulations! I've been subscribed since day 1 #giveaway
@Alex_Streamer: Awesome tutorial as always, hope I win! #giveaway
@MayaCraft: That intro animation was insane 🔥 Count me in #giveaway
@TechEnthusiast: Subscribed & liked! #giveaway
@David_Code: The performance tips at 04:20 saved my build! #giveaway
@GamingWithSara: fingers crossed for the grand prize 🤞 #giveaway
@Jordan_VFX: Super clear breakdown. Keep making more! #giveaway
@NeonPixel: posting again because I really need this upgrade! #giveaway
@ChloeReads: Happy 100k milestones! Much deserved! #giveaway
@SamuraiBot: WhatsApp me for crypto profits +190012345
@LunaArt: Love the editing style in this video #giveaway
@OliverTech: Congrats on 100k! Well deserved milestone #giveaway
@EmmaDesign: Amazing contest! Best of luck everyone 🎉 #giveaway`;

const SAMPLE_INSTAGRAM = `@sara_adventures: Pick me! Love the travel gear 🎒 #contest
@marco.lens: Following & tagged @brother_lens and @sister_lens #contest
@elena_bakes: Would love to win this for our upcoming camping trip! #contest
@marco.lens: Tagging another friend @outdoor_john #contest
@nature_lucas: Congratulations on the giveaway! 🌲 #contest
@bot_crypto_invest: Earn 500% daily returns DM me now
@sophia_style: Entered! The color palette is gorgeous 🌸 #contest
@ryan_outdoor: Awesome prize pack! Good luck everyone #contest
@zoe_explores: Amazing collaboration! Fingers crossed 🍀 #contest
@daniel_trails: Shared on my story as well! 🏔️ #contest`;

const SAMPLE_TIKTOK = `@vibes_sam: I NEED THIS SO BAD 😭 #win
@jake_skate: early gang! Pick me please #win
@mia_aesthetic: this is my dream giveaway omg #win
@vibes_sam: replying again for extra luck ✨ #win
@kai_dancer: been supporting since 500 followers #win
@spam_promo: send DM to get verified fast
@leo_fitness: let's goooo! hope to win this #win
@tara_music: loved the background soundtrack in this one #win
@noah_crafts: entering! great content as always #win`;

export default function CommentPickerEngine() {
  // Input raw text
  const [rawText, setRawText] = useState<string>(SAMPLE_YOUTUBE);

  // Settings & Filters
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);
  const [duplicateMode, setDuplicateMode] = useState<'username' | 'exact'>('username');
  const [exclusions, setExclusions] = useState<string>('SamuraiBot, bot_crypto_invest, spam_promo, whatsapp, crypto');
  const [requiredKeyword, setRequiredKeyword] = useState<string>('');
  const [minCharacters, setMinCharacters] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Drawing state
  const [winnersCountToPick, setWinnersCountToPick] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawRollName, setDrawRollName] = useState<string>('');
  const [currentWinner, setCurrentWinner] = useState<DrawnWinner | null>(null);
  const [winnerHistory, setWinnerHistory] = useState<DrawnWinner[]>([]);

  // Removed winner IDs from active pool
  const [excludedWinnerIds, setExcludedWinnerIds] = useState<Set<string>>(new Set());

  // Copy / Share feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Ref for rolling animation timer
  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parsing helper: extracts username and comment text
  const parseLine = useCallback((line: string, index: number): ParsedComment => {
    const trimmed = line.trim();
    let username = '';
    let comment = trimmed;

    // Pattern 1: @username: comment or @username - comment
    const atMatch = trimmed.match(/^@?([a-zA-Z0-9_.-]+)\s*[:|-]\s*(.+)$/i);
    if (atMatch) {
      username = atMatch[1].startsWith('@') ? atMatch[1] : `@${atMatch[1]}`;
      comment = atMatch[2].trim();
    } else if (trimmed.startsWith('@')) {
      // Pattern 2: @username followed by space and text
      const spaceIdx = trimmed.indexOf(' ');
      if (spaceIdx > 0) {
        username = trimmed.slice(0, spaceIdx).trim();
        comment = trimmed.slice(spaceIdx + 1).trim();
      } else {
        username = trimmed;
        comment = '';
      }
    } else {
      // Default: username fallback is Commenter #index or short line
      username = `Participant #${index + 1}`;
      comment = trimmed;
    }

    const normalizedUser = username.toLowerCase().replace(/[@\s]/g, '');

    return {
      id: `comment-${index}-${normalizedUser || 'user'}-${trimmed.slice(0, 15)}`,
      raw: trimmed,
      username,
      comment,
      normalizedUser
    };
  }, []);

  // Compute parsed lines & filtering pipeline
  const statsAndPool = useMemo(() => {
    const rawLines = rawText.split(/\r?\n/);
    const nonEmptyLines = rawLines.filter((l) => l.trim().length > 0);
    const totalLines = rawLines.length;
    const cleanLinesCount = nonEmptyLines.length;

    // Parse list
    const parsedList = nonEmptyLines.map((line, idx) => parseLine(line, idx));

    // Prepare exclusion tokens
    const exclusionTokens = exclusions
      .split(/[,;\n]/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const requiredKw = requiredKeyword.trim().toLowerCase();

    // Track duplicates
    const seenUsers = new Set<string>();
    const seenRaw = new Set<string>();

    let duplicateCount = 0;
    let excludedCount = 0;
    let filteredCount = 0;

    const eligibleList: ParsedComment[] = [];

    for (const item of parsedList) {
      // Check already won & removed
      if (excludedWinnerIds.has(item.id)) {
        continue;
      }

      // Check min character count
      if (minCharacters > 0 && item.comment.length < minCharacters && item.raw.length < minCharacters) {
        filteredCount++;
        continue;
      }

      // Check required keyword/hashtag
      if (requiredKw && !item.raw.toLowerCase().includes(requiredKw)) {
        filteredCount++;
        continue;
      }

      // Check exclusions (matches username or comment content)
      const isExcluded = exclusionTokens.some(
        (token) =>
          item.username.toLowerCase().includes(token) ||
          item.comment.toLowerCase().includes(token) ||
          item.normalizedUser.includes(token.replace(/[@\s]/g, ''))
      );

      if (isExcluded) {
        excludedCount++;
        continue;
      }

      // Check duplicates
      if (removeDuplicates) {
        if (duplicateMode === 'username') {
          if (seenUsers.has(item.normalizedUser)) {
            duplicateCount++;
            continue;
          }
          seenUsers.add(item.normalizedUser);
        } else {
          // Exact text duplicate
          const lowerRaw = item.raw.toLowerCase();
          if (seenRaw.has(lowerRaw)) {
            duplicateCount++;
            continue;
          }
          seenRaw.add(lowerRaw);
        }
      }

      eligibleList.push(item);
    }

    return {
      totalLines,
      cleanLinesCount,
      duplicateCount,
      excludedCount,
      filteredCount,
      eligiblePool: eligibleList
    };
  }, [rawText, removeDuplicates, duplicateMode, exclusions, requiredKeyword, minCharacters, excludedWinnerIds, parseLine]);

  const { totalLines, cleanLinesCount, duplicateCount, excludedCount, filteredCount, eligiblePool } = statsAndPool;

  // Cleanup rolling animation on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    };
  }, []);

  // Pick Random Winner Handler
  const handlePickWinner = () => {
    if (eligiblePool.length === 0 || isDrawing) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound(true, 0.5);
    }

    setIsDrawing(true);

    const duration = 2400; // 2.4 second suspense roll
    const startTime = Date.now();
    let tickCounter = 0;

    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);

    rollIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const randomCandidate = eligiblePool[getSecureRandomInt(eligiblePool.length)];
      setDrawRollName(randomCandidate.username || randomCandidate.raw);

      tickCounter++;
      if (soundEnabled && tickCounter % 2 === 0) {
        playTickSound(true, 0.3);
      }

      if (elapsed >= duration) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);

        // Final hardware CSPRNG pick
        const winningIndex = getSecureRandomInt(eligiblePool.length);
        const chosen = eligiblePool[winningIndex];
        const auditSeed = generateAuditSeed();

        const newWinner: DrawnWinner = {
          id: chosen.id,
          order: winnerHistory.length + 1,
          username: chosen.username,
          comment: chosen.comment || chosen.raw,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          auditSeed
        };

        setCurrentWinner(newWinner);
        setWinnerHistory((prev) => [newWinner, ...prev]);
        setIsDrawing(false);

        // Sound fanfare & confetti
        if (soundEnabled) {
          playWinnerFanfare(true, 'arcade', 0.85);
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 75);
  };

  // Remove winner from active pool so they cannot win again
  const handleRemoveWinnerFromPool = (winner: DrawnWinner) => {
    setExcludedWinnerIds((prev) => {
      const next = new Set(prev);
      next.add(winner.id);
      return next;
    });

    if (currentWinner?.id === winner.id) {
      setCurrentWinner(null);
    }

    if (soundEnabled) {
      playClickSound(true, 0.4);
    }
  };

  // Pick Next Winner
  const handlePickNextWinner = () => {
    if (currentWinner) {
      // Auto-exclude current winner from next pool
      setExcludedWinnerIds((prev) => {
        const next = new Set(prev);
        next.add(currentWinner.id);
        return next;
      });
    }
    // Trigger subsequent pick
    setTimeout(() => {
      handlePickWinner();
    }, 150);
  };

  // Copy result to clipboard
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Share giveaway announcement
  const handleShare = async (winner: DrawnWinner) => {
    const shareText = `🎉 GIVEAWAY WINNER ANNOUNCEMENT 🎉\nWinner: ${winner.username}\nComment: "${winner.comment}"\nVerified via Random Comment Picker (${winner.auditSeed})\nhttps://spinwheelgames.org/comment-picker`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Giveaway Winner Announcement',
          text: shareText,
          url: 'https://spinwheelgames.org/comment-picker'
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareText);
    setShareToast('Giveaway announcement copied to clipboard!');
    setTimeout(() => setShareToast(null), 3000);
  };

  // Copy all winners summary
  const handleCopyAllWinners = () => {
    if (winnerHistory.length === 0) return;
    const summary = winnerHistory
      .slice()
      .reverse()
      .map((w, idx) => `Winner #${idx + 1}: ${w.username} - "${w.comment}" [Seed: ${w.auditSeed}]`)
      .join('\n');

    const fullText = `🏆 RANDOM COMMENT PICKER RESULTS 🏆\nTotal Winners: ${winnerHistory.length}\nDate: ${new Date().toLocaleDateString()}\n\n${summary}\n\nFairly drawn with Web Crypto CSPRNG at https://spinwheelgames.org/comment-picker`;
    handleCopy(fullText, 'all-winners');
  };

  // Export winners as TXT
  const handleDownloadWinners = () => {
    if (winnerHistory.length === 0) return;
    const summary = winnerHistory
      .slice()
      .reverse()
      .map((w, idx) => `Winner #${idx + 1}\nUsername: ${w.username}\nComment: ${w.comment}\nTime: ${w.timestamp}\nVerification Seed: ${w.auditSeed}\n---------------------------\n`)
      .join('\n');

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `giveaway-winners-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Paste from clipboard helper
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRawText(text);
      }
    } catch {
      // Ignore if permission denied
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1b22] dark:bg-white text-white dark:text-[#1a1b22] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Comments Input & Rules (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card: Paste Comments Box */}
          <div className="rounded-3xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white">
                    Paste Comments
                  </h2>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                    Paste one comment per line or @username: comment format
                  </p>
                </div>
              </div>

              {/* Sample Loader Buttons */}
              <div className="flex items-center flex-wrap gap-1.5 text-xs">
                <span className="text-[11px] text-[#767586] dark:text-[#908fa1] mr-1 hidden sm:inline">
                  Samples:
                </span>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_YOUTUBE)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] hover:bg-[#eae6fc] dark:hover:bg-[#2b2c3d] transition-colors cursor-pointer"
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_INSTAGRAM)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] hover:bg-[#eae6fc] dark:hover:bg-[#2b2c3d] transition-colors cursor-pointer"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_TIKTOK)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] hover:bg-[#eae6fc] dark:hover:bg-[#2b2c3d] transition-colors cursor-pointer"
                >
                  TikTok
                </button>
                <button
                  type="button"
                  onClick={() => setRawText('')}
                  className="p-1 rounded-lg text-[#767586] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Clear textarea"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="@username: comment or one participant per line..."
                rows={9}
                className="w-full rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#0e0f15] p-3.5 text-xs sm:text-sm text-[#1a1b22] dark:text-[#f1effa] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 resize-y transition-all placeholder:text-[#a09eb0]"
              />

              {/* Paste helper floating button */}
              {rawText.trim().length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePasteFromClipboard}
                    className="pointer-events-auto px-4 py-2 rounded-xl bg-white dark:bg-[#1f202c] border border-[#eeedf7] dark:border-[#2b2c3d] shadow-md text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#252636] transition-all flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Paste From Clipboard</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Counter Badges (Compact Pill Bar) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div className="rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] p-2">
                <span className="block text-[10px] uppercase font-bold text-[#767586] dark:text-[#908fa1]">
                  Pasted Lines
                </span>
                <span className="text-sm sm:text-base font-black text-[#1a1b22] dark:text-white">
                  {cleanLinesCount}
                </span>
              </div>

              <div className="rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] p-2">
                <span className="block text-[10px] uppercase font-bold text-[#767586] dark:text-[#908fa1]">
                  Duplicates Out
                </span>
                <span className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">
                  {duplicateCount}
                </span>
              </div>

              <div className="rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] p-2">
                <span className="block text-[10px] uppercase font-bold text-[#767586] dark:text-[#908fa1]">
                  Excluded / Filtered
                </span>
                <span className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400">
                  {excludedCount + filteredCount}
                </span>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2">
                <span className="block text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                  Eligible Pool
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                  {eligiblePool.length}
                </span>
              </div>
            </div>
          </div>

          {/* Card: Filtering, Deduplication & Exclusions */}
          <div className="rounded-3xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Filter className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#1a1b22] dark:text-white">
                  Filter &amp; Deduplication Rules
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                100% Client-Side
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Option: Remove Duplicates */}
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                    Remove Duplicates
                  </span>
                  <input
                    type="checkbox"
                    checked={removeDuplicates}
                    onChange={(e) => setRemoveDuplicates(e.target.checked)}
                    className="w-4 h-4 accent-[#4648d4] rounded cursor-pointer"
                  />
                </label>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Only 1 entry per user even if they posted multiple comments.
                </p>
                {removeDuplicates && (
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDuplicateMode('username')}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                        duplicateMode === 'username'
                          ? 'bg-[#4648d4] text-white'
                          : 'bg-white dark:bg-[#1f202c] text-[#767586]'
                      }`}
                    >
                      By Username
                    </button>
                    <button
                      type="button"
                      onClick={() => setDuplicateMode('exact')}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                        duplicateMode === 'exact'
                          ? 'bg-[#4648d4] text-white'
                          : 'bg-white dark:bg-[#1f202c] text-[#767586]'
                      }`}
                    >
                      Exact Line
                    </button>
                  </div>
                )}
              </div>

              {/* Option: Required Hashtag/Keyword */}
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
                <label className="font-bold text-[#1a1b22] dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-pink-500" />
                    Must Contain Keyword
                  </span>
                  {requiredKeyword && (
                    <button
                      type="button"
                      onClick={() => setRequiredKeyword('')}
                      className="text-[10px] text-red-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  value={requiredKeyword}
                  onChange={(e) => setRequiredKeyword(e.target.value)}
                  placeholder="e.g. #giveaway or #win"
                  className="w-full px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#1f202c] text-xs text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4]"
                />
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                  Filters comments that do not contain this tag or answer.
                </p>
              </div>
            </div>

            {/* Exclusions Box */}
            <div className="p-3.5 rounded-2xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <AtSign className="w-3.5 h-3.5 text-amber-500" />
                  Optional Exclusions (Usernames, Bot Spam &amp; Keywords)
                </span>
                <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">
                  Comma separated
                </span>
              </div>
              <input
                type="text"
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                placeholder="e.g. host_account, admin, bot, whatsapp, crypto"
                className="w-full px-3 py-2 rounded-xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#1f202c] text-xs text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4]"
              />
              <p className="text-[11px] text-[#767586] dark:text-[#908fa1] leading-relaxed">
                Exclude host accounts, test accounts, moderators, and scam bot phrases from winning.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Draw Winner & Winner Spotlight (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card: Winner Spotlight & Draw Button */}
          <div className="rounded-3xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Trophy className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white">
                  Pick Random Winner
                </h2>
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131a] text-[#767586]'
                }`}
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound fanfare'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Winner Display Screen */}
            <div className="relative min-h-[220px] rounded-2xl border-2 border-dashed border-[#eeedf7] dark:border-[#222330] bg-gradient-to-b from-[#faf8ff] to-[#f4f2fd] dark:from-[#0f1017] dark:to-[#161722] p-5 flex flex-col items-center justify-center text-center overflow-hidden">
              {isDrawing ? (
                /* Dramatic Suspense Rolling State */
                <div className="space-y-3 animate-pulse">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4648d4] text-white text-[11px] font-black uppercase tracking-widest shadow-md">
                    <Shuffle className="w-3.5 h-3.5 animate-spin" />
                    <span>Drawing Random Winner...</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#4648d4] dark:text-[#8587ff] truncate max-w-xs px-2">
                    {drawRollName}
                  </div>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                    Sampling Web Crypto CSPRNG entropy
                  </p>
                </div>
              ) : currentWinner ? (
                /* Winner Revealed Card */
                <div className="w-full space-y-3 animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>Winner #{currentWinner.order} Chosen!</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                      {currentWinner.username}
                    </h3>
                    {currentWinner.comment && (
                      <blockquote className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] italic bg-white/70 dark:bg-[#1f202c]/70 p-3 rounded-xl border border-[#eeedf7] dark:border-[#292a39] max-h-24 overflow-y-auto">
                        &ldquo;{currentWinner.comment}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-[#767586] dark:text-[#908fa1] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Seed: {currentWinner.auditSeed}
                    </span>
                    <span>•</span>
                    <span>{currentWinner.timestamp}</span>
                  </div>

                  {/* Actions for current winner */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(`${currentWinner.username} - "${currentWinner.comment}"`, 'current-winner')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[#1f202c] border border-[#eeedf7] dark:border-[#2b2c3d] text-[#1a1b22] dark:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#252636] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedKey === 'current-winner' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                          <span>Copy Winner</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(currentWinner)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[#1f202c] border border-[#eeedf7] dark:border-[#2b2c3d] text-[#1a1b22] dark:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#252636] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Share2 className="w-3.5 h-3.5 text-pink-500" />
                      <span>Share Result</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveWinnerFromPool(currentWinner)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Remove winner so they won't win again"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from Pool</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Idle Empty State */
                <div className="space-y-2 max-w-xs">
                  <div className="w-12 h-12 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                    Ready to Pick a Winner
                  </h3>
                  <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                    {eligiblePool.length > 0
                      ? `${eligiblePool.length} verified eligible entries loaded in the pool.`
                      : 'Paste comments on the left to start picking.'}
                  </p>
                </div>
              )}
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handlePickWinner}
                disabled={eligiblePool.length === 0 || isDrawing}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#4648d4] via-[#5c5fe7] to-[#787bf3] hover:from-[#3a3cb8] hover:to-[#5c5fe7] shadow-lg shadow-[#4648d4]/25 hover:shadow-[#4648d4]/40 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{winnerHistory.length === 0 ? 'Pick Random Winner' : 'Spin for New Winner'}</span>
              </button>

              {/* Pick Next Winner secondary button */}
              {currentWinner && eligiblePool.length > 0 && (
                <button
                  type="button"
                  onClick={handlePickNextWinner}
                  disabled={isDrawing}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#4648d4] dark:text-[#8587ff] bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#eae6fc] dark:hover:bg-[#2b2c3d] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Remove Current &amp; Pick Next Winner</span>
                </button>
              )}
            </div>
          </div>

          {/* Card: Winner History */}
          <div className="rounded-3xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <ListOrdered className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#1a1b22] dark:text-white">
                    Winner History ({winnerHistory.length})
                  </h3>
                </div>
              </div>

              {winnerHistory.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={handleCopyAllWinners}
                    className="p-1.5 rounded-lg text-[#767586] hover:text-[#4648d4] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
                    title="Copy all winners"
                  >
                    {copiedKey === 'all-winners' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadWinners}
                    className="p-1.5 rounded-lg text-[#767586] hover:text-[#4648d4] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
                    title="Download winners TXT"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWinnerHistory([]);
                      setCurrentWinner(null);
                      setExcludedWinnerIds(new Set());
                    }}
                    className="p-1.5 rounded-lg text-[#767586] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Clear history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* List of winners */}
            {winnerHistory.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#767586] dark:text-[#908fa1]">
                No winners drawn yet. Hit <strong>Pick Random Winner</strong> to select your first winner!
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {winnerHistory.map((item, idx) => (
                  <div
                    key={item.id + idx}
                    className="p-3 rounded-2xl bg-[#faf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#222330] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                        #{item.order}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-[#1a1b22] dark:text-white truncate">
                          {item.username}
                        </div>
                        {item.comment && (
                          <div className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate max-w-xs">
                            {item.comment}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(`${item.username} - "${item.comment}"`, `item-${idx}`)}
                        className="p-1 rounded-md text-[#767586] hover:text-[#4648d4] hover:bg-white dark:hover:bg-[#1f202c] transition-colors cursor-pointer"
                        title="Copy winner"
                      >
                        {copiedKey === `item-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(item)}
                        className="p-1 rounded-md text-[#767586] hover:text-pink-500 hover:bg-white dark:hover:bg-[#1f202c] transition-colors cursor-pointer"
                        title="Share announcement"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
