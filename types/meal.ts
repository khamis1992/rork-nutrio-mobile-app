export interface Meal {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  allergens?: string[];
}