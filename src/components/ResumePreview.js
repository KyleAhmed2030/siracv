import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { formatDate } from '../utils/helpers';

const ResumePreview = ({ resumeData }) => {
  const { theme } = useTheme();
  
  if (!resumeData) {
    return <div className="resume-preview-empty">No resume data available</div>;
  }
  
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;

  return (
    <div className={`resume-preview ${theme}`}>
      <div className="resume-header">
        <h1>{basicInfo.firstName} {basicInfo.lastName}</h1>
        <h2>{basicInfo.jobTitle}</h2>
        
        <div className="resume-contact-info">
          {basicInfo.email && (
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <span>{basicInfo.email}</span>
            </div>
          )}
          
          {basicInfo.phone && (
            <div className="contact-item">
              <span className="contact-icon">☎</span>
              <span>{basicInfo.phone}</span>
            </div>
          )}
          
          {basicInfo.location && (
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{basicInfo.location}</span>
            </div>
          )}
          
          {basicInfo.website && (
            <div className="contact-item">
              <span className="contact-icon">🌐</span>
              <span>{basicInfo.website}</span>
            </div>
          )}
          
          {basicInfo.linkedIn && (
            <div className="contact-item">
              <span className="contact-icon">in</span>
              <span>{basicInfo.linkedIn}</span>
            </div>
          )}
        </div>
      </div>
      
      {summary && (
        <div className="resume-section">
          <h3>Professional Summary</h3>
          <p className="resume-summary">{summary}</p>
        </div>
      )}
      
      {workExperience.length > 0 && (
        <div className="resume-section">
          <h3>Work Experience</h3>
          
          {workExperience.map((experience) => (
            <div key={experience.id} className="resume-item">
              <div className="item-header">
                <div className="item-title">{experience.jobTitle}</div>
                <div className="item-period">
                  {formatDate(experience.startDate)} - {experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)}
                </div>
              </div>
              
              <div className="item-company">{experience.employer}</div>
              {experience.location && <div className="item-location">{experience.location}</div>}
              
              {experience.description && (
                <div className="item-description">{experience.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {education.length > 0 && (
        <div className="resume-section">
          <h3>Education</h3>
          
          {education.map((edu) => (
            <div key={edu.id} className="resume-item">
              <div className="item-header">
                <div className="item-title">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                <div className="item-period">
                  {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                </div>
              </div>
              
              <div className="item-company">{edu.institution}</div>
              {edu.location && <div className="item-location">{edu.location}</div>}
              
              {edu.description && (
                <div className="item-description">{edu.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {skills.length > 0 && (
        <div className="resume-section">
          <h3>Skills</h3>
          
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-chip">
                {skill.name}
                <span className="skill-level">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;