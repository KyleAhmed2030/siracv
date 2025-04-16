import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';

const BasicInfoForm = () => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [formData, setFormData] = useState(resumeData.basicInfo || {});
  
  // Update component state when resumeData changes
  useEffect(() => {
    setFormData(resumeData.basicInfo || {});
  }, [resumeData.basicInfo]);
  
  // Update context when form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      updateResumeData({ basicInfo: newData });
      return newData;
    });
  };
  
  return (
    <div className="form-section">
      <h3>{t('Personal Information')}</h3>
      
      <div className="form-row">
        <div className="form-group half">
          <Input
            label={t('First Name')}
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            placeholder={t('Enter your first name')}
            required
          />
        </div>
        <div className="form-group half">
          <Input
            label={t('Last Name')}
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            placeholder={t('Enter your last name')}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <Input
          label={t('Job Title')}
          name="jobTitle"
          value={formData.jobTitle || ''}
          onChange={handleChange}
          placeholder={t('e.g. Software Engineer')}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <Input
            label={t('Email')}
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder={t('Enter your email')}
          />
        </div>
        <div className="form-group half">
          <Input
            label={t('Phone')}
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder={t('Enter your phone number')}
          />
        </div>
      </div>
      
      <div className="form-group">
        <Input
          label={t('Address')}
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder={t('Enter your street address')}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <Input
            label={t('City')}
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder={t('Enter your city')}
          />
        </div>
        <div className="form-group quarter">
          <Input
            label={t('State')}
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            placeholder={t('State/Province')}
          />
        </div>
        <div className="form-group quarter">
          <Input
            label={t('Zip Code')}
            name="zipCode"
            value={formData.zipCode || ''}
            onChange={handleChange}
            placeholder={t('Zip/Postal Code')}
          />
        </div>
      </div>
      
      <div className="form-group">
        <Input
          label={t('Country')}
          name="country"
          value={formData.country || ''}
          onChange={handleChange}
          placeholder={t('Enter your country')}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <Input
            label={t('Website')}
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder={t('e.g. portfolio or personal website')}
          />
        </div>
        <div className="form-group half">
          <Input
            label={t('LinkedIn')}
            name="linkedIn"
            value={formData.linkedIn || ''}
            onChange={handleChange}
            placeholder={t('LinkedIn profile URL')}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;