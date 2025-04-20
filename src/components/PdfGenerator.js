import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Utility class to handle PDF generation from resume data
 */
class PdfGenerator {
  /**
   * Generates a PDF from resume data
   * @param {Object} data Resume data to generate PDF from
   * @returns {Promise<Blob>} Blob of the generated PDF file
   */
  static async generatePdf(data) {
    try {
      // Create a temporary container for the resume
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px'; // A4 width in pixels at 96 DPI
      container.style.backgroundColor = '#fff'; // Ensure white background
      document.body.appendChild(container);
      
      // Get primary and accent colors from the data to match preview
      const { colorScheme = { primary: 'blue', accent: 'teal' } } = data;
      const primaryColor = this.getColorValue(colorScheme.primary);
      const accentColor = this.getColorValue(colorScheme.accent);
      
      // Add custom CSS to ensure PDF matches preview
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        :root {
          --template-primary-color: ${primaryColor};
          --template-accent-color: ${accentColor};
        }
      `;
      container.appendChild(styleElement);
      
      // Add HTML content based on template
      container.innerHTML += await this.getHtmlFromTemplate(data);
      
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate PDF using html2canvas and jsPDF
      const canvas = await html2canvas(container, {
        scale: 2.5, // higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF' // Set background explicitly
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgWidth = pdfWidth;
      const imgHeight = pdfWidth / ratio;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Clean up
      document.body.removeChild(container);
      
      // Return PDF as blob
      return pdf.output('blob');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
  
  /**
   * Generates HTML content for the PDF based on the resume template
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static async getHtmlFromTemplate(data) {
    const { template } = data;
    
    // Select template based on user choice
    switch (template) {
      case 'template1':
        return this.generateTemplate1Html(data);
      case 'template2':
        return this.generateTemplate2Html(data);
      case 'template3':
        return this.generateTemplate3Html(data);
      case 'template4':
        return this.generateTemplate4Html(data);
      case 'template5':
        return this.generateTemplate5Html(data);
      default:
        return this.generateTemplate1Html(data); // Default to template 1
    }
  }
  
  /**
   * Generates HTML for Template 1 (Professional)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate1Html(data) {
    const {
      basicInfo = {},
      education = [],
      workExperience = [],
      skills = [],
      summary = ''
    } = data;
    
    // Format education items
    const educationHtml = education.map(edu => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
          <span class="item-period">${this.formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : this.formatDate(edu.endDate)}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format work experience items
    const workExperienceHtml = workExperience.map(exp => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${exp.jobTitle}</span>
          <span class="item-period">${this.formatDate(exp.startDate)} - ${exp.isCurrentJob ? 'Present' : this.formatDate(exp.endDate)}</span>
        </div>
        <div class="item-subtitle">${exp.employer}</div>
        ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format skills
    const skillsHtml = skills.map(skill => `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}</span>
      </div>
    `).join('');
    
    // Create the full HTML
    return `
      <div class="resume-pdf template1">
        <div class="resume-header">
          <h1>${basicInfo.firstName || ''} ${basicInfo.lastName || ''}</h1>
          <h2>${basicInfo.jobTitle || ''}</h2>
          
          <div class="contact-info">
            ${basicInfo.email ? `<div class="contact-item"><span class="contact-label">Email:</span> ${basicInfo.email}</div>` : ''}
            ${basicInfo.phone ? `<div class="contact-item"><span class="contact-label">Phone:</span> ${basicInfo.phone}</div>` : ''}
            ${basicInfo.location ? `<div class="contact-item"><span class="contact-label">Location:</span> ${basicInfo.location}</div>` : ''}
            ${basicInfo.website ? `<div class="contact-item"><span class="contact-label">Website:</span> ${basicInfo.website}</div>` : ''}
            ${basicInfo.linkedIn ? `<div class="contact-item"><span class="contact-label">LinkedIn:</span> ${basicInfo.linkedIn}</div>` : ''}
          </div>
        </div>
        
        ${summary ? `
          <div class="resume-section">
            <h3>Professional Summary</h3>
            <div class="section-content">
              <p>${summary}</p>
            </div>
          </div>
        ` : ''}
        
        ${workExperience.length > 0 ? `
          <div class="resume-section">
            <h3>Work Experience</h3>
            <div class="section-content">
              ${workExperienceHtml}
            </div>
          </div>
        ` : ''}
        
        ${education.length > 0 ? `
          <div class="resume-section">
            <h3>Education</h3>
            <div class="section-content">
              ${educationHtml}
            </div>
          </div>
        ` : ''}
        
        ${skills.length > 0 ? `
          <div class="resume-section">
            <h3>Skills</h3>
            <div class="section-content skills-grid">
              ${skillsHtml}
            </div>
          </div>
        ` : ''}
      </div>
      
      <style>
        .resume-pdf {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0;
          padding: 40px;
          box-sizing: border-box;
        }
        
        .template1 {
          --primary-color: #2c3e50;
          --secondary-color: #3498db;
          --text-color: #333;
          --background-color: #fff;
          --section-gap: 25px;
        }
        
        .resume-header {
          margin-bottom: 30px;
          border-bottom: 2px solid var(--primary-color);
          padding-bottom: 20px;
        }
        
        .resume-header h1 {
          margin: 0 0 5px;
          color: var(--primary-color);
          font-size: 28px;
        }
        
        .resume-header h2 {
          margin: 0 0 15px;
          color: var(--secondary-color);
          font-size: 18px;
          font-weight: normal;
        }
        
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 14px;
        }
        
