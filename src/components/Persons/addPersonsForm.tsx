import React, { useState } from "react";
import { createPerson, ICreatePersonInput } from "../../api";
import "./person.css";

const AddPersons: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [tin, setTin] = useState("");
    const [cityCode, setCityCode] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPerson: ICreatePersonInput = {
            name,
            surname,
            birthDate: new Date(birthDate).toISOString().split("T")[0],
            tin,
            cityCode
        };
        try {
            await createPerson(newPerson);
            alert("Persona creata con successo!");
            onAdd();
        } catch (error: any) {
            console.error("Errore durante la creazione della persona:", error.details);
            alert(error.response.data.error.details);
        }
    };

    return (
        <div className="person-form-container">
            <div className="person-form">
                <h2>Aggiungi nuova persona</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Cognome:</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Data di nascita:</label>
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Codice Fiscale:</label>
                        <input type="text" value={tin} onChange={(e) => setTin(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Sigla città:</label>
                        <input type="text" value={cityCode} onChange={(e) => setCityCode(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-submit">Crea Persona</button>
                </form>
            </div>
        </div>
    );
};

export default AddPersons;
