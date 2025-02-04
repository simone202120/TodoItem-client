import React, { useEffect, useState } from 'react'
import { deleteSprints, getAllSprints, ISprintDto } from '../../api'
import './sprint.css';
import { Link } from 'react-router-dom';

const Sprint = () =>{
    const [sprints, setSprint] = useState<ISprintDto[]>([]);

    const fetchSprints = async () => {
        try{
            const data = await getAllSprints();
            setSprint(data);
        }catch(error){
            console.error("Errore durante il caricamento degli sprint:", error);
        }
    }

    useEffect(()=>{
        fetchSprints();
    }, []);

     const deleteSprint = async (sprintId: number) => {
        const isConfirmed = window.confirm("Sei sicuro di voler eliminare definitivamente questo Sprint?");
        if (!isConfirmed) return;
        try {
          await deleteSprints(sprintId);
          alert("Sprint eliminato con successo");
          await fetchSprints();
        } catch (error) {
          console.error("Errore durante l'eliminazione dello Sprint", error);
        }
      };

    return (
        <div className="sprint-page-container">
            <h1>Gestione Sprints</h1>
            <div className="buttons-container">
                <Link to="/sprints/AddSprintPage">
                <button className="add-button">+ Aggiungi Sprint</button>
                </Link>
                <Link to="/">
                <button className="home-button">🏠 Home</button>
                </Link>
        </div>
            <div className="sprint-list-container">
                {sprints.length > 0 ? (
                    sprints.map((sprint) => (
                        <div key={sprint.id} className="sprint-card">
                            <h3 className="SprintTitle">{sprint.title}</h3>
                            <p className="sprint-description">{sprint.description}</p>
                            <p className="sprint-date">📅 Inizio: {new Date(sprint.startDate).toLocaleDateString()}</p>
                            <p className="sprint-date">⏳ Fine: {new Date(sprint.endDate).toLocaleDateString()}</p>
                            <p className="status">{sprint.isComplete ? "✅ Completato" : "❌ Non completato"}</p>
                            <div className="todo-actions">
                                <Link to="/sprints/UpdateSprintPage" state={{ sprint: sprint }}>
                                    <button className="update" >✏️ Modifica</button>
                                </Link>
                                <button className="delete" onClick={()=>deleteSprint(sprint.id)}>🗑️ Elimina</button> 
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessuno sprint disponibile</p>
                )}
            </div>
        </div>
    );
}

export default Sprint;