import React from 'react';
import { Meal } from '../interfaces/Meal';

export const defaultMeals: { meals: Meal[] } = {
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
    }
  ]
}

export const MealContext = React.createContext(defaultMeals)
