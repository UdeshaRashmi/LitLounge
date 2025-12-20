import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Dark mode removed: always use light theme.
  const [theme] = useState('light');

  useEffect(() => {
    // Always reflect current theme on the document element.
    // When switching to dark, add the 'dark' class and remove any legacy
    // 'darkmode' token. When switching to light, ensure both are removed.
    // Ensure no dark classes remain anywhere in the document.
    try {
      const root = document.documentElement;
      const body = document.body;
      root.classList.remove('dark', 'darkmode');
      body.classList.remove('dark', 'darkmode');
      const elems = document.querySelectorAll('.dark, .darkmode');
      elems.forEach((el) => {
        el.classList.remove('dark');
        el.classList.remove('darkmode');
      });
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // No-op toggle to preserve API shape for consumers.
  const setTheme = () => {};
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;
