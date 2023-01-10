import { useContext } from "react";
import { TodoContext } from "../../TodoContext";
import { TagItem } from "../TagItem";
import "./styles.css";

function FilterByTagList() {
  const { todos, toggleFilter, filters } = useContext(TodoContext);

  const getTodoTagList = () => {
    return [...new Set(todos.flatMap((todo) => todo.categories))];
  };

  return (
    <ul className={`taglist--container`}>
      {getTodoTagList().map((tag) => (
        <TagItem
          key={tag}
          tag={tag}
          showLabel
          isActive={filters.some((filter) => filter.value === tag)}
          isClickable
          handleOnClick={() =>
            toggleFilter("tag", tag, (todo) => todo.categories.includes(tag))
          }
        />
      ))}
    </ul>
  );
}

export { FilterByTagList };
