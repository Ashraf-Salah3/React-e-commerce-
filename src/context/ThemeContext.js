import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; // الوضع الافتراضي الآن هو "light".
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // تطبيق الثيم على مستوى DOM عند تغييره.
  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);


  useEffect(() => {
    if (location.pathname === "/login" || location.pathname.startsWith("/admin")) {
      document.body.classList.remove("dark", "light");
    } else {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.add("light");
      }
    }
  }, [location.pathname, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
