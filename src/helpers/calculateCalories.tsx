import { FoodItem } from '../interfaces/FoodItem';
import { FoodPortion } from '../interfaces/Meal';

export const calculateTotalCalories = (foodPortions: FoodPortion[], getFoodItem: (id: string) => FoodItem | undefined) =>
  foodPortions.reduce(
    (total, foodPortion) => {
      const foodItem = getFoodItem(foodPortion.id);
      return foodItem
        ? total + calculateCalories(foodItem, foodPortion.portions)
        : total;
    },
    0
  );

export const calculateCalories = ({ calories, portion }: FoodItem, portions: number) =>
  (portion * portions / 100) * calories;