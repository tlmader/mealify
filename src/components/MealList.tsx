import React, { useContext } from 'react';
import { Meal } from '../interfaces/Meal';
import { MealContext } from '../contexts/MealContext';
import { MealItem } from './MealItem';

const renderMealItem = (meal: Meal, index: number) => <MealItem meal={meal} key={index} />

export const MealList: React.FC = () => {
  const { meals } = useContext(MealContext);
  return (
    <div>
      <h2>My Meals</h2>
      {meals.map(renderMealItem)}
    </div>
  );
};
