import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

const WelcomeScreen = ({ onGetStarted }) => {
  const { t } = useTranslation();
  
  return (
    <div className="home-page">
      <h1>{t('Welcome to Resume Builder')}</h1>
      <p>{t('Create professional resumes easily')}</p>
      
      <div className="features">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={onGetStarted}
        >
          {t('Create Resume')}
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth
        >
          {t('View Templates')}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;