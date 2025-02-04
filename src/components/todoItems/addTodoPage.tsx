import AddTodoItem from "./addTodoItemsForm";   
import { useNavigate } from "react-router-dom";

const AddTodoItemPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/todo");
  };

  return (
    <div>
      <AddTodoItem onAdd={handleAdd} />
    </div>
  );
};

export default AddTodoItemPage;