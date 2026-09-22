import { Achievement, SurpriseModifier, UserStats, WheelItem } from './types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_spin',
    title: 'First Spin',
    description: 'Trigger your very first wheel spin.',
    badgeName: 'Novice Spinner',
    icon: 'Sparkles',
    category: 'beginner',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'ten_spins',
    title: '10 Spins',
    description: 'Reach a milestone of 10 total wheel spins.',
    badgeName: 'Decisive Thinker',
    icon: 'Target',
    category: 'beginner',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 10
  },
  {
    id: 'hundred_spins',
    title: '100 Spins',
    description: 'Spin wheels 100 times across your sessions.',
    badgeName: 'Wheel Master',
    icon: 'Flame',
    category: 'master',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 100
  },
  {
    id: 'perfect_streak',
    title: 'Perfect Streak',
    description: 'Maintain an active daily spin streak of 3 consecutive days.',
    badgeName: 'Streak Legend',
    icon: 'Zap',
    category: 'streak',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 3
  },
  {
    id: 'daily_challenge',
    title: 'Daily Challenge Completed',
    description: 'Claim and complete today’s synchronized global challenge.',
    badgeName: 'Daily Champion',
    icon: 'Calendar',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'tournament_winner',
    title: 'Tournament Winner',
    description: 'Battle through 8 contenders to win the tournament crown.',
    badgeName: 'Bracket Champion',
    icon: 'Trophy',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'best_of_3',
    title: 'Best-of-3 Victor',
    description: 'Triumph in a Best-of-3 series duel.',
    badgeName: 'Series Master',
    icon: 'Award',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Execute a lightning spin using Speed Spin mode (under 2s).',
    badgeName: 'Blitz Master',
    icon: 'Gauge',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'mystery_unveiled',
    title: 'Mystery Unveiled',
    description: 'Land on and reveal a hidden slice on the Mystery Wheel.',
    badgeName: 'Secret Finder',
    icon: 'HelpCircle',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  },
  {
    id: 'battle_champion',
    title: 'Wheel Battle Champion',
    description: 'Win a 2-player head-to-head Wheel Battle.',
    badgeName: 'Duel Master',
    icon: 'Swords',
    category: 'modes',
    unlocked: false,
    currentProgress: 0,
    maxProgress: 1
  }
];

export const SURPRISE_MODIFIERS: SurpriseModifier[] = [
  {
    id: 'double_reward',
    title: 'Double Impact!',
    description: 'Multiply the outcome: double points, do it twice, or invite a teammate.',
    tag: '2x Bonus',
    type: 'double',
    accentColor: '#10b981'
  },
  {
    id: 'instant_reroll',
    title: 'Wildcard Re-roll!',
    description: 'Fate grants an immediate second spin. Choose the better of two results!',
    tag: 'Re-roll',
    type: 'reroll',
    accentColor: '#6366f1'
  },
  {
    id: 'friend_choice',
    title: 'Crowd Veto Twist!',
    description: 'The person to your left or your group has 30 seconds to veto or confirm.',
    tag: 'Social Twist',
    type: 'twist',
    accentColor: '#f59e0b'
  },
  {
    id: 'golden_slice',
    title: 'Golden Crown!',
    description: 'Flawless selection! +50 bonus karma and instant bragging rights.',
    tag: 'Jackpot',
    type: 'bonus',
    accentColor: '#ec4899'
  },
  {
    id: 'plot_twist',
    title: 'Sudden Plot Twist!',
    description: 'Pair this outcome with the runner-up option for a creative mashup!',
    tag: 'Mashup',
    type: 'twist',
    accentColor: '#8b5cf6'
  }
];

export function getRandomSurpriseModifier(): SurpriseModifier {
  const idx = Math.floor(Math.random() * SURPRISE_MODIFIERS.length);
  return SURPRISE_MODIFIERS[idx];
}

/**
 * Checks stats against achievement criteria and returns any newly unlocked achievements
 */
export function evaluateAchievements(
  currentStats: UserStats,
  currentAchievements: Achievement[]
): { updatedAchievements: Achievement[]; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];
  const updatedAchievements = currentAchievements.map((ach) => {
    if (ach.unlocked) return ach;

    let shouldUnlock = false;
    let progress = ach.currentProgress || 0;

    switch (ach.id) {
      case 'first_spin':
        progress = Math.min(1, currentStats.totalSpins);
        shouldUnlock = currentStats.totalSpins >= 1;
        break;
      case 'ten_spins':
        progress = Math.min(10, currentStats.totalSpins);
        shouldUnlock = currentStats.totalSpins >= 10;
        break;
      case 'hundred_spins':
        progress = Math.min(100, currentStats.totalSpins);
        shouldUnlock = currentStats.totalSpins >= 100;
        break;
      case 'perfect_streak':
        progress = Math.min(3, currentStats.bestDailyStreak);
        shouldUnlock = currentStats.bestDailyStreak >= 3;
        break;
      case 'daily_challenge':
        progress = Math.min(1, currentStats.dailyChallengesCompleted);
        shouldUnlock = currentStats.dailyChallengesCompleted >= 1;
        break;
      case 'tournament_winner':
        progress = Math.min(1, currentStats.tournamentsWon);
        shouldUnlock = currentStats.tournamentsWon >= 1;
        break;
      case 'best_of_3':
        progress = Math.min(1, currentStats.bestOf3Won);
        shouldUnlock = currentStats.bestOf3Won >= 1;
        break;
      case 'speed_demon':
        progress = Math.min(1, currentStats.speedSpinsCount);
        shouldUnlock = currentStats.speedSpinsCount >= 1;
        break;
      case 'mystery_unveiled':
        progress = Math.min(1, currentStats.mysteryRevealed);
        shouldUnlock = currentStats.mysteryRevealed >= 1;
        break;
      case 'battle_champion':
        progress = Math.min(1, currentStats.battlesWon);
        shouldUnlock = currentStats.battlesWon >= 1;
        break;
      default:
        break;
    }

    if (shouldUnlock && !ach.unlocked) {
      const unlockedItem: Achievement = {
        ...ach,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
        currentProgress: ach.maxProgress || 1
      };
      newlyUnlocked.push(unlockedItem);
      return unlockedItem;
    }

    return {
      ...ach,
      currentProgress: progress
    };
  });

  return { updatedAchievements, newlyUnlocked };
}
