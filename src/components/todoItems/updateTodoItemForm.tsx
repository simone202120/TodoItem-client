import React, { useState, useEffect } from "react";
import { updateTodoItem, ITodoItemDto, getAllPerson, IPersonDto } from "../../api";
import "./todoItems.css";
import { useNavigate } from "react-router-dom";

const UpdateTodoItemForm: React.FC<{ todoItem: ITodoItemDto; onUpdate: () => void }> = ({ todoItem, onUpdate }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(todoItem.title);
  const [description, setDescription] = useState(todoItem.description);
  const [startDate, setStartDate] = useState(todoItem.startDate.split("T")[0]);
  const [endDate, setEndDate] = useState(todoItem.endDate.split("T")[0]);
  const [weight, setWeight] = useState(todoItem.weight);
  const [id, setId] = useState(todoItem.id);
  const [isComplete, setIsComplete] = useState(todoItem.isComplete ?? false);
  const [personId, setPersonId] = useState<number | null>(todoItem.personId ?? null);
  const [persons, setPersons] = useState<IPersonDto[]>([]); 

  // Recupero la lista delle persone 
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const data = await getAllPerson();
        setPersons(data);
      } catch (error) {
        console.error("Errore nel caricamento delle persone:", error);
      }
    };

    fetchPersons();
  }, []);

  useEffect(() => {
    setTitle(todoItem.title);
    setDescription(todoItem.description);
    setStartDate(todoItem.startDate.split("T")[0]);
    setEndDate(todoItem.endDate.split("T")[0]);
    setWeight(todoItem.weight);
    setPersonId(todoItem.personId ?? null);
    setIsComplete(todoItem.isComplete ?? false);
    setId(todoItem.id);
  }, [todoItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodoItem = {
      ...todoItem,
      id,
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      weight: Number(weight),
      personId: personId ? Number(personId) : null,
      isComplete: Boolean(isComplete),
    };

    try {
      await updateTodoItem(updatedTodoItem);
      alert("TodoItem aggiornato con successo!");
      onUpdate();
    } catch (error: any) {
      console.error("Errore durante l'aggiornamento del TodoItem:", error);
      alert(error.response?.data?.error?.details || "Errore sconosciuto");
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
      <h2>Aggiorna il TodoItem</h2>
        <label>Titolo</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Descrizione</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Data di inizio</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

        <label>Data di fine</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

        <label>Priorità (1-10)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min="1" max="10" required />

        <label>
        Completato
        <input  type="checkbox" checked={isComplete} onChange={(e) => setIsComplete(e.target.checked)} />
        </label>

        <label>Assegna a una persona</label>
        <select value={personId ?? ""} onChange={(e) => setPersonId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Nessuna persona assegnata</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name} {person.surname}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-submit">Aggiorna</button>
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>Annulla</button>
      </form>
    </div>
  );
};

export default UpdateTodoItemForm;
