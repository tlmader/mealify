import React, { useState } from 'react';
import { FoodItemInputValue } from '../types/FoodItemInputValue';
import './FoodItemInput.css';

export interface FoodItemInputProps {
  index: number;
  value: FoodItemInputValue;
  onChange: (index: number, value: Partial<FoodItemInputValue>) => void;
}

const initialState = {
  touched: {
    name: false,
    calories: false,
    portion: false,
  }
}
type State = Readonly<typeof initialState>;

export const FoodItemInput: React.FC<FoodItemInputProps> = ({ index, value, onChange }) => {
  const [{ touched }, setState] = useState<State>(initialState);

  const handleBlur = (key: keyof FoodItemInputValue) => () => {
    if (!touched[key]) {
      setState(prevState => ({ touched: { ...prevState.touched, [key]: true } }));
    }
  }

  const handleChangeForEvent = (key: keyof FoodItemInputValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(index, { [key]: (key === 'calories' || key === 'portion') && value ? Math.abs(+value) : value });
  }

  return (
    <div className="FoodItemInput">
      <div className="FoodItemInput__heading">
        <h4>Food Item {index + 1}</h4>
        <button>Delete</button>
      </div>
      <div>
        <label>
          Name
          <div className="FoodItemInput__input">
            <input
              value={value.name}
              onBlur={handleBlur('name')}
              onChange={handleChangeForEvent('name')}
              type="text"
              placeholder="Enter name"
            />
            {touched.name && !value.name && <div className="FoodItemInput__error">Name is required</div>}
          </div>
        </label>
      </div>
      <div>
        <label>
          Calories
          <div className="FoodItemInput__input">
            <input
              value={value.calories}
              onBlur={handleBlur('calories')}
              onChange={handleChangeForEvent('calories')}
              type="number"
              min="0"
            />
            calories
            {touched.calories && !value.calories && <div className="FoodItemInput__error">Calories is required</div>}
          </div>
        </label>
      </div>
      <div>
        <label>
          Portion
          <div className="FoodItemInput__input">
            <input
              value={value.portion}
              onBlur={handleBlur('portion')}
              onChange={handleChangeForEvent('portion')}
              type="number"
              min="0"
            />
            grams
            {touched.portion && !value.portion && <div className="FoodItemInput__error">Portion is required</div>}
          </div>
        </label>
      </div>
    </div>
  );
}