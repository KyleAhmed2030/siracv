import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

/**
 * Header component that displays the app name/logo and provides navigation
 */
const Header = () => {
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
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  // Ensure header is visible regardless of theme
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '12px 16px' : '16px 24px',
    backgroundColor: theme === 'dark' ? '#222' : '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };
  
  // Style logo and title for visibility
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  };
  
  const iconStyle = {
    fontSize: isMobile ? '20px' : '24px',
    marginRight: isMobile ? '6px' : '8px'
  };
  
  const titleStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 700,
    margin: 0,
    color: theme === 'dark' ? '#3498db' : '#2c3e50'
  };
  
  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={handleLogoClick}>
        <span style={iconStyle}>📝</span>
        <h1 style={titleStyle}>{t('Sira')}</h1>
      </div>
    </header>
  );
};

export default Header;