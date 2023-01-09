import { useContext } from "react";
import { TodoContext } from "../../TodoContext";
import "./styles.css";

function TodoList({ children }) {
  const { error, loading, filterTodos } = useContext(TodoContext);

  if (error) return <h3>Oh no!!!! and error has occurred: {error.message}</h3>;

  if (loading) return <h3>Loading...</h3>;

  if (!filterTodos.length) return <h3>There aren't todos to display</h3>;

  return <div className='todolist--container'>{children}</div>;
}

export { TodoList };
