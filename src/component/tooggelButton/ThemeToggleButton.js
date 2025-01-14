
import React from "react";

import { BsSun, BsMoon } from "react-icons/bs"; 
import styles from "./theme-toggle-button.module.css"; 
import { useTheme } from "../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className={`${styles.slider} ${styles.round}`}>
          <span className={styles.icon}>
             <BsSun className={styles.sunIcon}/> 
             <BsMoon className={styles.moonIcon}/>
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggleButton;
