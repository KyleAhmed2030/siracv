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
  // Try to get saved theme from localStorage
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : initialTheme;
  };
  
  const [theme, setTheme] = useState(getSavedTheme);
  
  // When theme changes, update localStorage and apply theme to body
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    console.log('Theme changed to:', theme);
  }, [theme]);
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
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