        .contact-item {
          margin-right: 20px;
        }
        
        .contact-label {
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .resume-section {
          margin-bottom: var(--section-gap);
        }
        
        .resume-section h3 {
          color: var(--primary-color);
          border-bottom: 1px solid var(--secondary-color);
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .section-content {
          padding-left: 5px;
        }
        
        .resume-item {
          margin-bottom: 15px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .item-period {
          color: var(--secondary-color);
          font-size: 14px;
        }
        
        .item-subtitle {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .item-location {
          font-style: italic;
          margin-bottom: 5px;
          font-size: 14px;
        }
        
        .item-description {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        
        .skill-name {
          font-weight: bold;
        }
        
        .skill-level {
          color: var(--secondary-color);
          font-size: 14px;
        }
      </style>
    `;
  }
  
  /**
   * Generates HTML for Template 2 (Creative)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate2Html(data) {
    const {
      basicInfo = {},
      education = [],
      workExperience = [],
      skills = [],
      summary = ''
    } = data;
    
    // Format education items
    const educationHtml = education.map(edu => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
          <span class="item-period">${this.formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : this.formatDate(edu.endDate)}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format work experience items
    const workExperienceHtml = workExperience.map(exp => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${exp.jobTitle}</span>
          <span class="item-period">${this.formatDate(exp.startDate)} - ${exp.isCurrentJob ? 'Present' : this.formatDate(exp.endDate)}</span>
        </div>
        <div class="item-subtitle">${exp.employer}</div>
        ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format skills
    const skillsHtml = skills.map(skill => `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}</span>
      </div>
    `).join('');
    
    // Create the full HTML
    return `
      <div class="resume-pdf template2">
        <div class="resume-sidebar">
          <div class="profile-header">
            <div class="profile-circle">
              ${this.getInitials(basicInfo.firstName, basicInfo.lastName)}
            </div>
            <h1>${basicInfo.firstName || ''} ${basicInfo.lastName || ''}</h1>
            <h2>${basicInfo.jobTitle || ''}</h2>
          </div>
          
          <div class="sidebar-section">
            <h3>Contact</h3>
            <ul class="contact-list">
              ${basicInfo.email ? `<li><span class="contact-label">Email:</span> ${basicInfo.email}</li>` : ''}
              ${basicInfo.phone ? `<li><span class="contact-label">Phone:</span> ${basicInfo.phone}</li>` : ''}
              ${basicInfo.location ? `<li><span class="contact-label">Location:</span> ${basicInfo.location}</li>` : ''}
              ${basicInfo.website ? `<li><span class="contact-label">Website:</span> ${basicInfo.website}</li>` : ''}
              ${basicInfo.linkedIn ? `<li><span class="contact-label">LinkedIn:</span> ${basicInfo.linkedIn}</li>` : ''}
            </ul>
          </div>
          
          ${skills.length > 0 ? `
            <div class="sidebar-section">
              <h3>Skills</h3>
              <div class="skills-list">
                ${skillsHtml}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="resume-content">
          ${summary ? `
            <div class="resume-section">
              <h3>Professional Summary</h3>
              <div class="section-content">
                <p>${summary}</p>
              </div>
            </div>
          ` : ''}
          
          ${workExperience.length > 0 ? `
            <div class="resume-section">
              <h3>Work Experience</h3>
              <div class="section-content">
                ${workExperienceHtml}
              </div>
            </div>
          ` : ''}
          
          ${education.length > 0 ? `
            <div class="resume-section">
              <h3>Education</h3>
              <div class="section-content">
                ${educationHtml}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
      
      <style>
        .resume-pdf {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0;
          box-sizing: border-box;
          display: flex;
        }
        
        .template2 {
          --primary-color: #2980b9;
          --secondary-color: #27ae60;
          --sidebar-bg: #2980b9;
          --sidebar-text: #fff;
          --main-bg: #fff;
          --main-text: #333;
          --accent-color: #e74c3c;
          --section-gap: 25px;
        }
        
        .resume-sidebar {
          width: 30%;
          background-color: var(--sidebar-bg);
          color: var(--sidebar-text);
          padding: 40px 20px;
        }
        
        .resume-content {
          width: 70%;
          padding: 40px;
          background-color: var(--main-bg);
        }
        
        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .profile-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 36px;
          font-weight: bold;
        }
        
        .profile-header h1 {
          margin: 0 0 5px;
          font-size: 24px;
        }
        
        .profile-header h2 {
          margin: 0;
          font-size: 16px;
          font-weight: normal;
          opacity: 0.8;
        }
        
        .sidebar-section {
          margin-bottom: var(--section-gap);
        }
        
        .sidebar-section h3 {
          color: var(--sidebar-text);
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .contact-list li {
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .contact-label {
          font-weight: bold;
          opacity: 0.8;
        }
        
        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .skill-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .skill-name {
          font-weight: bold;
        }
        
        .resume-content h3 {
          color: var(--primary-color);
          border-bottom: 2px solid var(--primary-color);
          padding-bottom: 5px;
          margin-bottom: 15px;
          font-size: 20px;
        }
        
        .resume-section {
          margin-bottom: var(--section-gap);
        }
        
        .resume-item {
          margin-bottom: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: bold;
          color: var(--primary-color);
          font-size: 16px;
        }
        
        .item-period {
          color: var(--secondary-color);
          font-size: 14px;
        }
        
        .item-subtitle {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .item-location {
          font-style: italic;
          margin-bottom: 5px;
          font-size: 14px;
          color: var(--secondary-color);
        }
        
        .item-description {
          font-size: 14px;
          line-height: 1.5;
        }
      </style>
    `;
  }
  
  /**
   * Generates HTML for Template 3 (Minimal)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate3Html(data) {
    const {
      basicInfo = {},
      education = [],
      workExperience = [],
      skills = [],
      summary = ''
    } = data;
    
    // Format education items
    const educationHtml = education.map(edu => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
          <span class="item-period">${this.formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : this.formatDate(edu.endDate)}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format work experience items
    const workExperienceHtml = workExperience.map(exp => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${exp.jobTitle}</span>
          <span class="item-period">${this.formatDate(exp.startDate)} - ${exp.isCurrentJob ? 'Present' : this.formatDate(exp.endDate)}</span>
        </div>
        <div class="item-subtitle">${exp.employer}</div>
        ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format skills
    const skillsHtml = skills.map(skill => `
      <span class="skill-tag">${skill.name}</span>
    `).join('');
    
    // Create the full HTML
    return `
      <div class="resume-pdf template3">
        <div class="resume-header">
          <h1>${basicInfo.firstName || ''} ${basicInfo.lastName || ''}</h1>
          <h2>${basicInfo.jobTitle || ''}</h2>
          
          <div class="contact-info">
            ${basicInfo.email ? `<div class="contact-item">${basicInfo.email}</div>` : ''}
            ${basicInfo.phone ? `<div class="contact-item">${basicInfo.phone}</div>` : ''}
            ${basicInfo.location ? `<div class="contact-item">${basicInfo.location}</div>` : ''}
            ${basicInfo.website ? `<div class="contact-item">${basicInfo.website}</div>` : ''}
            ${basicInfo.linkedIn ? `<div class="contact-item">${basicInfo.linkedIn}</div>` : ''}
          </div>
        </div>
        
        ${summary ? `
          <div class="resume-section">
            <div class="section-content">
              <p class="summary">${summary}</p>
            </div>
          </div>
        ` : ''}
        
        ${workExperience.length > 0 ? `
          <div class="resume-section">
            <h3>Experience</h3>
            <div class="section-content">
              ${workExperienceHtml}
            </div>
          </div>
        ` : ''}
        
        ${education.length > 0 ? `
          <div class="resume-section">
            <h3>Education</h3>
            <div class="section-content">
              ${educationHtml}
            </div>
          </div>
        ` : ''}
        
        ${skills.length > 0 ? `
          <div class="resume-section">
            <h3>Skills</h3>
            <div class="section-content">
              <div class="skills-container">
                ${skillsHtml}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
      
      <style>
        .resume-pdf {
          font-family: 'Helvetica', Arial, sans-serif;
          color: #333;
          margin: 0;
          padding: 40px;
          box-sizing: border-box;
          line-height: 1.5;
        }
        
        .template3 {
          --primary-color: #000;
          --secondary-color: #555;
          --accent-color: #f0f0f0;
          --section-gap: 25px;
        }
        
        .resume-header {
          margin-bottom: 30px;
          border-bottom: 1px solid var(--accent-color);
          padding-bottom: 20px;
          text-align: center;
        }
        
        .resume-header h1 {
          margin: 0 0 5px;
          font-size: 28px;
          letter-spacing: 1px;
          font-weight: normal;
        }
        
        .resume-header h2 {
          margin: 0 0 15px;
          font-size: 18px;
          font-weight: normal;
          color: var(--secondary-color);
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 14px;
        }
        
        .resume-section {
          margin-bottom: var(--section-gap);
        }
        
        .resume-section h3 {
          color: var(--primary-color);
          font-size: 16px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .section-content {
          padding-left: 5px;
        }
        
        .summary {
          font-size: 16px;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 30px;
          color: var(--secondary-color);
        }
        
        .resume-item {
          margin-bottom: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: bold;
        }
        
        .item-period {
          color: var(--secondary-color);
          font-size: 14px;
        }
        
        .item-subtitle {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .item-location {
          font-style: italic;
          margin-bottom: 5px;
          font-size: 14px;
          color: var(--secondary-color);
        }
        
        .item-description {
          font-size: 14px;
          line-height: 1.5;
          color: var(--secondary-color);
        }
        
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .skill-tag {
          padding: 5px 10px;
          background-color: var(--accent-color);
          border-radius: 3px;
          font-size: 14px;
        }
      </style>
    `;
  }
  
  /**
   * Generates HTML for Template 4 (Modern)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate4Html(data) {
    const {
      basicInfo = {},
      education = [],
      workExperience = [],
      skills = [],
      summary = ''
    } = data;
    
    // Format education items
    const educationHtml = education.map(edu => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
          <span class="item-period">${this.formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : this.formatDate(edu.endDate)}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format work experience items
    const workExperienceHtml = workExperience.map(exp => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${exp.jobTitle}</span>
          <span class="item-period">${this.formatDate(exp.startDate)} - ${exp.isCurrentJob ? 'Present' : this.formatDate(exp.endDate)}</span>
        </div>
        <div class="item-subtitle">${exp.employer}</div>
        ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format skills
    const skillsHtml = skills.map(skill => `
      <div class="skill-item">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar">
          <div class="skill-level" style="width: ${(parseInt(skill.level) / 5) * 100}%"></div>
        </div>
      </div>
    `).join('');
    
    // Create the full HTML for Modern Template (Template 4)
    return `
      <div class="resume-pdf template4">
        <div class="resume-header">
          <div class="header-main">
            <h1>${basicInfo.firstName || ''} ${basicInfo.lastName || ''}</h1>
            <h2>${basicInfo.jobTitle || ''}</h2>
          </div>
          <div class="header-side">
            ${basicInfo.email ? `<div class="contact-item"><span class="contact-icon">✉</span> ${basicInfo.email}</div>` : ''}
            ${basicInfo.phone ? `<div class="contact-item"><span class="contact-icon">✆</span> ${basicInfo.phone}</div>` : ''}
            ${basicInfo.location ? `<div class="contact-item"><span class="contact-icon">⌂</span> ${basicInfo.location}</div>` : ''}
            ${basicInfo.website ? `<div class="contact-item"><span class="contact-icon">🔗</span> ${basicInfo.website}</div>` : ''}
            ${basicInfo.linkedIn ? `<div class="contact-item"><span class="contact-icon">in</span> ${basicInfo.linkedIn}</div>` : ''}
          </div>
        </div>
        
        <div class="resume-body">
          <div class="main-column">
            ${summary ? `
              <div class="resume-section">
                <h3><span class="section-icon">👤</span> Professional Summary</h3>
                <div class="section-content">
                  <p>${summary}</p>
                </div>
              </div>
            ` : ''}
            
            ${workExperience.length > 0 ? `
              <div class="resume-section">
                <h3><span class="section-icon">💼</span> Work Experience</h3>
                <div class="section-content timeline">
                  ${workExperienceHtml}
                </div>
              </div>
            ` : ''}
            
            ${education.length > 0 ? `
              <div class="resume-section">
                <h3><span class="section-icon">🎓</span> Education</h3>
                <div class="section-content timeline">
                  ${educationHtml}
                </div>
              </div>
            ` : ''}
          </div>
          
          <div class="side-column">
            ${skills.length > 0 ? `
              <div class="resume-section">
                <h3><span class="section-icon">🔧</span> Skills</h3>
                <div class="section-content skills-container">
                  ${skillsHtml}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      
      <style>
        .resume-pdf {
          font-family: 'Roboto', 'Arial', sans-serif;
          color: #333;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .template4 {
          --primary-color: #3498db;
          --secondary-color: #2ecc71;
          --text-color: #333;
          --accent-color: #f39c12;
          --bg-color: #fff;
          --section-bg: #f8f9fa;
          --border-color: #e9ecef;
        }
        
        .resume-header {
          display: flex;
          justify-content: space-between;
          padding: 30px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          border-radius: 5px 5px 0 0;
        }
        
        .header-main h1 {
          margin: 0 0 5px;
          font-size: 28px;
          font-weight: 700;
        }
        
        .header-main h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 400;
          opacity: 0.9;
        }
        
        .header-side {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          font-size: 12px;
        }
        
        .resume-body {
          display: flex;
          padding: 0;
          background-color: var(--bg-color);
          border-radius: 0 0 5px 5px;
        }
        
        .main-column {
          flex: 2;
          padding: 30px;
          border-right: 1px solid var(--border-color);
        }
        
        .side-column {
          flex: 1;
          padding: 30px;
          background-color: var(--section-bg);
        }
        
        .resume-section {
          margin-bottom: 25px;
        }
        
        .resume-section h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary-color);
          font-size: 18px;
          margin: 0 0 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--primary-color);
        }
        
        .section-icon {
          font-size: 16px;
        }
        
        .section-content {
          padding: 0 0 0 10px;
        }
        
        .timeline .resume-item {
          position: relative;
          padding-left: 20px;
          margin-bottom: 20px;
        }
        
        .timeline .resume-item:before {
          content: "";
          position: absolute;
          left: 0;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary-color);
        }
        
        .timeline .resume-item:after {
          content: "";
          position: absolute;
          left: 4px;
          top: 16px;
          width: 2px;
          height: calc(100% - 10px);
          background-color: var(--primary-color);
          opacity: 0.3;
        }
        
        .timeline .resume-item:last-child:after {
          display: none;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: bold;
          color: var(--text-color);
        }
        
        .item-period {
          color: var(--primary-color);
          font-size: 14px;
        }
        
        .item-subtitle {
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .item-location {
          font-style: italic;
          margin-bottom: 5px;
          font-size: 14px;
          color: #666;
        }
        
        .item-description {
          font-size: 14px;
          line-height: 1.5;
          color: #555;
        }
        
        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .skill-item {
          margin-bottom: 5px;
        }
        
        .skill-name {
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .skill-bar {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .skill-level {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          border-radius: 4px;
        }
      </style>
    `;
  }
  
  /**
   * Generates HTML for Template 5 (Executive)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate5Html(data) {
    const {
      basicInfo = {},
      education = [],
      workExperience = [],
      skills = [],
      summary = ''
    } = data;
    
    // Format education items
    const educationHtml = education.map(edu => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
          <span class="item-period">${this.formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : this.formatDate(edu.endDate)}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format work experience items
    const workExperienceHtml = workExperience.map(exp => `
      <div class="resume-item">
        <div class="item-header">
          <span class="item-title">${exp.jobTitle}</span>
          <span class="item-period">${this.formatDate(exp.startDate)} - ${exp.isCurrentJob ? 'Present' : this.formatDate(exp.endDate)}</span>
        </div>
        <div class="item-subtitle">${exp.employer}</div>
        ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
        ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
      </div>
    `).join('');
    
    // Format skills
    const skillsHtml = skills.map(skill => `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-rating">
          ${Array(parseInt(skill.level)).fill('<span class="rating-dot filled"></span>').join('')}
          ${Array(5 - parseInt(skill.level)).fill('<span class="rating-dot"></span>').join('')}
        </span>
      </div>
    `).join('');
    
    // Create the full HTML for Executive Template (Template 5)
    return `
      <div class="resume-pdf template5">
        <div class="resume-header">
          <div class="header-content">
            <div class="name-title">
              <h1>${basicInfo.firstName || ''} ${basicInfo.lastName || ''}</h1>
              <div class="title-underline"></div>
              <h2>${basicInfo.jobTitle || ''}</h2>
            </div>
            
            <div class="contact-info">
              ${basicInfo.email ? `<div class="contact-item">${basicInfo.email}</div>` : ''}
              ${basicInfo.phone ? `<div class="contact-item">${basicInfo.phone}</div>` : ''}
              ${basicInfo.location ? `<div class="contact-item">${basicInfo.location}</div>` : ''}
              ${basicInfo.website ? `<div class="contact-item">${basicInfo.website}</div>` : ''}
              ${basicInfo.linkedIn ? `<div class="contact-item">${basicInfo.linkedIn}</div>` : ''}
            </div>
          </div>
        </div>
        
        <div class="resume-content">
          ${summary ? `
            <div class="resume-section summary-section">
              <h3>Executive Summary</h3>
              <div class="section-content">
                <p>${summary}</p>
              </div>
            </div>
          ` : ''}
          
          <div class="two-column-layout">
            <div class="left-column">
              ${workExperience.length > 0 ? `
                <div class="resume-section">
                  <h3>Professional Experience</h3>
                  <div class="section-content">
                    ${workExperienceHtml}
                  </div>
                </div>
              ` : ''}
            </div>
            
            <div class="right-column">
              ${education.length > 0 ? `
                <div class="resume-section">
                  <h3>Education</h3>
                  <div class="section-content">
                    ${educationHtml}
                  </div>
                </div>
              ` : ''}
              
              ${skills.length > 0 ? `
                <div class="resume-section">
                  <h3>Core Competencies</h3>
                  <div class="section-content skills-section">
                    ${skillsHtml}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
      
      <style>
        .resume-pdf {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #333;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: #fff;
        }
        
        .template5 {
          --primary-color: #483D8B;
          --secondary-color: #6A5ACD;
          --text-color: #333;
          --light-color: #f8f8f8;
          --border-color: #ddd;
          --accent-color: #836FFF;
        }
        
        .resume-header {
          padding: 40px;
          background-color: var(--primary-color);
          color: white;
        }
        
        .header-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .name-title {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .name-title h1 {
          margin: 0;
          font-size: 32px;
          font-weight: normal;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .title-underline {
          height: 2px;
          width: 120px;
          background-color: var(--accent-color);
          margin: 10px auto;
        }
        
        .name-title h2 {
          margin: 10px 0 0;
          font-size: 18px;
          font-weight: normal;
          letter-spacing: 1px;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 14px;
        }
        
        .resume-content {
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .summary-section {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 25px;
          margin-bottom: 30px;
        }
        
        .two-column-layout {
          display: flex;
          gap: 40px;
        }
        
        .left-column {
          flex: 3;
        }
        
        .right-column {
          flex: 2;
        }
        
        .resume-section {
          margin-bottom: 30px;
        }
        
        .resume-section h3 {
          color: var(--primary-color);
          font-size: 20px;
          margin: 0 0 15px;
          font-weight: normal;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .resume-item {
          margin-bottom: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: bold;
          color: var(--text-color);
        }
        
        .item-period {
          color: var(--secondary-color);
          font-style: italic;
        }
        
        .item-subtitle {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .item-location {
          font-style: italic;
          margin-bottom: 5px;
          color: #555;
        }
        
        .item-description {
          font-size: 14px;
          line-height: 1.5;
          color: #444;
        }
        
        .skills-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        
        .skill-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .skill-name {
          font-size: 14px;
        }
        
        .skill-rating {
          display: flex;
          gap: 3px;
        }
        
        .rating-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--border-color);
          display: inline-block;
        }
        
        .rating-dot.filled {
          background-color: var(--primary-color);
        }
      </style>
    `;
  }
  
  /**
   * Format date for display in resume
   * @param {string} dateString Date string to format
   * @returns {string} Formatted date string
   */
  static formatDate(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch (error) {
      return dateString;
    }
  }
  
  /**
   * Get initials from first and last name
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @returns {string} Initials
   */
  static getInitials(firstName, lastName) {
    let initials = '';
    
    if (firstName) {
      initials += firstName.charAt(0).toUpperCase();
    }
    
    if (lastName) {
      initials += lastName.charAt(0).toUpperCase();
    }
    
    return initials || '?';
  }
  
  /**
   * Get color value from color ID
   * @param {string} colorId Color ID (e.g., 'blue', 'red', etc.)
   * @returns {string} CSS color value
   */
  static getColorValue(colorId) {
    const colorMap = {
      // Primary colors
      'blue': '#3498db',
      'red': '#e74c3c',
      'green': '#2ecc71',
      'purple': '#9b59b6',
      'orange': '#e67e22',
      'teal': '#1abc9c',
      'navy': '#34495e',
      'pink': '#e84393',
      'indigo': '#6c5ce7',
      'brown': '#795548',
      
      // Accent colors
      'lightBlue': '#85d6ff',
      'coral': '#ff7675',
      'mint': '#00b894',
      'lavender': '#a29bfe',
      'amber': '#ffa502',
      'turquoise': '#55efc4',
      'slate': '#607d8b',
      'rose': '#fd79a8',
      'skyBlue': '#74b9ff',
      'tan': '#bcaaa4'
    };
    
    return colorMap[colorId] || '#3498db'; // Default to blue if color not found
  }
  
  /**
   * Create a download for the PDF
   * @param {Blob} pdfBlob PDF blob to download
   * @param {string} fileName File name for the download
   */
  static downloadPdf(pdfBlob, fileName = 'resume.pdf') {
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export default PdfGenerator;