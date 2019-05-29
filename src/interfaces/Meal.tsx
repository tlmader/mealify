import { FoodItem } from './FoodItem';

export interface Meal {
  id?: string;
  foodItems: FoodItem[];
}