const MainButton = ({ value, type, onClick }) => {
  return (
    <button
      className={`--btn --btn-small ${value === "Save" ? "--btn-primary" : ""}`}
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default MainButton;
