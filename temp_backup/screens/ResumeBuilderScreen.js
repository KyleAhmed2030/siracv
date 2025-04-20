import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { useResume } from '../hooks/useResume';
import BasicInfoForm from '../components/BasicInfoForm';
import EducationForm from '../components/EducationForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import SkillsForm from '../components/SkillsForm';
import SummaryForm from '../components/SummaryForm';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

const ResumeBuilderScreen = ({ step }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { resumeData, isLoading } = useResume();
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  
  // Define steps and their order
  const steps = [
    { id: 'basicInfo', label: 'Personal Information', requiredFields: true },
    { id: 'education', label: 'Education', requiredFields: true },
    { id: 'workExperience', label: 'Work Experience', requiredFields: false },
    { id: 'skills', label: 'Skills', requiredFields: false },
    { id: 'summary', label: 'Professional Summary', requiredFields: false }
  ];
  
  // Get current step index
  const currentStepIndex = steps.findIndex(s => s.id === step);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  
  // Get previous and next step IDs
  const prevStepId = isFirstStep ? null : steps[currentStepIndex - 1].id;
  const nextStepId = isLastStep ? null : steps[currentStepIndex + 1].id;
  
  // Handle form validation status change
  const handleValidationChange = (isValid) => {
    setIsCurrentFormValid(isValid);
    if (isValid) {
      setValidationMessage('');
    }
  };
  
  // Handle next button
  const handleNext = () => {
    setValidationAttempted(true);
    
    // Only proceed if the current form is valid
    if (isCurrentFormValid) {
      if (nextStepId) {
        navigate(`/builder/${nextStepId}`);
        setValidationAttempted(false);
      } else {
        navigate('/preview');
      }
    } else {
      // Show validation message
      setValidationMessage(t('Please fill in all required fields before proceeding.'));
      
      // Scroll to the top to show validation message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (prevStepId) {
      navigate(`/builder/${prevStepId}`);
    } else {
      navigate('/templates');
    }
    setValidationAttempted(false);
    setValidationMessage('');
  };
  
  // Render current form component based on step
  const renderFormComponent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    switch (step) {
      case 'basicInfo':
        return <BasicInfoForm onValidationChange={handleValidationChange} />;
      case 'education':
        return <EducationForm onValidationChange={handleValidationChange} />;
      case 'workExperience':
        return <WorkExperienceForm onValidationChange={handleValidationChange} />;
      case 'skills':
        return <SkillsForm onValidationChange={handleValidationChange} />;
      case 'summary':
        return <SummaryForm onValidationChange={handleValidationChange} />;
      default:
        return <div>Invalid step</div>;
    }
  };
  
  // Validation message style
  const validationMessageStyle = {
    color: 'var(--error-color)',
    backgroundColor: theme === 'dark' ? 'rgba(192, 57, 43, 0.1)' : 'rgba(231, 76, 60, 0.1)',
    padding: '10px 15px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontWeight: '500',
    display: validationMessage ? 'block' : 'none'
  };
  
  return (
    <div className={`resume-builder-screen ${theme}`}>
      <div className="builder-header">
        <h2>{t('Create Your Resume')}</h2>
        <p>
          {t('Step {{current}} of {{total}}', {
            current: currentStepIndex + 1,
            total: steps.length
          })}
        </p>
        
        <ProgressBar 
          currentStep={currentStepIndex + 1} 
          totalSteps={steps.length} 
        />
        
        <h3>{t(currentStep?.label || '')}</h3>
        
        {validationAttempted && !isCurrentFormValid && (
          <div style={validationMessageStyle}>
            {validationMessage || t('Please complete all required fields before proceeding.')}
          </div>
        )}
      </div>
      
      <div className="form-container">
        {renderFormComponent()}
      </div>
      
      <div className="navigation-buttons">
        <Button 
          variant="secondary" 
          onClick={handleBack}
        >
          {isFirstStep ? t('Back to Templates') : t('Previous')}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleNext}
        >
          {isLastStep ? t('Preview Resume') : t('Next')}
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilderScreen;