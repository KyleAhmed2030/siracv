import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';
import TemplateCard from '../components/TemplateCard';

// Template data
const TEMPLATES = [
  {
    id: 'template1',
    title: 'Professional',
    description: 'Clean and professional design suitable for most industries.',
    image: '/images/templates/template1.svg'
  },
  {
    id: 'template2',
    title: 'Creative',
    description: 'Modern and creative design for creative industries.',
    image: '/images/templates/template2.svg'
  },
  {
    id: 'template3',
    title: 'Minimal',
    description: 'Simple and minimal design with clean typography.',
    image: '/images/templates/template3.svg'
  },
  {
    id: 'template4',
    title: 'Modern',
    description: 'Contemporary design with a touch of color.',
    image: '/images/templates/template4.svg'
  },
  {
    id: 'template5',
    title: 'Executive',
    description: 'Sophisticated design for senior positions.',
    image: '/images/templates/template5.svg'
  }
];

const TemplateSelectionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template || '');
  
  // Update selected template when resumeData changes
  useEffect(() => {
    if (resumeData.template) {
      setSelectedTemplate(resumeData.template);
    }
  }, [resumeData.template]);
  
  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    updateResumeData({ template: templateId });
  };
  
  // Handle continue button
  const handleContinue = () => {
    navigate('/builder/basicInfo');
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="template-selection-screen">
      <h2>{t('Choose a Template')}</h2>
      <p>{t('Select a template for your resume')}</p>
      
      <div className="template-grid">
        {TEMPLATES.map(template => (
          <TemplateCard 
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            image={template.image}
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