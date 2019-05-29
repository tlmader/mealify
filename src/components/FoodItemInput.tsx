import React from 'react';
import { FoodItemInputValue } from '../types/FoodItemInputValue';
import './FoodItemInput.css';

export interface FoodItemInputProps {
  index: number;
  value: FoodItemInputValue;
  onChange: (index: number, value: Partial<FoodItemInputValue>) => void;
}

export const FoodItemInput: React.FC<FoodItemInputProps> = ({ index, value, onChange }) => {
  const handleChangeForEvent = (eventType: keyof FoodItemInputValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(index, { [eventType]: event.target.value })
  }
  return (
    <div className="FoodItemInput">
      <h4>Food Item {index + 1}</h4>
      <div>
        <label>
          Name
          <div className="FoodItemInput__input">
            <input
              value={value.name}
              onChange={handleChangeForEvent('name')}
              type="text"
              placeholder="Enter name"
            />
          </div>
        </label>
      </div>
      <div>
        <label>
          Calories
          <div className="FoodItemInput__input">
            <input
              value={value.calories}
              onChange={handleChangeForEvent('calories')}
              type="number"
              min="0"
            />
            calories
          </div>
        </label>
      </div>
      <div>
        <label>
          Portion
          <div className="FoodItemInput__input">
            <input
              value={value.portion}
              onChange={handleChangeForEvent('portion')}
              type="number"
              min="0"
            />
            grams
          </div>
        </label>
      </div>
    </div>
  );
}