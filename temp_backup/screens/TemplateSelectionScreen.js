import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';
import TemplateCard from '../components/TemplateCard';

// Enhanced template data with features
const TEMPLATES = [
  {
    id: 'template1',
    title: 'Professional',
    description: 'Clean and professional design suitable for most industries. Perfect for corporate roles and traditional sectors.',
    image: '/images/templates/template1.svg',
    features: [
      'Clean layout for easy reading',
      'Organized sections with clear hierarchy',
      'Professional color scheme',
      'Traditional formatting for ATS compatibility'
    ]
  },
  {
    id: 'template2',
    title: 'Creative',
    description: 'Modern and creative design for creative industries. Ideal for designers, artists, and digital media professionals.',
    image: '/images/templates/template2.svg',
    features: [
      'Unique layout to showcase creativity',
      'Visual focus for portfolio highlights',
      'Modern typography and styling',
      'Balanced white space for elegant look'
    ]
  },
  {
    id: 'template3',
    title: 'Minimal',
    description: 'Simple and minimal design with clean typography. Perfect for those who prefer a straightforward and elegant approach.',
    image: '/images/templates/template3.svg',
    features: [
      'Minimalist design with essential elements',
      'Focused on content without distractions',
      'Elegant typography with perfect spacing',
      'Highly scannable format for busy recruiters'
    ]
  },
  {
    id: 'template4',
    title: 'Modern',
    description: 'Contemporary design with a touch of color. Great for tech, startups, and forward-thinking companies.',
    image: '/images/templates/template4.svg',
    features: [
      'Contemporary layout with modern elements',
      'Strategic use of color accents',
      'Balanced content-to-whitespace ratio',
      'Optimized for both print and digital viewing'
    ]
  },
  {
    id: 'template5',
    title: 'Executive',
    description: 'Sophisticated design for senior positions. Perfect for executives, managers, and leadership roles.',
    image: '/images/templates/template5.svg',
    features: [
      'Premium, formal layout for leadership roles',
      'Emphasis on achievements and experience',
      'Professional structure with elegant details',
      'Perfect for C-level and senior management'
    ]
  }
];

const TemplateSelectionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { resumeData, updateResumeData } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData.template || '');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
  
  // Screen container style
  const screenStyle = {
    padding: isMobile ? '20px 15px' : '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh'
  };
  
  // Header styles
  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
  };
  
  const titleStyle = {
    fontSize: isMobile ? '24px' : '32px',
    fontWeight: '700',
    marginBottom: '12px',
    color: theme === 'dark' ? '#e0e0e0' : '#2c3e50',
    background: theme === 'dark' 
      ? 'linear-gradient(45deg, #3498db, #2ecc71)'
      : 'linear-gradient(45deg, #1e88e5, #2c3e50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };
  
  const subtitleStyle = {
    fontSize: isMobile ? '16px' : '18px',
    color: theme === 'dark' ? '#b0b0b0' : '#666',
    marginBottom: '20px',
    maxWidth: '700px',
    margin: '0 auto 30px'
  };
  
  // Grid styles
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    margin: '35px 0',
  };
  
  // Button group styles
  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: isMobile ? '15px' : '20px',
    marginTop: '40px',
    flexDirection: isMobile ? 'column' : 'row',
    maxWidth: isMobile ? '100%' : '400px',
    margin: '40px auto 0'
  };
  
  return (
    <div style={screenStyle} className="template-selection-screen">
      <div style={headerStyle}>
        <h1 style={titleStyle}>{t('Choose Your Template')}</h1>
        <p style={subtitleStyle}>
          {t('Select a template that best reflects your professional style. Each template is optimized for readability and designed to highlight your qualifications effectively.')}
        </p>
      </div>
      
      <div style={gridStyle} className="template-grid">
        {TEMPLATES.map(template => (
          <TemplateCard 
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            image={template.image}
            features={template.features}
            isSelected={selectedTemplate === template.id}
            onClick={handleTemplateSelect}
          />
        ))}
      </div>
      
      <div style={buttonGroupStyle} className="button-group">
        <Button 
          variant="secondary" 
          onClick={handleBack}
          style={{ 
            flex: isMobile ? 'auto' : '1', 
            maxWidth: isMobile ? '100%' : '180px'
          }}
        >
          {t('Back')}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleContinue}
          disabled={!selectedTemplate}
          style={{ 
            flex: isMobile ? 'auto' : '1', 
            maxWidth: isMobile ? '100%' : '180px'
          }}
        >
          {t('Continue to Basic Info')}
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelectionScreen;