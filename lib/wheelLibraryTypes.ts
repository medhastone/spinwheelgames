export interface WheelExperience {
  id: string;
  name: string;
  purpose: string;
  targetAudience: string;
  defaultEntries: string[];
  category: 
    | 'DECISIONS'
    | 'NAMES'
    | 'CLASSROOM'
    | 'PARTY'
    | 'FOOD'
    | 'ENTERTAINMENT'
    | 'GAMING'
    | 'SPORTS'
    | 'NUMBERS'
    | 'WORKOUT'
    | 'TRAVEL'
    | 'GIVEAWAY'
    | 'CREATIVITY & WRITING'
    | 'PRODUCTIVITY & HABITS'
    | 'WELLNESS & MINDFULNESS'
    | 'DATE NIGHT & COUPLES'
    | 'ICEBREAKERS & TEAM BUILDING'
    | 'FINANCE & BUDGETING';
  instructions: string;
  optionalModes: string[]; // e.g. ["Elimination", "Weighted Odds", "Mystery Mode", "Tournament"]
  relatedWheels: string[]; // list of related experience IDs or names
  relatedTools: string[]; // e.g. ["Bulk Name Importer", "CSV Export", "Team Shuffler", "Bracket Engine"]
  difficulty?: 'Casual' | 'Easy' | 'Medium' | 'Challenging' | 'Expert';
  shareableResultConcept: string; // The social prompt / badge / graphic concept
  uniqueValueProposition: string; // What makes this experience truly distinct
  paletteKey?: 'arcade' | 'pastel' | 'vibrant' | 'casino' | 'emerald';
}
