import React, { useState } from 'react';
import { FoodItemInputValue } from '../types/FoodItemInputValue';
import { FoodItemInput, FoodItemInputProps } from './FoodItemInput';

interface State {
  foodItems: FoodItemInputValue[]
}

type OnChangeFn = FoodItemInputProps['onChange'];
type OnRemoveFn = FoodItemInputProps['onRemove'];

const defaultFoodItem = () => (
  {
    name: '',
    calories: 0,
    portion: 0,
  });

const initialState: Readonly<State> = {
  foodItems: [defaultFoodItem()]
}

const addFoodItem = ({ foodItems }: State): State => ({
  foodItems: foodItems.concat(defaultFoodItem()),
});

const updateFoodItem = (index: number, value: Partial<FoodItemInputValue>) => ({ foodItems }: State): State => ({
  foodItems: [
    ...foodItems.slice(0, index),
    { ...foodItems[index], ...value },
    ...foodItems.slice(index + 1),
  ],
});

const removeFoodItem = (index: number) => ({ foodItems }: State): State => ({
  foodItems: foodItems.length > 1 ? [...foodItems.slice(0, index), ...foodItems.slice(index + 1)] : [defaultFoodItem()],
});

const renderFoodItemInput = (handleChange: OnChangeFn, handleRemove: OnRemoveFn) =>
  (value: FoodItemInputValue, index: number) =>
    <FoodItemInput
      index={index}
      value={value}
      onChange={handleChange}
      onRemove={handleRemove}
      key={index}
    />

export const MealForm: React.FC = () => {
  const [{ foodItems }, setfoodItems] = useState(initialState);
  const handleChange: OnChangeFn = (index, value) => {
    setfoodItems(updateFoodItem(index, value))
  }
  const handleAddFoodItem = () => {
    setfoodItems(addFoodItem); 
  }
  const handleRemove: OnRemoveFn = (index) => {
    setfoodItems(removeFoodItem(index))
  }
  console.log(foodItems);
  return (
    <div className="CreateMealForm">
      <h2>Create a Meal</h2>
        {foodItems.map(renderFoodItemInput(handleChange, handleRemove))}
      <button onClick={handleAddFoodItem}>Add Food Item</button>
      <button>Create Meal</button>
    </div>
  );
}