import React from 'react';
import './App.css';
import { MealList } from './components/MealList';
import { MealProvider } from './contexts/MealContext';
import { CreateMealView } from './components/CreateMealView';

const App: React.FC = () => {
  return (
    <MealProvider>
      <div className="App">
        <div>
          <h1>YumLog</h1>
          <h4>Your trusty meal logger!</h4>
        </div>
        <div className="App__divider" />
        <div className="App__content">
          <MealList />
          <CreateMealView />
        </div>
      </div>
    </MealProvider>
  );
}

export default App;
