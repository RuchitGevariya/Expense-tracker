import { createContext, useState, useEffect, children } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children  }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`${theme}-theme`);
    console.log(theme);
    
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
