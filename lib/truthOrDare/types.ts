export type PromptType = 'truth' | 'dare';

export type AudienceMode = 'clean' | 'friends' | 'party';

export type DifficultyLevel = 'all' | 'mild' | 'medium' | 'extreme';

export type SpinStage = 'stage1-fate' | 'stage2-prompt' | 'ready';

export type GameMode = 'two-stage' | 'mixed' | 'truth-only' | 'dare-only';

export interface TruthOrDarePrompt {
  id: string;
  type: PromptType;
  text: string;
  audience: AudienceMode;
  difficulty: 'mild' | 'medium' | 'extreme';
  category?: string;
  suggestedTimerSeconds?: number;
  isCustom?: boolean;
}

export interface ForfeitPenalty {
  id: string;
  text: string;
  category: string;
}

export interface GameTurnRecord {
  id: string;
  prompt: TruthOrDarePrompt;
  stage1Choice?: PromptType;
  status: 'completed' | 'passed' | 'forfeited';
  forfeitPenalty?: string;
  playerName?: string;
  timestamp: number;
}
