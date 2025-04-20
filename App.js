import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResumeContextProvider } from './src/context/ResumeContext';
import { ThemeContextProvider } from './src/context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';

// Import components
import LanguageSelector from './src/components/LanguageSelector';
import ThemeToggle from './src/components/ThemeToggle';

// Homepage component
const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="home-page">
      <h1>{t('Welcome to Resume Builder')}</h1>
      <p>{t('Create professional resumes easily')}</p>
      
      <div className="features">
        <button 
          className="button button-primary"
          onClick={() => navigate('/templates')}
        >
          {t('Create Resume')}
        </button>
        
        <button 
          className="button button-primary"
          onClick={() => navigate('/templates')}
        >
          {t('View Templates')}
        </button>
        
        <button 
          className="button button-primary"
          onClick={() => navigate('/saved')}
        >
          {t('My Resumes')}
        </button>
        
        <button 
          className="button button-primary"
          onClick={() => navigate('/settings')}
        >
          {t('Settings')}
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const TemplatesPage = () => <div><h1>Templates Page</h1><Link to="/">Back to Home</Link></div>;
const BuilderPage = () => <div><h1>Resume Builder Page</h1><Link to="/">Back to Home</Link></div>;
const SavedPage = () => <div><h1>Saved Resumes Page</h1><Link to="/">Back to Home</Link></div>;
const SettingsPage = () => <div><h1>Settings Page</h1><Link to="/">Back to Home</Link></div>;

function App() {
  const [theme, setTheme] = useState('light');
  
  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <ThemeContextProvider initialTheme={theme}>
      <ResumeContextProvider>
        <div className={`app-container ${theme}-theme`}>
          <header>
            <div className="header-controls">
              <LanguageSelector />
              <ThemeToggle onChange={toggleTheme} value={theme === 'dark'} />
            </div>
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <Analytics />
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;