import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import { COLOR_PALETTES } from '../context/ResumeContext';

/**
 * Component for selecting primary and accent colors for resume templates
 * Allows users to customize the look of their resume
 */
const ColorPaletteSelector = () => {
  const { t } = useTranslation();
  const { resumeData, updateColorScheme, getColorValue } = useResume();
  
  const colorScheme = resumeData.colorScheme || { primary: 'blue', accent: 'teal' };
  
  /**
   * Handle color selection
   * @param {string} type - 'primary' or 'accent'
   * @param {string} colorId - ID of the selected color
   */
  const handleColorSelect = (type, colorId) => {
    updateColorScheme(type, colorId);
  };
  
  return (
    <div className="color-palette-selector">
      <div className="color-section">
        <h4>{t('Primary Color')}</h4>
        <p className="color-description">{t('Used for headings, section titles, and important elements')}</p>
        <div className="color-grid">
          {Object.keys(COLOR_PALETTES.primary).map(colorId => (
            <button
              key={colorId}
              className={`color-button ${colorScheme.primary === colorId ? 'selected' : ''}`}
              style={{ backgroundColor: COLOR_PALETTES.primary[colorId] }}
              onClick={() => handleColorSelect('primary', colorId)}
              aria-label={`${t('Primary color')}: ${colorId}`}
              title={colorId}
            />
          ))}
        </div>
      </div>
      
      <div className="color-section">
        <h4>{t('Accent Color')}</h4>
        <p className="color-description">{t('Used for highlights, links, and secondary elements')}</p>
        <div className="color-grid">
          {Object.keys(COLOR_PALETTES.accent).map(colorId => (
            <button
              key={colorId}
              className={`color-button ${colorScheme.accent === colorId ? 'selected' : ''}`}
              style={{ backgroundColor: COLOR_PALETTES.accent[colorId] }}
              onClick={() => handleColorSelect('accent', colorId)}
              aria-label={`${t('Accent color')}: ${colorId}`}
              title={colorId}
            />
          ))}
        </div>
      </div>
      
      <div className="color-preview">
        <div className="preview-header">
          <div className="preview-title">{t('Preview')}</div>
          <div className="preview-subtitle">{t('See how your colors work together')}</div>
        </div>
        <div 
          className="preview-box" 
          style={{ 
            backgroundColor: getColorValue('primary', colorScheme.primary),
            color: '#ffffff',
            borderColor: getColorValue('accent', colorScheme.accent)
          }}
        >
          <div className="preview-text">{t('Primary Color')}</div>
        </div>
        <div 
          className="preview-box" 
          style={{ 
            backgroundColor: getColorValue('accent', colorScheme.accent),
            color: '#ffffff'
          }}
        >
          <div className="preview-text">{t('Accent Color')}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteSelector;