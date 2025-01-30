import React, { useEffect, useState } from "react";
import { getAllTodoItems, ITodoItemDto, IupdateTodoItemInput } from "../../api";
import "./todoItems.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { deleteTodoItem } from "../../api";

const TodoItems = () => {
  const [todoItems, setTodoItems] = useState<ITodoItemDto[]>([]);

  //Richiamo il la GetAll e aggiorno lo state di todoItems con i dati ricevuti
  const fetchTodoItems = async () => {
    try {
      const data = await getAllTodoItems();
      setTodoItems(data);
    } catch (error) {
      console.error("Errore durante il caricamento dei TodoItems:", error);
    }
  };

  const deleteTodoItems = async (itemId:number) =>{
    try{
      await deleteTodoItem(itemId);
      alert("item eliminato con successo");
      await fetchTodoItems()
    }catch(error){
      console.error("Errorre durante l'eliminazione dell'item", error);
    }
  }

  //Richiamo la funzione fetchTodoItems quando careico il componente
  useEffect(() => {
    fetchTodoItems();
  }, []);


  return (
    <div className="todoContainer">
      <div className="ButtonContainer"> <h3 className="Title">TodoList</h3><div/>
      <Link className="linkBox" to="/todo/AddTodoItemPage">
      <button className="add-button">+</button>
      </Link>
      <Link className="linkBox" to="/"><button className="add-button">Home</button></Link>
      </div>
      <ul className="todo-list">
        {todoItems.map((item) => (
          <li key={item.id} className="todo-item">
            <h3>{item.title}</h3>
            <p>Descrizione: {item.description}</p>
            <p className="date">
              Inizio: {new Date(item.startDate).toLocaleDateString()}
            </p>
            <p className="date">
              Fine: {new Date(item.endDate).toLocaleDateString()}
            </p>
            <p className="priority">Priorità: {item.weight}</p>
            <p className="person">
              Assegnato: {item.personId ? "Si" : "No"}
            </p>
            <p>
              Completato: {item.isComplete ? "🟢" : "🔴"}
            </p>
            <div className="deleteContainer">
              <Link to="/todo/UpdateTodoItemPage" state={{item}}>
              <button className="update">🔧</button>
              </Link>
            <button className="delete" onClick={() => deleteTodoItems(item.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;
