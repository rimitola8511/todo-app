import { TodoContext } from "../TodoContext";
import { TodoNavbar } from "../components/TodoNavbar";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { Input } from "../components/Checkbox";
import { useContext } from "react";
import { CreateTodoModal } from "../components/CreateTodoModal";
import { CreateTodoForm } from "../components/CreateTodoForm";
import { FilterByTagList } from "../components/FilterTagList";

function AppUI() {
  const {
    toggleFilter,
    filterTodos,
    handleCompleted,
    handleDelete,
    openModal,
    getTodos,
  } = useContext(TodoContext);

  return (
    <section className='todo'>
      <TodoNavbar />

      <main className='todo--container'>
        <section className='todo--sidebar'>
          <Input
            type='text'
            placeholder='Buscar todo...'
            onChange={(e) =>
              toggleFilter("search", e.target.value, (todo) =>
                todo.title.toLowerCase().includes(e.target.value.toLowerCase())
              )
            }
          />

          {filterTodos.length > 0 && <FilterByTagList />}
          <div className='todo--sidebar__checkbox'>
            <Input
              id='checkbox'
              type='checkbox'
              label='Hide Done Tasks'
              onChange={(e) =>
                toggleFilter(
                  "hideComplete",
                  e.target.checked,
                  (todo) => !todo.completed
                )
              }
            />
          </div>
        </section>

        <section className='todo--content'>
          <TodoList>
            {getTodos().map((todo) => (
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
