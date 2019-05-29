import React from 'react';
import { FoodItem } from '../interfaces/FoodItem';
import { Meal } from '../interfaces/Meal';
import './MealItem.css';

interface Props {
  index: number;
  meal: Meal;
}

export const renderFoodItem = (foodItem: FoodItem, index: number) => 
<ul className="MealItem__food-item" key={index}>
  <li>Name - {foodItem.name}</li>
  <li>Calories - {foodItem.calories} calories</li>
  <li>Portion - {foodItem.portion} grams</li>
</ul>

export const MealItem: React.FC<Props> = ({ index, meal }) => {
  return (
    <div className="MealItem">
      <h4>Meal {index + 1}</h4>
      {meal.foodItems.map(renderFoodItem)}
    </div>
  );
}