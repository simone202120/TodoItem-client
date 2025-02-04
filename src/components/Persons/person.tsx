import React, { useEffect, useState } from "react";
import "./person.css"; 
import { deletePersons, getAllPerson, getAllTodoItems } from "../../api";
import { Link } from "react-router-dom";

const Persons = () => {
  const [persons, setPersons] = useState<any[]>([]);

  const fetchPersons = async () => {
    try {
      const data = await getAllPerson();
      setPersons(data);
    } catch (error) {
      console.error("Errore durante il caricamento delle persone:", error);
    }
  }; 

  //Mi recupero gli item per vedere se la persona che sto eliminando ha degli item assegnati
  const fetchItems = async () =>{
    try {
      const data = await getAllTodoItems();
      return data;
    } catch (error) {
      console.error("Errore durante il caricamento degli items:", error);
    }
  }

  const deletePerson = async (personId: number) => {
    const assignedItems =  await fetchItems();
    const hasAssignedItems = assignedItems?.some(item => item.personId === personId);//cerco gli item che contengono quella personId
    if (hasAssignedItems) {
      alert("Non è possibile eliminare questa persona perché ha degli items assegnati");
      return;
    }
    const isConfirmed = window.confirm("Sei sicuro di voler eliminare definitivamente questa Persona?");
    if (!isConfirmed) return;
    try {
      await deletePersons(personId);
      await fetchPersons();
      alert("Persona eliminata con successo");
    } catch (error) {
      console.error("Errore durante l'eliminazione");
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="person-page-container">
      <div className="person-header">
        <h1>Gestione Persone</h1>
        <div className="buttons-container">
          <Link to="/person/AddPersonPage">
            <button className="add-button">+ Aggiungi Persona</button>
          </Link>
          <Link to="/">
            <button className="home-button">🏠 Home</button>
          </Link>
        </div>
      </div>
      <div className="person-list-container">
        {persons.map((person) => (
          <div key={person.id} className="person-card">
            <h3>👤 {person.name} {person.surname}</h3>
            <p className="birth-date">📅 Data di nascita: {new Date(person.birthDate).toLocaleDateString()}</p>
            <p className="tin"> 💳 TIN: {person.tin}</p>
            <div className="person-actions">
              <Link to="/person/UpdatePersonPage" state={{ person: person }}>
                <button className="update">✏️ Modifica</button>
              </Link>
              <button className="delete" onClick={() => deletePerson(person.id)}>🗑️ Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;