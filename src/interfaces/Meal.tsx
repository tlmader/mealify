import { FoodItem } from './FoodItem';

export interface Meal {
  foodPortions: {
    id: FoodItem['id'];
    portions: number;
  }[]
}
