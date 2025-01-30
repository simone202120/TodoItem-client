import React, { useEffect, useState } from "react";
import "./person.css"; 
import { deletePersons, getAllPerson } from "../../api";
import { FaUser, FaBirthdayCake, FaIdCard } from "react-icons/fa"; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Persons = () => {
  const [persons, setPersons] = useState<any[]>([]);

  const fetchPersons = async () =>{
    try{
      const data = await getAllPerson();
      setPersons(data);
    }catch(error){
      console.error("Errore durante il caricamento delle persone:", error);
    }
  }

  const deletePerson = async(personId:number) =>{
    try{
      await deletePersons(personId);
      await fetchPersons();
      alert("Persona eliminata con successo");
    }catch(error){
      console.error("Errore durante l'eliminazione");
    }
  }

  useEffect(() => {
      fetchPersons();
  }, []);

  return (
    <div>
    <div className="ButtonContainer"> <h3 className="Title">Persons</h3><div/>
      <Link className="linkBox" to="/todo/AddPersonPage">
      <button className="add-button">+</button>
      </Link>
      <Link className="linkBox" to="/"><button className="add-button">Home</button></Link>
      </div>
      <ul className="todo-list">
        {persons.map((person) => (
          <li key={person.id} className="todo-item">
            <h3>
              <FaUser /> {person.name} {person.surname}
            </h3>
            <p className="birth-date">
              <FaBirthdayCake /> Data di nascita: 
              {new Date(person.birthDate).toLocaleDateString()}
            </p>
            <p className="tin">
              <FaIdCard /> TIN: {person.tin}
            </p>
            <div className="deleteContainer">
            <button className="update" onClick={() => deletePerson(person.id)}>🔧</button>
            <button className="delete" onClick={()=>deletePerson(person.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;