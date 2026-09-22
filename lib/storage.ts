import { useSyncExternalStore } from 'react';
import { WheelConfig, SoundSettings, DailyChallengeState, WheelMode, UserStats, Achievement, WheelItem } from './types';
import { INITIAL_ACHIEVEMENTS, evaluateAchievements } from './gamification';

const STORAGE_KEYS = {
  PREFERENCES: 'spinwheel_preferences',
  CUSTOM_WHEELS: 'spinwheel_custom_wheels',
  ACTIVE_WHEEL: 'spinwheel_active_wheel',
  SOUND_SETTINGS: 'spinwheel_sound_settings',
  DAILY_CHALLENGE: 'spinwheel_daily_challenge',
  STATS: 'spinwheel_user_stats',
  ACHIEVEMENTS: 'spinwheel_user_achievements',
  FAVORITE_WHEELS: 'spinwheel_favorite_wheels'
};

export interface AppPreferences {
  duration: number; // in seconds (2 to 15)
  countdown: boolean;
  eliminationMode: boolean;
  themePaletteKey: string;
  mysteryMode: boolean;
  mode: WheelMode;
}

export const DEFAULT_PREFERENCES: AppPreferences = {
  duration: 6,
  countdown: false,
  eliminationMode: false,
  themePaletteKey: 'arcade',
  mysteryMode: false,
  mode: 'standard'
};

export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  enabled: true,
  pack: 'carnival',
  volume: 0.8,
  ttsEnabled: true
};

export interface SavedWheel {
  id: string;
  title: string;
  category?: string;
  description?: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
  savedAt: string;
}

export const INITIAL_SAVED_WHEELS: SavedWheel[] = [
  {
    id: 'fav-yes-no',
    title: 'Ultimate Yes or No Decision Wheel',
    category: 'Decisions',
    description: 'Quick-fire arbitration for rapid choices.',
    paletteKey: 'neon',
    palette: ['#4648d4', '#dc2c4f', '#006c49', '#6063ee', '#b90538', '#6cf8bb'],
    savedAt: '2026-09-01T12:00:00.000Z',
    items: [
      { id: 'fav-yn-1', text: '✅ Absolute Yes', weight: 1 },
      { id: 'fav-yn-2', text: '❌ Definite No', weight: 1 },
      { id: 'fav-yn-3', text: '🤔 Maybe Later', weight: 1 },
      { id: 'fav-yn-4', text: '🎯 100% Yes', weight: 1 },
      { id: 'fav-yn-5', text: '🚫 Hard Pass', weight: 1 }
    ]
  },
  {
    id: 'fav-names',
    title: 'Classroom Name Picker & Caller',
    category: 'Classroom',
    description: 'Fair, bias-free student name selection.',
    paletteKey: 'candy',
    palette: ['#006c49', '#6063ee', '#dc2c4f', '#10b981', '#3b82f6', '#f59e0b'],
    savedAt: '2026-09-02T14:30:00.000Z',
    items: [
      { id: 'fav-nm-1', text: 'Emily Rodriguez', weight: 1 },
      { id: 'fav-nm-2', text: 'Lucas Thompson', weight: 1 },
      { id: 'fav-nm-3', text: 'Zoe Martinez', weight: 1 },
      { id: 'fav-nm-4', text: 'David Kim', weight: 1 },
      { id: 'fav-nm-5', text: 'Chloe Patel', weight: 1 }
    ]
  },
  {
    id: 'fav-food',
    title: 'Dinner Decision Decider',
    category: 'Food',
    description: 'Instant resolution for what to eat tonight.',
    paletteKey: 'arcade',
    palette: ['#dc2c4f', '#6063ee', '#f97316', '#006c49', '#8b5cf6', '#eab308'],
    savedAt: '2026-09-03T18:45:00.000Z',
    items: [
      { id: 'fav-fd-1', text: '🍕 Artisanal Pizza', weight: 1 },
      { id: 'fav-fd-2', text: '🍣 Fresh Sushi & Rolls', weight: 1 },
      { id: 'fav-fd-3', text: '🌮 Street Tacos', weight: 1 },
      { id: 'fav-fd-4', text: '🥗 Mediterranean Salad', weight: 1 },
      { id: 'fav-fd-5', text: '🍜 Steaming Ramen', weight: 1 }
    ]
  }
];

function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // LocalStorage quota or privacy mode exception
  }
}

