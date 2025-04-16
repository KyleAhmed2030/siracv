import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Handle get started button
  const handleGetStarted = () => {
    navigate('/templates');
  };
  
  // Handle view saved resumes button
  const handleViewSavedResumes = () => {
    navigate('/saved');
  };
  
  return (
    <div className={`welcome-screen ${theme}`}>
      <div className="welcome-container">
        <div className="welcome-header">
          <h1>{t('Welcome to Resume Builder')}</h1>
          <h2>{t('Build Your Professional Resume')}</h2>
          <p>{t('Create a professional resume in minutes with our easy-to-use builder.')}</p>
        </div>
        
        <div className="welcome-actions">
          <Button 
            variant="primary" 
            onClick={handleGetStarted}
            fullWidth
          >
            {t('Get Started')}
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handleViewSavedResumes}
            fullWidth
          >
            {t('View Saved Resumes')}
          </Button>
        </div>
        
        <div className="welcome-settings">
          <div className="settings-item">
            <LanguageSelector />
          </div>
          
          <div className="settings-item">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;