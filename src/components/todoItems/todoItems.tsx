import React, { useEffect, useState } from "react";
import { getAllTodoItems } from "../../api";
import "./todoItems.css";
import AddTodoItem from "./addTodoItems";

const TodoItems = () => {
  const [todoItems, setTodoItems] = useState<any[]>([]);

  //Richiamo il la GetAll e aggiorno lo state di todoItems con i dati ricevuti
  const fetchTodoItems = async () => {
    try {
      const data = await getAllTodoItems();
      setTodoItems(data);
    } catch (error) {
      console.error("Errore durante il caricamento dei TodoItems:", error);
    }
  };

  //Richiamo la funzione fetchTodoItems al caricamento del componente
  useEffect(() => {
    fetchTodoItems();
  }, []);


  return (
    <div>
      {/* Aggiungo il form e ricarico la lista dei TodoItems */}
         <AddTodoItem onAdd={fetchTodoItems} /> 
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
            <p className={item.isComplete ? "completed" : "not-completed"}>
              Completato: {item.isComplete ? "✅" : "❌"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;
