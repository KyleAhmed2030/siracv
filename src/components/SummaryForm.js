import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import { useTheme } from '../hooks/useTheme';
import TextArea from './TextArea';

const SummaryForm = ({ onValidationChange }) => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const { theme } = useTheme();
  const [summaryLength, setSummaryLength] = useState(0);
  
  // Always validate as true since summary is optional
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true);
    }
    
    // Update character count
    setSummaryLength(resumeData.summary ? resumeData.summary.length : 0);
  }, [resumeData.summary, onValidationChange]);
  
  // Handle summary change
  const handleChange = (e) => {
    updateResumeData({
      summary: e.target.value
    });
    
    // Update character count
    setSummaryLength(e.target.value.length);
  };
  
  // Character count style
  const characterCountStyle = {
    textAlign: 'right',
    fontSize: '14px',
    color: theme === 'dark' ? '#adb5bd' : '#6c757d',
    marginTop: '5px'
  };
  
  // Recommended character range (150-400 characters for a good professional summary)
  const MIN_RECOMMENDED_LENGTH = 150;
  const MAX_RECOMMENDED_LENGTH = 400;
  
  // Get status of character count
  const getCountStatus = () => {
    if (summaryLength === 0) return 'empty';
    if (summaryLength < MIN_RECOMMENDED_LENGTH) return 'short';
    if (summaryLength > MAX_RECOMMENDED_LENGTH) return 'long';
    return 'good';
  };
  
  // Get status text
  const getStatusText = () => {
    const status = getCountStatus();
    switch (status) {
      case 'empty':
        return '';
      case 'short':
        return t('Your summary is a bit short. Consider adding more details.');
      case 'long':
        return t('Your summary is quite long. Consider making it more concise.');
      case 'good':
        return t('Great summary length!');
      default:
        return '';
    }
  };
  
  // Get status color
  const getStatusColor = () => {
    const status = getCountStatus();
    switch (status) {
      case 'short':
        return 'var(--warning-color)';
      case 'long':
        return 'var(--warning-color)';
      case 'good':
        return 'var(--success-color)';
      default:
        return theme === 'dark' ? '#adb5bd' : '#6c757d';
    }
  };
  
  return (
    <div className="form-section">
      <TextArea
        id="summary-input"
        label={t('Professional Summary')}
        value={resumeData.summary || ''}
        onChange={handleChange}
        placeholder={t('Briefly describe your professional background, key skills, and what makes you unique...')}
        rows={6}
        helpText={t('Write a professional summary that highlights your experience and skills')}
      />
        
      <div style={characterCountStyle}>
        <span style={{ color: getStatusColor() }}>
          {summaryLength} {t('characters')} 
          {getStatusText() && ` - ${getStatusText()}`}
        </span>
      </div>
      
      <p className="form-hint">
        {t('A good summary should be 3-5 sentences that quickly summarizes your background and skills')}
      </p>
    </div>
  );
};

export default SummaryForm;