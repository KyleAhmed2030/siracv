import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';

const WorkExperienceForm = ({ onValidationChange }) => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [experienceList, setExperienceList] = useState(resumeData.workExperience || []);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(true);
  
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
    
    // Clear error for this field if it exists
    const errorKey = `${id}-${field}`;
    if (errors[errorKey]) {
      setErrors({
        ...errors,
        [errorKey]: null
      });
    }
    
    // Mark field as touched
    setTouched({
      ...touched,
      [errorKey]: true
    });
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
    
    // Clear end date error if current job is checked
    if (checked) {
      const errorKey = `${id}-endDate`;
      if (errors[errorKey]) {
        setErrors({
          ...errors,
          [errorKey]: null
        });
      }
    }
  };
  
  // Remove a work experience item
  const handleRemoveExperience = (id) => {
    const updatedList = experienceList.filter(exp => exp.id !== id);
    setExperienceList(updatedList);
    updateResumeData({ workExperience: updatedList });
    
    // Remove errors for this experience entry
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`${id}-`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
    
    // Remove touched state for this experience entry
    const newTouched = { ...touched };
    Object.keys(newTouched).forEach(key => {
      if (key.startsWith(`${id}-`)) {
        delete newTouched[key];
      }
    });
    setTouched(newTouched);
  };
  
  // Field blur handler
  const handleBlur = (id, field, value) => {
    const errorKey = `${id}-${field}`;
    setTouched({
      ...touched,
      [errorKey]: true
    });
    validateField(id, field, value);
  };
  
  // Validate individual field
  const validateField = (id, field, value) => {
    const errorKey = `${id}-${field}`;
    let error = null;
    
    // Work experience fields aren't strictly required
    // But if they're filled, validate any related fields
    if (field === 'jobTitle' && experienceList.some(exp => exp.id === id && exp.employer && exp.employer.trim() !== '') && (!value || value.trim() === '')) {
      error = t('Job title is required when employer is specified');
    }
    
    if (field === 'employer' && experienceList.some(exp => exp.id === id && exp.jobTitle && exp.jobTitle.trim() !== '') && (!value || value.trim() === '')) {
      error = t('Employer is required when job title is specified');
    }
    
    // Check for valid date format
    if ((field === 'startDate' || field === 'endDate') && value) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        error = t('Please enter a valid date');
      }
    }
    
    // Validate that start date is before end date
    if (field === 'endDate' && value) {
      const experience = experienceList.find(exp => exp.id === id);
      if (experience && experience.startDate && new Date(value) < new Date(experience.startDate)) {
        error = t('End date must be after start date');
      }
    }
    
    setErrors({
      ...errors,
      [errorKey]: error
    });
    
    return !error;
  };
  
  // Validate all experience entries
  const validateExperience = () => {
    // If there are no experience entries or the step is not required, consider it valid
    if (experienceList.length === 0) {
      setIsValid(true);
      if (onValidationChange) {
        onValidationChange(true);
      }
      return true;
    }
    
    const newErrors = { ...errors };
    let formIsValid = true;
    
    experienceList.forEach(experience => {
      // If both job title and employer are filled out, we should check dates
      if (experience.jobTitle && experience.employer) {
        // If we have dates, validate them
        if (experience.startDate && experience.endDate && !experience.isCurrentJob) {
          if (new Date(experience.endDate) < new Date(experience.startDate)) {
            formIsValid = false;
            newErrors[`${experience.id}-endDate`] = t('End date must be after start date');
          }
        }
      }
      
      // If job title is filled but employer is not (or vice versa), that's an issue
      if ((experience.jobTitle && !experience.employer) || (!experience.jobTitle && experience.employer)) {
        formIsValid = false;
        if (experience.jobTitle && !experience.employer) {
          newErrors[`${experience.id}-employer`] = t('Employer is required when job title is specified');
        }
        if (!experience.jobTitle && experience.employer) {
          newErrors[`${experience.id}-jobTitle`] = t('Job title is required when employer is specified');
        }
      }
    });
    
    setErrors(newErrors);
    setIsValid(formIsValid);
    
    // Notify parent of validation status
    if (onValidationChange) {
      onValidationChange(formIsValid);
    }
    
    return formIsValid;
  };
  
  // Update parent component when validation status changes
  useEffect(() => {
    validateExperience();
  }, [experienceList, onValidationChange]);
  
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
                  onBlur={(e) => handleBlur(experience.id, 'jobTitle', e.target.value)}
                  placeholder={t('e.g. Software Engineer')}
                  error={errors[`${experience.id}-jobTitle`]}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('Employer')}
                  name={`employer-${experience.id}`}
                  value={experience.employer}
                  onChange={(e) => handleExperienceChange(experience.id, 'employer', e.target.value)}
                  onBlur={(e) => handleBlur(experience.id, 'employer', e.target.value)}
                  placeholder={t('Company Name')}
                  error={errors[`${experience.id}-employer`]}
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
                  onBlur={(e) => handleBlur(experience.id, 'startDate', e.target.value)}
                  error={errors[`${experience.id}-startDate`]}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('End Date')}
                  name={`endDate-${experience.id}`}
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                  onBlur={(e) => handleBlur(experience.id, 'endDate', e.target.value)}
                  disabled={experience.isCurrentJob}
                  error={errors[`${experience.id}-endDate`]}
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