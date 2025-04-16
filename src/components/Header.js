import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

/**
 * Header component that displays the app name/logo and provides navigation
 */
const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  return (
    <header className={`app-header ${theme}`}>
      <div className="app-logo" onClick={handleLogoClick}>
        <span className="logo-icon">📝</span>
        <h1 className="app-title">{t('Sira')}</h1>
      </div>
    </header>
  );
};

export default Header;