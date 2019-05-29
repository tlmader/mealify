import React from 'react';
import { FoodItem } from '../interfaces/FoodItem';
import { Meal } from '../interfaces/Meal';
import './MealItem.css';

interface Props {
  meal: Meal;
}

export const renderFoodItem = (foodItem: FoodItem) => 
<ul className="MealItem__food-item">
  <li>Name - {foodItem.name}</li>
  <li>Calories - {foodItem.calories} calories</li>
  <li>Portion - {foodItem.portion} grams</li>
</ul>

export const MealItem: React.FC<Props> = ({ meal }) => {
  return (
    <div className="MealItem">
      <h4>Meal</h4>
      {meal.foodItems.map(renderFoodItem)}
    </div>
  );
}