import React, { useState } from 'react';
import { calculateCalories } from '../helpers/calculateCalories';
import { FoodItem } from '../interfaces/FoodItem';
import { FoodPortion } from '../interfaces/Meal';
import './FoodPortionInput.css';

export interface FoodPortionInputProps {
  index: number;
  submitted: boolean;
  foodItem: FoodItem;
  value: FoodPortion;
  onChange: (index: number, value: Partial<FoodPortion>) => void;
  onRemove: (index: number) => void;
}

const initialState = () => ({
  touched: false
})
type State = Readonly<ReturnType<typeof initialState>>;

export const FoodPortionInput: React.FC<FoodPortionInputProps> = ({ index, foodItem, submitted, value, onChange, onRemove }) => {
  const [{ touched }, setState] = useState<State>(initialState());

  const handleBlur = () => {
    setState({ touched: true });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (typeof value === 'number') {
      onChange(index, { id: foodItem.id, portions: Math.abs(value) });
    }
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
              type="number"
              min="0"
            />
            {calculateCalories(foodItem, value.portions)} calories
            {(submitted || touched) && typeof value.portions !== 'number' && <div className="FoodPortionInput__error">Please enter a number</div>}
          </div>
        </label>
      </div>
    </div>
  );
}