import { CreateTodoButton } from "../CreateTodoButton";
import "./styles.css";

function TodoNavbar() {
  return (
    <nav className='todo--navbar'>
      <ul className='todo--navbar__ul'>
        <li className='todo--navbar__li'>
          <h1 className='todo--navbar__logo'>Todo</h1>
        </li>
        <li className='todo--navbar__li'>
          <CreateTodoButton />
        </li>
      </ul>
    </nav>
  );
}

export { TodoNavbar };
