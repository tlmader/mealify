import React, { useState } from 'react';
import { calculateCalories } from '../helpers/calculateCalories';
import { FoodItem } from '../interfaces/FoodItem';
import './FoodPortionInput.css';
import { adjustFoodPortionValue } from '../helpers/adjustFoodPortionValue';

// Use separate interface for input values to handle empty strings produced by invalid input
export interface FoodPortionInputValue {
  portions: number | string;
  id: string;
}

export interface FoodPortionInputProps {
  index: number;
  submitted: boolean;
  foodItem: FoodItem;
  value: FoodPortionInputValue;
  onChange: (index: number, value: Partial<FoodPortionInputValue>) => void;
  onRemove: (index: number) => void;
}

const initialState = () => ({
  touched: false
})
type State = Readonly<ReturnType<typeof initialState>>;

const renderError = (submitted: boolean, touched: boolean, { portions }: FoodPortionInputValue) =>
  ((submitted || touched) && (typeof portions !== 'number' || portions <= 0))
  && <div className="FoodPortionInput__error">Please enter a valid number greater than 0</div>

export const FoodPortionInput: React.FC<FoodPortionInputProps> = ({ index, foodItem, submitted, value, onChange, onRemove }) => {
  const [{ touched }, setState] = useState<State>(initialState());

  const handleBlur = () => {
    setState({ touched: true });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    console.log(value);
    onChange(index, { id: foodItem.id, portions: adjustFoodPortionValue(value) });
  }

  const handleRemove = () => {
    setState(initialState());
    onRemove(index);
  }

  return (
    <div className="FoodPortionInput">
      <div className="FoodPortionInput__heading">
        <h4>{foodItem.name}</h4>
        <button type="button" onClick={handleRemove}>Remove</button>
      </div>
      <div>
        <label>
          Portions
          <div className="FoodPortionInput__input">
            <input
              value={value.portions}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter a number"
              type="number"
              max="1000"
              min="0"
              step="0.1"
            />
            {calculateCalories(foodItem, Number(value.portions))} calories
            {renderError(submitted, touched, value)}
          </div>
        </label>
      </div>
    </div>
  );
}