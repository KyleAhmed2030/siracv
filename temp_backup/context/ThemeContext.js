import React, { createContext, useState, useEffect } from 'react';

// Define theme storage key as constant
export const THEME_STORAGE_KEY = 'user-theme';
export const ThemeContext = createContext();

/**
 * Theme Context Provider - Manages the theme state (light/dark) for the app
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialTheme - Initial theme value ('light' or 'dark')
 * @returns {React.ReactNode} Provider Component
 */
export const ThemeContextProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setThemeState] = useState(initialTheme);
  
  // Apply theme changes to DOM and persist in localStorage
  useEffect(() => {
    // Apply theme to HTML element for global scope
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply theme to body element
    if (theme === 'dark') {
      document.body.className = 'dark';
    } else {
      document.body.className = '';
    }
    
    // Save theme preference to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
  };
  
  /**
   * Set a specific theme and persist it
   * 
   * @param {string} newTheme - Theme to set ('light' or 'dark')
   */
  const setTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };
  
  // Expose theme context
  const contextValue = {
    theme,
    toggleTheme,
    setTheme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;