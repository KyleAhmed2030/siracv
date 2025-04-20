import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Custom hook to access and update theme from the ThemeContext
 * 
 * @returns {Object} An object with theme and functions to update it
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  
  return context;
};

export default useTheme;