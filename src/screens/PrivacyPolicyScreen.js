import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header';

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className="privacy-policy-screen">
      <Header />
      
      <div className="container" style={{ 
        maxWidth: '800px',
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
          marginBottom: '30px'
        }}>{t('Privacy Policy')}</h1>
        
        <div className="privacy-content">
          <p className="last-updated">{t('Last Updated')}: April 21, 2025</p>
          
          <section className="policy-section">
            <h2>{t('Introduction')}</h2>
            <p>
              {t('Welcome to Sira Resume Builder. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our resume building services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Information We Collect')}</h2>
            <p>
              {t('We may collect information about you in a variety of ways. The information we may collect via the Website includes:')}
            </p>
            <h3>{t('Personal Data')}</h3>
            <p>
              {t('While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:')}
            </p>
            <ul>
              <li>{t('Name and contact information (provided when creating a resume)')}</li>
              <li>{t('Educational history (provided when creating a resume)')}</li>
              <li>{t('Work experience (provided when creating a resume)')}</li>
              <li>{t('Skills (provided when creating a resume)')}</li>
            </ul>
            <h3>{t('Usage Data')}</h3>
            <p>
              {t('We may also collect information on how the service is accessed and used. This data may include:')}
            </p>
            <ul>
              <li>{t('Your computer\'s Internet Protocol address (e.g. IP address)')}</li>
              <li>{t('Browser type and version')}</li>
              <li>{t('The pages of our service that you visit')}</li>
              <li>{t('The time and date of your visit')}</li>
              <li>{t('The time spent on those pages')}</li>
              <li>{t('Other diagnostic data')}</li>
            </ul>
          </section>
          
          <section className="policy-section">
            <h2>{t('Use of Cookies and Similar Technologies')}</h2>
            <p>
              {t('Our website uses cookies to enhance your experience and analyze our traffic. Cookies are small files that a site or its service provider transfers to your computer\'s hard drive through your web browser that enables the site or service provider\'s systems to recognize your browser and capture and remember certain information.')}
            </p>
            <h3>{t('Types of Cookies We Use')}</h3>
            <ul>
              <li><strong>{t('Essential Cookies:')}</strong> {t('Required for the operation of our website.')}</li>
              <li><strong>{t('Analytical/Performance Cookies:')}</strong> {t('Allow us to recognize and count the number of visitors and see how visitors move around our website.')}</li>
              <li><strong>{t('Functionality Cookies:')}</strong> {t('Enable the website to provide enhanced functionality and personalization.')}</li>
              <li><strong>{t('Targeting Cookies:')}</strong> {t('Record your visit to our website, the pages you have visited, and the links you have followed.')}</li>
            </ul>
            <h3>{t('Third-Party Cookies')}</h3>
            <p>
              {t('In addition to our own cookies, we may also use various third-party cookies, including from Google AdSense, to report usage statistics of the service and deliver advertisements on and through the service.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Google AdSense')}</h2>
            <p>
              {t('We use Google AdSense Advertising on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google\'s use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.')}
            </p>
            <p>
              {t('Google AdSense may collect and use data for advertising personalization. This includes, but is not limited to:')}
            </p>
            <ul>
              <li>{t('Information about your device and browser')}</li>
              <li>{t('IP address')}</li>
              <li>{t('Websites you have visited')}</li>
              <li>{t('Geographic location')}</li>
            </ul>
          </section>
          
          <section className="policy-section">
            <h2>{t('How We Use Your Information')}</h2>
            <p>
              {t('We may use the information we collect from you in the following ways:')}
            </p>
            <ul>
              <li>{t('To operate and maintain our website')}</li>
              <li>{t('To improve our website in order to better serve you')}</li>
              <li>{t('To understand and analyze how you use our website')}</li>
              <li>{t('To develop new products, services, features, and functionality')}</li>
              <li>{t('To process your resume creation requests')}</li>
              <li>{t('To communicate with you about our services')}</li>
              <li>{t('To display personalized advertisements')}</li>
            </ul>
          </section>
          
          <section className="policy-section">
            <h2>{t('Sharing Your Information')}</h2>
            <p>
              {t('We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Data Storage')}</h2>
            <p>
              {t('Your resume data is stored locally on your device using browser\'s localStorage. We do not store your resume data on our servers. However, please note that localStorage has limitations and can be cleared by clearing your browser\'s data.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Your Rights')}</h2>
            <p>
              {t('Depending on your location, you may have the following rights regarding your personal data:')}
            </p>
            <ul>
              <li>{t('Right to access - the right to request copies of your personal information.')}</li>
              <li>{t('Right to rectification - the right to request that we correct any information you believe is inaccurate.')}</li>
              <li>{t('Right to erasure - the right to request that we erase your personal information.')}</li>
              <li>{t('Right to restrict processing - the right to request that we restrict the processing of your personal information.')}</li>
              <li>{t('Right to data portability - the right to request that we transfer the data we have collected to another organization, or directly to you.')}</li>
            </ul>
          </section>
          
          <section className="policy-section">
            <h2>{t('Children\'s Information')}</h2>
            <p>
              {t('Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Changes to This Privacy Policy')}</h2>
            <p>
              {t('We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.')}
            </p>
          </section>
          
          <section className="policy-section">
            <h2>{t('Contact Us')}</h2>
            <p>
              {t('If you have any questions about this Privacy Policy, please contact us at:')}
            </p>
            <p>
              <strong>{t('Email')}: </strong>contact@siraresume.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyScreen;