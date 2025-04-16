import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * Reusable input component with label, icon, and error handling
 */
const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  min,
  max,
  className = '',
  icon
}) => {
  const { theme } = useTheme();
  
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}{required && <span className="required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <div className="input-icon">{icon}</div>}
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={`form-input ${theme} ${error ? 'has-error' : ''} ${icon ? 'has-icon' : ''}`}
          required={required}
        />
      </div>
      
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;