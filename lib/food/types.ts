export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';

export type CuisineType =
  | 'all'
  | 'indian'
  | 'asian'
  | 'italian'
  | 'mexican'
  | 'american'
  | 'mediterranean'
  | 'latin'
  | 'global';

export type FoodPresetId =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snacks'
  | 'dessert'
  | 'fast-food'
  | 'indian'
  | 'asian'
  | 'vegetarian'
  | 'custom';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  mealTypes: MealType[];
  cuisine: CuisineType;
  isVegetarian: boolean;
  isFastFood: boolean;
  isHealthy: boolean;
  description: string;
  popularPairing?: string;
  estimatedPrepTime?: string;
}

export interface FoodFilterState {
  mealType: MealType | 'all';
  cuisine: CuisineType;
  isVegetarianOnly: boolean;
  isFastFoodOnly: boolean;
  isHealthyOnly: boolean;
}

export interface CustomFoodEntry {
  id: string;
  name: string;
  weight: number;
}

export interface FoodPresetDefinition {
  id: FoodPresetId;
  label: string;
  shortLabel: string;
  emoji: string;
  description: string;
  filterState?: Partial<FoodFilterState>;
  isCustom?: boolean;
}
