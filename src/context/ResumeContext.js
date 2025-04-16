import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from '../hooks/useStorage';

// Resume storage keys
const CURRENT_RESUME_KEY = 'current-resume';
const SAVED_RESUMES_KEY = 'saved-resumes';

// Color palettes configuration
export const COLOR_PALETTES = {
  primary: [
    { id: 'blue', name: 'Blue', color: '#3498db' },
    { id: 'green', name: 'Green', color: '#2ecc71' },
    { id: 'purple', name: 'Purple', color: '#9b59b6' },
    { id: 'red', name: 'Red', color: '#e74c3c' },
    { id: 'orange', name: 'Orange', color: '#f39c12' },
    { id: 'teal', name: 'Teal', color: '#1abc9c' },
    { id: 'navy', name: 'Navy', color: '#34495e' },
    { id: 'gray', name: 'Gray', color: '#7f8c8d' }
  ],
  accent: [
    { id: 'blue', name: 'Blue', color: '#3498db' },
    { id: 'green', name: 'Green', color: '#2ecc71' },
    { id: 'purple', name: 'Purple', color: '#9b59b6' },
    { id: 'red', name: 'Red', color: '#e74c3c' },
    { id: 'orange', name: 'Orange', color: '#f39c12' },
    { id: 'teal', name: 'Teal', color: '#1abc9c' },
    { id: 'navy', name: 'Navy', color: '#34495e' },
    { id: 'gray', name: 'Gray', color: '#7f8c8d' }
  ]
};

// Initial resume data structure
const initialResumeData = {
  id: '',
  template: 'template1',
  colorScheme: {
    primary: 'blue',
    accent: 'teal'
  },
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
    { 
      ...initialResumeData, 
      id: uuidv4(), 
      createdAt: new Date().toISOString(),
      // Ensure color scheme exists even for existing data
      colorScheme: initialResumeData.colorScheme
    }
  );
  
  // All saved resumes
  const [savedResumes, setSavedResumes] = useStorage(SAVED_RESUMES_KEY, []);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Set loading to false once mounted
  useEffect(() => {
    setIsLoading(false);
    
    // Ensure color scheme exists in current resume data
    if (!currentResumeData.colorScheme) {
      setCurrentResumeData(prevData => ({
        ...prevData,
        colorScheme: initialResumeData.colorScheme,
        updatedAt: new Date().toISOString()
      }));
    }
  }, []);
  
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
    // Ensure color scheme exists
    const finalData = data.colorScheme ? data : {
      ...data,
      colorScheme: initialResumeData.colorScheme
    };
    
    setCurrentResumeData({
      ...finalData,
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
   * Update the color scheme of the resume
   * 
   * @param {string} colorType - The type of color to update ('primary' or 'accent')
   * @param {string} colorId - ID of the selected color
   */
  const updateColorScheme = (colorType, colorId) => {
    setCurrentResumeData(prevData => ({
      ...prevData,
      colorScheme: {
        ...(prevData.colorScheme || initialResumeData.colorScheme),
        [colorType]: colorId
      },
      updatedAt: new Date().toISOString()
    }));
  };
  
  /**
   * Get the actual color value from a color ID
   * 
   * @param {string} colorType - The type of color ('primary' or 'accent')
   * @param {string} colorId - ID of the color
   * @returns {string} The hex color value
   */
  const getColorValue = (colorType, colorId) => {
    const palette = COLOR_PALETTES[colorType] || [];
    const color = palette.find(c => c.id === colorId);
    return color ? color.color : COLOR_PALETTES[colorType][0].color;
  };
  
  /**
   * Save current resume to saved resumes list
   */
  const saveResume = () => {
    // Ensure color scheme exists
    const resumeToSave = {
      ...currentResumeData,
      colorScheme: currentResumeData.colorScheme || initialResumeData.colorScheme,
      updatedAt: new Date().toISOString()
    };
    
    // Check if we're updating an existing resume or adding a new one
    const resumeExists = savedResumes.some(resume => resume.id === resumeToSave.id);
    
    if (resumeExists) {
      // Update existing resume
      setSavedResumes(prevResumes => 
        prevResumes.map(resume => 
          resume.id === resumeToSave.id ? resumeToSave : resume
        )
      );
    } else {
      // Add new resume
      setSavedResumes(prevResumes => [
        ...prevResumes,
        resumeToSave
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
      // Ensure color scheme exists
      const resumeToLoad = {
        ...resume,
        colorScheme: resume.colorScheme || initialResumeData.colorScheme,
        updatedAt: new Date().toISOString()
      };
      
      setCurrentResumeData(resumeToLoad);
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
        colorPalettes: COLOR_PALETTES,
        updateResumeData,
        setResumeData,
        clearResumeData,
        updateColorScheme,
        getColorValue,
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