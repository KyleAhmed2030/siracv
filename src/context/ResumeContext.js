import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from '../hooks/useStorage';

// Resume storage keys
const CURRENT_RESUME_KEY = 'current-resume';
const SAVED_RESUMES_KEY = 'saved-resumes';

// Initial resume data structure
const initialResumeData = {
  id: '',
  template: 'template1',
  createdAt: null,
  updatedAt: null,
  basicInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    website: '',
    linkedIn: '',
  },
  education: [],
  workExperience: [],
  skills: [],
  summary: '',
  languages: [],
  certifications: [],
  projects: [],
  awards: [],
  interests: [],
  references: []
};

export const ResumeContext = createContext();

/**
 * Resume Context Provider - Manages the state of the current resume being created
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} Provider Component
 */
export const ResumeContextProvider = ({ children }) => {
  // Current resume being edited
  const [currentResumeData, setCurrentResumeData] = useStorage(
    CURRENT_RESUME_KEY,
    { ...initialResumeData, id: uuidv4(), createdAt: new Date().toISOString() }
  );
  
  // All saved resumes
  const [savedResumes, setSavedResumes] = useStorage(SAVED_RESUMES_KEY, []);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Set loading to false once storage is initialized
  useEffect(() => {
    setIsLoading(false);
  }, [currentResumeData, savedResumes]);
  
  /**
   * Update specific parts of the resume data
   * 
   * @param {Object} updates - Object containing the updated fields
   */
  const updateResumeData = (updates) => {
    setCurrentResumeData(prevData => ({
      ...prevData,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  };
  
  /**
   * Set the entire resume data object
   * 
   * @param {Object} data - Complete resume data object
   */
  const setResumeData = (data) => {
    setCurrentResumeData({
      ...data,
      updatedAt: new Date().toISOString()
    });
  };
  
  /**
   * Clear the resume data (reset to initial state)
   */
  const clearResumeData = () => {
    setCurrentResumeData({
      ...initialResumeData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };
  
  /**
   * Save current resume to saved resumes list
   */
  const saveResume = () => {
    // Check if we're updating an existing resume or adding a new one
    const resumeExists = savedResumes.some(resume => resume.id === currentResumeData.id);
    
    if (resumeExists) {
      // Update existing resume
      setSavedResumes(prevResumes => 
        prevResumes.map(resume => 
          resume.id === currentResumeData.id 
            ? { ...currentResumeData, updatedAt: new Date().toISOString() } 
            : resume
        )
      );
    } else {
      // Add new resume
      setSavedResumes(prevResumes => [
        ...prevResumes,
        { ...currentResumeData, updatedAt: new Date().toISOString() }
      ]);
    }
  };
  
  /**
   * Delete a resume from saved resumes
   * 
   * @param {string} id - ID of the resume to delete
   */
  const deleteResume = (id) => {
    setSavedResumes(prevResumes => prevResumes.filter(resume => resume.id !== id));
  };
  
  /**
   * Load a saved resume into the current editing state
   * 
   * @param {string} id - ID of the resume to load
   */
  const loadResume = (id) => {
    const resume = savedResumes.find(resume => resume.id === id);
    if (resume) {
      setCurrentResumeData({
        ...resume,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  /**
   * Start a new resume from scratch
   */
  const startNewResume = () => {
    clearResumeData();
  };
  
  return (
    <ResumeContext.Provider
      value={{
        resumeData: currentResumeData,
        savedResumes,
        isLoading,
        updateResumeData,
        setResumeData,
        clearResumeData,
        saveResume,
        deleteResume,
        loadResume,
        startNewResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;