export type WheelMode = 
  | 'standard'
  | 'elimination'
  | 'weighted'
  | 'mystery'
  | 'multi'
  | 'tournament'
  | 'challenge'
  | 'best-of-3'
  | 'battle';

export interface WheelItem {
  id: string;
  text: string;
  weight: number; // Positive integer/float relative weight (default 1)
  color?: string;
  mysteryLabel?: string;
}

export interface WheelConfig {
  id: string;
  title: string;
  category: string;
  description: string;
  items: WheelItem[];
  palette: string[];
  themeKey?: string;
  duration?: number;
  countdown?: boolean;
}

export interface SpinLogItem {
  id: string;
  spinNumber: number;
  time: string;
  itemText: string;
  seed: string;
  oddsPercent: string;
  mode?: WheelMode;
}

export type SoundPack = 'carnival' | 'arcade' | 'ratchet' | 'chime';

export interface SoundSettings {
  enabled: boolean;
  pack: SoundPack;
  volume: number; // 0 to 1
  ttsEnabled: boolean;
}

export interface TournamentMatch {
  id: string;
  round: number; // 1, 2, 3, etc.
  matchIndex: number;
  itemA: WheelItem | null;
  itemB: WheelItem | null;
  winner: WheelItem | null;
  isSpinning?: boolean;
}

export interface DailyChallengeState {
  dateKey: string; // YYYY-MM-DD
  completed: boolean;
  spunResult: WheelItem | null;
  streakCount: number;
  lastSpunDate: string | null;
}

// Repeat-Use & Gamification Models
export interface UserStats {
  totalSpins: number;
  currentDailyStreak: number;
  bestDailyStreak: number;
  currentSessionStreak: number;
  bestSessionStreak: number;
  dailyChallengesCompleted: number;
  gamesCompleted: number;
  tournamentsWon: number;
  bestOf3Won: number;
  battlesWon: number;
  mysteryRevealed: number;
  speedSpinsCount: number;
  favoriteWheelTitle: string;
  wheelSpinCounts: Record<string, number>;
  lastSpinDate: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeName: string;
  icon: string;
  category: 'beginner' | 'streak' | 'master' | 'modes';
  unlocked: boolean;
  unlockedAt?: string;
  currentProgress?: number;
  maxProgress?: number;
}

export interface SurpriseModifier {
  id: string;
  title: string;
  description: string;
  tag: string;
  type: 'double' | 'reroll' | 'twist' | 'bonus' | 'veto';
  accentColor: string;
}

export interface ResultCardData {
  winner: string;
  score?: string;
  streak: number;
  challengeName: string;
  oddsPercent: string;
  seed: string;
  brand: string;
  shareUrl: string;
  modifier?: SurpriseModifier | null;
  modeLabel?: string;
}

export interface BestOfThreeSeries {
  itemA: WheelItem;
  itemB: WheelItem;
  scoreA: number;
  scoreB: number;
  currentRound: number;
  roundHistory: { round: number; winner: WheelItem }[];
  champion: WheelItem | null;
  targetWins: number;
}
