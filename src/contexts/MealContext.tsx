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
};

export const MealContext = React.createContext(defaultMeals)
