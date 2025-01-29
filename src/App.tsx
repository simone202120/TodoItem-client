import React from 'react';
import TodoItems from './components/todoItems/todoItems';
import Persons from './components/Persons/person';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; 

const Home : React.FC = () =>{
  return(
    <div className='home'>
      <h1>Manager</h1>
      <div className="buttons">
        <Link to="/todo">
          <button>Go to TodoList</button>
        </Link>
        <Link to="/persons">
          <button>Go to Persons</button>
        </Link>
      </div>

    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoItems />} />
          <Route path="/persons" element={<Persons />} />
          {/* <Route path="/addTodo" element={<addTodo />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;