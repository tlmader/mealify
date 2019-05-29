import React, { useState } from 'react';
import { Meal } from '../interfaces/Meal';

interface State {
  meals: Meal[];
}

export const defaultMeals = (): Meal[] => [
  {
    id: '1',
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
    id: '2',
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
];

// Server would do this in real world scenario
const createId = (currentId: number) => {
  return () => (currentId++).toString();
}
const foodId = createId(5);
const mealId = createId(3);

export const MealContext = React.createContext({
  addMeal: (addedMeal: Meal) => {
    console.log(addedMeal);
  },
  meals: defaultMeals()
});

const withIds = (meal: Meal): Meal => ({
  id: mealId(),
  foodItems: meal.foodItems.map(foodItem => ({ ...foodItem, id: foodId() }))
})

export const MealProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({ meals: defaultMeals() })

  const addMeal = (addedMeal: Meal) => {
    setState(({ meals }) => ({ meals: [...meals, withIds(addedMeal)] }));
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
