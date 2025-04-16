import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

/**
 * Reusable textarea component with label and error handling
 */
const TextArea = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  helpText
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Format error message with translation if it's a standard message
  const getErrorMessage = (error) => {
    // Check if error is a standard validation message
    if (typeof error === 'string') {
      return t(error);
    }
    return error;
  };
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}{required && <span className="required-indicator">*</span>}
        </label>
      )}
      
      {helpText && <p className="form-help-text">{helpText}</p>}
      
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-textarea ${theme} ${error ? 'has-error' : ''}`}
        rows={rows}
        required={required}
      />
      
      {error && <div className="form-error">{getErrorMessage(error)}</div>}
    </div>
  );
};

export default TextArea;