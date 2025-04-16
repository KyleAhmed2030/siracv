import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import BasicInfoForm from '../components/BasicInfoForm';
import EducationForm from '../components/EducationForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import SkillsForm from '../components/SkillsForm';
import SummaryForm from '../components/SummaryForm';

const STEPS = [
  { id: 'basicInfo', label: 'Basic Info', component: BasicInfoForm },
  { id: 'education', label: 'Education', component: EducationForm },
  { id: 'workExperience', label: 'Work Experience', component: WorkExperienceForm },
  { id: 'skills', label: 'Skills', component: SkillsForm },
  { id: 'summary', label: 'Summary', component: SummaryForm }
];

const ResumeBuilderScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, saveResume } = useResume();
  const { step = 'basicInfo' } = useParams();
  
  // Find current step index
  const currentStepIndex = STEPS.findIndex(s => s.id === step);
  const currentStep = currentStepIndex !== -1 ? currentStepIndex : 0;
  
  // Get current step component
  const StepComponent = STEPS[currentStep].component;
  
  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      navigate(`/builder/${STEPS[currentStep - 1].id}`);
    } else {
      navigate('/templates');
    }
  };
  
  // Navigate to next step
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      navigate(`/builder/${STEPS[currentStep + 1].id}`);
    } else {
      // Final step - save and go to preview
      saveResume();
      navigate('/preview');
    }
  };
  
  return (
    <div className="resume-builder-screen">
      <h2>{t('Create Your Resume')}</h2>
      
      <div className="builder-progress">
        <span className="step-info">
          {t('Step {{current}} of {{total}}', { current: currentStep + 1, total: STEPS.length })} - {t(STEPS[currentStep].label)}
        </span>
        <ProgressBar currentStep={currentStep + 1} totalSteps={STEPS.length} />
      </div>
      
      <div className="form-container">
        <StepComponent />
      </div>
      
      <div className="button-group">
        <Button 
          variant="secondary" 
          onClick={handlePrevious}
        >
          {currentStep === 0 ? t('Back to Templates') : t('Previous')}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleNext}
        >
          {currentStep === STEPS.length - 1 ? t('Preview Resume') : t('Next')}
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilderScreen;