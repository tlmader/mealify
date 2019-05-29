import React, { useState } from 'react';
import { FoodItemInputValue } from '../types/FoodItemInputValue';
import { FoodItemInput, FoodItemInputProps } from './FoodItemInput';
import { FoodItem } from '../interfaces/FoodItem';

interface State {
  foodItems: FoodItemInputValue[];
  submitted: boolean;
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
  foodItems: [defaultFoodItem()],
  submitted: false
}

const addFoodItem = (state: State): State => ({
  ...state,
  foodItems: state.foodItems.concat(defaultFoodItem()),
});

const updateFoodItem = (index: number, value: Partial<FoodItemInputValue>) => (state: State): State => ({
  ...state,
  foodItems: [
    ...state.foodItems.slice(0, index),
    { ...state.foodItems[index], ...value },
    ...state.foodItems.slice(index + 1),
  ],
});

const removeFoodItem = (index: number) => (state: State): State => ({
  ...state,
  foodItems: state.foodItems.length > 1
    ? [...state.foodItems.slice(0, index), ...state.foodItems.slice(index + 1)]
    : [defaultFoodItem()],
});

const renderFoodItemInput = (handleChange: OnChangeFn, handleRemove: OnRemoveFn, submitted: boolean) =>
  (value: FoodItemInputValue, index: number) =>
    <FoodItemInput
      index={index}
      submitted={submitted}
      value={value}
      onChange={handleChange}
      onRemove={handleRemove}
      key={index}
    />

const foodItemIsValid = (foodItem: FoodItemInputValue): boolean =>
  Boolean(foodItem.name && foodItem.calories >= 0 && foodItem.portion >= 0);

export const MealForm: React.FC = () => {
  const [{ foodItems, submitted }, setState] = useState(initialState);
  
  const handleChange: OnChangeFn = (index, value) => {
    setState(updateFoodItem(index, value))
  }
  
  const handleReset = () => {
    setState(initialState);
  }

  const handleAddFoodItem = () => {
    setState(addFoodItem); 
  }

  const handleRemove: OnRemoveFn = (index) => {
    setState(removeFoodItem(index))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', foodItems);
    if (foodItems.every(foodItemIsValid)) {
      handleReset();
    } else {
      setState(prevState => ({ ...prevState, submitted: true }));
    }
    event.preventDefault();
  }

  console.log(foodItems);
  return (
    <form className="CreateMealForm" onSubmit={handleSubmit}>
      <h2>Create a Meal</h2>
        {foodItems.map(renderFoodItemInput(handleChange, handleRemove, submitted))}
      <button type="button" onClick={handleReset}>Reset</button>
      <button type="button" onClick={handleAddFoodItem}>Add Food Item</button>
      <button>Create Meal</button>
    </form>
  );
}