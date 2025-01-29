import React, { useEffect, useState } from "react";
import "./person.css"; 
import { getAllPerson } from "../../api";
import { FaUser, FaBirthdayCake, FaIdCard } from "react-icons/fa"; 
import AddPersons from "./addPersons"

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

  useEffect(() => {
      fetchPersons();
  }, []);

  return (
    <div>
      {/* <AddPersons onAdd={fetchPersons}/> */}
      <ul className="person-list">
        {persons.map((person) => (
          <li key={person.id} className="person-item">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;