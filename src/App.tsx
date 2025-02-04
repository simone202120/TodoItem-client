import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoItems from './components/todoItems/todoItems';
import Persons from './components/persons/person';
import AddTodoItemPage from './components/todoItems/addTodoPage';
import AddPersonPage from './components/persons/addPersonPage';
import UpdateTodoItemPage from './components/todoItems/UpdateTodoItemPage';
import './App.css';
import UpdatePersonPage from './components/persons/updatePersonPage';
import Sprint from './components/sprints/sprint';
import AddSprintPage from './components/sprints/addSprintPage';
import UpdateSprintPage from './components/sprints/updateSprintPage';

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <div className='home-card'>
        <h1>Task Manager</h1>
        <div className="buttons">
          <Link to="/todo">
            <button>Gestisci TodoList</button>
          </Link>
          <Link to="/persons">
            <button>Gestisci Persone</button>
          </Link>
          <Link to="/sprints">
            <button>Gestisci Sprint</button>
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
          <Route path="/sprints" element= {< Sprint />} /> 
          <Route path="/sprints/AddSprintPage" element={<AddSprintPage />} /> 
          <Route path="/sprints/UpdateSprintPage" element={<UpdateSprintPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
