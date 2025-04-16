import React from 'react';

/**
 * Reusable input component with label, icon, and error handling
 */
const Input = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  icon = null,
  className = ''
}) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label className="form-label" htmlFor={id || name}>
          {label}
          {required && <span className="required-marker">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <div className="input-icon">{icon}</div>}
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`form-input ${icon ? 'has-icon' : ''}`}
        />
      </div>
      
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;