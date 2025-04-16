import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import Button from '../components/Button';
import ResumePreview from '../components/ResumePreview';

const PreviewScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, saveResume } = useResume();
  const [downloading, setDownloading] = useState(false);
  
  // Handle back to editor
  const handleBack = () => {
    navigate('/builder/summary');
  };
  
  // Handle save resume
  const handleSave = () => {
    saveResume();
    // Navigate to saved resumes
    navigate('/saved-resumes');
  };
  
  // Handle PDF download
  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      // For now we'll just simulate PDF download
      // This will be replaced with actual PDF generation
      setTimeout(() => {
        alert('PDF download functionality will be implemented soon!');
        setDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloading(false);
    }
  };
  
  return (
    <div className="preview-screen">
      <h2>{t('Resume Preview')}</h2>
      <p>{t('This is how your resume will look when downloaded.')}</p>
      
      <div className="preview-container">
        <ResumePreview resumeData={resumeData} />
      </div>
      
      <div className="button-group">
        <Button 
          variant="secondary" 
          onClick={handleBack}
        >
          {t('Back to Edit')}
        </Button>
        
        <div className="button-group-right">
          <Button 
            variant="secondary" 
            onClick={handleSave}
          >
            {t('Save Resume')}
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleDownload}
            loading={downloading}
          >
            {t('Download PDF')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;