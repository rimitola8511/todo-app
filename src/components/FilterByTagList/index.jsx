import { useContext } from "react";
import { TodoContext } from "../../TodoContext";
import { TagItem } from "../TagItem";
import "./styles.css";

function FilterByTagList() {
  const { TAG_LIST: list, handleFilterByTag } = useContext(TodoContext);
  return (
    <ul className={`taglist--container`}>
      {list.map((tag) => (
        <TagItem
          key={tag}
          tag={tag}
          showLabel
          isClickable
          handleOnClick={() => handleFilterByTag(tag)}
        />
      ))}
    </ul>
  );
}

export { FilterByTagList };
