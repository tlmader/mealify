import React, { useContext, useState, useCallback } from 'react';
import { MealContext } from '../contexts/MealContext';
import { Meal } from '../interfaces/Meal';
import { CreateMealForm } from './CreateMealForm';

const initialState = {
  showForm: false
}
type State = Readonly<typeof initialState>;

export const CreateMealView: React.FC = () => {
  const { addMeal } = useContext(MealContext);
  const [{ showForm }, setState] = useState<State>(initialState);

  const handleClick = useCallback(
    () => {
      setState({ showForm: true });
    },
    [setState]
  );

  const handleValidSubmit = useCallback(
    (meal: Meal) => {
      addMeal(meal);
      setState(initialState);
    },
    [addMeal, setState]
  );

  return (
    <div>
      <h2>Create a Meal</h2>
      {showForm ? <CreateMealForm onValidSubmit={handleValidSubmit} /> : <button onClick={handleClick}>Click to begin!</button>}
    </div>
  );
}