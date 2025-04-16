import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import Button from './Button';
import { isValidEmail } from '../utils/helpers';

const Auth = ({ onLogin }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = t('Email is required');
    } else if (!isValidEmail(formData.email)) {
      errors.email = t('Please enter a valid email address');
    }
    
    if (!formData.password) {
      errors.password = t('Password is required');
    } else if (formData.password.length < 6) {
      errors.password = t('Password must be at least 6 characters');
    }
    
    if (!isLogin && !formData.name) {
      errors.name = t('Name is required');
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // For registration, include all fields
      // For login, just email and password
      const data = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;
      
      await onLogin(data);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setValidationErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1 className="auth-title">{isLogin ? t('Welcome back') : t('Create your free account')}</h1>
        <p className="auth-subtitle">
          {isLogin 
            ? t('Sign in to download your resume and save your progress')
            : t('Sign up to download your resume and save your progress - 100% free!')}
        </p>
        
        {error && (
          <div className="auth-message error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <Input
                id="name"
                name="name"
                label={t('Full Name')}
                placeholder={t('Enter your full name')}
                value={formData.name}
                onChange={handleChange}
                error={validationErrors.name}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <Input
              id="email"
              name="email"
              type="email"
              label={t('Email Address')}
              placeholder={t('Enter your email address')}
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
              required
            />
          </div>
          
          <div className="form-group">
            <Input
              id="password"
              name="password"
              type="password"
              label={t('Password')}
              placeholder={t('Create a password')}
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
              required
            />
          </div>
          
          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              loading={loading}
            >
              {isLogin ? t('Login') : t('Create Free Account')}
            </Button>
          </div>
        </form>
        
        <div className="auth-toggle">
          {isLogin ? t('Don\'t have an account?') : t('Already have an account?')}
          <button
            type="button"
            className="auth-toggle-button"
            onClick={toggleAuthMode}
            disabled={loading}
          >
            {isLogin ? t('Sign up for free') : t('Login')}
          </button>
        </div>
      </div>
      
      <div className="auth-hero">
        <h2 className="auth-hero-title">{t('Create professional resumes in minutes with Sira')}</h2>
        <p className="auth-hero-description">
          {t('Our easy-to-use resume builder helps you create a personalized, professional resume that will impress employers.')}
        </p>
        
        <div className="auth-hero-features">
          <div className="auth-feature">
            <div className="auth-feature-icon">✓</div>
            <div className="auth-feature-text">{t('Professional templates designed by experts')}</div>
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon">✓</div>
            <div className="auth-feature-text">{t('Easy to customize and personalize')}</div>
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon">✓</div>
            <div className="auth-feature-text">{t('Download your resume as PDF anytime')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;