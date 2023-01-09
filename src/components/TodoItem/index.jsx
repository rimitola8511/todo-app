import { useContext, useState } from "react";
import { TodoContext } from "../../TodoContext";
import { Input } from "../Checkbox";
import { TagItem } from "../TagItem";
import { TodoDropdown } from "../TodoDropdown";

import "./styles.css";

function TodoItem({
  id,
  title,
  description,
  categories,
  completed,
  onCompleted,
  onDeleted,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className='todo--item-box'>
      <section>
        <header className='todo--item__header'>
          <h3 className={completed ? "todo--item__completed" : ""}>{title}</h3>
          <div
            className='todo--item__header--action'
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <span className='todo--item__header--action__bullet' />
            <span className='todo--item__header--action__bullet' />
            <span className='todo--item__header--action__bullet' />
          </div>
        </header>
        <div className='todo--item__content'>
          <p className={completed ? "todo--item__completed" : ""}>
            {description}
          </p>
        </div>
      </section>
      <footer className='todo--item__footer'>
        <div className='todo--item__footer--category'>
          {categories.map((tag, index) => (
            <TagItem key={tag} tag={tag} />
          ))}
        </div>
        <Input
          type='checkbox'
          label='done'
          onChange={() => onCompleted(id)}
          checked={completed}
        />
      </footer>
      {openDropdown && (
        <TodoDropdown
          onDeleted={onDeleted}
          todoId={id}
          handleCloseDialog={setOpenDropdown}
        />
      )}
    </div>
  );
}

export { TodoItem };
