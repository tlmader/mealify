import React, { useState } from 'react';
import { Meal } from '../interfaces/Meal';

export const withDefaultMeals = (value: any) => ({
  ...value,
  meals: [
    {
      foodItems: [
        {
          id: '1',
          name: 'Spaghetti',
          calories: 500,
          portion: 20
        },
        {
          id: '2',
          name: 'Lemonade',
          calories: 200,
          portion: 10
        }
      ]
    },
    {
      foodItems: [
        {
          id: '3',
          name: 'Sushi',
          calories: 250,
          portion: 10
        },
        {
          id: '4',
          name: 'Green Tea',
          calories: 5,
          portion: 5
        }
      ]
    },
  ]
});

export const MealContext = React.createContext(withDefaultMeals({}));

interface State {
  meals: Meal[];
}

export const MealProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({ meals: [] })

  const addMeal = (addedMeal: Meal) => {
    setState(({ meals }) => ({ meals: [...meals, addedMeal] }));
  }

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
