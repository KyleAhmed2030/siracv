import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

const TemplateCard = ({ 
  id, 
  title, 
  description, 
  image, 
  isSelected, 
  onClick,
  features = [] // New prop for template features
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Modern card styles
  const cardStyle = {
    position: 'relative',
    border: `2px solid ${isSelected 
      ? 'var(--primary-color)' 
      : theme === 'dark' ? 'var(--gray-700)' : 'var(--gray-200)'}`,
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: theme === 'dark' ? 'var(--dark-element-bg)' : 'white',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };
  
  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: isSelected 
      ? 'var(--primary-color)' 
      : theme === 'dark' ? 'var(--gray-200)' : 'var(--gray-800)',
    marginBottom: '8px'
  };
  
  const descriptionStyle = {
    fontSize: '14px',
    color: theme === 'dark' ? 'var(--gray-400)' : 'var(--gray-600)',
    marginBottom: '16px',
    lineHeight: '1.5'
  };
  
  const previewStyle = {
    flex: '1',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? 'var(--gray-800)' : 'var(--gray-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    margin: '10px 0 20px 0',
    transition: 'transform 0.3s ease',
    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
  };
  
  const selectedBadgeStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    opacity: isSelected ? '1' : '0',
    transform: isSelected ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease'
  };
  
  const featureListStyle = {
    marginTop: '5px',
    paddingLeft: '20px',
    fontSize: '13px',
    color: theme === 'dark' ? 'var(--gray-400)' : 'var(--gray-600)',
  };
  
  const featureItemStyle = {
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
  };
  
  const checkIconStyle = {
    color: 'var(--primary-color)',
    marginRight: '5px',
  };
  
  return (
    <div 
      style={cardStyle}
      onClick={() => onClick(id)}
      className={`template-card ${isSelected ? 'selected' : ''}`}
    >
      <div style={selectedBadgeStyle}>{t('Selected')}</div>
      
      <h3 style={titleStyle}>{t(title)}</h3>
      <p style={descriptionStyle}>{t(description)}</p>
      
      <div style={previewStyle}>
        <img 
          src={image} 
          alt={`${title} template`} 
          className="template-image"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            transition: 'all 0.3s ease',
            boxShadow: isSelected ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'
          }}
        />
      </div>
      
      {features.length > 0 && (
        <div style={featureListStyle}>
          {features.map((feature, index) => (
            <div key={index} style={featureItemStyle}>
              <span style={checkIconStyle}>✓</span> {t(feature)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateCard;