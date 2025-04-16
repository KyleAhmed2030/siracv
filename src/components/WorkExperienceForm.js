import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';

const WorkExperienceForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [experienceList, setExperienceList] = useState(resumeData.workExperience || []);
  
  // Update local state when resumeData changes
  useEffect(() => {
    setExperienceList(resumeData.workExperience || []);
  }, [resumeData.workExperience]);
  
  // Add new empty work experience item
  const handleAddExperience = () => {
    const newExperience = {
      id: uuidv4(),
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      isCurrentJob: false
    };
    
    const updatedList = [...experienceList, newExperience];
    setExperienceList(updatedList);
    updateResumeData({ workExperience: updatedList });
  };
  
  // Update a specific work experience item
  const handleExperienceChange = (id, field, value) => {
    const updatedList = experienceList.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    
    setExperienceList(updatedList);
    updateResumeData({ workExperience: updatedList });
  };
  
  // Handle checkbox for current job
  const handleCurrentJob = (id, checked) => {
    const updatedList = experienceList.map(exp => {
      if (exp.id === id) {
        return { 
          ...exp, 
          isCurrentJob: checked,
          endDate: checked ? '' : exp.endDate 
        };
      }
      return exp;
    });
    
    setExperienceList(updatedList);
    updateResumeData({ workExperience: updatedList });
  };
  
  // Remove a work experience item
  const handleRemoveExperience = (id) => {
    const updatedList = experienceList.filter(exp => exp.id !== id);
    setExperienceList(updatedList);
    updateResumeData({ workExperience: updatedList });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Work Experience')}</h3>
      
      {experienceList.map((experience, index) => (
        <div key={experience.id} className="card mb-3">
          <div className="card-body">
            <div className="form-row">
              <div className="form-group half">
                <Input
                  label={t('Job Title')}
                  name={`jobTitle-${experience.id}`}
                  value={experience.jobTitle}
                  onChange={(e) => handleExperienceChange(experience.id, 'jobTitle', e.target.value)}
                  placeholder={t('e.g. Software Engineer')}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('Employer')}
                  name={`employer-${experience.id}`}
                  value={experience.employer}
                  onChange={(e) => handleExperienceChange(experience.id, 'employer', e.target.value)}
                  placeholder={t('Company Name')}
                />
              </div>
            </div>
            
            <div className="form-group">
              <Input
                label={t('Location')}
                name={`location-${experience.id}`}
                value={experience.location}
                onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
                placeholder={t('City, Country')}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <Input
                  label={t('Start Date')}
                  name={`startDate-${experience.id}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('End Date')}
                  name={`endDate-${experience.id}`}
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                  disabled={experience.isCurrentJob}
                />
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.isCurrentJob}
                    onChange={(e) => handleCurrentJob(experience.id, e.target.checked)}
                  />
                  <label htmlFor={`current-${experience.id}`}>
                    {t('I currently work here')}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Job Description')}</label>
              <textarea
                name={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                placeholder={t('Describe your responsibilities and achievements')}
                className="form-input"
                rows={4}
              />
            </div>
            
            {experienceList.length > 1 && (
              <button
                type="button"
                className="button-text delete"
                onClick={() => handleRemoveExperience(experience.id)}
              >
                {t('Remove Experience')}
              </button>
            )}
          </div>
        </div>
      ))}
      
      <button
        type="button"
        className="button-text"
        onClick={handleAddExperience}
      >
        + {t('Add Work Experience')}
      </button>
    </div>
  );
};

export default WorkExperienceForm;