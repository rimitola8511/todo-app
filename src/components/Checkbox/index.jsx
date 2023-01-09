import "./styles.css";

function Input({ id = "input-field", label, ...props }) {
  return (
    <div className='checkbox--container'>
      <input className={`input__${props.type}`} id={id} {...props} />
      {label && (
        <label htmlFor={id} className='input__label'>
          {label}
        </label>
      )}
    </div>
  );
}

export { Input };
