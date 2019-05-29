import { FoodItem } from './FoodItem';

export interface FoodPortion  {
  id: FoodItem['id'];
  portions: number;
}

export interface Meal {
  foodPortions: FoodPortion[]
}
