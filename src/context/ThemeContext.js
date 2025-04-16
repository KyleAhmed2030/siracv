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
  
  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Current theme:', newTheme);
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };
  
  /**
   * Set a specific theme
   * 
   * @param {string} newTheme - Theme to set ('light' or 'dark')
   */
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      console.log('Current theme:', newTheme);
      setTheme(newTheme);
      console.log('Theme changed to:', newTheme);
    }
  };
  
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      setTheme: setSpecificTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;