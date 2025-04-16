import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../hooks/useResume';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SkillsForm = ({ onValidationChange }) => {
  const { t } = useTranslation();
  const { resumeData, updateResumeData } = useResume();
  const [skillsList, setSkillsList] = useState(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' });
  const [error, setError] = useState(null);
  
  // Update local state when resumeData changes
  useEffect(() => {
    setSkillsList(resumeData.skills || []);
  }, [resumeData.skills]);
  
  // Always validate as true since skills are optional
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true);
    }
  }, [skillsList, onValidationChange]);
  
  // Handle skill name input change
  const handleSkillNameChange = (e) => {
    setNewSkill({ ...newSkill, name: e.target.value });
    
    // Clear error if user starts typing
    if (error && e.target.value.trim()) {
      setError(null);
    }
  };
  
  // Handle skill level select change
  const handleSkillLevelChange = (e) => {
    setNewSkill({ ...newSkill, level: e.target.value });
  };
  
  // Add a new skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    
    if (!newSkill.name.trim()) {
      setError(t('Please enter a skill name'));
      return;
    }
    
    // Check for duplicate skill names
    if (skillsList.some(skill => skill.name.toLowerCase() === newSkill.name.trim().toLowerCase())) {
      setError(t('This skill is already added'));
      return;
    }
    
    const skillToAdd = {
      id: uuidv4(),
      name: newSkill.name.trim(),
      level: newSkill.level
    };
    
    const updatedList = [...skillsList, skillToAdd];
    setSkillsList(updatedList);
    updateResumeData({ skills: updatedList });
    setNewSkill({ name: '', level: 'Intermediate' });
    setError(null);
  };
  
  // Remove a skill
  const handleRemoveSkill = (id) => {
    const updatedList = skillsList.filter(skill => skill.id !== id);
    setSkillsList(updatedList);
    updateResumeData({ skills: updatedList });
  };
  
  // Error message style
  const errorMessageStyle = {
    color: 'var(--error-color)',
    fontSize: '14px',
    marginTop: '5px'
  };
  
  return (
    <div className="form-section">
      <h3>{t('Skills')}</h3>
      
      <div className="skills-list" style={{ marginBottom: '20px' }}>
        {skillsList.map(skill => (
          <div key={skill.id} className="skill-item">
            <div className="skill-name">{skill.name}</div>
            <div className="skill-info">
              <span className="skill-level">{t(skill.level)}</span>
              <button
                type="button"
                className="button-icon"
                onClick={() => handleRemoveSkill(skill.id)}
                aria-label={t('Remove skill')}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        
        {skillsList.length === 0 && (
          <p className="empty-list-message">{t('No skills added yet.')}</p>
        )}
      </div>
      
      <form onSubmit={handleAddSkill} className="add-skill-form">
        <div className="form-row">
          <div className="form-group three-quarters">
            <Input
              label={t('Add Skill')}
              name="skillName"
              value={newSkill.name}
              onChange={handleSkillNameChange}
              placeholder={t('e.g. JavaScript, Project Management, etc.')}
              error={error}
            />
          </div>
          <div className="form-group quarter">
            <label className="form-label">{t('Level')}</label>
            <select
              name="skillLevel"
              value={newSkill.level}
              onChange={handleSkillLevelChange}
              className="form-input"
            >
              {SKILL_LEVELS.map(level => (
                <option key={level} value={level}>
                  {t(level)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="button button-primary"
          disabled={!newSkill.name.trim()}
        >
          {t('Add Skill')}
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;