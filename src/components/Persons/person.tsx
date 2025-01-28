import React, { useEffect, useState } from "react";
import "./person.css"; // Importa il file CSS
import { getAllPerson } from "../../api";
import { FaUser, FaBirthdayCake, FaIdCard } from "react-icons/fa"; // Importa icone

const Persons = () => {
  const [persons, setPersons] = useState<any[]>([]);

  useEffect(() => {
    getAllPerson().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <ul className="person-list">
        {persons.map((person) => (
          <li key={person.id} className="person-item">
            <h3>
              <FaUser /> {person.name} {person.surname}
            </h3>
            <p className="birth-date">
              <FaBirthdayCake /> Data di nascita:{" "}
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