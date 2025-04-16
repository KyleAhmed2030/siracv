import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
const AppLayout = ({ children }) => {
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
      {children}
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
        <Route path="/" element={
          <AppLayout>
            <WelcomeScreen />
          </AppLayout>
        } />
        
        <Route path="/templates" element={
          <AppLayout>
            <TemplateSelectionScreen />
          </AppLayout>
        } />
        
        <Route path="/builder/basicInfo" element={
          <AppLayout>
            <ResumeBuilderScreen step="basicInfo" />
          </AppLayout>
        } />
        
        <Route path="/builder/education" element={
          <AppLayout>
            <ResumeBuilderScreen step="education" />
          </AppLayout>
        } />
        
        <Route path="/builder/workExperience" element={
          <AppLayout>
            <ResumeBuilderScreen step="workExperience" />
          </AppLayout>
        } />
        
        <Route path="/builder/skills" element={
          <AppLayout>
            <ResumeBuilderScreen step="skills" />
          </AppLayout>
        } />
        
        <Route path="/builder/summary" element={
          <AppLayout>
            <ResumeBuilderScreen step="summary" />
          </AppLayout>
        } />
        
        <Route path="/preview" element={
          <AppLayout>
            <PreviewScreen />
          </AppLayout>
        } />
        
        <Route path="/saved" element={
          <AppLayout>
            <SavedResumesScreen />
          </AppLayout>
        } />
        
        <Route path="/settings" element={
          <AppLayout>
            <SettingsScreen />
          </AppLayout>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;