import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component for selecting application language
 */
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-selector">
      <button
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
        onClick={() => changeLanguage('ar')}
        aria-label="Switch to Arabic"
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSelector;