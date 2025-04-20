/**
 * Formats a date string or ISO date to a more readable format
 * 
 * @param {string} dateString - Date string or ISO date string
 * @param {string} locale - Locale for date formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, locale = 'en-US') => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Format options
    const options = { 
      year: 'numeric', 
      month: 'short'
    };
    
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * 
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Validates an email address
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a unique ID
 * 
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Gets initials from a name
 * 
 * @param {string} name - Full name
 * @returns {string} Initials (up to 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.trim().split(' ');
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Determines if a string is RTL
 * 
 * @param {string} text - Text to check
 * @returns {boolean} True if text is RTL, false otherwise
 */
export const isRTL = (text) => {
  if (!text) return false;
  
  // The Unicode RTL characters range
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};

/**
 * Deep merges two objects
 * 
 * @param {object} target - Target object
 * @param {object} source - Source object to merge into target
 * @returns {object} Merged object
 */
export const deepMerge = (target, source) => {
  const output = Object.assign({}, target);
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
};

/**
 * Checks if value is an object
 * 
 * @param {any} item - Value to check
 * @returns {boolean} True if value is an object
 */
const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};