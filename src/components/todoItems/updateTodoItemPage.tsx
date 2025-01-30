import React from 'react'
import { useNavigate, useLocation  } from 'react-router-dom';
import UpdateTodoItems from './updateTodoItemForm';

const updateTodoItemPage = () =>{
    const navigate = useNavigate();

    const handleUpdate = () =>{
        navigate("/todo")
    };

    return(
        <div>
             <UpdateTodoItems onUpdate={handleUpdate}/> 
        </div>
    )
};
 export default updateTodoItemPage;