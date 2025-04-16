import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Input from './Input';

const Auth = ({ onLogin, isAuthenticated }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = t('auth.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.passwordTooShort');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password } 
        : { name: formData.name, email: formData.email, password: formData.password };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      if (onLogin) {
        onLogin(data);
      }
      
      // Redirect
      navigate(redirectPath);
      
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">
          {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
        </h2>
        
        <p className="auth-subtitle">
          {isLogin ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
        </p>
        
        {message && (
          <div className="auth-message error">
            {message}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <Input
                id="name"
                name="name"
                label={t('auth.nameLabel')}
                value={formData.name}
                onChange={handleChange}
                placeholder={t('auth.namePlaceholder')}
                error={errors.name}
                icon="user"
              />
            </div>
          )}
          
          <div className="form-group">
            <Input
              id="email"
              name="email"
              type="email"
              label={t('auth.emailLabel')}
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth.emailPlaceholder')}
              error={errors.email}
              icon="envelope"
            />
          </div>
          
          <div className="form-group">
            <Input
              id="password"
              name="password"
              type="password"
              label={t('auth.passwordLabel')}
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.passwordPlaceholder')}
              error={errors.password}
              icon="lock"
            />
          </div>
          
          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {isLogin ? t('auth.loginButton') : t('auth.registerButton')}
            </Button>
          </div>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            <button
              type="button"
              className="auth-toggle-button"
              onClick={toggleAuthMode}
            >
              {isLogin ? t('auth.registerLink') : t('auth.loginLink')}
            </button>
          </p>
        </div>
      </div>
      
      <div className="auth-hero">
        <div className="auth-hero-content">
          <h1 className="auth-hero-title">{t('auth.heroTitle')}</h1>
          <p className="auth-hero-description">{t('auth.heroDescription')}</p>
          <div className="auth-hero-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <div className="auth-feature-text">{t('auth.feature1')}</div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <div className="auth-feature-text">{t('auth.feature2')}</div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <div className="auth-feature-text">{t('auth.feature3')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;