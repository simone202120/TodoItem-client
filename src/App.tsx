import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoItems from './components/todoItems/todoItems';
import Persons from './components/persons/person';
import AddTodoItemPage from './components/todoItems/addTodoPage';
import AddPersonPage from './components/persons/addPersonPage';
import UpdateTodoItemPage from './components/todoItems/UpdateTodoItemPage';
import './App.css';
import UpdatePersonPage from './components/persons/updatePersonPage';

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <div className='home-card'>
        <h1>Task Manager</h1>
        <p>Gestisci i tuoi TodoItems e le persone assegnate in un'unica piattaforma.</p>
        <div className="buttons">
          <Link to="/todo">
            <button>Gestisci TodoList</button>
          </Link>
          <Link to="/persons">
            <button>Gestisci Persone</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoItems />} />
          <Route path="/persons" element={<Persons />} />
          <Route path="/todo/AddTodoItemPage" element={<AddTodoItemPage />} /> 
          <Route path="/todo/UpdateTodoItemPage" element={<UpdateTodoItemPage />} /> 
          <Route path="/person/AddPersonPage" element={<AddPersonPage />} /> 
          <Route path="/person/UpdatePersonPage" element={<UpdatePersonPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
