import React from 'react';

/**
 * Reusable input component with label, icon, and error handling
 */
const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error = null,
  icon = null,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`input-container ${className} ${error ? 'input-error' : ''}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
          required={required}
          disabled={disabled}
        />
      </div>
      
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default Input;