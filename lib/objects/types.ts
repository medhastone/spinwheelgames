export type ObjectDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Impossible';

export type ObjectCategory =
  | 'All'
  | 'Household'
  | 'Kitchen'
  | 'Office'
  | 'School'
  | 'Technology'
  | 'Electronics'
  | 'Tools'
  | 'Transportation'
  | 'Clothing'
  | 'Sports'
  | 'Food'
  | 'Nature'
  | 'Musical Instruments'
  | 'Travel'
  | 'Outdoor'
  | 'Historical Objects'
  | 'Science'
  | 'Space'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Funny Objects'
  | 'Random Props';

export type ObjectPurpose =
  | 'all'
  | 'drawing'
  | 'pictionary'
  | 'writing'
  | 'storytelling'
  | 'classroom'
  | 'party'
  | 'brainstorming'
  | 'scavenger'
  | 'improv'
  | 'content';

export interface RandomObject {
  id: string;
  name: string;
  slug: string;
  category: ObjectCategory;
  subcategory: string;
  difficulty: ObjectDifficulty;
  tags: string[];
  shortDescription: string;
  drawingFriendly: boolean;
  pictionaryFriendly: boolean;
  writingFriendly: boolean;
  classroomFriendly: boolean;
  partyFriendly: boolean;
  weight?: number;
  funChallenge?: string;
  relatedObjects?: string[];
}

export interface PurposeDefinition {
  id: ObjectPurpose;
  label: string;
  icon: string;
  tagline: string;
  description: string;
  accentColor: string;
}

export type GeneratorMode =
  | 'instant'
  | 'grid'
  | 'wheel'
  | 'challenge'
  | 'custom'
  | 'daily'
  | 'streak';
