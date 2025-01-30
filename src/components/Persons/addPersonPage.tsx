import { useNavigate } from 'react-router-dom';
import AddPersons from './addPersonsForm';

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