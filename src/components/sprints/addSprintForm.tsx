import React, { useState } from "react";
import { createSprint, ICreateSprintInput } from "../../api";
import { useNavigate } from "react-router-dom";

const AddSprint : React.FC<{onAdd: ()=> void}> = ({onAdd}) =>{
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        const newSprint : ICreateSprintInput = {
            title,
            description,
            startDate,
            endDate,
            isComplete
        };
        try {
            await createSprint(newSprint);
            alert("Sprint Creato con successo")
            onAdd();
        } catch (error:any) {
            console.error("Errore durante la creazione dello Sprint:", error);
            alert(error.response.data.error.details);
        }
    }
    return(
        <div className="todo-form-container">
      <div className="todo-form">
        <h2>Aggiungi un nuovo Sprint</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn-submit">Crea Sprint</button>
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>Annulla</button>
        </form>
      </div>
    </div>
    );
}

export default AddSprint;