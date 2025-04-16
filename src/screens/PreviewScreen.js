import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';

// Simple Resume Preview - will be replaced with more sophisticated templates
const ResumePreview = ({ data }) => {
  return (
    <div className="resume-preview">
      <div className="resume-header">
        <h1>{data.fullName || 'Your Name'}</h1>
        <h2>{data.jobTitle || 'Job Title'}</h2>
        
        <div className="resume-contact-info">
          {data.email && <div className="contact-item">{data.email}</div>}
          {data.phone && <div className="contact-item">{data.phone}</div>}
          {data.address && <div className="contact-item">{data.address}</div>}
          {data.linkedin && <div className="contact-item">{data.linkedin}</div>}
          {data.website && <div className="contact-item">{data.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <div className="resume-section">
          <h3>Professional Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}
      
      {data.experience && data.experience.length > 0 && (
        <div className="resume-section">
          <h3>Work Experience</h3>
          {data.experience.map(exp => (
            <div key={exp.id} className="resume-item">
              <div className="item-header">
                <div className="item-title">{exp.position}</div>
                <div className="item-company">{exp.company}</div>
                <div className="item-period">
                  {exp.startDate} - {exp.present ? 'Present' : exp.endDate}
                </div>
              </div>
              <div className="item-location">{exp.location}</div>
              <div className="item-description">{exp.description}</div>
            </div>
          ))}
        </div>
      )}
      
      {data.education && data.education.length > 0 && (
        <div className="resume-section">
          <h3>Education</h3>
          {data.education.map(edu => (
            <div key={edu.id} className="resume-item">
              <div className="item-header">
                <div className="item-title">{edu.degree}</div>
                <div className="item-company">{edu.school}</div>
                <div className="item-period">
                  {edu.startDate} - {edu.present ? 'Present' : edu.endDate}
                </div>
              </div>
              <div className="item-location">{edu.fieldOfStudy}</div>
              <div className="item-description">{edu.description}</div>
            </div>
          ))}
        </div>
      )}
      
      {data.skills && data.skills.length > 0 && (
        <div className="resume-section">
          <h3>Skills</h3>
          <div className="skills-grid">
            {data.skills.map(skill => (
              <div key={skill.id} className="skill-chip">
                {skill.name} <span className="skill-level">({skill.level})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PreviewScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData } = useResume();
  
  const handleEdit = () => {
    navigate('/builder/basic-info');
  };
  
  const handleDownload = () => {
    // This will be implemented with a proper PDF generation library
    alert('PDF download functionality coming soon!');
  };
  
  const handleSave = () => {
    // This will save the resume to local storage or database
    alert('Save functionality coming soon!');
  };
  
  return (
    <div className="preview-screen">
      <h2>{t('Resume Preview')}</h2>
      
      <div className="preview-container">
        <ResumePreview data={resumeData} />
      </div>
      
      <div className="button-group">
        <Button 
          variant="secondary" 
          onClick={handleEdit}
        >
          {t('Edit')}
        </Button>
        <div>
          <Button 
            variant="primary" 
            onClick={handleSave}
            style={{ marginRight: '10px' }}
          >
            {t('Save')}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleDownload}
          >
            {t('Download')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;