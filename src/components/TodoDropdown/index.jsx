import { useContext } from "react";
import { TodoContext } from "../../TodoContext";
import "./styles.css";

function TodoDropdown({ todoId, onDeleted, handleCloseDialog }) {
  const { setTodoToEdit, filterTodos, setOpenModal } = useContext(TodoContext);
  const handleDeleteTodo = (id) => {
    onDeleted(id);
    handleCloseDialog(false);
  };

  const handleEditTodo = (id) => {
    const findTodo = filterTodos.find((todo) => todo.id === id);
    setTodoToEdit(findTodo);
    handleCloseDialog(false);
    setOpenModal(true);
  };

  return (
    <ul className='todo--dropdown'>
      <li
        className='todo--dropdow__list-item'
        onClick={() => handleEditTodo(todoId)}
      >
        Edit...
      </li>
      <li
        className='todo--dropdow__list-item'
        onClick={() => handleDeleteTodo(todoId)}
      >
        Delete
      </li>
    </ul>
  );
}

export { TodoDropdown };
