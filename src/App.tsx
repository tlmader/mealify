import React, { useContext } from 'react';
import './App.css';
import { defaultMeals, MealContext } from './contexts/MealContext';
import { MealList } from './components/MealList';

const App: React.FC = () => {
  const { meals } = useContext(MealContext)
  return (
    <div className="App">
      <MealContext.Provider value={defaultMeals}>
        <MealList />
      </MealContext.Provider>
    </div>
  );
}

export default App;
