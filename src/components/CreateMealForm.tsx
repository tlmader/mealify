import React, { useState } from 'react';
import { FoodItemInputValue } from '../types/FoodItemInputValue';
import { FoodItemInput, FoodItemInputProps } from './FoodItemInput';

interface State {
  foodItems: FoodItemInputValue[]
}

type OnChangeFn = FoodItemInputProps['onChange'];

const initialState: Readonly<State> = {
  foodItems: [
    {
      name: '',
      calories: 0,
      portion: 0,
    }
  ]
}

const updateFoodItem = (index: number, value: Partial<FoodItemInputValue>) => ({ foodItems }: State): State => ({
  foodItems: [
    ...foodItems.slice(0, index),
    { ...foodItems[index], ...value },
    ...foodItems.slice(index + 1),
  ],
});

const renderFoodItemInput = (onChange: OnChangeFn) =>
  (value: FoodItemInputValue, index: number) => <FoodItemInput value={value} onChange={onChange} key={index} />

export const MealForm: React.FC = () => {
  const [{ foodItems }, setfoodItems] = useState(initialState);
  const onChange: OnChangeFn = (index, value) => {
    setfoodItems(updateFoodItem(index, value))
    console.log(foodItems); 
  }
  return (
    <div className="CreateMealForm">
      <h2>Create a Meal</h2>
        {foodItems.map(renderFoodItemInput(onChange))}
      <button>Create Meal</button>
    </div>
  );
}