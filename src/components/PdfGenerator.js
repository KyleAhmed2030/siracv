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
      document.body.appendChild(container);
      
      // Add HTML content based on template
      container.innerHTML = await this.getHtmlFromTemplate(data);
      
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate PDF using html2canvas and jsPDF
      const canvas = await html2canvas(container, {
        scale: 2, // higher scale for better quality
        useCORS: true,
        logging: false
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
    // Template 4 implementation similar to other templates
    // For brevity, I'm including a simplified version
    return this.generateTemplate1Html(data); // Fallback to template 1
  }
  
  /**
   * Generates HTML for Template 5 (Executive)
   * @param {Object} data Resume data
   * @returns {string} HTML content
   */
  static generateTemplate5Html(data) {
    // Template 5 implementation similar to other templates
    // For brevity, I'm including a simplified version
    return this.generateTemplate2Html(data); // Fallback to template 2
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