import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Auth from '../components/Auth';
import { useAuth } from '../context/AuthContext';

const AuthScreen = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login, register, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const redirectPath = location.state?.from || '/';
  
  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, loading, navigate, redirectPath]);
  
  const handleAuth = async (data) => {
    try {
      if (data.name) {
        // Register
        await register(data);
      } else {
        // Login
        await login(data);
      }
      // Redirect will happen automatically from the useEffect above
    } catch (error) {
      console.error('Auth error:', error);
      // Error handling is done in the Auth component
    }
  };
  
  return (
    <div className="auth-screen">
      <div className="container">
        <Auth 
          onLogin={handleAuth} 
          isAuthenticated={isAuthenticated} 
        />
      </div>
    </div>
  );
};

export default AuthScreen;