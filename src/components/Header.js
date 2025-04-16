import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

/**
 * Header component that displays the app name/logo and provides navigation
 * with enhanced accessibility features
 */
const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Add resize listener to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
      if (window.innerWidth > 576) {
        setMenuOpen(false);
      }
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Add keyboard support for accessibility
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    marginRight: isMobile ? '6px' : '8px',
    color: theme === 'dark' ? '#3498db' : '#2c3e50'
  };
  
  const titleStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 700,
    margin: 0,
    color: theme === 'dark' ? '#3498db' : '#2c3e50'
  };
  
  const navStyle = {
    display: 'flex',
    alignItems: 'center'
  };
  
  const menuButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: theme === 'dark' ? '#fff' : '#333',
    fontSize: '24px',
    cursor: 'pointer',
    display: isMobile ? 'block' : 'none',
    padding: '8px',
    marginLeft: '8px'
  };
  
  const navListStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '60px' : 'auto',
    right: isMobile ? '0' : 'auto',
    backgroundColor: theme === 'dark' ? '#222' : '#fff',
    boxShadow: isMobile ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
    padding: isMobile ? '16px' : '0',
    margin: '0',
    listStyle: 'none',
    zIndex: 99
  };
  
  const navItemStyle = {
    margin: isMobile ? '8px 0' : '0 12px'
  };
  
  const navLinkStyle = {
    color: theme === 'dark' ? '#fff' : '#333',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5'
    },
    ':focus': {
      outline: '2px solid #3498db',
      outlineOffset: '2px'
    }
  };
  
  return (
    <header style={headerStyle} role="banner">
      <div 
        style={logoStyle} 
        onClick={handleLogoClick} 
        onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
        tabIndex="0"
        role="button"
        aria-label={t('Go to home page')}
      >
        <img 
          src="/images/logo.svg" 
          alt="" 
          aria-hidden="true"
          style={{ width: isMobile ? '32px' : '40px', marginRight: '8px' }}
        />
        <h1 style={titleStyle}>{t('Sira')}</h1>
      </div>
      
      <nav style={navStyle} role="navigation" aria-label={t('Main Navigation')}>
        <button 
          style={menuButtonStyle}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={menuOpen ? t('Close menu') : t('Open menu')}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        
        <ul id="main-menu" style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/" style={navLinkStyle}>{t('Home')}</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/templates" style={navLinkStyle}>{t('Templates')}</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/saved" style={navLinkStyle}>{t('Saved Resumes')}</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/settings" style={navLinkStyle}>{t('Settings')}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;