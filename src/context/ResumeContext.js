import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

// Initial resume data structure
const initialResumeData = {
  template: 'professional',
  basicInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: ''
  },
  education: [],
  workExperience: [],
  skills: [],
  summary: ''
};

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
  const updateResumeData = (updates) => {
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
  const setFullResumeData = (data) => {
    setResumeData(data);
  };
  
  /**
   * Clear the resume data (reset to initial state)
   */
  const clearResumeData = () => {
    setResumeData(initialResumeData);
  };
  
  return (
    <ResumeContext.Provider value={{ 
      resumeData, 
      updateResumeData, 
      setFullResumeData, 
      clearResumeData 
    }}>
      {children}
    </ResumeContext.Provider>
  );
};