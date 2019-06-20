import React, { useState, useCallback } from 'react';
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
  addMeal: (addedMeal: Meal) => {},
  meals: defaultMeals()
});
export const MealProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({ meals: defaultMeals() })

  const addMeal = useCallback(
    (addedMeal: Meal) => {
      setState(({ meals }) => ({ meals: [...meals, addedMeal] }));
    },
    [setState],
  );

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
