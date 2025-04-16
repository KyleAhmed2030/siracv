import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import { useTheme } from '../hooks/useTheme';

const SummaryForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const { theme } = useTheme();
  
  // Handle summary change
  const handleChange = (e) => {
    updateResumeData({
      summary: e.target.value
    });
  };
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="summary-input" className="form-label">
          {t('Professional Summary')}
        </label>
        
        <p className="form-help-text">
          {t('Write a professional summary that highlights your experience and skills')}
        </p>
        
        <textarea
          id="summary-input"
          value={resumeData.summary || ''}
          onChange={handleChange}
          placeholder={t('Briefly describe your professional background, key skills, and what makes you unique...')}
          className={`form-textarea ${theme}`}
          rows={6}
        />
        
        <p className="form-hint">
          {t('A good summary should be 3-5 sentences that quickly summarizes your background and skills')}
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;