export function loadPreferences(): AppPreferences {
  return { ...DEFAULT_PREFERENCES, ...safeGetItem<Partial<AppPreferences>>(STORAGE_KEYS.PREFERENCES, {}) };
}

export function savePreferences(prefs: Partial<AppPreferences>): void {
  const current = loadPreferences();
  safeSetItem(STORAGE_KEYS.PREFERENCES, { ...current, ...prefs });
}

export function loadSoundSettings(): SoundSettings {
  return { ...DEFAULT_SOUND_SETTINGS, ...safeGetItem<Partial<SoundSettings>>(STORAGE_KEYS.SOUND_SETTINGS, {}) };
}

export function saveSoundSettings(settings: SoundSettings): void {
  safeSetItem(STORAGE_KEYS.SOUND_SETTINGS, settings);
}

export function loadCustomWheels(): WheelConfig[] {
  return safeGetItem<WheelConfig[]>(STORAGE_KEYS.CUSTOM_WHEELS, []);
}

export function saveCustomWheels(wheels: WheelConfig[]): void {
  safeSetItem(STORAGE_KEYS.CUSTOM_WHEELS, wheels);
}

// ==========================================
// SAVED / FAVORITE WHEELS REPOSITORY
// ==========================================

// In-memory cache for useSyncExternalStore stability
let _cachedFavoritesSnapshot: SavedWheel[] = INITIAL_SAVED_WHEELS;
let _cachedFavoritesRaw: string | null = null;
let _hasInitializedFavoritesCache = false;

function refreshFavoritesCache(): SavedWheel[] {
  if (typeof window === 'undefined') {
    return INITIAL_SAVED_WHEELS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITE_WHEELS);
    if (raw === _cachedFavoritesRaw && _hasInitializedFavoritesCache) {
      return _cachedFavoritesSnapshot;
    }
    _cachedFavoritesRaw = raw;
    _hasInitializedFavoritesCache = true;
    if (!raw) {
      _cachedFavoritesSnapshot = INITIAL_SAVED_WHEELS;
      safeSetItem(STORAGE_KEYS.FAVORITE_WHEELS, INITIAL_SAVED_WHEELS);
      return _cachedFavoritesSnapshot;
    }
    const parsed = JSON.parse(raw);
    _cachedFavoritesSnapshot = Array.isArray(parsed) ? parsed : INITIAL_SAVED_WHEELS;
    return _cachedFavoritesSnapshot;
  } catch {
    _cachedFavoritesSnapshot = INITIAL_SAVED_WHEELS;
    return _cachedFavoritesSnapshot;
  }
}

export function getSavedWheelsSnapshot(): SavedWheel[] {
  return refreshFavoritesCache();
}

export function getSavedWheelsServerSnapshot(): SavedWheel[] {
  return INITIAL_SAVED_WHEELS;
}

export function loadSavedWheels(): SavedWheel[] {
  return refreshFavoritesCache();
}

export function saveWheelToFavorites(wheel: {
  id?: string;
  title: string;
  category?: string;
  description?: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
}): boolean {
  const current = loadSavedWheels();
  const cleanTitle = wheel.title.trim().toLowerCase();
  const existingIdx = current.findIndex(
    (w) => (wheel.id && w.id === wheel.id) || w.title.trim().toLowerCase() === cleanTitle
  );

  const newSavedItem: SavedWheel = {
    id: wheel.id || `saved-${Date.now()}`,
    title: wheel.title.trim(),
    category: wheel.category || 'Custom',
    description: wheel.description || `${wheel.items.length} options spin wheel`,
    items: wheel.items.map((it, i) => ({
      id: it.id || `it-${i}`,
      text: it.text,
      weight: it.weight || 1,
      color: it.color
    })),
    paletteKey: wheel.paletteKey,
    palette: wheel.palette,
    savedAt: new Date().toISOString()
  };

  let updated: SavedWheel[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = newSavedItem;
  } else {
    updated = [newSavedItem, ...current];
  }

  _cachedFavoritesSnapshot = updated;
  _cachedFavoritesRaw = JSON.stringify(updated);
  _hasInitializedFavoritesCache = true;
  safeSetItem(STORAGE_KEYS.FAVORITE_WHEELS, updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('spinwheel_favorites_updated'));
  }
  return true;
}

