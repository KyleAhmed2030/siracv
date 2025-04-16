import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_STORAGE_KEY } from '../styles/theme';

// Create the Theme Context
export const ThemeContext = createContext();

/**
 * Theme Context Provider - Manages the theme state (light/dark) for the app
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialTheme - Initial theme value ('light' or 'dark')
 * @returns {React.ReactNode} Provider Component
 */
export const ThemeContextProvider = ({ children, initialTheme }) => {
  // State for the current theme
  const [theme, setTheme] = useState(initialTheme || 'light');
  // Get device color scheme
  const deviceTheme = useColorScheme();
  
  // Set the theme based on device preference if no saved preference
  useEffect(() => {
    const checkDeviceTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        
        if (!savedTheme && deviceTheme) {
          setTheme(deviceTheme);
          await AsyncStorage.setItem(THEME_STORAGE_KEY, deviceTheme);
        }
      } catch (error) {
        console.error('Error checking device theme:', error);
      }
    };
    
    if (!initialTheme) {
      checkDeviceTheme();
    }
  }, [deviceTheme, initialTheme]);
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };
  
  /**
   * Set a specific theme
   * 
   * @param {string} newTheme - Theme to set ('light' or 'dark')
   */
  const setThemeValue = async (newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark') {
      console.error('Invalid theme value. Use "light" or "dark"');
      return;
    }
    
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };
  
  // Theme context value
  const contextValue = {
    theme,
    toggleTheme,
    setTheme: setThemeValue,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
