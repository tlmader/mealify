import React, { useContext } from 'react';
import { FoodItemContext } from '../contexts/FoodItemContext';
import { FoodItem } from '../interfaces/FoodItem';
import './AddFoodItemList.css'

interface Props {
  onAdd: (foodItem: FoodItem) => void;
}

export const AddFoodItemList: React.FC<Props> = ({ onAdd }) => {
  const { foodItems } = useContext(FoodItemContext);
  return (
    <div>
      <h2>Food Items</h2>
      {foodItems.map(foodItem => (
        <div className="AddFoodItemList__food-item" key={foodItem.id}>
          <div className="AddFoodItemList__heading">
            <h4>{foodItem.name}</h4>
            <button type="button" onClick={() => onAdd(foodItem)}>Add Portion</button>
          </div>
          <ul>
            <li>{foodItem.calories} calories per 100 grams</li>
            <li>{foodItem.portion} grams per portion</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
