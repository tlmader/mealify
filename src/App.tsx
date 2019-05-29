import React, { useContext } from 'react';
import './App.css';
import { defaultMeals, MealContext } from './contexts/MealContext';
import { MealList } from './components/MealList';
import { MealForm } from './components/CreateMealForm';

const App: React.FC = () => {
  return (
    <MealContext.Provider value={defaultMeals}>
      <div className="App">
        <MealList />
        <MealForm />
      </div>
    </MealContext.Provider>
  );
}

export default App;
