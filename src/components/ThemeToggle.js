import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

/**
 * Toggle switch component for dark/light mode switching
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label={t('Toggle dark mode')}
        />
        <span className="slider round">
          <span className="icon">
            {theme === 'dark' ? '☾' : '☀'}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;