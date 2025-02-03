import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IPersonDto } from '../../api';
import UpdatePersonForm from './UpdatePersonForm';



const UpdatePersonPage = () =>{
    const location = useLocation();
    const person: IPersonDto = location.state?.person;

    const navigate = useNavigate();
    const handleUpdate = () =>{
        navigate("/persons");
    }

    return(
        <div>
        <UpdatePersonForm onUpdate={handleUpdate} person={person} />
    </div>
    );

}

export default UpdatePersonPage;