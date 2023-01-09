import { TodoContext } from "../TodoContext";
import { TodoNavbar } from "../components/TodoNavbar";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { Input } from "../components/Checkbox";
import { useContext } from "react";
import { CreateTodoModal } from "../components/CreateTodoModal";
import { CreateTodoForm } from "../components/CreateTodoForm";
import { FilterByTagList } from "../components/FilterByTagList";

function AppUI() {
  const {
    handleSearch,
    handleHideDoneTasks,
    filterTodos,
    handleCompleted,
    handleDelete,
    openModal,
  } = useContext(TodoContext);

  return (
    <section className='todo'>
      <TodoNavbar />

      <main className='todo--container'>
        <section className='todo--sidebar'>
          <Input
            type='text'
            placeholder='Buscar todo...'
            onChange={handleSearch}
          />

          {filterTodos.length > 0 && <FilterByTagList />}
          <div className='todo--sidebar__checkbox'>
            <Input
              id='checkbox'
              type='checkbox'
              label='Hide Done Tasks'
              onChange={handleHideDoneTasks}
            />
          </div>
        </section>

        <section className='todo--content'>
          <TodoList>
            {filterTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                categories={todo.categories}
                completed={todo.completed}
                onCompleted={handleCompleted}
                onDeleted={handleDelete}
              />
            ))}
          </TodoList>
        </section>
      </main>

      {openModal && (
        <CreateTodoModal>
          <CreateTodoForm />
        </CreateTodoModal>
      )}
    </section>
  );
}

export { AppUI };
