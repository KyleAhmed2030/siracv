import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className={`settings-screen ${theme}`}>
      <div className="settings-container">
        <h2>{t('Settings')}</h2>
        
        <div className="settings-section">
          <h3>{t('Language')}</h3>
          <LanguageSelector />
        </div>
        
        <div className="settings-section">
          <h3>{t('Theme')}</h3>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;