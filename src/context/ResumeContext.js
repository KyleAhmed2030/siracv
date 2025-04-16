import React, { createContext, useState } from 'react';

// Initial state for the resume data
const initialResumeData = {
  template: '',
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  website: '',
  summary: '',
  education: [],
  experience: [],
  skills: []
};

// Create the context
export const ResumeContext = createContext();

/**
 * Resume Context Provider - Manages the state of the current resume being created
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} Provider Component
 */
export const ResumeContextProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  
  /**
   * Update specific parts of the resume data
   * 
   * @param {Object} updates - Object containing the updated fields
   */
  const updateResume = (updates) => {
    setResumeData(prevData => ({
      ...prevData,
      ...updates
    }));
  };
  
  /**
   * Set the entire resume data object
   * 
   * @param {Object} data - Complete resume data object
   */
  const setResumeDataComplete = (data) => {
    setResumeData(data);
  };
  
  /**
   * Clear the resume data (reset to initial state)
   */
  const clearResume = () => {
    setResumeData(initialResumeData);
  };
  
  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResume,
      setResumeDataComplete,
      clearResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;