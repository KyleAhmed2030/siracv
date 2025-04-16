import React from 'react';
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
  
  // Define steps and their order
  const steps = [
    { id: 'basicInfo', label: 'Personal Information' },
    { id: 'education', label: 'Education' },
    { id: 'workExperience', label: 'Work Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'summary', label: 'Professional Summary' }
  ];
  
  // Get current step index
  const currentStepIndex = steps.findIndex(s => s.id === step);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  
  // Get previous and next step IDs
  const prevStepId = isFirstStep ? null : steps[currentStepIndex - 1].id;
  const nextStepId = isLastStep ? null : steps[currentStepIndex + 1].id;
  
  // Handle next button
  const handleNext = () => {
    if (nextStepId) {
      navigate(`/builder/${nextStepId}`);
    } else {
      navigate('/preview');
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (prevStepId) {
      navigate(`/builder/${prevStepId}`);
    } else {
      navigate('/templates');
    }
  };
  
  // Render current form component based on step
  const renderFormComponent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    switch (step) {
      case 'basicInfo':
        return <BasicInfoForm />;
      case 'education':
        return <EducationForm />;
      case 'workExperience':
        return <WorkExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'summary':
        return <SummaryForm />;
      default:
        return <div>Invalid step</div>;
    }
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