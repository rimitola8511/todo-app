import { ReactComponent as Plus } from "../../assets/add_todo.svg";
import { useContext } from "react";
import { TodoContext } from "../../TodoContext";
import "./styles.css";

function CreateTodoButton() {
  const { openModal, setOpenModal } = useContext(TodoContext);
  return (
    <Plus
      className='todo--navbar__add-todo'
      onClick={() => setOpenModal(true)}
    />
  );
}

export { CreateTodoButton };
