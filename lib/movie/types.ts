export type MovieGenre =
  | 'animation'
  | 'comedy'
  | 'action'
  | 'horror'
  | 'family'
  | 'classic'
  | 'scifi'
  | 'drama'
  | 'thriller'
  | 'romance';

export type MovieMode = 'decision' | 'family' | 'date_night' | 'group';

export type RuntimeCategory = 'all' | 'quick' | 'standard' | 'epic';

export type DecadeCategory = 'all' | '2020s' | '2010s' | '2000s' | '90s' | 'classic';

export interface MovieItem {
  id: string;
  title: string;
  year: number;
  genre: MovieGenre;
  secondaryGenre?: string;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NR';
  runtimeMinutes: number;
  director: string;
  synopsis: string;
  streamingPlatforms: ('Netflix' | 'Prime Video' | 'Disney+' | 'Max' | 'Apple TV' | 'Hulu' | 'Paramount+')[];
  modes: MovieMode[];
  color?: string;
}

export interface CustomMovieEntry {
  id: string;
  title: string;
  year?: number;
  genre?: string;
  weight: number;
  color: string;
  enabled: boolean;
}
