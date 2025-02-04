import React from 'react'
import {useNavigate} from "react-router-dom"
import AddSprint from './addSprintForm';

const AddSprintPage = () =>{
    const navigate = useNavigate();

    const handleAdd = () =>{
        navigate('/sprints');
    };

    return(
        <div>
            <AddSprint onAdd={handleAdd} />
        </div>
    );
}

export default AddSprintPage;