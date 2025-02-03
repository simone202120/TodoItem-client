import React, { useEffect, useState } from "react";
import "./person.css"; 
import { deletePersons, getAllPerson } from "../../api";
import { FaUser, FaBirthdayCake, FaIdCard } from "react-icons/fa"; 
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

  const deletePerson = async (personId: number) => {
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
            <h3><FaUser /> {person.name} {person.surname}</h3>
            <p className="birth-date"><FaBirthdayCake /> Data di nascita: {new Date(person.birthDate).toLocaleDateString()}</p>
            <p className="tin"><FaIdCard /> TIN: {person.tin}</p>
            <div className="person-actions">
              <button className="update">✏️ Modifica</button>
              <button className="delete" onClick={() => deletePerson(person.id)}>🗑️ Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;