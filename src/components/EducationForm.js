import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';

const EducationForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [educationList, setEducationList] = useState(resumeData.education || []);
  
  // Update local state when resumeData changes
  useEffect(() => {
    setEducationList(resumeData.education || []);
  }, [resumeData.education]);
  
  // Add new empty education item
  const handleAddEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      isCurrent: false
    };
    
    const updatedList = [...educationList, newEducation];
    setEducationList(updatedList);
    updateResumeData({ education: updatedList });
  };
  
  // Update a specific education item
  const handleEducationChange = (id, field, value) => {
    const updatedList = educationList.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    
    setEducationList(updatedList);
    updateResumeData({ education: updatedList });
  };
  
  // Handle checkbox for current education
  const handleCurrentEducation = (id, checked) => {
    const updatedList = educationList.map(edu => {
      if (edu.id === id) {
        return { 
          ...edu, 
          isCurrent: checked,
          endDate: checked ? '' : edu.endDate 
        };
      }
      return edu;
    });
    
    setEducationList(updatedList);
    updateResumeData({ education: updatedList });
  };
  
  // Remove an education item
  const handleRemoveEducation = (id) => {
    const updatedList = educationList.filter(edu => edu.id !== id);
    setEducationList(updatedList);
    updateResumeData({ education: updatedList });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Education')}</h3>
      
      {educationList.map((education, index) => (
        <div key={education.id} className="card mb-3">
          <div className="card-body">
            <div className="form-row">
              <div className="form-group three-quarters">
                <Input
                  label={t('Institution')}
                  name={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => handleEducationChange(education.id, 'institution', e.target.value)}
                  placeholder={t('University or School Name')}
                />
              </div>
              <div className="form-group quarter">
                <Input
                  label={t('Location')}
                  name={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                  placeholder={t('City, Country')}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <Input
                  label={t('Degree')}
                  name={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                  placeholder={t('e.g. Bachelor\'s')}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('Field of Study')}
                  name={`fieldOfStudy-${education.id}`}
                  value={education.fieldOfStudy}
                  onChange={(e) => handleEducationChange(education.id, 'fieldOfStudy', e.target.value)}
                  placeholder={t('e.g. Computer Science')}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <Input
                  label={t('Start Date')}
                  name={`startDate-${education.id}`}
                  type="date"
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(education.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group half">
                <Input
                  label={t('End Date')}
                  name={`endDate-${education.id}`}
                  type="date"
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(education.id, 'endDate', e.target.value)}
                  disabled={education.isCurrent}
                />
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`current-${education.id}`}
                    checked={education.isCurrent}
                    onChange={(e) => handleCurrentEducation(education.id, e.target.checked)}
                  />
                  <label htmlFor={`current-${education.id}`}>
                    {t('I am currently studying here')}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">{t('Description')}</label>
              <textarea
                name={`description-${education.id}`}
                value={education.description}
                onChange={(e) => handleEducationChange(education.id, 'description', e.target.value)}
                placeholder={t('Describe your achievements, courses, etc.')}
                className="form-input"
                rows={3}
              />
            </div>
            
            {educationList.length > 1 && (
              <button
                type="button"
                className="button-text delete"
                onClick={() => handleRemoveEducation(education.id)}
              >
                {t('Remove Education')}
              </button>
            )}
          </div>
        </div>
      ))}
      
      <button
        type="button"
        className="button-text"
        onClick={handleAddEducation}
      >
        + {t('Add Education')}
      </button>
    </div>
  );
};

export default EducationForm;