export function removeSavedWheel(idOrTitle: string): void {
  const current = loadSavedWheels();
  const cleanTarget = idOrTitle.trim().toLowerCase();
  const updated = current.filter(
    (w) => w.id !== idOrTitle && w.title.trim().toLowerCase() !== cleanTarget
  );
  _cachedFavoritesSnapshot = updated;
  _cachedFavoritesRaw = JSON.stringify(updated);
  _hasInitializedFavoritesCache = true;
  safeSetItem(STORAGE_KEYS.FAVORITE_WHEELS, updated);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('spinwheel_favorites_updated'));
  }
}

export function isWheelSaved(idOrTitle: string): boolean {
  if (!idOrTitle) return false;
  const current = loadSavedWheels();
  const clean = idOrTitle.trim().toLowerCase();
  return current.some((w) => w.id === idOrTitle || w.title.trim().toLowerCase() === clean);
}

export function toggleWheelFavorite(wheel: {
  id?: string;
  title: string;
  category?: string;
  description?: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
}): boolean {
  if (isWheelSaved(wheel.id || wheel.title)) {
    removeSavedWheel(wheel.id || wheel.title);
    return false; // Now unsaved
  } else {
    saveWheelToFavorites(wheel);
    return true; // Now saved
  }
}

export function subscribeSavedWheels(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('spinwheel_favorites_updated', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('spinwheel_favorites_updated', callback);
    window.removeEventListener('storage', callback);
  };
}

export function useSavedWheels(): SavedWheel[] {
  return useSyncExternalStore(
    subscribeSavedWheels,
    getSavedWheelsSnapshot,
    getSavedWheelsServerSnapshot
  );
}

export function loadDailyChallenge(dateKey: string): DailyChallengeState {
  const fallback: DailyChallengeState = {
    dateKey,
    completed: false,
    spunResult: null,
    streakCount: 0,
    lastSpunDate: null
  };
  const stored = safeGetItem<DailyChallengeState>(STORAGE_KEYS.DAILY_CHALLENGE, fallback);
  if (stored.dateKey !== dateKey) {
    // New day: maintain streak if lastSpunDate was yesterday, otherwise reset streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const isConsecutive = stored.lastSpunDate === yesterdayStr;

    return {
      dateKey,
      completed: false,
      spunResult: null,
      streakCount: isConsecutive ? stored.streakCount : 0,
      lastSpunDate: stored.lastSpunDate
    };
  }
  return stored;
}

export function saveDailyChallenge(state: DailyChallengeState): void {
  safeSetItem(STORAGE_KEYS.DAILY_CHALLENGE, state);
}

export const DEFAULT_USER_STATS: UserStats = {
  totalSpins: 0,
  currentDailyStreak: 7,
  bestDailyStreak: 14,
  currentSessionStreak: 0,
  bestSessionStreak: 0,
  dailyChallengesCompleted: 3,
  gamesCompleted: 5,
  tournamentsWon: 1,
  bestOf3Won: 2,
  battlesWon: 1,
  mysteryRevealed: 0,
  speedSpinsCount: 0,
  favoriteWheelTitle: 'Quick Food Decider',
  wheelSpinCounts: {},
  lastSpinDate: null
};

export function loadUserStats(): UserStats {
  const stored = safeGetItem<Partial<UserStats>>(STORAGE_KEYS.STATS, {});
  return { ...DEFAULT_USER_STATS, ...stored };
}

export function saveUserStats(stats: UserStats): void {
  safeSetItem(STORAGE_KEYS.STATS, stats);
}

export function loadAchievements(): Achievement[] {
  const stored = safeGetItem<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
  if (!stored || stored.length === 0) {
    return INITIAL_ACHIEVEMENTS;
  }
  return INITIAL_ACHIEVEMENTS.map((initial) => {
    const existing = stored.find((s) => s.id === initial.id);
    return existing || initial;
  });
}

export function saveAchievements(achievements: Achievement[]): void {
  safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, achievements);
}

