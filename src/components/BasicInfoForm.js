import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { isValidEmail } from '../utils/helpers';

const BasicInfoForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const { basicInfo = {} } = resumeData;
  
  const [errors, setErrors] = useState({});
  
  // Handle input change
  const handleChange = (field, value) => {
    updateResumeData({
      basicInfo: {
        ...basicInfo,
        [field]: value
      }
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };
  
  // Validate email
  const validateEmail = (email) => {
    if (email && !isValidEmail(email)) {
      setErrors({
        ...errors,
        email: t('Please enter a valid email address')
      });
    }
  };
  
  return (
    <div className="form-section">
      <div className="form-row">
        <Input
          label={t('First Name')}
          value={basicInfo.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder={t('Enter your first name')}
          required
        />
        
        <Input
          label={t('Last Name')}
          value={basicInfo.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder={t('Enter your last name')}
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
        onBlur={(e) => validateEmail(e.target.value)}
        placeholder={t('Enter your email')}
        error={errors.email}
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
        placeholder={t('e.g. portfolio or personal website')}
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