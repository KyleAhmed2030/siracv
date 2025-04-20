import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const { theme } = useTheme();
  
  // Calculate percentage
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className={`progress-bar-container ${theme}`}>
      <div 
        className="progress-bar-fill" 
        style={{ width: `${percentage}%` }}
      />
      <div className="progress-steps">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`progress-step ${index + 1 <= currentStep ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;