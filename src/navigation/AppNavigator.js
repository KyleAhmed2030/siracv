import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import TemplateSelectionScreen from '../screens/TemplateSelectionScreen';
import ResumeBuilderScreen from '../screens/ResumeBuilderScreen';
import PreviewScreen from '../screens/PreviewScreen';
import SavedResumesScreen from '../screens/SavedResumesScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
        {/* Welcome screen */}
        <Route path="/" element={<WelcomeScreen />} />
        
        {/* Template selection */}
        <Route path="/templates" element={<TemplateSelectionScreen />} />
        
        {/* Resume builder steps */}
        <Route path="/builder/basicInfo" element={<ResumeBuilderScreen step="basicInfo" />} />
        <Route path="/builder/education" element={<ResumeBuilderScreen step="education" />} />
        <Route path="/builder/workExperience" element={<ResumeBuilderScreen step="workExperience" />} />
        <Route path="/builder/skills" element={<ResumeBuilderScreen step="skills" />} />
        <Route path="/builder/summary" element={<ResumeBuilderScreen step="summary" />} />
        
        {/* Preview */}
        <Route path="/preview" element={<PreviewScreen />} />
        
        {/* Saved resumes */}
        <Route path="/saved" element={<SavedResumesScreen />} />
        
        {/* Settings */}
        <Route path="/settings" element={<SettingsScreen />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;