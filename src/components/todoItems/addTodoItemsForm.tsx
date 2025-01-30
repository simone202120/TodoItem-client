import React from "react";
import {createTodoItem, ICreateTodoItemInput} from "../../api";
import { useState } from "react";
import "./todoItems.css";

//Come prop accetto una funzione (onAdd => fetchTodoItems) che verrà chiamata all'invio del form e non mi restituisce niente
const AddTodoItem: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weight, setWeight] = useState(1);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodoItem: ICreateTodoItemInput = {
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      weight: Number(weight),
    };
    try {
      await createTodoItem(newTodoItem); 
      alert("TodoItem creato con successo!");
      onAdd();
    } catch (error) {
      console.error("Errore durante la creazione del TodoItem:", error);
      alert("Si è verificato un errore durante la creazione del TodoItem.");
    }
  };

  return (
    <div className="add-todo-form">
      <h2>Aggiungi un nuovo TodoItem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrizione:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data di inizio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data di fine:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priorità (1-10):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="1"
            max="10"
            required
          />
        </div>
        <button type="submit">Crea TodoItem</button>
      </form>
    </div>
  );
};

export default AddTodoItem;
