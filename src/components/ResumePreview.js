import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useResume } from '../hooks/useResume';
import { formatDate } from '../utils/helpers';
import { useTranslation } from 'react-i18next';

const ResumePreview = ({ resumeData }) => {
  const { theme } = useTheme();
  const { getColorValue } = useResume();
  
  if (!resumeData) {
    return <div className="resume-preview-empty">No resume data available</div>;
  }
  
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = '',
    template = 'template1',
    colorScheme = { primary: 'blue', accent: 'teal' }
  } = resumeData;

  // Get actual color values
  const primaryColor = getColorValue('primary', colorScheme.primary);
  const accentColor = getColorValue('accent', colorScheme.accent);

  // Render different template based on selection
  switch (template) {
    case 'template2':
      return <Template2Preview 
        resumeData={resumeData} 
        theme={theme} 
        primaryColor={primaryColor}
        accentColor={accentColor}
      />;
    case 'template3':
      return <Template3Preview 
        resumeData={resumeData} 
        theme={theme} 
        primaryColor={primaryColor}
        accentColor={accentColor}
      />;
    case 'template4':
      return <Template4Preview 
        resumeData={resumeData} 
        theme={theme} 
        primaryColor={primaryColor}
        accentColor={accentColor}
      />;
    case 'template5':
      return <Template5Preview 
        resumeData={resumeData} 
        theme={theme} 
        primaryColor={primaryColor}
        accentColor={accentColor}
      />;
    case 'template1':
    default:
      return <Template1Preview 
        resumeData={resumeData} 
        theme={theme} 
        primaryColor={primaryColor}
        accentColor={accentColor}
      />;
  }
};

