import React, { useState } from 'react';
import { FoodItem } from '../interfaces/FoodItem';
import { FoodItemInput, FoodItemInputProps } from './FoodItemInput';

interface Props {
  onValidSubmit: (foodItems: FoodItem[]) => void;
}

interface State {
  foodItems: FoodItem[];
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

const updateFoodItem = (index: number, value: Partial<FoodItem>) => (state: State): State => ({
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
  (value: FoodItem, index: number) =>
    <FoodItemInput
      index={index}
      submitted={submitted}
      value={value}
      onChange={handleChange}
      onRemove={handleRemove}
      key={index}
    />

const foodItemIsValid = (foodItem: FoodItem): boolean =>
  Boolean(foodItem.name && foodItem.calories >= 0 && foodItem.portion >= 0);

export const CreateMealForm: React.FC<Props> = ({ onValidSubmit }) => {
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
    if (foodItems.every(foodItemIsValid)) {
      onValidSubmit(foodItems);
      setState(initialState);
    } else {
      setState(prevState => ({ ...prevState, submitted: true }));
    }
    event.preventDefault();
  }
  
  return (
    <form className="CreateMealForm" onSubmit={handleSubmit}>
      {foodItems.map(renderFoodItemInput(handleChange, handleRemove, submitted))}
      <button type="button" onClick={handleReset}>Reset</button>
      <button type="button" onClick={handleAddFoodItem}>Add Food Item</button>
      <button>Create Meal</button>
    </form>
  );
}