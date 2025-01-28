import React from 'react';
import todoItems from './components/todoItems/todoItems';
import persons from './components/Persons/person';
import TodoItems from './components/todoItems/todoItems';
import Persons from './components/Persons/person';
import './App.css'; // Importa il file CSS

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="Items">
        <h1>TodoItems</h1>
        <TodoItems />
      </div>
      <div className="Persons">
        <h1>Persons</h1>
        <Persons />
      </div>
    </div>
  );
};

export default App;