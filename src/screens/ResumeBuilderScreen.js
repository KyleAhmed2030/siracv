import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

// We'll implement simplified form components here
// These can be replaced with the actual component implementations later

const BasicInfoForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="form-section">
      <h3>{t('Basic Information')}</h3>
      
      <div className="form-group">
        <label className="form-label">{t('Full Name')}</label>
        <input 
          className="form-input"
          type="text"
          value={data.fullName || ''}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          placeholder={t('Enter your full name')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('Job Title')}</label>
        <input 
          className="form-input"
          type="text"
          value={data.jobTitle || ''}
          onChange={(e) => onChange({ ...data, jobTitle: e.target.value })}
          placeholder={t('Enter your job title')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('Email')}</label>
        <input 
          className="form-input"
          type="email"
          value={data.email || ''}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder={t('Enter your email')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('Phone')}</label>
        <input 
          className="form-input"
          type="tel"
          value={data.phone || ''}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder={t('Enter your phone number')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('Address')}</label>
        <input 
          className="form-input"
          type="text"
          value={data.address || ''}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          placeholder={t('Enter your address')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('LinkedIn')}</label>
        <input 
          className="form-input"
          type="text"
          value={data.linkedin || ''}
          onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
          placeholder={t('Enter your LinkedIn profile URL')}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">{t('Website')}</label>
        <input 
          className="form-input"
          type="text"
          value={data.website || ''}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
          placeholder={t('Enter your website URL')}
        />
      </div>
    </div>
  );
};

const EducationForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  const [educationList, setEducationList] = useState(data.education || []);
  
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      present: false,
      description: ''
    };
    
    const updatedList = [...educationList, newEducation];
    setEducationList(updatedList);
    onChange({ ...data, education: updatedList });
  };
  
  const updateEducation = (id, updatedItem) => {
    const updatedList = educationList.map(item => 
      item.id === id ? updatedItem : item
    );
    setEducationList(updatedList);
    onChange({ ...data, education: updatedList });
  };
  
  const removeEducation = (id) => {
    const updatedList = educationList.filter(item => item.id !== id);
    setEducationList(updatedList);
    onChange({ ...data, education: updatedList });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Education')}</h3>
      
      {educationList.map((edu, index) => (
        <div key={edu.id} className="card mb-3">
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">{t('School Name')}</label>
              <input 
                className="form-input"
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, { ...edu, school: e.target.value })}
                placeholder={t('Enter school name')}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Degree')}</label>
              <input 
                className="form-input"
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { ...edu, degree: e.target.value })}
                placeholder={t('Enter degree')}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Field of Study')}</label>
              <input 
                className="form-input"
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(edu.id, { ...edu, fieldOfStudy: e.target.value })}
                placeholder={t('Enter field of study')}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">{t('Start Date')}</label>
                <input 
                  className="form-input"
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { ...edu, startDate: e.target.value })}
                />
              </div>
              
              <div className="form-group half">
                <label className="form-label">{t('End Date')}</label>
                <input 
                  className="form-input"
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { ...edu, endDate: e.target.value })}
                  disabled={edu.present}
                />
                <div className="checkbox-group">
                  <input 
                    type="checkbox"
                    id={`present-${edu.id}`}
                    checked={edu.present}
                    onChange={(e) => updateEducation(edu.id, { ...edu, present: e.target.checked })}
                  />
                  <label htmlFor={`present-${edu.id}`}>{t('Present')}</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Description')}</label>
              <textarea 
                className="form-input"
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, { ...edu, description: e.target.value })}
                placeholder={t('Enter description')}
                rows={3}
              />
            </div>
            
            <button 
              className="button button-text"
              onClick={() => removeEducation(edu.id)}
            >
              {t('Remove')}
            </button>
          </div>
        </div>
      ))}
      
      <button 
        className="button button-secondary"
        onClick={addEducation}
      >
        {t('Add Education')}
      </button>
    </div>
  );
};

const WorkExperienceForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  const [experienceList, setExperienceList] = useState(data.experience || []);
  
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      present: false,
      description: ''
    };
    
    const updatedList = [...experienceList, newExperience];
    setExperienceList(updatedList);
    onChange({ ...data, experience: updatedList });
  };
  
  const updateExperience = (id, updatedItem) => {
    const updatedList = experienceList.map(item => 
      item.id === id ? updatedItem : item
    );
    setExperienceList(updatedList);
    onChange({ ...data, experience: updatedList });
  };
  
  const removeExperience = (id) => {
    const updatedList = experienceList.filter(item => item.id !== id);
    setExperienceList(updatedList);
    onChange({ ...data, experience: updatedList });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Work Experience')}</h3>
      
      {experienceList.map((exp, index) => (
        <div key={exp.id} className="card mb-3">
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">{t('Company Name')}</label>
              <input 
                className="form-input"
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { ...exp, company: e.target.value })}
                placeholder={t('Enter company name')}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Position')}</label>
              <input 
                className="form-input"
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { ...exp, position: e.target.value })}
                placeholder={t('Enter position')}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Location')}</label>
              <input 
                className="form-input"
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, { ...exp, location: e.target.value })}
                placeholder={t('Enter location')}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">{t('Start Date')}</label>
                <input 
                  className="form-input"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { ...exp, startDate: e.target.value })}
                />
              </div>
              
              <div className="form-group half">
                <label className="form-label">{t('End Date')}</label>
                <input 
                  className="form-input"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { ...exp, endDate: e.target.value })}
                  disabled={exp.present}
                />
                <div className="checkbox-group">
                  <input 
                    type="checkbox"
                    id={`present-${exp.id}`}
                    checked={exp.present}
                    onChange={(e) => updateExperience(exp.id, { ...exp, present: e.target.checked })}
                  />
                  <label htmlFor={`present-${exp.id}`}>{t('Present')}</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Description')}</label>
              <textarea 
                className="form-input"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { ...exp, description: e.target.value })}
                placeholder={t('Enter description')}
                rows={3}
              />
            </div>
            
            <button 
              className="button button-text"
              onClick={() => removeExperience(exp.id)}
            >
              {t('Remove')}
            </button>
          </div>
        </div>
      ))}
      
      <button 
        className="button button-secondary"
        onClick={addExperience}
      >
        {t('Add Work Experience')}
      </button>
    </div>
  );
};

const SkillsForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  const [skillsList, setSkillsList] = useState(data.skills || []);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' });
  
  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level
    };
    
    const updatedList = [...skillsList, skill];
    setSkillsList(updatedList);
    onChange({ ...data, skills: updatedList });
    setNewSkill({ name: '', level: 'Intermediate' });
  };
  
  const removeSkill = (id) => {
    const updatedList = skillsList.filter(item => item.id !== id);
    setSkillsList(updatedList);
    onChange({ ...data, skills: updatedList });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Skills')}</h3>
      
      <div className="skills-list">
        {skillsList.map(skill => (
          <div key={skill.id} className="skill-item">
            <span className="skill-name">{skill.name}</span>
            <span className="skill-level">{t(skill.level)}</span>
            <button 
              className="button-icon"
              onClick={() => removeSkill(skill.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="form-row">
        <div className="form-group three-quarters">
          <input 
            className="form-input"
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder={t('Enter skill')}
          />
        </div>
        
        <div className="form-group quarter">
          <select 
            className="form-input"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
          >
            <option value="Beginner">{t('Beginner')}</option>
            <option value="Intermediate">{t('Intermediate')}</option>
            <option value="Advanced">{t('Advanced')}</option>
            <option value="Expert">{t('Expert')}</option>
          </select>
        </div>
      </div>
      
      <button 
        className="button button-secondary"
        onClick={addSkill}
      >
        {t('Add Skill')}
      </button>
    </div>
  );
};

const SummaryForm = ({ data, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="form-section">
      <h3>{t('Professional Summary')}</h3>
      
      <div className="form-group">
        <textarea 
          className="form-input"
          value={data.summary || ''}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder={t('Write a brief summary about yourself')}
          rows={6}
        />
      </div>
    </div>
  );
};

// Define the step order and titles
const STEPS = [
  { id: 'basic-info', title: 'Basic Information', component: BasicInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'experience', title: 'Work Experience', component: WorkExperienceForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'summary', title: 'Professional Summary', component: SummaryForm }
];

const ResumeBuilderScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { step } = useParams();
  const { resumeData, updateResume } = useResume();
  
  // Find current step index
  const currentStepIndex = STEPS.findIndex(s => s.id === step);
  
  // If step is invalid, redirect to the first step
  useEffect(() => {
    if (currentStepIndex === -1) {
      navigate('/builder/basic-info', { replace: true });
    }
  }, [currentStepIndex, navigate]);
  
  // Calculate progress
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;
  
  // Get current step component
  const CurrentForm = currentStepIndex !== -1 ? STEPS[currentStepIndex].component : null;
  
  const handleUpdateData = (newData) => {
    updateResume(newData);
  };
  
  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      navigate(`/builder/${STEPS[currentStepIndex + 1].id}`);
    } else {
      navigate('/preview');
    }
  };
  
  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/builder/${STEPS[currentStepIndex - 1].id}`);
    } else {
      navigate('/templates');
    }
  };
  
  if (currentStepIndex === -1 || !CurrentForm) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="resume-builder-screen">
      <h2>{t('Create Your Resume')}</h2>
      
      <div className="builder-progress">
        <span className="step-info">
          {t('Step')} {currentStepIndex + 1} {t('of')} {STEPS.length}: {t(STEPS[currentStepIndex].title)}
        </span>
        <ProgressBar progress={progress} />
      </div>
      
      <div className="form-container">
        <CurrentForm 
          data={resumeData}
          onChange={handleUpdateData}
        />
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
          onClick={handleNext}
        >
          {currentStepIndex === STEPS.length - 1 ? t('Preview') : t('Next')}
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilderScreen;