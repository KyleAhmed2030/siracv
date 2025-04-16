import React, { useEffect, useState } from 'react';
import { ResumeContextProvider } from './context/ResumeContext';
import { ThemeContextProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import './localization/i18n';
import './index.css';

function App() {
  const [initialLanguage, setInitialLanguage] = useState(null);
  const [initialTheme, setInitialTheme] = useState(null);
  
  // Load saved language and theme preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('user-language');
    if (savedLanguage) {
      setInitialLanguage(savedLanguage);
    } else {
      setInitialLanguage('en'); // Default to English
    }
    
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
      setInitialTheme(savedTheme);
    } else {
      setInitialTheme('light'); // Default to light theme
    }
  }, []);
  
  // Wait until theme and language are loaded
  if (!initialTheme || !initialLanguage) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <ThemeContextProvider initialTheme={initialTheme}>
      <ResumeContextProvider>
        <AppNavigator initialLanguage={initialLanguage} />
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;