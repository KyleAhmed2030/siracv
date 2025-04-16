import React from 'react';

/**
 * Reusable button component with optional icon and loading state
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon = null,
  loading = false,
  className = ''
}) => {
  const getButtonClasses = () => {
    const baseClass = 'button';
    const variantClass = `button-${variant}`;
    const sizeClass = `button-${size}`;
    const widthClass = fullWidth ? 'button-full-width' : '';
    const loadingClass = loading ? 'button-loading' : '';
    
    return `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${loadingClass} ${className}`.trim();
  };
  
  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
      {loading && <span className="button-spinner"></span>}
    </button>
  );
};

export default Button;