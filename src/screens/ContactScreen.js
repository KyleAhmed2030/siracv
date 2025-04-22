import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';

const ContactScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError(t('Please fill in all required fields.'));
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t('Please enter a valid email address.'));
      return;
    }
    
    // In a real application, this would send the form data to a server
    // Since we don't have a backend, we'll show a success message
    // and save the contact request to localStorage for demonstration
    try {
      // Get existing contact requests or initialize empty array
      const existingRequests = JSON.parse(localStorage.getItem('contact-requests') || '[]');
      
      // Add new request with timestamp
      const newRequest = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      // Save updated array back to localStorage
      localStorage.setItem('contact-requests', JSON.stringify([...existingRequests, newRequest]));
      
      // Show success message
      setSubmitted(true);
      setError('');
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setError(t('There was an error saving your request. Please try again.'));
      console.error('Contact form error:', error);
    }
  };
  
  return (
    <div className="contact-screen">
      
      <div className="container" style={{ 
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: theme === 'dark' ? 'var(--dark-element-bg)' : 'var(--white)',
        borderRadius: '8px',
        boxShadow: 'var(--box-shadow)',
        color: theme === 'dark' ? 'var(--dark-text)' : 'var(--gray-900)'
      }}>
        <h1 style={{ 
          borderBottom: `1px solid ${theme === 'dark' ? 'var(--gray-700)' : 'var(--gray-300)'}`,
          paddingBottom: '10px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>{t('Contact Us')}</h1>
        
        {submitted ? (
          <div className="success-message" style={{
            backgroundColor: theme === 'dark' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(46, 204, 113, 0.1)',
            border: '1px solid #2ecc71',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2ecc71', marginBottom: '10px' }}>{t('Thank You!')}</h3>
            <p>{t('Your message has been received. We will get back to you as soon as possible.')}</p>
            <Button 
              variant="primary" 
              onClick={() => setSubmitted(false)}
              style={{ marginTop: '20px' }}
            >
              {t('Send Another Message')}
            </Button>
          </div>
        ) : (
          <div className="contact-form-container">
            <p style={{ marginBottom: '20px' }}>
              {t('Have a question, feedback, or need assistance? Fill out the form below and we\'ll get back to you as soon as possible.')}
            </p>
            
            {error && (
              <div style={{
                backgroundColor: theme === 'dark' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(231, 76, 60, 0.1)',
                border: '1px solid #e74c3c',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '20px',
                color: '#e74c3c'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} id="contact-form">
              <div style={{ marginBottom: '15px' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '5px',
                    fontWeight: '500'
                  }}
                >
                  {t('Your Name')}*
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('Enter your name')}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '5px',
                    fontWeight: '500'
                  }}
                >
                  {t('Email Address')}*
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('Enter your email')}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label 
                  htmlFor="subject" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '5px',
                    fontWeight: '500'
                  }}
                >
                  {t('Subject')}
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('What is this regarding?')}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label 
                  htmlFor="message" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '5px',
                    fontWeight: '500'
                  }}
                >
                  {t('Message')}*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('Enter your message')}
                  rows={6}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
              >
                {t('Send Message')}
              </button>
            </form>
            
            <div style={{ 
              marginTop: '30px', 
              padding: '20px 0 0', 
              borderTop: `1px solid ${theme === 'dark' ? 'var(--gray-700)' : 'var(--gray-300)'}`,
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '10px' }}>{t('Other Ways to Reach Us')}</h3>
              <p style={{ marginBottom: '5px' }}>
                <strong>{t('Email')}: </strong>
                <a 
                  href="mailto:siracv95@gmail.com" 
                  style={{ 
                    color: 'var(--primary-color)', 
                    textDecoration: 'none'
                  }}
                >
                  siracv95@gmail.com
                </a>
              </p>
              <p>
                <strong>{t('Response Time')}: </strong>
                {t('Usually within 24-48 hours')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactScreen;