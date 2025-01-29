import React from 'react';
import AddPersons from './addPersonsForm';  
import { useNavigate } from 'react-router-dom';

const AddPersonPage = () => {
    const navigate = useNavigate();

    const handleAdd = () =>{
        navigate("/persons")
    };

    return(
        <div>
            <AddPersons onAdd={handleAdd}/>
        </div>
    );
};

export default AddPersonPage;