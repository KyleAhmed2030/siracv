import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * Reusable button component with optional icon, loading state, and enhanced accessibility
 */
const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
  loading = false,
  icon = null,
  ariaLabel,
  ariaControls,
  ariaExpanded,
  ariaDescribedby,
  tabIndex
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
  
  // Inline styles to ensure visibility and accessibility
  const buttonStyle = {
    color: variant === 'primary' ? 'white' : '#000000',
    fontWeight: '600',
    padding: '10px 16px',
    cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
    opacity: (disabled || loading) ? 0.7 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    position: 'relative',
    textAlign: 'center'
  };
  
  // Ensure white text for dark mode buttons
  if (theme === 'dark') {
    buttonStyle.color = 'white';
  }
  
  // Determine the button text to use for screen readers if loading
  const buttonText = loading ? 'Loading...' : children;
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick && !disabled && !loading) {
        onClick(e);
      }
    }
  };
  
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      style={buttonStyle}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-describedby={ariaDescribedby}
      tabIndex={tabIndex}
    >
      {icon && (
        <span className="button-icon" aria-hidden="true" style={{ marginRight: '8px' }}>
          {icon}
        </span>
      )}
      <span>{buttonText}</span>
      {loading && (
        <span 
          className="button-loader"
          aria-hidden="true"
          style={{ 
            position: 'absolute',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
            marginLeft: '8px'
          }}
        />
      )}
    </button>
  );
};

export default Button;