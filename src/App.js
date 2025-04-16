import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { ResumeContextProvider } from './context/ResumeContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import './localization/i18n';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import TemplateSelectionScreen from './screens/TemplateSelectionScreen';
import ResumeBuilderScreen from './screens/ResumeBuilderScreen';
import PreviewScreen from './screens/PreviewScreen';
import SavedResumesScreen from './screens/SavedResumesScreen';

function App() {
  return (
    <ThemeContextProvider>
      <ResumeContextProvider>
        <Router>
          <AppContent />
        </Router>
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

// Separate component to consume the theme context
function AppContent() {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');

  useEffect(() => {
    const dir = i18n.dir();
    document.body.dir = dir;
    setIsRTL(dir === 'rtl');
  }, [i18n]);

  return (
    <div className={`app-container ${isRTL ? 'rtl' : 'ltr'}`}>
      <header>
        <div className="header-logo">
          <h1 className="logo">Sira</h1>
        </div>
        <div className="header-controls">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/templates" element={<TemplateSelectionScreen />} />
          <Route path="/builder/:step" element={<ResumeBuilderScreen />} />
          <Route path="/preview" element={<PreviewScreen />} />
          <Route path="/saved" element={<SavedResumesScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;