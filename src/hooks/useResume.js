import { useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';

/**
 * Custom hook to access and update resume data from the ResumeContext
 * 
 * @returns {Object} An object with resume data and functions to update it
 */
export const useResume = () => {
  const context = useContext(ResumeContext);
  
  if (!context) {
    throw new Error('useResume must be used within a ResumeContextProvider');
  }
  
  return context;
};

export default useResume;