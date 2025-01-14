import styles from "./inputField.module.scss";

const InputField = ({ label, id, type = "text", placeholder, required, icon, options,onchange ,value}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select id={id} required={required} className="--input" onChange={onchange}>
            {options && options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={id}
            placeholder={placeholder}
            required={required}
            className="--input"
            onChange={onchange}
          />
        );
      case "radio":
        return (
          <div className="--input" >
              <label htmlFor={id}>
                <input type="radio" id={id} name={label} value={id}  onChange={onchange}/>
                {label}
              </label>
          </div>
        );
      default:
        return (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            required={required}
            className="--input"
            onChange={onchange}
            value={value}
          />
        );
    }
  };

  return (
    <div className={styles.inputField}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {renderInput()}
      {icon && <span>{icon}</span>}
    </div>
  );
};

export default InputField;

