import React, { useEffect, useState } from 'react';
import { ResumeContextProvider } from './context/ResumeContext';
import { ThemeContextProvider, THEME_STORAGE_KEY } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import { Analytics } from '@vercel/analytics/react';
import './localization/i18n';
import './index.css';

function App() {
  const [initialLanguage, setInitialLanguage] = useState(null);
  const [initialTheme, setInitialTheme] = useState(null);
  
  // Load saved language and theme preferences
  useEffect(() => {
    // Get saved language or default to English
    const savedLanguage = localStorage.getItem('user-language');
    if (savedLanguage) {
      setInitialLanguage(savedLanguage);
    } else {
      setInitialLanguage('en');
      localStorage.setItem('user-language', 'en');
    }
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setInitialTheme(savedTheme);
    } else {
      setInitialTheme('light');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, []);
  
  // Show loading state until preferences are loaded
  if (!initialTheme || !initialLanguage) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <ThemeContextProvider initialTheme={initialTheme}>
      <ResumeContextProvider>
        <AppNavigator initialLanguage={initialLanguage} />
        <Analytics />
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;