// Template 1 (Professional)
const Template1Preview = ({ resumeData, theme, primaryColor, accentColor }) => {
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;
  
  // CSS custom properties for colors
  const customStyles = {
    '--template-primary-color': primaryColor,
    '--template-accent-color': accentColor,
  };

  return (
    <div className={`resume-preview template1-preview ${theme}`} style={customStyles}>
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

// Template 2 (Creative)
const Template2Preview = ({ resumeData, theme, primaryColor, accentColor }) => {
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;
  
  // CSS custom properties for colors
  const customStyles = {
    '--template-primary-color': primaryColor,
    '--template-accent-color': accentColor,
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName ? firstName.charAt(0) : ''}${lastName ? lastName.charAt(0) : ''}`;
  };

  return (
    <div className={`resume-preview template2-preview ${theme}`} style={customStyles}>
      <div className="template2-container">
        <div className="template2-sidebar">
          <div className="sidebar-header">
            <div className="avatar-circle">
              {getInitials(basicInfo.firstName, basicInfo.lastName)}
            </div>
            <h2 className="sidebar-name">{basicInfo.firstName} {basicInfo.lastName}</h2>
            <p className="sidebar-title">{basicInfo.jobTitle}</p>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Contact</h3>
            <div className="sidebar-divider"></div>
            <ul className="contact-list">
              {basicInfo.email && <li><span className="contact-label">Email:</span> {basicInfo.email}</li>}
              {basicInfo.phone && <li><span className="contact-label">Phone:</span> {basicInfo.phone}</li>}
              {basicInfo.location && <li><span className="contact-label">Location:</span> {basicInfo.location}</li>}
              {basicInfo.website && <li><span className="contact-label">Website:</span> {basicInfo.website}</li>}
              {basicInfo.linkedIn && <li><span className="contact-label">LinkedIn:</span> {basicInfo.linkedIn}</li>}
            </ul>
          </div>
          
          {skills.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Skills</h3>
              <div className="sidebar-divider"></div>
              <div className="skills-container">
                {skills.map(skill => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{width: `${(parseInt(skill.level) / 5) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="template2-content">
          {summary && (
            <div className="content-section">
              <h3 className="content-section-title">
                <span className="section-icon">👤</span>
                Profile
              </h3>
              <div className="content-divider"></div>
              <p className="summary-text">{summary}</p>
            </div>
          )}
          
          {workExperience.length > 0 && (
            <div className="content-section">
              <h3 className="content-section-title">
                <span className="section-icon">💼</span>
                Experience
              </h3>
              <div className="content-divider"></div>
              
              <div className="timeline">
                {workExperience.map(experience => (
                  <div key={experience.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4 className="item-title">{experience.jobTitle}</h4>
                      <div className="item-subtitle">
                        <span className="item-company">{experience.employer}</span>
                        <span className="item-period">
                          {formatDate(experience.startDate)} - {experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)}
                        </span>
                      </div>
                      {experience.location && <div className="item-location">{experience.location}</div>}
                      {experience.description && <p className="item-description">{experience.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {education.length > 0 && (
            <div className="content-section">
              <h3 className="content-section-title">
                <span className="section-icon">🎓</span>
                Education
              </h3>
              <div className="content-divider"></div>
              
              <div className="timeline">
                {education.map(edu => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4 className="item-title">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h4>
                      <div className="item-subtitle">
                        <span className="item-company">{edu.institution}</span>
                        <span className="item-period">
                          {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.location && <div className="item-location">{edu.location}</div>}
                      {edu.description && <p className="item-description">{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template 3 (Minimal)
const Template3Preview = ({ resumeData, theme, primaryColor, accentColor }) => {
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;
  
  // CSS custom properties for colors
  const customStyles = {
    '--template-primary-color': primaryColor,
    '--template-accent-color': accentColor,
  };

  return (
    <div className={`resume-preview template3-preview ${theme}`} style={customStyles}>
      <div className="template3-header">
        <div className="header-main">
          <h1 className="header-name">{basicInfo.firstName} {basicInfo.lastName}</h1>
          <p className="header-title">{basicInfo.jobTitle}</p>
        </div>
        <div className="header-contact">
          {basicInfo.email && <span className="contact-item">{basicInfo.email}</span>}
          {basicInfo.phone && <span className="contact-item">{basicInfo.phone}</span>}
          {basicInfo.location && <span className="contact-item">{basicInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="template3-section">
          <h2 className="section-title">Summary</h2>
          <p className="section-content summary-text">{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="template3-section">
          <h2 className="section-title">Experience</h2>
          <div className="experience-container">
            {workExperience.map(exp => (
              <div key={exp.id} className="experience-item">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.jobTitle}</h3>
                  <span className="experience-period">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="experience-subtitle">{exp.employer}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.description && <p className="experience-description">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="template3-section">
          <h2 className="section-title">Education</h2>
          <div className="education-container">
            {education.map(edu => (
              <div key={edu.id} className="education-item">
                <div className="education-header">
                  <h3 className="education-title">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                  <span className="education-period">
                    {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="education-subtitle">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                {edu.description && <p className="education-description">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="template3-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {skills.map(skill => (
              <div key={skill.id} className="skill-badge">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Template 4 (Modern)
const Template4Preview = ({ resumeData, theme, primaryColor, accentColor }) => {
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;
  
  // CSS custom properties for colors
  const customStyles = {
    '--template-primary-color': primaryColor,
    '--template-accent-color': accentColor,
  };

  return (
    <div className={`resume-preview template4-preview ${theme}`} style={customStyles}>
      <div className="template4-header">
        <div className="header-main">
          <h1 className="header-name">{basicInfo.firstName} {basicInfo.lastName}</h1>
          <h2 className="header-title">{basicInfo.jobTitle}</h2>
        </div>
        <div className="header-side">
          {basicInfo.email && <div className="contact-item"><span className="contact-icon">✉</span> {basicInfo.email}</div>}
          {basicInfo.phone && <div className="contact-item"><span className="contact-icon">✆</span> {basicInfo.phone}</div>}
          {basicInfo.location && <div className="contact-item"><span className="contact-icon">⌂</span> {basicInfo.location}</div>}
          {basicInfo.website && <div className="contact-item"><span className="contact-icon">🔗</span> {basicInfo.website}</div>}
          {basicInfo.linkedIn && <div className="contact-item"><span className="contact-icon">in</span> {basicInfo.linkedIn}</div>}
        </div>
      </div>
      
      <div className="template4-body">
        <div className="template4-main">
          {summary && (
            <div className="template4-section">
              <h3 className="section-title"><span className="section-icon">👤</span> Professional Summary</h3>
              <div className="section-content">
                <p>{summary}</p>
              </div>
            </div>
          )}
          
          {workExperience.length > 0 && (
            <div className="template4-section">
              <h3 className="section-title"><span className="section-icon">💼</span> Work Experience</h3>
              <div className="section-content timeline">
                {workExperience.map(exp => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-header">
                      <span className="timeline-title">{exp.jobTitle}</span>
                      <span className="timeline-period">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="timeline-subtitle">{exp.employer}</div>
                    {exp.location && <div className="timeline-location">{exp.location}</div>}
                    {exp.description && <div className="timeline-description">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {education.length > 0 && (
            <div className="template4-section">
              <h3 className="section-title"><span className="section-icon">🎓</span> Education</h3>
              <div className="section-content timeline">
                {education.map(edu => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-header">
                      <span className="timeline-title">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                      <span className="timeline-period">
                        {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="timeline-subtitle">{edu.institution}</div>
                    {edu.location && <div className="timeline-location">{edu.location}</div>}
                    {edu.description && <div className="timeline-description">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="template4-side">
          {skills.length > 0 && (
            <div className="template4-section">
              <h3 className="section-title"><span className="section-icon">🔧</span> Skills</h3>
              <div className="section-content skills-container">
                {skills.map(skill => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-bar">
                      <div 
                        className="skill-level" 
                        style={{width: `${(parseInt(skill.level) / 5) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template 5 (Executive)
const Template5Preview = ({ resumeData, theme, primaryColor, accentColor }) => {
  const {
    basicInfo = {},
    education = [],
    workExperience = [],
    skills = [],
    summary = ''
  } = resumeData;
  
  // CSS custom properties for colors
  const customStyles = {
    '--template-primary-color': primaryColor,
    '--template-accent-color': accentColor,
  };

  return (
    <div className={`resume-preview template5-preview ${theme}`} style={customStyles}>
      <div className="template5-header">
        <div className="header-content">
          <div className="name-title">
            <h1 className="header-name">{basicInfo.firstName} {basicInfo.lastName}</h1>
            <div className="title-underline"></div>
            <h2 className="header-title">{basicInfo.jobTitle}</h2>
          </div>
          
          <div className="contact-info">
            {basicInfo.email && <div className="contact-item">{basicInfo.email}</div>}
            {basicInfo.phone && <div className="contact-item">{basicInfo.phone}</div>}
            {basicInfo.location && <div className="contact-item">{basicInfo.location}</div>}
            {basicInfo.website && <div className="contact-item">{basicInfo.website}</div>}
            {basicInfo.linkedIn && <div className="contact-item">{basicInfo.linkedIn}</div>}
          </div>
        </div>
      </div>
      
      <div className="template5-content">
        {summary && (
          <div className="template5-section summary-section">
            <h3 className="section-title">Executive Summary</h3>
            <div className="section-content">
              <p>{summary}</p>
            </div>
          </div>
        )}
        
        <div className="two-column-layout">
          <div className="left-column">
            {workExperience.length > 0 && (
              <div className="template5-section">
                <h3 className="section-title">Professional Experience</h3>
                <div className="section-content">
                  {workExperience.map(exp => (
                    <div key={exp.id} className="resume-item">
                      <div className="item-header">
                        <span className="item-title">{exp.jobTitle}</span>
                        <span className="item-period">
                          {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="item-subtitle">{exp.employer}</div>
                      {exp.location && <div className="item-location">{exp.location}</div>}
                      {exp.description && <div className="item-description">{exp.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="right-column">
            {education.length > 0 && (
              <div className="template5-section">
                <h3 className="section-title">Education</h3>
                <div className="section-content">
                  {education.map(edu => (
                    <div key={edu.id} className="resume-item">
                      <div className="item-header">
                        <span className="item-title">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                        <span className="item-period">
                          {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                      <div className="item-subtitle">{edu.institution}</div>
                      {edu.location && <div className="item-location">{edu.location}</div>}
                      {edu.description && <div className="item-description">{edu.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {skills.length > 0 && (
              <div className="template5-section">
                <h3 className="section-title">Core Competencies</h3>
                <div className="section-content skills-section">
                  {skills.map(skill => (
                    <div key={skill.id} className="skill-item">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-rating">
                        {Array(parseInt(skill.level)).fill().map((_, i) => 
                          <span key={i} className="rating-dot filled"></span>
                        )}
                        {Array(5 - parseInt(skill.level)).fill().map((_, i) => 
                          <span key={i} className="rating-dot"></span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;