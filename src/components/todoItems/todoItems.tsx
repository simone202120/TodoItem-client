import React, { useEffect, useState } from "react";
import { getAllTodoItems } from "../../api";
import "./todoItems.css";

const TodoItems = () => {
  const [todoItems, setTodoItems] = useState<any[]>([]);

  useEffect(() => {
    getAllTodoItems().then((data) => {
      setTodoItems(data);
    });
  }, []);

  return (
    <div>
      <ul className="todo-list">
        {todoItems.map((item) => (
          <li key={item.id} className="todo-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
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
              Completato: {item.isComplete ? "Sì" : "No"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;
