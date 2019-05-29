import React, { useContext, useState } from 'react';
import { MealContext } from '../contexts/MealContext';
import { FoodItem } from '../interfaces/FoodItem';
import { CreateMealForm } from './CreateMealForm';

const initialState = {
  showForm: false
}
type State = Readonly<typeof initialState>;

export const CreateMealView: React.FC = () => {
  const { addMeal } = useContext(MealContext);
  const [{ showForm }, setState] = useState<State>(initialState);

  const handleClick = () => {
    setState({ showForm: true });
  };

  const handleValidSubmit = (foodItems: FoodItem[]) => {
    addMeal({ foodItems });
    setState(initialState);
  }

  return (
    <div>
      <h2>Create a Meal</h2>
      {showForm ? <CreateMealForm onValidSubmit={handleValidSubmit} /> : <button onClick={handleClick}>Click to begin!</button>}
    </div>
  );
}