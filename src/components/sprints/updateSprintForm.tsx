import React, { useEffect, useState } from "react";
import { ISprintDto, updateSprint } from "../../api";
import { useNavigate } from "react-router-dom";

const UpdateSprint : React.FC<{sprint:ISprintDto; onUpdate : () => void}> = ({sprint, onUpdate})=>{
    const navigate = useNavigate();

    const [title, setTitle] = useState(sprint.title);
    const [description, setDescription] = useState(sprint.description);
    const [startDate, setStartDate] = useState(sprint.startDate);
    const [endDate, setEndDate] = useState(sprint.endDate);
    const [id, setId] = useState(sprint.id);
    const [isComplete, setIsComplete] = useState(sprint.isComplete??  false);

    useEffect(()=> {
        setTitle(sprint.title);
        setDescription(sprint.description);
        setStartDate(sprint.startDate);
        setEndDate(sprint.endDate);
        setIsComplete(sprint.isComplete);
        setId(sprint.id);
    },[sprint]);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        const UpdateSprint ={
            ...sprint,
            id,
            title,
            description,
            endDate,
            startDate,
            isComplete,
        };

        try {
            await updateSprint(UpdateSprint);
            alert("Sprint aggiornato con successo");
            onUpdate();
        } catch (error:any) {
            console.error("Errore durante l'aggiornamento del TodoItem:", error);
            alert(error.response?.data?.error?.details || "Errore sconosciuto");
        }
    };
    return (
        <div className="todo-form-container">
          <h2>Aggiorna Sprint</h2>
          <form onSubmit={handleSubmit} className="todo-form">
            <label>Titolo</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    
            <label>Descrizione</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
    
            <label>Data di inizio</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
    
            <label>Data di fine</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <label>
            Completato
            <input  type="checkbox" checked={isComplete} onChange={(e) => setIsComplete(e.target.checked)} />
            </label>
            <button type="submit" className="btn-submit">Aggiorna</button>
            <button type="button" className="btn-back" onClick={() => navigate(-1)}>Annulla</button>
          </form>
        </div>
      );
}

export default UpdateSprint;