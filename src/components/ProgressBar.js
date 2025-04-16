import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage} 
        aria-valuemin="0" 
        aria-valuemax="100"
        role="progressbar"
      />
    </div>
  );
};

export default ProgressBar;