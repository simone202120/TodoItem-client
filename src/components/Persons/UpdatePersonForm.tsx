import React, { useEffect, useState } from 'react'
import { IPersonDto, updatePerson } from '../../api'
import './person.css'
import { useNavigate } from 'react-router-dom';

const UpdatePersonForm : React.FC<{person : IPersonDto; onUpdate:() => void}> = ({person, onUpdate}) =>{
    const navigate = useNavigate();
    //setto gli stati di partenza con i valori dell'item
    const [name, setName] = useState(person.name);
    const [surname, setSurname] = useState(person.surname);
    const [tin, setTin] = useState(person.tin);
    const [birthDate, setBirthDate] =useState(person.birthDate);
    const [cityCode, setCityCode]= useState(person.cityCode);
    const [id, setId] = useState(person.id);

    useEffect(()=> {
        setName(person.name);
        setSurname(person.surname);
        setBirthDate(person.birthDate);
        setCityCode(person.cityCode);
        setTin(person.tin)
        setId(person.id);
    }, [person])

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        const updatePersonInput = {
            ...person,
            id,
            name,
            surname,
            birthDate,
            cityCode,
        };

        try{
            await updatePerson(updatePersonInput);
            alert("Persona Aggiornata con successo")
            onUpdate();
        }catch(error:any){
            console.error("Errore durante l'aggiornamento della persona:", error);
            alert(error.response?.data?.error?.details || "Errore sconosciuto");
        }
    }

    return (
        <div className="person-form-container">
            <div className="person-form">
                <h2>Modifica persona</h2>
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
                    <button type="submit" className="btn-submit">Aggiorna Persona</button>
                    <button type="button" className="btn-back" onClick={() => navigate(-1)}>Annulla</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePersonForm;