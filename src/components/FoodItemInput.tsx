import React, { useState } from 'react';
import { FoodItem } from '../interfaces/FoodItem';

type FoodItemInputValue = Pick<FoodItem, 'name' | 'calories' | 'portion'>

export interface FoodItemInputProps {
  index: number;
  submitted: boolean;
  value: FoodItemInputValue;
  onChange: (index: number, value: Partial<FoodItemInputValue>) => void;
  onRemove: (index: number) => void;
}

const initialState = () => ({
  touched: {
    name: false,
    calories: false,
    portion: false,
  }
})
type State = Readonly<ReturnType<typeof initialState>>;

export const FoodItemInput: React.FC<FoodItemInputProps> = ({ index, submitted, value, onChange, onRemove }) => {
  const [{ touched }, setState] = useState<State>(initialState());

  const handleBlur = (key: keyof FoodItemInputValue) => () => {
    if (!touched[key]) {
      setState(prevState => ({ touched: { ...prevState.touched, [key]: true } }));
    }
  }

  const handleChangeForEvent = (key: keyof FoodItemInputValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(index, { [key]: (key === 'calories' || key === 'portion') && value ? Math.abs(+value) : value });
  }

  const handleRemove = () => {
    setState(initialState());
    onRemove(index);
  }

  return (
    <div className="FoodItemInput">
      <div className="FoodItemInput__heading">
        <h4>Food Item {index + 1}</h4>
        <button type="button" onClick={handleRemove}>Remove</button>
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
            {(submitted || touched.name) && !value.name && <div className="FoodItemInput__error">Please enter a name</div>}
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
            {(submitted || touched.calories) && typeof value.calories !== 'number' && <div className="FoodItemInput__error">Please enter a number</div>}
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
            {(submitted || touched.portion) && typeof value.portion !== 'number' && <div className="FoodItemInput__error">Please enter a number</div>}
          </div>
        </label>
      </div>
    </div>
  );
}