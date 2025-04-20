/**
 * Define light and dark theme color palettes
 */

// Light theme colors
export const lightTheme = {
  // Primary colors
  primary: '#3498db', // Blue
  primaryLight: '#5dade2',
  primaryDark: '#2980b9',
  secondary: '#2ecc71', // Green
  secondaryLight: '#58d68d',
  secondaryDark: '#27ae60',
  
  // Background colors
  background: '#ffffff',
  surface: '#f5f5f5',
  card: '#ffffff',
  inputBackground: '#ffffff',
  
  // Text colors
  text: '#333333',
  textSecondary: '#757575',
  textTertiary: '#9e9e9e',
  placeholder: '#bdbdbd',
  buttonText: '#ffffff',
  
  // Status colors
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
  info: '#3498db',
  
  // Border colors
  border: '#e0e0e0',
  divider: '#eeeeee',
  
  // Specific component colors
  tooltip: '#2c3e50',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Specific variants
  activeTab: '#3498db',
  inactiveTab: '#bdbdbd',
};

// Dark theme colors
export const darkTheme = {
  // Primary colors
  primary: '#3498db', // Blue
  primaryLight: '#5dade2',
  primaryDark: '#2980b9',
  secondary: '#2ecc71', // Green
  secondaryLight: '#58d68d',
  secondaryDark: '#27ae60',
  
  // Background colors
  background: '#121212',
  surface: '#1e1e1e',
  card: '#252525',
  inputBackground: '#2c2c2c',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  textTertiary: '#757575',
  placeholder: '#616161',
  buttonText: '#ffffff',
  
  // Status colors
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
  info: '#3498db',
  
  // Border colors
  border: '#333333',
  divider: '#2c2c2c',
  
  // Specific component colors
  tooltip: '#f5f5f5',
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Specific variants
  activeTab: '#3498db',
  inactiveTab: '#757575',
};

/**
 * Get the current theme based on the provided theme name
 * 
 * @param {string} themeName - 'light' or 'dark'
 * @returns {Object} theme object
 */
export const getTheme = (themeName) => {
  return themeName === 'dark' ? darkTheme : lightTheme;
};

// Theme-related constants
export const THEME_STORAGE_KEY = 'user-theme';
