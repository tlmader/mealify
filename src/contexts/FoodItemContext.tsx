import React from 'react';
import { FoodItem } from '../interfaces/FoodItem';

export const foodItems: FoodItem[] = [
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
  },
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
];

const createFoodItemMap = (foodItems: FoodItem[]): Map<string, FoodItem> => new Map(foodItems.map(foodItem => ([foodItem.id, foodItem])));

const foodItemMap = createFoodItemMap(foodItems);

const getFoodItem = (id: string) => foodItemMap.get(id);

export const FoodItemContext = React.createContext({
  foodItems,
  getFoodItem,
});

export const FoodItemProvider: React.FC = ({ children }) => {
  return (
    <FoodItemContext.Provider
      value={{
        foodItems,
        getFoodItem,
      }}
    >
      {children}
    </FoodItemContext.Provider>
  );
};