export function recordSpinInStats(
  wheelTitle: string,
  isSpeedSpin = false,
  isMystery = false
): { stats: UserStats; newlyUnlocked: Achievement[] } {
  const currentStats = loadUserStats();
  const todayStr = new Date().toISOString().split('T')[0];

  let newDailyStreak = currentStats.currentDailyStreak || 0;
  if (!currentStats.lastSpinDate) {
    newDailyStreak = Math.max(1, newDailyStreak);
  } else if (currentStats.lastSpinDate !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (currentStats.lastSpinDate === yesterdayStr) {
      newDailyStreak += 1;
    } else {
      newDailyStreak = 1;
    }
  }

  const bestDailyStreak = Math.max(currentStats.bestDailyStreak || 0, newDailyStreak);
  const newSessionStreak = (currentStats.currentSessionStreak || 0) + 1;
  const bestSessionStreak = Math.max(currentStats.bestSessionStreak || 0, newSessionStreak);

  const wheelCounts = { ...(currentStats.wheelSpinCounts || {}) };
  wheelCounts[wheelTitle] = (wheelCounts[wheelTitle] || 0) + 1;

  let topWheelTitle = currentStats.favoriteWheelTitle || wheelTitle;
  let topCount = 0;
  for (const [title, count] of Object.entries(wheelCounts)) {
    if (count > topCount) {
      topCount = count;
      topWheelTitle = title;
    }
  }

  const updatedStats: UserStats = {
    ...currentStats,
    totalSpins: (currentStats.totalSpins || 0) + 1,
    currentDailyStreak: newDailyStreak,
    bestDailyStreak,
    currentSessionStreak: newSessionStreak,
    bestSessionStreak,
    lastSpinDate: todayStr,
    wheelSpinCounts: wheelCounts,
    favoriteWheelTitle: topWheelTitle,
    speedSpinsCount: (currentStats.speedSpinsCount || 0) + (isSpeedSpin ? 1 : 0),
    mysteryRevealed: (currentStats.mysteryRevealed || 0) + (isMystery ? 1 : 0)
  };

  saveUserStats(updatedStats);

  const currentAch = loadAchievements();
  const { updatedAchievements, newlyUnlocked } = evaluateAchievements(updatedStats, currentAch);
  saveAchievements(updatedAchievements);

  return { stats: updatedStats, newlyUnlocked };
}

export function recordTournamentWin(): { stats: UserStats; newlyUnlocked: Achievement[] } {
  const currentStats = loadUserStats();
  const updatedStats: UserStats = {
    ...currentStats,
    tournamentsWon: (currentStats.tournamentsWon || 0) + 1,
    gamesCompleted: (currentStats.gamesCompleted || 0) + 1
  };
  saveUserStats(updatedStats);

  const currentAch = loadAchievements();
  const { updatedAchievements, newlyUnlocked } = evaluateAchievements(updatedStats, currentAch);
  saveAchievements(updatedAchievements);

  return { stats: updatedStats, newlyUnlocked };
}

export function recordBestOf3Win(): { stats: UserStats; newlyUnlocked: Achievement[] } {
  const currentStats = loadUserStats();
  const updatedStats: UserStats = {
    ...currentStats,
    bestOf3Won: (currentStats.bestOf3Won || 0) + 1,
    gamesCompleted: (currentStats.gamesCompleted || 0) + 1
  };
  saveUserStats(updatedStats);

  const currentAch = loadAchievements();
  const { updatedAchievements, newlyUnlocked } = evaluateAchievements(updatedStats, currentAch);
  saveAchievements(updatedAchievements);

  return { stats: updatedStats, newlyUnlocked };
}

export function recordBattleWin(): { stats: UserStats; newlyUnlocked: Achievement[] } {
  const currentStats = loadUserStats();
  const updatedStats: UserStats = {
    ...currentStats,
    battlesWon: (currentStats.battlesWon || 0) + 1,
    gamesCompleted: (currentStats.gamesCompleted || 0) + 1
  };
  saveUserStats(updatedStats);

  const currentAch = loadAchievements();
  const { updatedAchievements, newlyUnlocked } = evaluateAchievements(updatedStats, currentAch);
  saveAchievements(updatedAchievements);

  return { stats: updatedStats, newlyUnlocked };
}

export function recordDailyChallengeComplete(): { stats: UserStats; newlyUnlocked: Achievement[] } {
  const currentStats = loadUserStats();
  const updatedStats: UserStats = {
    ...currentStats,
    dailyChallengesCompleted: (currentStats.dailyChallengesCompleted || 0) + 1,
    gamesCompleted: (currentStats.gamesCompleted || 0) + 1
  };
  saveUserStats(updatedStats);

  const currentAch = loadAchievements();
  const { updatedAchievements, newlyUnlocked } = evaluateAchievements(updatedStats, currentAch);
  saveAchievements(updatedAchievements);

  return { stats: updatedStats, newlyUnlocked };
}

export function resetGamificationData(): void {
  safeSetItem(STORAGE_KEYS.STATS, DEFAULT_USER_STATS);
  safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
}
