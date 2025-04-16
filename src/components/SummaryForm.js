import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';

const SummaryForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [summary, setSummary] = useState(resumeData.summary || '');
  
  // Update local state when resumeData changes
  useEffect(() => {
    setSummary(resumeData.summary || '');
  }, [resumeData.summary]);
  
  // Handle summary text change
  const handleSummaryChange = (e) => {
    const value = e.target.value;
    setSummary(value);
    updateResumeData({ summary: value });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Professional Summary')}</h3>
      
      <div className="form-group">
        <label className="form-label">
          {t('Write a professional summary that highlights your experience and skills')}
        </label>
        <textarea
          name="summary"
          value={summary}
          onChange={handleSummaryChange}
          placeholder={t('Briefly describe your professional background, key skills, and what makes you unique...')}
          className="form-input"
          rows={6}
        />
        <div className="form-hint">
          {t('A good summary should be 3-5 sentences that quickly summarizes your background and skills')}
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;