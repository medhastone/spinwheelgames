'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  Copy,
  Check,
  Zap,
  Sliders,
  RotateCw,
  Palette,
  Shuffle,
  RefreshCw,
  Heart,
  Layers,
  Gamepad2,
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import {
  ColorData,
  ColorHarmony,
  COLOR_WHEEL_PRESETS,
  createColorData,
  generateHarmonies,
  generateRandomHex,
  shouldUseWhiteText,
  hexToRgb,
  rgbToHex,
  rgbToHsl
} from '@/lib/colors/colorUtils';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

function getRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

export type ColorWheelMode = 'single' | 'multi' | 'game';

export default function ColorWheelEngine() {
  // Mode selection
  const [activeMode, setActiveMode] = useState<ColorWheelMode>('single');
  const [multiCount, setMultiCount] = useState<number>(3); // 2 to 5 colors

  // Active wheel palette colors (Array of hex strings)
  const [wheelColors, setWheelColors] = useState<string[]>(() => {
    return COLOR_WHEEL_PRESETS[0].colors;
  });

  // State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(() => {
    return createColorData(COLOR_WHEEL_PRESETS[0].colors[0]);
  });
  const [multiResults, setMultiResults] = useState<ColorData[]>([]);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Copy feedbacks
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New color inputs
  const [inputHex, setInputHex] = useState<string>('#6366F1');

  // Game state
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameTarget, setGameTarget] = useState<{ target: ColorData; options: string[]; answer: string } | null>(null);
  const [gameAnswered, setGameAnswered] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'correct' | 'wrong' | null>(null);

  // Canvas refs
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  // Storage
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'color-wheel' || w.title.trim().toLowerCase() === 'color wheel'
  );

  // Computed harmonies for the selected color
  const activeHarmonies: ColorHarmony[] = selectedColor ? generateHarmonies(selectedColor) : [];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'color-wheel',
      title: 'Color Wheel',
      category: 'Art & Design',
      description: 'Spin the random color wheel to pick random colors, generate dynamic harmonies (Complementary, Triadic, Analogous), and copy HEX, RGB, and HSL.',
      items: wheelColors.map((hex, idx) => ({ id: `c-${idx}`, text: hex, weight: 1 })),
      paletteKey: 'vibrant'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Color Wheel to Favorites!' : 'Removed from Favorites');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Canvas Wheel Drawing
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, width, height);

    if (wheelColors.length === 0) return;

    const numSlices = wheelColors.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Draw outer subtle rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.fill();
    ctx.restore();

    // Draw Slices in their actual true colors
    wheelColors.forEach((hex, i) => {
      const startAngle = currentAngleRef.current + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = hex;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Slice label (HEX code with auto contrast text)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';

      const isWhiteText = shouldUseWhiteText(hex);
      ctx.fillStyle = isWhiteText ? '#ffffff' : '#111827';
      ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';

      if (isWhiteText) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 3;
      } else {
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 3;
      }

      ctx.fillText(hex, radius - 18, 4);
      ctx.restore();

      ctx.restore();
    });

    // Outer border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // Center Hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = selectedColor ? selectedColor.hex : '#4648d4';
    ctx.fill();

    ctx.fillStyle = selectedColor && shouldUseWhiteText(selectedColor.hex) ? '#ffffff' : '#111827';
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
    ctx.restore();
  }, [wheelColors, selectedColor]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin Wheel Physics
  const handleSpin = () => {
    if (isSpinning || wheelColors.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsSpinning(true);

    const winningIndex = getRandomIndex(wheelColors.length);
    const numSlices = wheelColors.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const topPointerOffset = -Math.PI / 2;

    const currentNormalized = currentAngleRef.current % (2 * Math.PI);
    const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetAngle =
      topPointerOffset - sliceCenterAngle + extraRounds * 2 * Math.PI;

    const startAngle = currentNormalized;
    const deltaAngle = targetAngle - startAngle;

    const duration = 3800;
    const startTime = performance.now();
    let lastSoundSlice = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const newAngle = startAngle + deltaAngle * ease;
      currentAngleRef.current = newAngle;

      const currentSlice = Math.floor(
        ((newAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)) / sliceAngle
      );
      if (currentSlice !== lastSoundSlice) {
        lastSoundSlice = currentSlice;
        if (soundEnabled) playTickSound();
        setNeedleAngle(18);
        setTimeout(() => setNeedleAngle(0), 60);
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winHex = wheelColors[winningIndex];
        const winnerData = createColorData(winHex);
        setSelectedColor(winnerData);

        // If in multiple colors mode, draw additional distinct colors
        if (activeMode === 'multi') {
          const drawn: ColorData[] = [winnerData];
          const remaining = wheelColors.filter((h) => h !== winHex);
          const needed = Math.min(multiCount, wheelColors.length);
          while (drawn.length < needed && remaining.length > 0) {
            const idx = Math.floor(Math.random() * remaining.length);
            drawn.push(createColorData(remaining.splice(idx, 1)[0]));
          }
          setMultiResults(drawn);
        }

        if (soundEnabled) playWinnerFanfare();
        confetti();
      }
    };

    requestAnimationFrame(animate);
  };

  // Quick Random Color Generator (Pure random Hex spin)
  const handlePureRandomColor = () => {
    if (soundEnabled) playClickSound();
    const randHex = generateRandomHex();
    const data = createColorData(randHex);
    setSelectedColor(data);
    if (!wheelColors.includes(randHex)) {
      setWheelColors((prev) => [randHex, ...prev.slice(0, 11)]);
    }
    setToastMsg(`Generated pure random color: ${randHex}`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Apply harmony palette directly to the wheel
  const handleApplyHarmonyToWheel = (harmony: ColorHarmony) => {
    if (soundEnabled) playClickSound();
    const newColors = harmony.colors.map((c) => c.hex);
    setWheelColors(newColors);
    setToastMsg(`Loaded ${harmony.label} (${newColors.length} colors) to Wheel!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Add custom color
  const handleAddColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputHex) return;
    let clean = inputHex.trim();
    if (!clean.startsWith('#')) clean = `#${clean}`;
    if (!/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      setToastMsg('Please enter a valid 6-character hex code (e.g. #FF5500)');
      setTimeout(() => setToastMsg(null), 2200);
      return;
    }
    const upper = clean.toUpperCase();
    if (wheelColors.includes(upper)) {
      setToastMsg('Color is already in wheel!');
      setTimeout(() => setToastMsg(null), 1800);
      return;
    }
    setWheelColors((prev) => [...prev, upper]);
    setSelectedColor(createColorData(upper));
    if (soundEnabled) playClickSound();
    setToastMsg(`Added ${upper} to wheel!`);
    setTimeout(() => setToastMsg(null), 1800);
  };

  // Remove color
  const handleRemoveColor = (hex: string) => {
    if (wheelColors.length <= 2) {
      setToastMsg('Wheel must have at least 2 colors');
      setTimeout(() => setToastMsg(null), 1800);
      return;
    }
    setWheelColors((prev) => prev.filter((c) => c !== hex));
  };

  // Shuffle colors
  const handleShuffle = () => {
    if (soundEnabled) playClickSound();
    setWheelColors((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  // Start / Next Question in Color Game Mode
  const initGameQuestion = useCallback(() => {
    const baseHex = wheelColors[Math.floor(Math.random() * wheelColors.length)] || '#FF0055';
    const baseData = createColorData(baseHex);
    const compHex = createColorData(
      rgbToHex(255 - baseData.r, 255 - baseData.g, 255 - baseData.b)
    ).hex;

    // Distractors
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const rand = generateRandomHex();
      if (rand !== compHex && !distractors.includes(rand)) {
        distractors.push(rand);
      }
    }

    const options = [compHex, ...distractors].sort(() => Math.random() - 0.5);
    setGameTarget({ target: baseData, options, answer: compHex });
    setGameAnswered(false);
    setGameResult(null);
  }, [wheelColors]);

  useEffect(() => {
    if (activeMode === 'game' && !gameTarget) {
      initGameQuestion();
    }
  }, [activeMode, gameTarget, initGameQuestion]);

  const handleGameAnswer = (chosenHex: string) => {
    if (gameAnswered || !gameTarget) return;
    setGameAnswered(true);
    if (chosenHex.toUpperCase() === gameTarget.answer.toUpperCase()) {
      setGameResult('correct');
      setGameScore((s) => s + 10);
      if (soundEnabled) playWinnerFanfare();
      confetti();
    } else {
      setGameResult('wrong');
      if (soundEnabled) playClickSound();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`bg-white dark:bg-[#181922] text-[#1a1b22] dark:text-white rounded-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 sm:p-5 shadow-sm transition-colors relative ${
        isFullscreen ? 'fixed inset-0 z-50 p-6 overflow-y-auto min-h-screen rounded-none' : ''
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Control & Toolbar Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xs sm:text-sm">Color Wheel &amp; Palette Generator</h2>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove from favorites' : 'Save to favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Game to Profile Favorites'}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 scale-105'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {wheelColors.length} active hues on the spinner
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Pure Random Button */}
          <button
            onClick={handlePureRandomColor}
            className="px-2.5 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            title="Generate a 100% pure random hexadecimal color"
          >
            <Shuffle className="w-3 h-3" />
            <span>Random Color</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              if (!isFullscreen) {
                containerRef.current?.requestFullscreen?.();
                setIsFullscreen(true);
              } else {
                document.exitFullscreen?.();
                setIsFullscreen(false);
              }
            }}
            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveMode('single')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
            activeMode === 'single'
              ? 'bg-[#4648d4] text-white border-[#4648d4] shadow-sm'
              : 'bg-white dark:bg-[#12131a] text-slate-700 dark:text-slate-300 border-[#eeedf7] dark:border-[#292a39] hover:border-indigo-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Single Color Spinner</span>
        </button>

        <button
          onClick={() => setActiveMode('multi')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
            activeMode === 'multi'
              ? 'bg-[#4648d4] text-white border-[#4648d4] shadow-sm'
              : 'bg-white dark:bg-[#12131a] text-slate-700 dark:text-slate-300 border-[#eeedf7] dark:border-[#292a39] hover:border-indigo-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Multiple Colors ({multiCount})</span>
        </button>

        <button
          onClick={() => setActiveMode('game')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
            activeMode === 'game'
              ? 'bg-[#4648d4] text-white border-[#4648d4] shadow-sm'
              : 'bg-white dark:bg-[#12131a] text-slate-700 dark:text-slate-300 border-[#eeedf7] dark:border-[#292a39] hover:border-indigo-300'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Color Wheel Game {gameScore > 0 && `(${gameScore} pts)`}</span>
        </button>

        {activeMode === 'multi' && (
          <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800">
            <span className="text-[11px] text-slate-500">Pick:</span>
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => setMultiCount(count)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                  multiCount === count
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preset Palettes Quick Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="font-bold flex items-center gap-1 shrink-0 text-[#4648d4] dark:text-[#8587ff]">
          <Flame className="w-3 h-3" />
          <span>Palette Presets:</span>
        </span>
        {COLOR_WHEEL_PRESETS.map((preset) => {
          const isSelected =
            wheelColors.length === preset.colors.length &&
            wheelColors[0] === preset.colors[0];
          return (
            <button
              key={preset.id}
              onClick={() => {
                setWheelColors(preset.colors);
                setSelectedColor(createColorData(preset.colors[0]));
                if (soundEnabled) playClickSound();
                setToastMsg(`Loaded "${preset.name}" preset!`);
                setTimeout(() => setToastMsg(null), 1800);
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-600 dark:text-indigo-300 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#12131a] dark:hover:bg-[#1c1d29] border-[#eeedf7] dark:border-[#292a39] text-slate-700 dark:text-slate-300'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/50"
                style={{ backgroundColor: preset.colors[0] }}
              />
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Spinner & Display Area */}
      {activeMode === 'game' ? (
        /* COLOR WHEEL GAME MODE */
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Interactive Color Wheel Game
              </span>
              <h3 className="text-lg font-black text-[#1a1b22] dark:text-white">
                Complementary Color Challenge
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-xs">
              Score: {gameScore}
            </div>
          </div>

          {gameTarget && (
            <div className="space-y-4 max-w-xl mx-auto text-center py-2">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                What is the exact 180° complementary match for this color on the color wheel?
              </p>

              {/* Target Swatch */}
              <div
                className="w-28 h-28 mx-auto rounded-2xl shadow-md border-2 border-white flex items-center justify-center font-black text-xs transition-transform hover:scale-105"
                style={{
                  backgroundColor: gameTarget.target.hex,
                  color: shouldUseWhiteText(gameTarget.target.hex) ? '#ffffff' : '#000000'
                }}
              >
                {gameTarget.target.hex}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {gameTarget.options.map((optHex, idx) => {
                  const isSelected = gameAnswered && optHex === gameTarget.answer;
                  const isWrong = gameAnswered && gameResult === 'wrong';

                  return (
                    <button
                      key={idx}
                      disabled={gameAnswered}
                      onClick={() => handleGameAnswer(optHex)}
                      className="p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer hover:shadow-md disabled:cursor-default"
                      style={{
                        borderColor: isSelected ? '#10b981' : isWrong ? '#ef4444' : '#cbd5e1'
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-xs border border-white"
                        style={{ backgroundColor: optHex }}
                      />
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                        {optHex}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Result banner */}
              {gameAnswered && (
                <div className="pt-2 animate-in fade-in duration-200 space-y-2">
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold ${
                      gameResult === 'correct'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {gameResult === 'correct'
                      ? '🎉 Correct! Opposite hues produce maximum visual harmony.'
                      : `Nice try! The true complementary hue is ${gameTarget.answer}.`}
                  </div>
                  <button
                    onClick={initGameQuestion}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* STANDARD & MULTI-COLOR MODES */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start mb-4">
          {/* Canvas & Pointer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[min(90vw,330px)] sm:max-w-[360px] aspect-square flex items-center justify-center p-2 touch-manipulation">
              {/* Pointer / Needle */}
              <div
                className="absolute top-1 z-30 transition-transform duration-75 origin-bottom"
                style={{ transform: `rotate(${needleAngle}deg)` }}
              >
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-md" />
              </div>

              <canvas
                ref={wheelCanvasRef}
                width={480}
                height={480}
                className="w-full h-full cursor-pointer rounded-full shadow-lg transition-transform active:scale-[0.99] touch-manipulation"
                onClick={handleSpin}
              />
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || wheelColors.length === 0}
              className="mt-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>
                {isSpinning
                  ? 'SPINNING COLOR...'
                  : activeMode === 'multi'
                  ? `SPIN ${multiCount} RANDOM COLORS`
                  : 'SPIN COLOR WHEEL'}
              </span>
            </button>
          </div>

          {/* Right Column: Values Card (HEX, RGB, HSL Simultaneous Display + 1-Click Copy) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Multiple Colors Swatches (If multi mode is active) */}
            {activeMode === 'multi' && multiResults.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Spun Multiple Colors Palette ({multiResults.length})
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        multiResults.map((c) => c.hex).join(', '),
                        'multi-all'
                      )
                    }
                    className="text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'multi-all' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'multi-all' ? 'Copied All!' : 'Copy All HEX'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {multiResults.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#181922] flex flex-col items-center gap-1.5 cursor-pointer hover:border-purple-400 transition-colors"
                    >
                      <div
                        className="w-full h-10 rounded-md border border-white/40 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-mono text-[11px] font-bold">{c.hex}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Color Showcase Card */}
            {selectedColor && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Live Color Swatch */}
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl shadow-md border-2 border-white dark:border-slate-800 shrink-0 flex items-center justify-center transition-transform hover:scale-105"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        Selected Hue
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#1a1b22] dark:text-white leading-tight">
                        {selectedColor.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Luminance: {shouldUseWhiteText(selectedColor.hex) ? 'Dark background' : 'Light background'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `${selectedColor.hex}\n${selectedColor.rgb}\n${selectedColor.hsl}`,
                        'copy-all'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#181922] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-purple-600 flex items-center gap-1 shadow-2xs transition-colors cursor-pointer shrink-0"
                  >
                    {copiedKey === 'copy-all' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'copy-all' ? 'Copied All!' : 'Copy All'}</span>
                  </button>
                </div>

                {/* Simultaneous HEX, RGB, HSL Display (Requested by User) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-[#eeedf7] dark:border-[#292a39]">
                  {/* HEX */}
                  <div className="p-2 rounded-lg bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">HEX</div>
                      <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                        {selectedColor.hex}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedColor.hex, 'hex')}
                      className="p-1 rounded text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                      title="Copy HEX"
                    >
                      {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* RGB */}
                  <div className="p-2 rounded-lg bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">RGB</div>
                      <div className="font-mono text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                        {selectedColor.rgb}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedColor.rgb, 'rgb')}
                      className="p-1 rounded text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                      title="Copy RGB"
                    >
                      {copiedKey === 'rgb' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* HSL */}
                  <div className="p-2 rounded-lg bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">HSL</div>
                      <div className="font-mono text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                        {selectedColor.hsl}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedColor.hsl, 'hsl')}
                      className="p-1 rounded text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                      title="Copy HSL"
                    >
                      {copiedKey === 'hsl' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Harmony Palettes (Spin a color and automatically generate its harmony palette) */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Automatically Generated Harmony Palettes</span>
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Calculated in real-time from {selectedColor ? selectedColor.hex : 'selected hue'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeHarmonies.map((harmony) => (
                  <div
                    key={harmony.type}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] space-y-2 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1a1b22] dark:text-white">
                        {harmony.label}
                      </span>
                      <button
                        onClick={() => handleApplyHarmonyToWheel(harmony)}
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-0.5"
                        title="Load this harmony palette onto the wheel"
                      >
                        <span>Apply to Wheel</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Swatches strip */}
                    <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 h-7">
                      {harmony.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedColor(c);
                            handleCopy(c.hex, `harm-${harmony.type}-${idx}`);
                          }}
                          className="flex-1 h-full relative group cursor-pointer transition-transform hover:opacity-90"
                          style={{ backgroundColor: c.hex }}
                          title={`Click to copy ${c.hex}`}
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono text-white bg-black/40">
                            {copiedKey === `harm-${harmony.type}-${idx}` ? '✓' : c.hex.slice(1, 4)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {harmony.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Palette Editor (Add / Delete colors on the wheel) */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#1a1b22] dark:text-white">
                    Customize Colors on Spinner
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Add new HEX codes or remove existing slices
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleShuffle}
                    className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Shuffle wheel slice order"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddColor} className="flex items-center gap-1.5 pt-1">
                <input
                  type="color"
                  aria-label="Pick wheel slice color"
                  value={inputHex}
                  onChange={(e) => setInputHex(e.target.value.toUpperCase())}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0"
                />
                <input
                  type="text"
                  aria-label="Hex color code"
                  placeholder="#6366F1"
                  value={inputHex}
                  onChange={(e) => setInputHex(e.target.value)}
                  className="w-28 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#181922] text-xs font-mono uppercase text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Wheel</span>
                </button>
              </form>

              {/* Slices chip list */}
              <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto">
                {wheelColors.map((hex, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-[11px]"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="font-mono text-slate-700 dark:text-slate-300">{hex}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(hex)}
                      className="p-0.5 text-slate-500 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                      title="Remove color"
                      aria-label={`Remove color ${hex}`}
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
