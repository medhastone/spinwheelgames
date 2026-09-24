export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';

export type CuisineType =
  | 'all'
  | 'italian'
  | 'mexican'
  | 'asian'
  | 'american'
  | 'mediterranean'
  | 'latin'
  | 'global';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  mealTypes: MealType[];
  cuisine: CuisineType;
  isFastFood: boolean;
  isHealthy: boolean;
  description: string;
  popularPairing?: string;
}

export interface FoodFilterState {
  mealType: MealType | 'all';
  cuisine: CuisineType;
  fastFoodOnly: boolean;
  healthyOnly: boolean;
}

export interface CustomFoodEntry {
  id: string;
  name: string;
  weight: number;
}
