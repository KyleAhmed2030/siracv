import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

/**
 * Theme Context Provider - Manages the theme state (light/dark) for the app
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialTheme - Initial theme value ('light' or 'dark')
 * @returns {React.ReactNode} Provider Component
 */
export const ThemeContextProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState(initialTheme);
  
  // When theme changes, update localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  /**
   * Set a specific theme
   * 
   * @param {string} newTheme - Theme to set ('light' or 'dark')
   */
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setSpecificTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};