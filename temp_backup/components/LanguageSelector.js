import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

/**
 * Component for selecting application language
 */
const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];
  
  // Handle language change
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('user-language', code);
  };
  
  return (
    <div className="language-selector">
      <label htmlFor="language-select">{t('Language')}</label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className={`language-select ${theme}`}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;