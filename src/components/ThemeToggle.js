import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

/**
 * Toggle switch component for dark/light mode switching
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  console.log('Current theme:', theme); // Debugging log
  
  return (
    <div className="theme-toggle">
      <span>{t(theme === 'dark' ? 'Dark' : 'Light')}</span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={theme === 'dark'} 
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;