import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ISprintDto } from "../../api";
import UpdateSprint from "./updateSprintForm";

const  UpdateSprintPage = () =>{
    const location = useLocation();
    const sprint: ISprintDto = location.state?.sprint;

    const navigate = useNavigate();
    const handleUpdate = () =>{
        navigate("/sprints");
    }

    return(
        <div>
         <UpdateSprint  onUpdate={handleUpdate} sprint={sprint}/> 
        </div>
    );
}

export default UpdateSprintPage; 
