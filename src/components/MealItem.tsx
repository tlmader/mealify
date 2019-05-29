import React from 'react';
import { FoodItem } from '../interfaces/FoodItem';
import { Meal } from '../interfaces/Meal';

interface Props {
  meal: Meal;
}

export const renderFoodItem = (foodItem: FoodItem) => 
<ul>
  <li>Name: {foodItem.name}</li>
  <li>Calories: {foodItem.calories} calories</li>
  <li>Portion: {foodItem.portion} grams</li>
</ul>

export const MealItem: React.FC<Props> = ({ meal }) => {
  return (
    <>
      <div>Meal</div>
      {meal.foodItems.map(renderFoodItem)}
    </>
  );
}