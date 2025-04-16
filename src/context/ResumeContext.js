import React, { createContext, useState, useEffect } from 'react';
import storage from '../utils/storage';

// Create the Resume Context
export const ResumeContext = createContext();

// Storage key for resume data
const RESUME_STORAGE_KEY = 'current-resume';

/**
 * Resume Context Provider - Manages the state of the current resume being created
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} Provider Component
 */
export const ResumeContextProvider = ({ children }) => {
  // State for the current resume data
  const [resumeData, setResumeData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    education: [],
    workExperience: [],
    skills: [],
    languages: [],
    summary: '',
    template: null,
  });
  
  // Load saved resume data on mount
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const savedData = await storage.getItem(RESUME_STORAGE_KEY);
        if (savedData) {
          setResumeData(savedData);
        }
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    };
    
    loadResumeData();
  }, []);
  
  // Save resume data whenever it changes
  useEffect(() => {
    const saveResumeData = async () => {
      try {
        await storage.setItem(RESUME_STORAGE_KEY, resumeData);
      } catch (error) {
        console.error('Error saving resume data:', error);
      }
    };
    
    saveResumeData();
  }, [resumeData]);
  
  /**
   * Update specific parts of the resume data
   * 
   * @param {Object} updates - Object containing the updated fields
   */
  const updateResumeData = (updates) => {
    setResumeData(prev => ({
      ...prev,
      ...updates,
    }));
  };
  
  /**
   * Set the entire resume data object
   * 
   * @param {Object} data - Complete resume data object
   */
  const setResumeDataObject = (data) => {
    setResumeData(data);
  };
  
  /**
   * Clear the resume data (reset to initial state)
   */
  const clearResumeData = () => {
    setResumeData({
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      education: [],
      workExperience: [],
      skills: [],
      languages: [],
      summary: '',
      template: null,
    });
  };
  
  // Context value to be provided
  const value = {
    resumeData,
    updateResumeData,
    setResumeData: setResumeDataObject,
    clearResumeData,
  };
  
  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
