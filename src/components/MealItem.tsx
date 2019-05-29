import React, { useContext } from 'react';
import { FoodItemContext } from '../contexts/FoodItemContext';
import { FoodItem } from '../interfaces/FoodItem';
import { FoodPortion, Meal } from '../interfaces/Meal';
import './MealItem.css';

interface Props {
  index: number;
  meal: Meal;
}

export const renderFoodItem = (getFoodItem: (id: string) => FoodItem | undefined) =>
  (foodPortion: FoodPortion, index: number) => {
    const foodItem = getFoodItem(foodPortion.id);
    return foodItem && (
      <ul className="MealItem__food-item" key={index}>
        <li>{foodItem.name}</li>
        <li>{foodPortion.portions} portions</li>
      </ul>
    );
  }

export const MealItem: React.FC<Props> = ({ index, meal }) => {
  const { getFoodItem } = useContext(FoodItemContext);
  return (
    <div className="MealItem">
      <h4>Meal {index + 1}</h4>
      {meal.foodPortions.map(renderFoodItem(getFoodItem))}
    </div>
  );
}