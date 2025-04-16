import React from 'react';
import { useResume } from '../hooks/useResume';
import { useTheme } from '../hooks/useTheme';

/**
 * Color Palette Selector Component
 * Allows users to select primary and accent colors for their resume
 */
const ColorPaletteSelector = () => {
  const { resumeData, colorPalettes, updateColorScheme, getColorValue } = useResume();
  const { theme } = useTheme();
  
  const { colorScheme = { primary: 'blue', accent: 'teal' } } = resumeData;
  
  /**
   * Handle color selection
   * @param {string} type - 'primary' or 'accent'
   * @param {string} colorId - ID of the selected color
   */
  const handleColorSelect = (type, colorId) => {
    updateColorScheme(type, colorId);
  };
  
  return (
    <div className={`color-palette-selector ${theme}`}>
      <div className="color-section">
        <h3 className="color-section-title">Primary Color</h3>
        <p className="color-section-description">
          This will be used for headings and section titles
        </p>
        <div className="color-options">
          {colorPalettes.primary.map(color => (
            <button
              key={`primary-${color.id}`}
              className={`color-option ${colorScheme.primary === color.id ? 'selected' : ''}`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleColorSelect('primary', color.id)}
              aria-label={`Select ${color.name} as primary color`}
              title={color.name}
            >
              {colorScheme.primary === color.id && <span className="color-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
      
      <div className="color-section">
        <h3 className="color-section-title">Accent Color</h3>
        <p className="color-section-description">
          This will be used for highlights and emphasis
        </p>
        <div className="color-options">
          {colorPalettes.accent.map(color => (
            <button
              key={`accent-${color.id}`}
              className={`color-option ${colorScheme.accent === color.id ? 'selected' : ''}`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleColorSelect('accent', color.id)}
              aria-label={`Select ${color.name} as accent color`}
              title={color.name}
            >
              {colorScheme.accent === color.id && <span className="color-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
      
      <div className="color-preview">
        <h4>Preview</h4>
        <div 
          className="color-sample" 
          style={{ 
            backgroundColor: getColorValue('primary', colorScheme.primary),
            color: '#fff',
            padding: '10px',
            borderRadius: '5px 5px 0 0',
            marginBottom: '2px'
          }}
        >
          Primary Color
        </div>
        <div 
          className="color-sample" 
          style={{ 
            backgroundColor: getColorValue('accent', colorScheme.accent),
            color: '#fff',
            padding: '10px',
            borderRadius: '0 0 5px 5px'
          }}
        >
          Accent Color
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteSelector;