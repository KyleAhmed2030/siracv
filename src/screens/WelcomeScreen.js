import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';

// Keyframes animation for fade-in effect
const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Add the keyframes to the document
const addAnimationStyle = () => {
  const styleSheet = document.createElement("style");
  styleSheet.id = "welcome-animations";
  styleSheet.textContent = fadeInKeyframes;
  document.head.appendChild(styleSheet);
  
  return () => {
    const element = document.getElementById("welcome-animations");
    if (element) {
      element.remove();
    }
  };
};

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  
  // Add resize listener to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Add animation styles
    const cleanupAnimation = addAnimationStyle();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupAnimation();
    };
  }, []);
  
  // Handle get started button
  const handleGetStarted = () => {
    navigate('/templates');
  };
  
  // Handle view saved resumes button
  const handleViewSavedResumes = () => {
    navigate('/saved');
  };
  
  // Logo style for the welcome screen with responsive sizing
  const appLogoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isMobile ? '20px' : '30px'
  };
  
  // Enhanced icon with background
  const logoIconStyle = {
    fontSize: isMobile ? '28px' : '36px',
    marginRight: '10px',
    backgroundColor: theme === 'dark' ? '#3498db' : '#e1f5fe',
    color: theme === 'dark' ? 'white' : '#0277bd',
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };
  
  const logoTextStyle = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 700,
    background: theme === 'dark' 
      ? 'linear-gradient(45deg, #3498db, #2ecc71)'
      : 'linear-gradient(45deg, #1e88e5, #42a5f5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  };
  
  // Background gradient style based on theme
  const backgroundStyle = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  
  // Card style for the welcome container
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#242636' : '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    padding: isMobile ? '25px 20px' : '40px 50px',
    width: '100%',
    maxWidth: '550px',
    margin: '20px',
    transition: 'all 0.3s ease'
  };
  
  // Heading style
  const headingStyle = {
    color: theme === 'dark' ? '#3498db' : '#1e88e5',
    marginBottom: '8px',
    fontSize: isMobile ? '24px' : '28px',
    fontWeight: '700'
  };
  
  // Subheading style
  const subheadingStyle = {
    color: theme === 'dark' ? '#e0e0e0' : '#424242',
    marginBottom: '16px',
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: '600'
  };
  
  // Paragraph style
  const paragraphStyle = {
    color: theme === 'dark' ? '#b0b0b0' : '#616161',
    marginBottom: '30px',
    lineHeight: '1.6'
  };
  
  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        {/* App Logo & Name */}
        <div style={{
          ...appLogoStyle,
          animation: 'fadeIn 0.8s ease-out forwards'
        }}>
          <div style={logoIconStyle}>
            <span role="img" aria-label="document" style={{fontSize: isMobile ? '24px' : '30px'}}>📝</span>
          </div>
          <h1 style={logoTextStyle}>{t('Sira')}</h1>
        </div>
        
        <div className="welcome-header" style={{ 
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease-out 0.2s forwards',
          opacity: 0
        }}>
          <h1 style={headingStyle}>{t('Welcome to Resume Builder')}</h1>
          <h2 style={subheadingStyle}>{t('Build Your Professional Resume')}</h2>
          <p style={paragraphStyle}>{t('Create a professional resume in minutes with our easy-to-use builder.')}</p>
        </div>
        
        <div className="welcome-actions" style={{ 
          marginBottom: '30px',
          animation: 'fadeIn 0.8s ease-out 0.4s forwards',
          opacity: 0
        }}>
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
            style={{ marginTop: '12px' }}
          >
            {t('View Saved Resumes')}
          </Button>
        </div>
        
        <div className="welcome-settings" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '15px' : '0',
          animation: 'fadeIn 0.8s ease-out 0.6s forwards',
          opacity: 0
        }}>
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