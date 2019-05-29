import React, { useState } from 'react';
import { Meal } from '../interfaces/Meal';

interface State {
  meals: Meal[];
}

export const defaultMeals = (): Meal[] => [
  {
    foodPortions: [
      {
        id: '1',
        portions: 2
      },
      {
        id: '2',
        portions: 1
      },
    ]
  },
  {
    foodPortions: [
      {
        id: '3',
        portions: 4
      },
      {
        id: '4',
        portions: 1
      }
    ]
  },
];

export const MealContext = React.createContext({
  addMeal: (addedMeal: Meal) => {
    console.log(addedMeal);
  },
  meals: defaultMeals()
});
export const MealProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({ meals: defaultMeals() })

  const addMeal = (addedMeal: Meal) => {
    setState(({ meals }) => ({ meals: [...meals, addedMeal] }));
  }

  console.log('MealContext', state);

  return (
    <MealContext.Provider
      value={{
        ...state,
        addMeal
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
