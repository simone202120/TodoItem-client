import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import UpdateTodoItemForm from './updateTodoItemForm';
import { ITodoItemDto } from '../../api';

const UpdateTodoItemPage = () => {
    //START - Passo al link nel button per l'update l'item di riferimento in modod da avere a disposizione i vecchi dati
    const location = useLocation();
    const  todoItem: ITodoItemDto = location.state?.todoItem; 
    // END
    const navigate = useNavigate();

    const handleUpdate = () =>{
        navigate("/todo");
    }

    return(
        <div>
            <UpdateTodoItemForm onUpdate={handleUpdate} todoItem={todoItem} />
        </div>
    );
}

export default UpdateTodoItemPage;