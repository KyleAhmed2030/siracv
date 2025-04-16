import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';

// Template Cards
const TemplateCard = ({ id, title, description, isSelected, onClick }) => {
  // Map template id to image path
  const getTemplatePath = (templateId) => {
    return `/images/templates/${templateId}.svg`;
  };

  return (
    <div 
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(id)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="template-preview">
        <img 
          src={getTemplatePath(id)} 
          alt={`${title} template`} 
          className="template-image"
        />
      </div>
    </div>
  );
};

const TemplateSelectionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateResume } = useResume();
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  
  const templates = [
    { id: 'template1', title: t('Professional'), description: t('Classic and clean design suitable for most industries') },
    { id: 'template2', title: t('Creative'), description: t('Modern and stylish with a creative twist') },
    { id: 'template3', title: t('Minimal'), description: t('Simple and elegant with a focus on content') },
    { id: 'template4', title: t('Modern'), description: t('Contemporary design with a professional look') },
    { id: 'template5', title: t('Executive'), description: t('Sophisticated design for senior positions') }
  ];
  
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };
  
  const handleContinue = () => {
    if (selectedTemplate) {
      // Save the selected template to resume context
      updateResume({ template: selectedTemplate });
      // Navigate to the first step of resume builder
      navigate('/builder/basic-info');
    }
  };

  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="template-selection-screen">
      <h2>{t('Choose a Template')}</h2>
      <p>{t('Select a template for your resume')}</p>
      
      <div className="template-grid">
        {templates.map(template => (
          <TemplateCard 
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            isSelected={selectedTemplate === template.id}
            onClick={handleTemplateSelect}
          />
        ))}
      </div>
      
      <div className="button-group">
        <Button 
          variant="secondary" 
          onClick={handleBack}
        >
          {t('Back')}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleContinue}
          disabled={!selectedTemplate}
        >
          {t('Next')}
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelectionScreen;