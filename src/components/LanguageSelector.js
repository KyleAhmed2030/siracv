import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Component for selecting application language
 */
const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Set text direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };
  
  return (
    <div className="language-selector">
      <button 
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('English')}
      </button>
      <button 
        className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
        onClick={() => changeLanguage('ar')}
      >
        {t('Arabic')}
      </button>
    </div>
  );
};

export default LanguageSelector;