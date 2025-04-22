import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

const TermsOfServiceScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className="terms-of-service-screen">
      
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
        }}>{t('Terms of Service')}</h1>
        
        <div className="terms-content">
          <p className="last-updated">{t('Last Updated')}: April 21, 2025</p>
          
          <section className="terms-section">
            <h2>{t('Agreement to Terms')}</h2>
            <p>
              {t('These Terms of Service govern your use of the Sira Resume Builder website and service operated by Sira Resume Builder. By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Intellectual Property')}</h2>
            <p>
              {t('The Service and its original content, features, and functionality are and will remain the exclusive property of Sira Resume Builder and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sira Resume Builder.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('User Content')}</h2>
            <p>
              {t('Our Service allows you to create, save, and export resumes containing your personal information. You retain all rights to your personal content. You are responsible for the content you create using our service.')}
            </p>
            <p>
              {t('You agree that you will not use our service to create content that:')}
            </p>
            <ul>
              <li>{t('Violates the rights of others, including intellectual property rights and privacy rights')}</li>
              <li>{t('Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable')}</li>
              <li>{t('Impersonates any person or entity or falsely states or otherwise misrepresents your affiliation with a person or entity')}</li>
              <li>{t('Contains software viruses or any other computer code designed to interrupt, destroy, or limit the functionality of any computer software or hardware')}</li>
              <li>{t('Interferes with or disrupts the Service or servers or networks connected to the Service')}</li>
            </ul>
          </section>
          
          <section className="terms-section">
            <h2>{t('Use of Service')}</h2>
            <p>
              {t('Sira Resume Builder grants you a personal, non-transferable, non-exclusive, revocable license to use the Services solely for your own personal, non-commercial purposes, subject to these Terms of Service.')}
            </p>
            <p>
              {t('You agree not to:')}
            </p>
            <ul>
              <li>{t('Use the Service in any way that could disable, overburden, damage, or impair the Service or interfere with any other party\'s use of the Service')}</li>
              <li>{t('Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service')}</li>
              <li>{t('Use any manual process to monitor or copy any of the material on the Service or for any other unauthorized purpose without our prior written consent')}</li>
              <li>{t('Use any device, software, or routine that interferes with the proper working of the Service')}</li>
              <li>{t('Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful')}</li>
              <li>{t('Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service')}</li>
            </ul>
          </section>
          
          <section className="terms-section">
            <h2>{t('User Accounts')}</h2>
            <p>
              {t('Our service currently stores your resume data locally on your device using browser localStorage. No account creation is required. However, please note that localStorage can be cleared by clearing your browser data, which would result in the loss of your saved resumes.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Free and Paid Services')}</h2>
            <p>
              {t('Sira Resume Builder currently offers free resume building services. We may introduce paid premium features in the future. If premium features are introduced, they will be clearly marked, and you will be informed before any charges are applied.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Advertisements')}</h2>
            <p>
              {t('The Service may contain advertisements. The manner, mode, and extent of advertising on the Service are subject to change without specific notice to you. In consideration for your use of the Service, you agree that Sira Resume Builder and its third-party providers and partners may place such advertising on the Service.')}
            </p>
            <p>
              {t('We use Google AdSense to display advertisements on our Service. Google AdSense uses cookies to serve ads based on a user\'s prior visits to our website or other websites. Users may opt-out of personalized advertising by visiting Google\'s Ads Settings.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Links To Other Web Sites')}</h2>
            <p>
              {t('Our Service may contain links to third-party websites or services that are not owned or controlled by Sira Resume Builder. Sira Resume Builder has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Sira Resume Builder shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Termination')}</h2>
            <p>
              {t('We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Limitation of Liability')}</h2>
            <p>
              {t('In no event shall Sira Resume Builder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service; any conduct or content of any third party on the Service; any content obtained from the Service; unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Disclaimer')}</h2>
            <p>
              {t('Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Governing Law')}</h2>
            <p>
              {t('These Terms shall be governed and construed in accordance with the laws of the country of operation, without regard to its conflict of law provisions.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Changes')}</h2>
            <p>
              {t('We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.')}
            </p>
          </section>
          
          <section className="terms-section">
            <h2>{t('Contact Us')}</h2>
            <p>
              {t('If you have any questions about these Terms, please contact us at:')}
            </p>
            <p>
              <strong>{t('Email')}: </strong>siracv95@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceScreen;