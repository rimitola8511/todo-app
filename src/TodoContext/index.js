import { useState, useEffect } from "react";
import { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TAG_LIST = ["work", "study", "entertaiment", "family", "all"];

const TodoContext = createContext({
  loading: true,
  error: "",
  handleSearch: () => [],
  handleFilterByTag: () => {},
  handleHideDoneTasks: () => {},
  filterTodos: [],
  handleCompleted: () => {},
  handleDelete: () => {},
  openModal: false,
  setOpenModal: () => {},
  TAG_LIST: [],
});

const getMaxId = (todos) => {
  if (!todos.length) return 0;
  return todos.reduce((acc, cur) => (acc.id > cur.id ? acc.id : cur.id));
};

function TodoProvider({ children }) {
  const {
    items: todos,
    saveItems: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [filterTodos, setFilterTodos] = useState(todos);
  const [shouldHideTodoCompleted, setShouldHideTodoCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  useEffect(() => {
    if (shouldHideTodoCompleted) {
      const newTodoList = todos.filter((todo) => !todo.completed);
      setFilterTodos(newTodoList);
    } else {
      setFilterTodos(todos);
    }
  }, [shouldHideTodoCompleted, todos]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();

    const newTodos = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(value) ||
        todo.description.toLowerCase().includes(value)
    );

    setFilterTodos(newTodos);
  };

  const handleHideDoneTasks = (event) => {
    const isChecked = event.target.checked;
    setShouldHideTodoCompleted(isChecked);
    if (isChecked) {
      const newTodoList = todos.filter((todo) => !todo.completed);
      setFilterTodos(newTodoList);
    } else {
      setFilterTodos(todos);
    }
  };

  const handleCompleted = (id) => {
    const findTodoIndex = todos.findIndex((todo) => todo.id === id);
    const todosEdited = [...todos];
    todosEdited[findTodoIndex].completed =
      !todosEdited[findTodoIndex].completed;
    saveTodos([...todosEdited]);
  };

  const handleEditTodo = (newTodo) => {
    const findTodoIndex = todos.findIndex((todo) => todo.id === newTodo.id);
    const todosEdited = [...todos];
    todosEdited[findTodoIndex] = newTodo;
    saveTodos(todosEdited);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  const handleFilterByTag = (tag) => {
    const filterTodos = todos.filter((todo) => {
      if (tag === "all") return todo;
      return todo.categories.includes(tag);
    });
    setFilterTodos(filterTodos);
  };

  const createTodo = (newTodo) => {
    const maxId = getMaxId(todos);
    const findTodoIndex = todos.findIndex((todo) => todo.id === newTodo.id);
    if (findTodoIndex === -1) {
      saveTodos([...todos, { id: maxId + 1, ...newTodo }]);
    } else {
      const todosCopy = [...todos];
      const todoToEdit = todosCopy[findTodoIndex];
      todosCopy[findTodoIndex] = { ...todoToEdit, ...newTodo };
      saveTodos(todosCopy);
    }
  };

  const value = {
    loading,
    error,
    handleSearch,
    handleFilterByTag,
    handleHideDoneTasks,
    filterTodos,
    handleCompleted,
    handleDelete,
    openModal,
    setOpenModal,
    TAG_LIST,
    handleEditTodo,
    setTodoToEdit,
    todoToEdit,
    createTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext, TodoProvider };
