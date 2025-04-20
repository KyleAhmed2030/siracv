import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { getInitials } from '../utils/helpers';

/**
 * Component to display a saved resume item in the saved resumes list
 */
const SavedResumeItem = ({
  name,
  jobTitle,
  lastUpdated,
  onEdit,
  onPreview,
  onDelete,
  disabled = false
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className="saved-resume-item">
      <div className="resume-info">
        <h3>{name || t('Untitled Resume')}</h3>
        {jobTitle && <p>{jobTitle}</p>}
        {lastUpdated && (
          <p className="last-updated">
            {t('Last updated')}: {lastUpdated}
          </p>
        )}
      </div>
      
      <div className="resume-actions">
        <button
          className="button-text"
          onClick={onEdit}
          disabled={disabled}
        >
          {t('Edit')}
        </button>
        
        <button
          className="button-text"
          onClick={onPreview}
          disabled={disabled}
        >
          {t('Preview')}
        </button>
        
        <button
          className="button-text delete"
          onClick={onDelete}
          disabled={disabled}
        >
          {t('Delete')}
        </button>
      </div>
    </div>
  );
};

export default SavedResumeItem;