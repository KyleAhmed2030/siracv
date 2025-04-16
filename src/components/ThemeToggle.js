import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

/**
 * Toggle switch component for dark/light mode switching
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  const isDark = theme === 'dark';
  
  return (
    <div className="theme-toggle-container">
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        {t('Toggle dark mode')}
      </label>
      <button
        id="theme-toggle"
        onClick={toggleTheme}
        className={`theme-toggle-button ${isDark ? 'dark' : 'light'}`}
        aria-label={t('Toggle dark mode')}
      >
        <span className="toggle-track">
          <span className="toggle-indicator"></span>
        </span>
        <span className="toggle-label">
          {isDark ? t('Dark Mode') : t('Light Mode')}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;