import React, { useContext, useState, useCallback } from 'react';
import { FoodItemContext } from '../contexts/FoodItemContext';
import { FoodItem } from '../interfaces/FoodItem';
import { FoodPortion, Meal } from '../interfaces/Meal';
import { FoodPortionInput, FoodPortionInputProps, FoodPortionInputValue } from './FoodPortionInput';
import { calculateTotalCalories } from '../helpers/calculateCalories';
import { AddFoodItemList } from './AddFoodItemList';
import './CreateMealForm.css';
import { adjustFoodPortionValue } from '../helpers/adjustFoodPortionValue';
interface Props {
  onValidSubmit: (meal: Meal) => void;
}

interface State {
  foodPortions: FoodPortionInputValue[];
  submitted: boolean;
}

type OnChangeFn = FoodPortionInputProps['onChange'];
type OnRemoveFn = FoodPortionInputProps['onRemove'];

const initialState: Readonly<State> = {
  foodPortions: [],
  submitted: false
}

const addFoodPortion = (foodItem: FoodItem) => (state: State): State => {
  const { foodPortions } = state;
  const foundIndex = foodPortions.findIndex(foodPortion => foodPortion.id === foodItem.id)
  const foundFoodPortion = foodPortions[foundIndex]
  // If food item already has been added, increment portion by 1
  return foundIndex === -1
    ? ({
      ...state,
      foodPortions: foodPortions.concat({ id: foodItem.id, portions: 1 }),
    })
    : updateFoodPortion(foundIndex, { ...foundFoodPortion, portions: Number(foundFoodPortion.portions) + 1 })(state);
}
  

const updateFoodPortion = (index: number, value: Partial<FoodPortionInputValue>) => (state: State): State => ({
  ...state,
  foodPortions: [
    ...state.foodPortions.slice(0, index),
    { ...state.foodPortions[index], ...value, portions: adjustFoodPortionValue(value.portions) },
    ...state.foodPortions.slice(index + 1),
  ],
});

const removeFoodItem = (index: number) => (state: State): State => ({
  ...state,
  foodPortions: [...state.foodPortions.slice(0, index), ...state.foodPortions.slice(index + 1)]
});

const foodPortionIsValid = (foodPortion: FoodPortionInputValue): boolean =>
  Boolean(foodPortion.id && foodPortion.portions > 0);

const inputValuesToFoodPortions = (inputValues: FoodPortionInputValue[]): FoodPortion[] =>
  inputValues.map(inputValue => ({
    ...inputValue,
    portions: Number(inputValue.portions)
  }));

export const CreateMealForm: React.FC<Props> = ({ onValidSubmit }) => {
  const [{ foodPortions, submitted }, setState] = useState(initialState);
  const { getFoodItem } = useContext(FoodItemContext);

  const handleChange: OnChangeFn = useCallback(
    (index, value) => {
      setState(updateFoodPortion(index, value))
    },
    [setState],
  );
  
  const handleReset = useCallback(
    () => {
      setState(initialState);
    },
    [setState],
  );
  
  const handleAddFoodItem = useCallback(
    (foodItem: FoodItem) => {
      setState(addFoodPortion(foodItem)); 
    },
    [setState],
  );
  
  const handleRemove: OnRemoveFn = useCallback(
    (index) => {
      setState(removeFoodItem(index))
    },
    [setState],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (foodPortions.length && foodPortions.every(foodPortionIsValid)) {
        onValidSubmit({ foodPortions: foodPortions as FoodPortion[] });
        setState(initialState);
      } else {
        setState(prevState => ({ ...prevState, submitted: true }));
      }
      event.preventDefault();
    },
    [foodPortions, onValidSubmit, setState]
  );

  const totalCalories = calculateTotalCalories(inputValuesToFoodPortions(foodPortions), getFoodItem);
  
  return (
    <div className="CreateMealForm">
      <AddFoodItemList onAdd={handleAddFoodItem} />
      <form className="CreateMealForm__form" onSubmit={handleSubmit}>
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
        <h4>Total calories: {totalCalories}</h4>
        {!foodPortions.length && <div className="CreateMealForm__no-food-items">Add a food item get started</div>}
        <button disabled={!foodPortions.length} type="button" onClick={handleReset}>Reset</button>
        <button disabled={!foodPortions.length}>Create Meal</button>
      </form>
    </div>
  );
}