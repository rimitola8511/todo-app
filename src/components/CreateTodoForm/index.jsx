import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../TodoContext";
import { TagItem } from "../TagItem";

import "./styles.css";

function CreateTodoForm() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    categories: [],
  });
  const [error, setError] = useState("");
  const {
    setOpenModal,
    TAG_LIST: list,
    todoToEdit,
    setTodoToEdit,
    createTodo,
  } = useContext(TodoContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.categories.length) {
      setError("Debe escoger al menos una categoria");
      return;
    }

    createTodo(todo);
    setOpenModal(false);
    setTodoToEdit(null);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTodo((old) => ({ ...old, [name]: value }));
  };

  const chooseTag = (tag) => {
    const findTag = todo.categories.findIndex(
      (categoryTag) => categoryTag === tag
    );
    if (findTag === -1) {
      setTodo((old) => ({ ...old, categories: [...old.categories, tag] }));
    } else {
      setTodo((old) => ({
        ...old,
        categories: old.categories.filter((categoryTag) => categoryTag !== tag),
      }));
    }
    setError("");
  };

  const handleCancel = () => {
    setTodoToEdit(null);
    setOpenModal(false);
  };

  useEffect(() => {
    if (todoToEdit) {
      setTodo(todoToEdit);
    }
  }, [todoToEdit]);

  return (
    <div className='todo--form'>
      <form onSubmit={handleSubmit}>
        <div className='todo--form__actions--buttons'>
          <button className='todo--form__cancel--button' onClick={handleCancel}>
            Cancelar
          </button>
          <button className='todo--form__add-edit--button' type='submit'>
            {todoToEdit ? "Edit" : "Add"}
          </button>
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='add a title...'
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            placeholder='description...'
            rows='5'
            value={todo.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='form-group'>
          <label>Tag</label>
          <ul>
            {list
              .filter((tag) => tag !== "all")
              .map((tag) => (
                <TagItem
                  key={tag}
                  tag={tag}
                  isClickable
                  showLabel
                  handleOnClick={() => chooseTag(tag)}
                  isActive={todo.categories.some(
                    (categoryTag) => categoryTag === tag
                  )}
                />
              ))}
          </ul>
          <div className='todo--form__error--categories'>{error}</div>
        </div>
      </form>
    </div>
  );
}

export { CreateTodoForm };
