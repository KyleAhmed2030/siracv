import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

// Components
import Header from '../components/Header';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import TemplateSelectionScreen from '../screens/TemplateSelectionScreen';
import ResumeBuilderScreen from '../screens/ResumeBuilderScreen';
import PreviewScreen from '../screens/PreviewScreen';
import SavedResumesScreen from '../screens/SavedResumesScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Layout component that decides whether to show the header
const MainLayout = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // Apply theme to the body element
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
  
  // Only show header on paths other than homepage
  const showHeader = location.pathname !== '/';
  
  return (
    <div className={theme}>
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};

const AppNavigator = ({ initialLanguage }) => {
  const { i18n } = useTranslation();
  
  // Set the initial language
  useEffect(() => {
    if (initialLanguage) {
      i18n.changeLanguage(initialLanguage);
      
      // Set document direction based on language
      document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, [i18n, initialLanguage]);
  
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/templates" element={<TemplateSelectionScreen />} />
          <Route path="/builder/basicInfo" element={<ResumeBuilderScreen step="basicInfo" />} />
          <Route path="/builder/education" element={<ResumeBuilderScreen step="education" />} />
          <Route path="/builder/workExperience" element={<ResumeBuilderScreen step="workExperience" />} />
          <Route path="/builder/skills" element={<ResumeBuilderScreen step="skills" />} />
          <Route path="/builder/summary" element={<ResumeBuilderScreen step="summary" />} />
          <Route path="/preview" element={<PreviewScreen />} />
          <Route path="/saved" element={<SavedResumesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppNavigator;