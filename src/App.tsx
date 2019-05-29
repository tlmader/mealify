import React, { useContext } from 'react';
import './App.css';
import { defaultMeals, MealContext } from './contexts/MealContext';
import { MealList } from './components/MealList';
import { MealForm } from './components/CreateMealForm';

const App: React.FC = () => {
  return (
    <MealContext.Provider value={defaultMeals}>
      <div className="App">
        <div>
          <h1>YumLog</h1>
          <h4>Your trusty meal logger!</h4>
        </div>
        <div className="App__divider" />
        <div className="App__content">
          <MealList />
          <MealForm />
        </div>
      </div>
    </MealContext.Provider>
  );
}

export default App;
