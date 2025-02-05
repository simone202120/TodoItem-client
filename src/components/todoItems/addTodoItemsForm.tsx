import React, { useState } from "react";
import { createTodoItem, ICreateTodoItemInput } from "../../api";
import "./todoItems.css";
import { useNavigate } from "react-router-dom";

const AddTodoItem: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  //setto lo stato di partenza per tutte le proprietà
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weight, setWeight] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //previene il comportamento di default del form in modo da fare la chiamata api quando viene fatto il submit

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
    } catch (error: any) {
      console.error("Errore durante la creazione del TodoItem:", error);
      alert(error.response.data.error.details);
    }
  };

  return (
    <div className="todo-form-container">
      <div className="todo-form">
        <form onSubmit={handleSubmit}>
        <h2>Aggiungi un nuovo TodoItem</h2>
          <div className="form-group">
            <label>Titolo:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descrizione:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data di inizio:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data di fine:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Priorità (1-10):</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min="1" max="10" required />
          </div>
          <button type="submit" className="btn-submit">Crea TodoItem</button>
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>Annulla</button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoItem;