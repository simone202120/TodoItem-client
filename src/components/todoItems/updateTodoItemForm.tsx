import React from "react";
import { updateTodoItem, IupdateTodoItemInput} from "../../api";
import { useState } from "react";
import "./todoItems.css";


//Come prop accetto una funzione (onAdd => fetchTodoItems) che verrà chiamata all'invio del form e non mi restituisce niente
const OnUpdate: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weight, setWeight] = useState(1);
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTodoItem(); 
      alert("TodoItem creato con successo!");
      onUpdate();
    } catch (error:any) {
      console.error("Errore durante la creazione del TodoItem:", error);
      alert(error.response.data.error.details);
    }
  };

  return (
    <div className="add-todo-form">
      <h2>Modifica TodoItem</h2>
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

export default OnUpdate;
