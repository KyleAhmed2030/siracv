import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Print from 'expo-print';

/**
 * Utility class to handle PDF generation from resume data
 */
class PdfGenerator {
  /**
   * Generates a PDF from resume data
   * @param {Object} data Resume data to generate PDF from
   * @returns {Promise<string>} URI to the generated PDF file
   */
  static async generatePdf(data) {
    try {
      // Generate HTML content based on the selected template
      const htmlContent = await this.getHtmlFromTemplate(data);
      
      // Generate PDF from HTML
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });
      
      // On iOS we need to copy the file to a more permanent location
      if (Platform.OS === 'ios') {
        const fileName = `${data.fullName.replace(/\s+/g, '_')}_Resume_${Date.now()}.pdf`;
        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
        
        await FileSystem.copyAsync({
          from: uri,
          to: destinationUri,
        });
        
        return destinationUri;
      }
      
      return uri;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
  
  /**
   * Generates HTML content for the PDF based on the resume template
   * @param {Object} data Resume data
   * @returns {Promise<string>} HTML content
   */
  static async getHtmlFromTemplate(data) {
    // Common styles for all templates
    const baseStyles = `
      body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        color: #333;
        font-size: 12px;
      }
      .page {
        padding: 30px;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 5px;
      }
      h2 {
        font-size: 18px;
        margin-bottom: 10px;
        color: #555;
      }
      h3 {
        font-size: 14px;
        margin-bottom: 5px;
      }
      p {
        margin: 0 0 8px 0;
      }
      .section {
        margin-bottom: 20px;
      }
      .section-title {
        font-size: 16px;
        text-transform: uppercase;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
        margin-bottom: 10px;
      }
      .item {
        margin-bottom: 15px;
      }
      .item-title {
        font-weight: bold;
      }
      .item-subtitle {
        font-style: italic;
      }
      .item-date {
        color: #777;
      }
      .skills-list {
        display: flex;
        flex-wrap: wrap;
      }
      .skill {
        background-color: #f0f0f0;
        padding: 5px 10px;
        border-radius: 15px;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `;
    
    let htmlContent = '';
    
    // Generate content based on template
    switch (data.template) {
      case 'template1':
        htmlContent = this.generateTemplate1Html(data);
        break;
      case 'template2':
        htmlContent = this.generateTemplate2Html(data);
        break;
      case 'template3':
        htmlContent = this.generateTemplate3Html(data);
        break;
      case 'template4':
        htmlContent = this.generateTemplate4Html(data);
        break;
      case 'template5':
        htmlContent = this.generateTemplate5Html(data);
        break;
      default:
        htmlContent = this.generateTemplate1Html(data);
    }
    
    // Full HTML structure with styles
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.fullName} - Resume</title>
          <style>
            ${baseStyles}
          </style>
        </head>
        <body>
          <div class="page">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;
  }
  
  /**
   * Generates HTML for Template 1 (Professional)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate1Html(data) {
    // Header with contact info
    const header = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1>${data.fullName || ''}</h1>
        <h2>${data.jobTitle || ''}</h2>
        <p>
          ${data.email ? `Email: ${data.email} | ` : ''}
          ${data.phone ? `Phone: ${data.phone} | ` : ''}
          ${data.location ? `Location: ${data.location}` : ''}
        </p>
        <p>
          ${data.linkedin ? `LinkedIn: ${data.linkedin}` : ''}
          ${data.website ? ` | Website: ${data.website}` : ''}
        </p>
      </div>
    `;
    
    // Summary section
    const summary = data.summary ? `
      <div class="section">
        <div class="section-title">Summary</div>
        <p>${data.summary}</p>
      </div>
    ` : '';
    
    // Work experience section
    let workExperience = '';
    if (data.workExperience && data.workExperience.length > 0) {
      let workItems = '';
      data.workExperience.forEach(work => {
        workItems += `
          <div class="item">
            <div class="item-title">${work.company}</div>
            <div class="item-subtitle">${work.position}</div>
            <div class="item-date">${work.startDate} - ${work.endDate || 'Present'}</div>
            ${work.location ? `<div>${work.location}</div>` : ''}
            ${work.description ? `<p>${work.description}</p>` : ''}
          </div>
        `;
      });
      
      workExperience = `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${workItems}
        </div>
      `;
    }
    
    // Education section
    let education = '';
    if (data.education && data.education.length > 0) {
      let educationItems = '';
      data.education.forEach(edu => {
        educationItems += `
          <div class="item">
            <div class="item-title">${edu.institution}</div>
            <div class="item-subtitle">${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
            <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
            ${edu.description ? `<p>${edu.description}</p>` : ''}
          </div>
        `;
      });
      
      education = `
        <div class="section">
          <div class="section-title">Education</div>
          ${educationItems}
        </div>
      `;
    }
    
    // Skills section
    let skills = '';
    if (data.skills && data.skills.length > 0) {
      let skillsItems = '';
      data.skills.forEach(skill => {
        skillsItems += `<span class="skill">${skill}</span>`;
      });
      
      skills = `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${skillsItems}
          </div>
        </div>
      `;
    }
    
    // Languages section
    let languages = '';
    if (data.languages && data.languages.length > 0) {
      let languageItems = '';
      data.languages.forEach(lang => {
        languageItems += `
          <div style="margin-bottom: 5px;">
            <span style="font-weight: bold;">${lang.name}</span> - ${lang.proficiency}
          </div>
        `;
      });
      
      languages = `
        <div class="section">
          <div class="section-title">Languages</div>
          ${languageItems}
        </div>
      `;
    }
    
    // Combine all sections
    return `
      ${header}
      ${summary}
      ${workExperience}
      ${education}
      ${skills}
      ${languages}
    `;
  }
  
  /**
   * Generates HTML for Template 2 (Creative)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate2Html(data) {
    // Additional styles for template 2
    const template2Styles = `
      <style>
        .creative-container {
          display: flex;
        }
        
        .sidebar {
          width: 30%;
          background-color: #f0f0f0;
          padding: 20px;
        }
        
        .main-content {
          width: 70%;
          padding: 20px;
        }
        
        .name {
          font-size: 24px;
          color: #333;
          margin-bottom: 5px;
        }
        
        .job-title {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
        
        .contact-item {
          margin-bottom: 8px;
        }
        
        .section-header {
          font-size: 18px;
          color: #333;
          margin-top: 20px;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 2px solid #ddd;
        }
      </style>
    `;
    
    // Sidebar with contact info
    const sidebar = `
      <div class="sidebar">
        <div class="name">${data.fullName || ''}</div>
        <div class="job-title">${data.jobTitle || ''}</div>
        
        <div class="section-header">Contact</div>
        ${data.email ? `<div class="contact-item">Email: ${data.email}</div>` : ''}
        ${data.phone ? `<div class="contact-item">Phone: ${data.phone}</div>` : ''}
        ${data.location ? `<div class="contact-item">Location: ${data.location}</div>` : ''}
        ${data.linkedin ? `<div class="contact-item">LinkedIn: ${data.linkedin}</div>` : ''}
        ${data.website ? `<div class="contact-item">Website: ${data.website}</div>` : ''}
        
        ${data.languages && data.languages.length > 0 ? `
          <div class="section-header">Languages</div>
          ${data.languages.map(lang => `
            <div class="contact-item">
              <span style="font-weight: bold;">${lang.name}</span> - ${lang.proficiency}
            </div>
          `).join('')}
        ` : ''}
        
        ${data.skills && data.skills.length > 0 ? `
          <div class="section-header">Skills</div>
          <div class="skills-list">
            ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
    
    // Main content
    const mainContent = `
      <div class="main-content">
        ${data.summary ? `
          <div class="section">
            <div class="section-header">Summary</div>
            <p>${data.summary}</p>
          </div>
        ` : ''}
        
        ${data.workExperience && data.workExperience.length > 0 ? `
          <div class="section">
            <div class="section-header">Work Experience</div>
            ${data.workExperience.map(work => `
              <div class="item">
                <div class="item-title">${work.company}</div>
                <div class="item-subtitle">${work.position}</div>
                <div class="item-date">${work.startDate} - ${work.endDate || 'Present'}</div>
                ${work.location ? `<div>${work.location}</div>` : ''}
                ${work.description ? `<p>${work.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${data.education && data.education.length > 0 ? `
          <div class="section">
            <div class="section-header">Education</div>
            ${data.education.map(edu => `
              <div class="item">
                <div class="item-title">${edu.institution}</div>
                <div class="item-subtitle">${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
                <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                ${edu.description ? `<p>${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    
    // Combine all sections
    return `
      ${template2Styles}
      <div class="creative-container">
        ${sidebar}
        ${mainContent}
      </div>
    `;
  }
  
  /**
   * Generates HTML for Template 3 (Minimal)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate3Html(data) {
    // Additional styles for template 3
    const template3Styles = `
      <style>
        .minimal-container {
          font-family: 'Helvetica', sans-serif;
        }
        
        .minimal-header {
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        
        .minimal-name {
          font-size: 28px;
          font-weight: 300;
          color: #333;
          margin-bottom: 5px;
        }
        
        .minimal-title {
          font-size: 16px;
          color: #777;
          margin-bottom: 10px;
        }
        
        .minimal-contact {
          font-size: 12px;
          color: #555;
        }
        
        .minimal-section-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #555;
          margin-bottom: 15px;
        }
        
        .minimal-item {
          margin-bottom: 20px;
        }
        
        .minimal-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .minimal-item-title {
          font-weight: bold;
        }
        
        .minimal-item-period {
          color: #777;
        }
        
        .minimal-skill-pill {
          display: inline-block;
          padding: 3px 10px;
          background-color: #f8f8f8;
          border: 1px solid #eee;
          border-radius: 15px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #555;
        }
      </style>
    `;
    
    // Header
    const header = `
      <div class="minimal-header">
        <div class="minimal-name">${data.fullName || ''}</div>
        <div class="minimal-title">${data.jobTitle || ''}</div>
        <div class="minimal-contact">
          ${data.email ? `${data.email} · ` : ''}
          ${data.phone ? `${data.phone} · ` : ''}
          ${data.location ? `${data.location}` : ''}
          ${data.linkedin || data.website ? '<br>' : ''}
          ${data.linkedin ? `${data.linkedin}` : ''}
          ${data.linkedin && data.website ? ' · ' : ''}
          ${data.website ? `${data.website}` : ''}
        </div>
      </div>
    `;
    
    // Summary
    const summary = data.summary ? `
      <div class="minimal-section">
        <div class="minimal-section-title">About</div>
        <p>${data.summary}</p>
      </div>
    ` : '';
    
    // Experience
    let experience = '';
    if (data.workExperience && data.workExperience.length > 0) {
      experience = `
        <div class="minimal-section">
          <div class="minimal-section-title">Experience</div>
          ${data.workExperience.map(work => `
            <div class="minimal-item">
              <div class="minimal-item-header">
                <span class="minimal-item-title">${work.position}, ${work.company}</span>
                <span class="minimal-item-period">${work.startDate} - ${work.endDate || 'Present'}</span>
              </div>
              ${work.location ? `<div>${work.location}</div>` : ''}
              ${work.description ? `<p>${work.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Education
    let education = '';
    if (data.education && data.education.length > 0) {
      education = `
        <div class="minimal-section">
          <div class="minimal-section-title">Education</div>
          ${data.education.map(edu => `
            <div class="minimal-item">
              <div class="minimal-item-header">
                <span class="minimal-item-title">${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                <span class="minimal-item-period">${edu.startDate} - ${edu.endDate || 'Present'}</span>
              </div>
              <div>${edu.institution}</div>
              ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Skills
    let skills = '';
    if (data.skills && data.skills.length > 0) {
      skills = `
        <div class="minimal-section">
          <div class="minimal-section-title">Skills</div>
          <div>
            ${data.skills.map(skill => `<span class="minimal-skill-pill">${skill}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    // Languages
    let languages = '';
    if (data.languages && data.languages.length > 0) {
      languages = `
        <div class="minimal-section">
          <div class="minimal-section-title">Languages</div>
          <div>
            ${data.languages.map(lang => `
              <span class="minimal-skill-pill">
                ${lang.name} (${lang.proficiency})
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Combine all sections
    return `
      ${template3Styles}
      <div class="minimal-container">
        ${header}
        ${summary}
        ${experience}
        ${education}
        ${skills}
        ${languages}
      </div>
    `;
  }
  
  /**
   * Generates HTML for Template 4 (Modern)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate4Html(data) {
    // Additional styles for template 4
    const template4Styles = `
      <style>
        .modern-container {
          font-family: 'Arial', sans-serif;
        }
        
        .modern-header {
          background-color: #2c3e50;
          color: white;
          padding: 25px;
          margin-bottom: 20px;
        }
        
        .modern-name {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .modern-title {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 15px;
        }
        
        .modern-contact {
          display: flex;
          flex-wrap: wrap;
          font-size: 12px;
        }
        
        .modern-contact-item {
          margin-right: 15px;
          margin-bottom: 5px;
        }
        
        .modern-section {
          margin-bottom: 25px;
        }
        
        .modern-section-title {
          font-size: 16px;
          text-transform: uppercase;
          color: #2c3e50;
          border-bottom: 2px solid #2c3e50;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        
        .modern-item {
          margin-bottom: 20px;
        }
        
        .modern-item-title {
          font-weight: bold;
          color: #2c3e50;
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        .modern-item-subtitle {
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .modern-item-date {
          font-size: 12px;
          color: #7f8c8d;
          margin-bottom: 5px;
        }
        
        .modern-skills {
          display: flex;
          flex-wrap: wrap;
        }
        
        .modern-skill {
          background-color: #ecf0f1;
          color: #2c3e50;
          padding: 5px 10px;
          border-radius: 3px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 12px;
        }
      </style>
    `;
    
    // Header
    const header = `
      <div class="modern-header">
        <div class="modern-name">${data.fullName || ''}</div>
        <div class="modern-title">${data.jobTitle || ''}</div>
        <div class="modern-contact">
          ${data.email ? `<div class="modern-contact-item">Email: ${data.email}</div>` : ''}
          ${data.phone ? `<div class="modern-contact-item">Phone: ${data.phone}</div>` : ''}
          ${data.location ? `<div class="modern-contact-item">Location: ${data.location}</div>` : ''}
          ${data.linkedin ? `<div class="modern-contact-item">LinkedIn: ${data.linkedin}</div>` : ''}
          ${data.website ? `<div class="modern-contact-item">Website: ${data.website}</div>` : ''}
        </div>
      </div>
    `;
    
    // Summary
    const summary = data.summary ? `
      <div class="modern-section">
        <div class="modern-section-title">Profile</div>
        <p>${data.summary}</p>
      </div>
    ` : '';
    
    // Experience
    let experience = '';
    if (data.workExperience && data.workExperience.length > 0) {
      experience = `
        <div class="modern-section">
          <div class="modern-section-title">Professional Experience</div>
          ${data.workExperience.map(work => `
            <div class="modern-item">
              <div class="modern-item-title">${work.position}</div>
              <div class="modern-item-subtitle">${work.company}${work.location ? ` | ${work.location}` : ''}</div>
              <div class="modern-item-date">${work.startDate} - ${work.endDate || 'Present'}</div>
              ${work.description ? `<p>${work.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Education
    let education = '';
    if (data.education && data.education.length > 0) {
      education = `
        <div class="modern-section">
          <div class="modern-section-title">Education</div>
          ${data.education.map(edu => `
            <div class="modern-item">
              <div class="modern-item-title">${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</div>
              <div class="modern-item-subtitle">${edu.institution}</div>
              <div class="modern-item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
              ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Skills
    let skills = '';
    if (data.skills && data.skills.length > 0) {
      skills = `
        <div class="modern-section">
          <div class="modern-section-title">Skills</div>
          <div class="modern-skills">
            ${data.skills.map(skill => `<div class="modern-skill">${skill}</div>`).join('')}
          </div>
        </div>
      `;
    }
    
    // Languages
    let languages = '';
    if (data.languages && data.languages.length > 0) {
      languages = `
        <div class="modern-section">
          <div class="modern-section-title">Languages</div>
          <div class="modern-skills">
            ${data.languages.map(lang => `
              <div class="modern-skill">
                ${lang.name} (${lang.proficiency})
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Combine all sections
    return `
      ${template4Styles}
      <div class="modern-container">
        ${header}
        <div style="padding: 0 20px;">
          ${summary}
          ${experience}
          ${education}
          ${skills}
          ${languages}
        </div>
      </div>
    `;
  }
  
  /**
   * Generates HTML for Template 5 (Executive)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate5Html(data) {
    // Additional styles for template 5
    const template5Styles = `
      <style>
        .executive-container {
          font-family: 'Georgia', serif;
        }
        
        .executive-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #000;
          padding-bottom: 20px;
        }
        
        .executive-name {
          font-size: 28px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 5px;
        }
        
        .executive-title {
          font-size: 18px;
          font-style: italic;
          margin-bottom: 15px;
        }
        
        .executive-contact {
          font-size: 12px;
        }
        
        .executive-section {
          margin-bottom: 25px;
        }
        
        .executive-section-title {
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
          font-weight: bold;
          text-align: center;
        }
        
        .executive-item {
          margin-bottom: 20px;
        }
        
        .executive-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .executive-item-title {
          font-weight: bold;
          font-size: 16px;
        }
        
        .executive-item-location {
          font-style: italic;
        }
        
        .executive-item-subtitle {
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .executive-item-period {
          font-size: 12px;
          font-style: italic;
          margin-bottom: 10px;
        }
        
        .executive-skills-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        
        .executive-skill {
          width: 48%;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .executive-languages-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        
        .executive-language {
          width: 48%;
          margin-bottom: 10px;
        }
      </style>
    `;
    
    // Header
    const header = `
      <div class="executive-header">
        <div class="executive-name">${data.fullName || ''}</div>
        <div class="executive-title">${data.jobTitle || ''}</div>
        <div class="executive-contact">
          ${data.email ? `Email: ${data.email} | ` : ''}
          ${data.phone ? `Phone: ${data.phone} | ` : ''}
          ${data.location ? `Location: ${data.location}` : ''}
          ${data.linkedin || data.website ? '<br>' : ''}
          ${data.linkedin ? `LinkedIn: ${data.linkedin}` : ''}
          ${data.linkedin && data.website ? ' | ' : ''}
          ${data.website ? `Website: ${data.website}` : ''}
        </div>
      </div>
    `;
    
    // Summary
    const summary = data.summary ? `
      <div class="executive-section">
        <div class="executive-section-title">Professional Summary</div>
        <p>${data.summary}</p>
      </div>
    ` : '';
    
    // Experience
    let experience = '';
    if (data.workExperience && data.workExperience.length > 0) {
      experience = `
        <div class="executive-section">
          <div class="executive-section-title">Professional Experience</div>
          ${data.workExperience.map(work => `
            <div class="executive-item">
              <div class="executive-item-header">
                <span class="executive-item-title">${work.company}</span>
                ${work.location ? `<span class="executive-item-location">${work.location}</span>` : ''}
              </div>
              <div class="executive-item-subtitle">${work.position}</div>
              <div class="executive-item-period">${work.startDate} - ${work.endDate || 'Present'}</div>
              ${work.description ? `<p>${work.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Education
    let education = '';
    if (data.education && data.education.length > 0) {
      education = `
        <div class="executive-section">
          <div class="executive-section-title">Education</div>
          ${data.education.map(edu => `
            <div class="executive-item">
              <div class="executive-item-header">
                <span class="executive-item-title">${edu.institution}</span>
              </div>
              <div class="executive-item-subtitle">
                ${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
              </div>
              <div class="executive-item-period">${edu.startDate} - ${edu.endDate || 'Present'}</div>
              ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Skills
    let skills = '';
    if (data.skills && data.skills.length > 0) {
      skills = `
        <div class="executive-section">
          <div class="executive-section-title">Core Competencies</div>
          <div class="executive-skills-grid">
            ${data.skills.map(skill => `
              <div class="executive-skill">• ${skill}</div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Languages
    let languages = '';
    if (data.languages && data.languages.length > 0) {
      languages = `
        <div class="executive-section">
          <div class="executive-section-title">Languages</div>
          <div class="executive-languages-list">
            ${data.languages.map(lang => `
              <div class="executive-language">
                <b>${lang.name}</b>: ${lang.proficiency}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Combine all sections
    return `
      ${template5Styles}
      <div class="executive-container">
        ${header}
        ${summary}
        ${experience}
        ${education}
        ${skills}
        ${languages}
      </div>
    `;
  }
  
  /**
   * Shares the generated PDF
   * @param {string} pdfUri URI of the PDF to share
   */
  static async sharePdf(pdfUri) {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on this device');
      return;
    }
    
    await Sharing.shareAsync(pdfUri);
  }
}

export default PdfGenerator;
