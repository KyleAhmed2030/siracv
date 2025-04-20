import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { isValidEmail } from '../utils/helpers';

const BasicInfoForm = ({ onValidationChange }) => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const { basicInfo = {} } = resumeData;
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  // Required fields for this form
  const requiredFields = ['firstName', 'lastName', 'email'];
  
  // Handle input change
  const handleChange = (field, value) => {
    updateResumeData({
      basicInfo: {
        ...basicInfo,
        [field]: value
      }
    });
    
    // Mark field as touched
    if (!touched[field]) {
      setTouched({
        ...touched,
        [field]: true
      });
    }
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };
  
  // Field blur handler
  const handleBlur = (field, value) => {
    // Mark field as touched
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Validate field
    validateField(field, value);
  };
  
  // Validate individual field
  const validateField = (field, value) => {
    let error = null;
    
    // Check if required field is empty
    if (requiredFields.includes(field) && (!value || value.trim() === '')) {
      error = t('This field is required');
    }
    
    // Email validation
    if (field === 'email' && value && !isValidEmail(value)) {
      error = t('Please enter a valid email address');
    }
    
    // Website validation
    if (field === 'website' && value && !value.startsWith('http')) {
      error = t('Please enter a valid URL starting with http:// or https://');
    }
    
    setErrors({
      ...errors,
      [field]: error
    });
    
    return !error;
  };
  
  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;
    
    // Validate required fields
    requiredFields.forEach(field => {
      const value = basicInfo[field] || '';
      const fieldIsValid = validateField(field, value);
      if (!fieldIsValid) {
        formIsValid = false;
        newErrors[field] = requiredFields.includes(field) && value.trim() === '' 
          ? t('This field is required') 
          : errors[field];
      }
    });
    
    // Validate email if it has a value
    if (basicInfo.email && !isValidEmail(basicInfo.email)) {
      formIsValid = false;
      newErrors.email = t('Please enter a valid email address');
    }
    
    // Validate website if it has a value
    if (basicInfo.website && !basicInfo.website.startsWith('http')) {
      formIsValid = false;
      newErrors.website = t('Please enter a valid URL starting with http:// or https://');
    }
    
    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };
  
  // Update parent component when validation status changes
  useEffect(() => {
    const formIsValid = validateForm();
    if (onValidationChange) {
      onValidationChange(formIsValid);
    }
  }, [basicInfo, onValidationChange]);
  
  return (
    <div className="form-section">
      <div className="form-row">
        <Input
          label={t('First Name')}
          value={basicInfo.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          onBlur={(e) => handleBlur('firstName', e.target.value)}
          placeholder={t('Enter your first name')}
          error={errors.firstName}
          required
        />
        
        <Input
          label={t('Last Name')}
          value={basicInfo.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          onBlur={(e) => handleBlur('lastName', e.target.value)}
          placeholder={t('Enter your last name')}
          error={errors.lastName}
          required
        />
      </div>
      
      <Input
        label={t('Job Title')}
        value={basicInfo.jobTitle || ''}
        onChange={(e) => handleChange('jobTitle', e.target.value)}
        placeholder={t('e.g. Software Engineer')}
      />
      
      <Input
        label={t('Email')}
        type="email"
        value={basicInfo.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={(e) => handleBlur('email', e.target.value)}
        placeholder={t('Enter your email')}
        error={errors.email}
        required
      />
      
      <Input
        label={t('Phone')}
        type="tel"
        value={basicInfo.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder={t('Enter your phone number')}
      />
      
      <Input
        label={t('Location')}
        value={basicInfo.location || ''}
        onChange={(e) => handleChange('location', e.target.value)}
        placeholder={t('City, Country')}
      />
      
      <Input
        label={t('Website')}
        type="url"
        value={basicInfo.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
        onBlur={(e) => handleBlur('website', e.target.value)}
        placeholder={t('e.g. portfolio or personal website')}
        error={errors.website}
      />
      
      <Input
        label={t('LinkedIn')}
        value={basicInfo.linkedIn || ''}
        onChange={(e) => handleChange('linkedIn', e.target.value)}
        placeholder={t('LinkedIn profile URL')}
      />
    </div>
  );
};

export default BasicInfoForm;