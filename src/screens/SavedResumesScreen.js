import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';
import SavedResumeItem from '../components/SavedResumeItem';
import { formatDate } from '../utils/helpers';

const SavedResumesScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { savedResumes, loadResume, deleteResume, startNewResume } = useResume();
  const [deleting, setDeleting] = useState(false);
  
  // Handle edit resume
  const handleEditResume = (id) => {
    loadResume(id);
    navigate('/builder/basicInfo');
  };
  
  // Handle preview resume
  const handlePreviewResume = (id) => {
    loadResume(id);
    navigate('/preview');
  };
  
  // Handle delete resume
  const handleDeleteResume = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this resume?'))) {
      setDeleting(true);
      deleteResume(id);
      setDeleting(false);
    }
  };
  
  // Handle create new resume
  const handleCreateNew = () => {
    startNewResume();
    navigate('/templates');
  };
  
  return (
    <div className="saved-resumes-screen">
      <h2>{t('Saved Resumes')}</h2>
      
      {savedResumes.length > 0 ? (
        <div className="saved-resumes-list">
          {savedResumes.map(resume => (
            <SavedResumeItem
              key={resume.id}
              name={`${resume.basicInfo?.firstName || ''} ${resume.basicInfo?.lastName || ''}`.trim() || t('Untitled Resume')}
              jobTitle={resume.basicInfo?.jobTitle || ''}
              lastUpdated={formatDate(resume.updatedAt)}
              onEdit={() => handleEditResume(resume.id)}
              onPreview={() => handlePreviewResume(resume.id)}
              onDelete={() => handleDeleteResume(resume.id)}
              disabled={deleting}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{t('You haven\'t saved any resumes yet.')}</p>
          <p className="empty-state-subtitle">{t('Create a resume to get started.')}</p>
          
          <div className="create-new-container">
            <Button
              variant="primary"
              onClick={handleCreateNew}
            >
              {t('Create New Resume')}
            </Button>
          </div>
        </div>
      )}
      
      {savedResumes.length > 0 && (
        <div className="create-new-container">
          <Button
            variant="primary"
            onClick={handleCreateNew}
          >
            {t('Create New Resume')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedResumesScreen;