import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { useResume } from '../hooks/useResume';
import ResumePreview from '../components/ResumePreview';
import Button from '../components/Button';
import PdfGenerator from '../components/PdfGenerator';

const PreviewScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { resumeData, saveResume } = useResume();
  const previewRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Handle save resume
  const handleSaveResume = () => {
    saveResume();
    setSaveStatus('success');
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };
  
  // Handle download PDF
  const handleDownloadPdf = async () => {
    try {
      setGenerating(true);
      
      // Generate file name based on user data
      const firstName = resumeData.basicInfo?.firstName || '';
      const lastName = resumeData.basicInfo?.lastName || '';
      const fileName = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, '_');
      
      // Generate PDF
      const pdfBlob = await PdfGenerator.generatePdf(resumeData);
      PdfGenerator.downloadPdf(pdfBlob, fileName);
      
      setGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setGenerating(false);
      alert(t('Error generating PDF'));
    }
  };
  
  // Handle back to edit
  const handleBackToEdit = () => {
    navigate('/builder/summary');
  };
  
  return (
    <div className={`preview-screen ${theme}`}>
      <div className="preview-header">
        <h2>{t('Resume Preview')}</h2>
        <p>{t('This is how your resume will look when downloaded.')}</p>
      </div>
      
      <div className="preview-container" ref={previewRef}>
        <ResumePreview resumeData={resumeData} />
      </div>
      
      <div className="preview-actions">
        <Button 
          variant="secondary" 
          onClick={handleBackToEdit}
          disabled={generating}
        >
          {t('Back to Edit')}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleSaveResume}
          disabled={generating || saveStatus === 'success'}
        >
          {saveStatus === 'success' ? t('PDF Generated Successfully') : t('Save Resume')}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleDownloadPdf}
          disabled={generating}
        >
          {generating ? t('Generating PDF...') : t('Download PDF')}
        </Button>
      </div>
    </div>
  );
};

export default PreviewScreen;