import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ResumeContextProvider } from './context/ResumeContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';

// Components
import Header from './components/Header';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import TemplateSelectionScreen from './screens/TemplateSelectionScreen';
import ResumeBuilderScreen from './screens/ResumeBuilderScreen';
import PreviewScreen from './screens/PreviewScreen';
import SavedResumesScreen from './screens/SavedResumesScreen';
import SettingsScreen from './screens/SettingsScreen';

import './localization/i18n';
import './index.css';

// Layout with application shell
const Layout = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isHomePage = location.pathname === '/';
  
  // Apply theme to body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.className = 'dark';
    } else {
      document.body.className = '';
    }
  }, [theme]);
  
  return (
    <div className={`app-container ${theme}`}>
      {!isHomePage && <Header />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

// Routes wrapper
const AppRoutes = ({ initialLanguage }) => {
  const { i18n } = useTranslation();
  
  // Set up language and direction
  useEffect(() => {
    if (initialLanguage) {
      i18n.changeLanguage(initialLanguage);
      document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, [i18n, initialLanguage]);
  
  return (
    <Routes>
      <Route path="/" element={<Layout><WelcomeScreen /></Layout>} />
      <Route path="/templates" element={<Layout><TemplateSelectionScreen /></Layout>} />
      <Route path="/builder/basicInfo" element={<Layout><ResumeBuilderScreen step="basicInfo" /></Layout>} />
      <Route path="/builder/education" element={<Layout><ResumeBuilderScreen step="education" /></Layout>} />
      <Route path="/builder/workExperience" element={<Layout><ResumeBuilderScreen step="workExperience" /></Layout>} />
      <Route path="/builder/skills" element={<Layout><ResumeBuilderScreen step="skills" /></Layout>} />
      <Route path="/builder/summary" element={<Layout><ResumeBuilderScreen step="summary" /></Layout>} />
      <Route path="/preview" element={<Layout><PreviewScreen /></Layout>} />
      <Route path="/saved" element={<Layout><SavedResumesScreen /></Layout>} />
      <Route path="/settings" element={<Layout><SettingsScreen /></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

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
        <BrowserRouter>
          <AppRoutes initialLanguage={initialLanguage} />
        </BrowserRouter>
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;