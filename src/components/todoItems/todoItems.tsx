import React, { useEffect, useState } from "react";
import { getAllTodoItems, ITodoItemDto } from "../../api";
import "./todoItems.css";
import { Link } from "react-router-dom";
import { deleteTodoItem } from "../../api";

const TodoItems = () => {
  const [todoItems, setTodoItems] = useState<ITodoItemDto[]>([]);

  const fetchTodoItems = async () => {
    try {
      const data = await getAllTodoItems();
      setTodoItems(data);
    } catch (error) {
      console.error("Errore durante il caricamento dei TodoItems:", error);
    }
  };

  const deleteTodoItems = async (itemId: number) => {
    const isConfirmed = window.confirm("Sei sicuro di voler eliminare definitivamente questo Todo?");
    if (!isConfirmed) return;
    try {
      await deleteTodoItem(itemId);
      alert("Item eliminato con successo");
      await fetchTodoItems();
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'item", error);
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  return (
    <div className="todo-page-container">
      <div className="todo-header">
        <h1>Gestione TodoList</h1>
        <div className="buttons-container">
          <Link to="/todo/AddTodoItemPage">
            <button className="add-button">+ Aggiungi Todo</button>
          </Link>
          <Link to="/">
            <button className="home-button">🏠 Home</button>
          </Link>
        </div>
      </div>
      <div className="todo-list-container">
        {todoItems.map((item) => (
          <div key={item.id} className="todo-card">
            <h3>{item.title}</h3>
            <p className="description">{item.description}</p>
            <p className="date">📅 Inizio: {new Date(item.startDate).toLocaleDateString()}</p>
            <p className="date">⏳ Fine: {new Date(item.endDate).toLocaleDateString()}</p>
            <p className="priority">🔥 Priorità: {item.weight}</p>
            <p className="person">👤 Assegnato: {item.personId ? "Si" : "No"}</p>
            <p className="status">{item.isComplete ? "✅ Completato" : "❌ Non completato"}</p>
            <div className="todo-actions">
              <Link to="/todo/UpdateTodoItemPage" state={{ todoItem: item }}>
                <button className="update">✏️ Modifica</button>
              </Link>
              <button className="delete" onClick={() => deleteTodoItems(item.id)}>🗑️ Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoItems;
