import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleCreateResume = () => {
    navigate('/templates');
  };
  
  const handleViewTemplates = () => {
    navigate('/templates');
  };
  
  return (
    <div className="home-page">
      <h1>{t('Welcome to Resume Builder')}</h1>
      <p>{t('Create professional resumes easily')}</p>
      
      <div className="features">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleCreateResume}
        >
          {t('Create Resume')}
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth
          onClick={handleViewTemplates}
        >
          {t('View Templates')}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;