import React, { useEffect, useState } from 'react'
import { getAllSprints, ISprintDto } from '../../api'
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
                        </div>
                    ))
                ) : (
                    <p className="loading-message">Caricamento o nessun sprint disponibile...</p>
                )}
            </div>
        </div>
    );
}

export default Sprint;