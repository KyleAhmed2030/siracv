import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

// Saved Resume Item Component
const SavedResumeItem = ({ resume, onSelect, onDelete }) => {
  return (
    <div className="saved-resume-item">
      <div className="resume-info">
        <h3>{resume.name || resume.fullName || 'Untitled Resume'}</h3>
        <p>{resume.jobTitle || 'No job title'}</p>
        <p className="last-updated">
          {resume.lastUpdated 
            ? `Last updated: ${new Date(resume.lastUpdated).toLocaleDateString()}`
            : 'Recently created'
          }
        </p>
      </div>
      <div className="resume-actions">
        <button 
          className="button-text"
          onClick={() => onSelect(resume)}
        >
          View
        </button>
        <button 
          className="button-text delete"
          onClick={() => onDelete(resume.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const SavedResumesScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // This would eventually come from local storage or a database
  const [savedResumes, setSavedResumes] = React.useState([]);
  
  const handleCreateNew = () => {
    navigate('/templates');
  };
  
  const handleSelectResume = (resume) => {
    // In a real app, we would load this resume data into the context
    // and then navigate to the preview screen
    navigate('/preview');
  };
  
  const handleDeleteResume = (id) => {
    // In a real app, we would remove the resume from storage
    setSavedResumes(savedResumes.filter(resume => resume.id !== id));
  };
  
  return (
    <div className="saved-resumes-screen">
      <h2>{t('My Resumes')}</h2>
      
      {savedResumes.length === 0 ? (
        <div className="empty-state">
          <p>{t('No saved resumes')}</p>
          <p className="empty-state-subtitle">{t('Create your first resume')}</p>
          <Button 
            variant="primary"
            onClick={handleCreateNew}
          >
            {t('Create Resume')}
          </Button>
        </div>
      ) : (
        <>
          <div className="saved-resumes-list">
            {savedResumes.map(resume => (
              <SavedResumeItem 
                key={resume.id}
                resume={resume}
                onSelect={handleSelectResume}
                onDelete={handleDeleteResume}
              />
            ))}
          </div>
          <div className="create-new-container">
            <Button 
              variant="primary"
              onClick={handleCreateNew}
            >
              {t('Create New Resume')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedResumesScreen;