import "./styles.css";

function TagItem({ tag, showLabel, handleOnClick, isClickable, isActive }) {
  return (
    <li
      className={`tag--item ${isClickable ? "clickable" : ""} 
        ${isActive ? "active" : ""}`}
      onClick={handleOnClick}
    >
      <span className={`tag--item__circle ${tag}`} />
      {showLabel && <span className='tag--item__text'>{tag}</span>}
    </li>
  );
}

export { TagItem };
