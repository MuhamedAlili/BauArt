"use client";

import { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "bauart_theme";

/* Inlined into <head> (see layout.js) so the correct theme is set on the
   <html> element before first paint — avoids a flash of the wrong theme. */
export const THEME_INIT_SCRIPT = `
(function(){
  try{
    var stored = localStorage.getItem(${JSON.stringify(THEME_KEY)});
    var theme = stored === "dark" || stored === "light"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }catch(e){}
})();
`;

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setThemeState(current);
  }, []);

  const setTheme = (next) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
