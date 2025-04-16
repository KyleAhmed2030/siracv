import React from 'react';
import { useTranslation } from 'react-i18next';

const TemplateCard = ({ 
  id, 
  title, 
  description, 
  image, 
  isSelected, 
  onClick 
}) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(id)}
    >
      <h3>{t(title)}</h3>
      <p>{t(description)}</p>
      <div className="template-preview">
        <img 
          src={image} 
          alt={`${title} template`} 
          className="template-image"
        />
      </div>
    </div>
  );
};

export default TemplateCard;