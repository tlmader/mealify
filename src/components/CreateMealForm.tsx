import React, { useContext, useState } from 'react';
import { FoodItemContext } from '../contexts/FoodItemContext';
import { FoodItem } from '../interfaces/FoodItem';
import { FoodPortion, Meal } from '../interfaces/Meal';
import { FoodPortionInput, FoodPortionInputProps } from './FoodPortionInput';
import { calculateTotalCalories } from '../helpers/calculateCalories';

interface Props {
  onValidSubmit: (meal: Meal) => void;
}

interface State {
  foodPortions: FoodPortion[];
  submitted: boolean;
}

type OnChangeFn = FoodPortionInputProps['onChange'];
type OnRemoveFn = FoodPortionInputProps['onRemove'];

const initialState: Readonly<State> = {
  foodPortions: [],
  submitted: false
}

const addFoodPortion = (foodItem: FoodItem) => (state: State): State => ({
  ...state,
  foodPortions: state.foodPortions.concat({ id: foodItem.id, portions: 1 }),
});

const updateFoodPortion = (index: number, value: Partial<FoodItem>) => (state: State): State => ({
  ...state,
  foodPortions: [
    ...state.foodPortions.slice(0, index),
    { ...state.foodPortions[index], ...value },
    ...state.foodPortions.slice(index + 1),
  ],
});

const removeFoodItem = (index: number) => (state: State): State => ({
  ...state,
  foodPortions: [...state.foodPortions.slice(0, index), ...state.foodPortions.slice(index + 1)]
});

const foodPortionIsValid = (foodPortion: FoodPortion): boolean =>
  Boolean(foodPortion.id && foodPortion.portions > 0);

export const CreateMealForm: React.FC<Props> = ({ onValidSubmit }) => {
  const [{ foodPortions, submitted }, setState] = useState(initialState);
  const { getFoodItem } = useContext(FoodItemContext);

  const handleChange: OnChangeFn = (index, value) => {
    setState(updateFoodPortion(index, value))
  }
  
  const handleReset = () => {
    setState(initialState);
  }

  const handleAddFoodPortion = (foodItem: FoodItem) => () => {
    setState(addFoodPortion(foodItem)); 
  }

  const handleRemove: OnRemoveFn = (index) => {
    setState(removeFoodItem(index))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (foodPortions.every(foodPortionIsValid)) {
      onValidSubmit({ foodPortions });
      setState(initialState);
    } else {
      setState(prevState => ({ ...prevState, submitted: true }));
    }
    event.preventDefault();
  }

  const testFoodItem = getFoodItem('1') as FoodItem;
  
  return (
    <form className="CreateMealForm" onSubmit={handleSubmit}>
      {foodPortions.map((foodPortion, index) => {
        const foodItem = getFoodItem(foodPortion.id);
        return foodItem && (
          <FoodPortionInput
            index={index}
            submitted={submitted}
            value={foodPortion}
            foodItem={foodItem}
            onChange={handleChange}
            onRemove={handleRemove}
            key={index}
          />
        );
      })}
      <h4>Total calories: {calculateTotalCalories(foodPortions, getFoodItem)}</h4>
      <button type="button" onClick={handleReset}>Reset</button>
      <button type="button" onClick={handleAddFoodPortion(testFoodItem)}>Add Food Item</button>
      <button>Create Meal</button>
    </form>
  );
}