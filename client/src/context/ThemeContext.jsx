import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Only honor a previously saved theme if the user explicitly set it.
  // This ensures dark mode is active only when the user toggles the button.
  const [theme, setTheme] = useState(() => {
    try {
      const wasSet = localStorage.getItem('litlounge-theme-set');
      if (wasSet === '1') {
        return localStorage.getItem('litlounge-theme') || 'light';
      }
    } catch (e) {
      // ignore
    }
    return 'light';
  });

  useEffect(() => {
    // Always reflect current theme on the document element
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      try {
        // Persist the user's explicit choice and mark that they set it.
        localStorage.setItem('litlounge-theme', next);
        localStorage.setItem('litlounge-theme-set', '1');
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

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
