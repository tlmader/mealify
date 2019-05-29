import React, { useContext } from 'react';
import { Meal } from '../interfaces/Meal';
import { MealContext } from '../contexts/MealContext';
import { MealItem } from './MealItem';

const renderMealItem = (meal: Meal) => <MealItem meal={meal} />

export const MealList: React.FC = () => {
  const { meals } = useContext(MealContext);
  return (
    <div>
      {meals.map(renderMealItem)}
    </div>
  );
}