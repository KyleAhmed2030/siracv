import React from 'react';

/**
 * Reusable button component with optional icon and loading state
 */
const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
  loading = false,
  icon = null
}) => {
  const baseClasses = 'button';
  const variantClass = `button-${variant}`;
  const widthClass = fullWidth ? 'button-full-width' : '';
  const loadingClass = loading ? 'button-loading' : '';
  
  const classNames = [
    baseClasses,
    variantClass,
    widthClass,
    loadingClass
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{loading ? 'Loading...' : children}</span>
    </button>
  );
};

export default Button;