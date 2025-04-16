import React from 'react';
import { useTheme } from '../hooks/useTheme';

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
  const { theme } = useTheme();
  
  const baseClasses = 'button';
  const variantClass = `button-${variant}`;
  const widthClass = fullWidth ? 'button-full-width' : '';
  const loadingClass = loading ? 'button-loading' : '';
  const themeClass = theme === 'dark' ? 'dark-button' : '';
  
  const classNames = [
    baseClasses,
    variantClass,
    widthClass,
    loadingClass,
    themeClass
  ].filter(Boolean).join(' ');
  
  // Inline styles to ensure visibility
  const buttonStyle = {
    color: variant === 'primary' ? 'white' : '#000000',
    fontWeight: '600'
  };
  
  // Ensure white text for dark mode buttons
  if (theme === 'dark') {
    buttonStyle.color = 'white';
  }
  
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      style={buttonStyle}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{loading ? 'Loading...' : children}</span>
    </button>
  );
};

export default Button;