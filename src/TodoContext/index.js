import { useState, useEffect } from "react";
import { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TAG_LIST = ["work", "study", "entertaiment", "family"];

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
  return todos.reduce((acc, cur) => (acc.id > cur.id ? acc.id : cur.id), 0);
};

function TodoProvider({ children }) {
  const {
    items: todos,
    saveItems: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [filterTodos, setFilterTodos] = useState(todos);
  const [openModal, setOpenModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // if (shouldHideTodoCompleted) {
    //   const newTodoList = todos.filter((todo) => !todo.completed);
    //   setFilterTodos(newTodoList);
    // } else {
    setFilterTodos(todos);
    // }
  }, [todos]);

  function filterExists(name, value) {
    if (typeof value === "boolean")
      return filters.find((f) => f.name === name) !== undefined;
    return (
      filters.find((f) => f.name === name && f.value === value) !== undefined
    );
  }

  function addFilter(name, value, fnc) {
    if (name === "search") {
      setFilters((currentFilters) => {
        const index = currentFilters.findIndex(
          (current) => current.name === name
        );
        if (index === -1) {
          return [...currentFilters, { name, value, fnc }];
        }
        let current = [...currentFilters];
        current[index] = { ...current[index], value };
        return [...current];
      });
    } else {
      setFilters((currentFilters) => [...currentFilters, { name, value, fnc }]);
    }
  }

  function removeFilter(name, value) {
    if (typeof value === "boolean") {
      setFilters((currentFilters) =>
        currentFilters.filter((f) => !(f.name === name))
      );
    } else {
      setFilters((currentFilters) =>
        currentFilters.filter((f) => !(f.name === name && f.value === value))
      );
    }
  }

  function toggleFilter(name, value, fnc) {
    if (filterExists(name, value)) {
      removeFilter.apply(null, arguments);
    } else {
      addFilter.apply(null, arguments);
    }
  }

  const handleFilter = (todo, filterName) => {
    const filter = filters.filter((f) => f.name === filterName);
    if (!filter.length) return true;
    return filter.every((f) => f.fnc(todo));
  };

  const getTodos = () => {
    return todos.filter((todo) => {
      const search = handleFilter(todo, "search");
      const tag = handleFilter(todo, "tag");
      const hideComplete = handleFilter(todo, "hideComplete");
      return search && tag && hideComplete;
    });
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

  const createTodo = (newTodo) => {
    const findTodoIndex = todos.findIndex((todo) => todo.id === newTodo.id);
    if (findTodoIndex === -1) {
      saveTodos([
        ...todos,
        { id: getMaxId(todos) + 1, completed: false, ...newTodo },
      ]);
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
    todos,
    toggleFilter,
    getTodos,
    filters,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext, TodoProvider };
