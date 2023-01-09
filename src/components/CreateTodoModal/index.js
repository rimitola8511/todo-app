import { createPortal } from "react-dom";
import "./styles.css";

function CreateTodoModal({ children }) {
  return createPortal(
    <div className='create-todo-modal'>{children}</div>,
    document.getElementById("modal")
  );
}

export { CreateTodoModal };
