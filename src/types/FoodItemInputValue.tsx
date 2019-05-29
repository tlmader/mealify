import { FoodItem } from '../interfaces/FoodItem';

export type FoodItemInputValue = Pick<FoodItem, 'name' | 'calories' | 'portion'>