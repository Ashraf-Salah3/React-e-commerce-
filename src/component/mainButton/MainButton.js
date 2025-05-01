const MainButton = ({ value, type, onClick,loading }) => {
  return (
    <button
      className={`--btn --btn-small ${value === "Save" ? "--btn-primary" : ""}`}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "loading": value}
    </button>
  );
};

export default MainButton;
