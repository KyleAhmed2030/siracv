import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import Input from './Input';
import Button from './Button';

const SkillsForm = ({ data, updateData, errors, theme }) => {
  const { t } = useTranslation();
  
  const [skills, setSkills] = useState(data.skills || []);
  const [languages, setLanguages] = useState(data.languages || []);
  const [skillName, setSkillName] = useState('');
  const [languageName, setLanguageName] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [currentErrors, setCurrentErrors] = useState({});
  
  const proficiencyLevels = [
    { id: 'beginner', name: t('beginner') },
    { id: 'intermediate', name: t('intermediate') },
    { id: 'advanced', name: t('advanced') },
    { id: 'expert', name: t('expert') },
    { id: 'native', name: t('native') },
  ];
  
  const resetSkillForm = () => {
    setSkillName('');
    setCurrentErrors({});
  };
  
  const resetLanguageForm = () => {
    setLanguageName('');
    setProficiency('');
  };
  
  const validateSkillForm = () => {
    if (!skillName.trim()) {
      setCurrentErrors({ skillName: t('skillNameRequired') });
      return false;
    }
    return true;
  };
  
  const validateLanguageForm = () => {
    if (!languageName.trim()) {
      setCurrentErrors({ languageName: t('languageNameRequired') });
      return false;
    }
    if (!proficiency) {
      setCurrentErrors({ proficiency: t('proficiencyRequired') });
      return false;
    }
    return true;
  };
  
  const handleAddSkill = () => {
    if (!validateSkillForm()) return;
    
    // Check if skill already exists
    if (skills.some(skill => skill.toLowerCase() === skillName.toLowerCase())) {
      setCurrentErrors({ skillName: t('skillAlreadyExists') });
      return;
    }
    
    const updatedSkills = [...skills, skillName];
    setSkills(updatedSkills);
    updateData({ skills: updatedSkills });
    resetSkillForm();
  };
  
  const handleAddLanguage = () => {
    if (!validateLanguageForm()) return;
    
    // Check if language already exists
    if (languages.some(lang => lang.name.toLowerCase() === languageName.toLowerCase())) {
      setCurrentErrors({ languageName: t('languageAlreadyExists') });
      return;
    }
    
    const language = {
      name: languageName,
      proficiency,
    };
    
    const updatedLanguages = [...languages, language];
    setLanguages(updatedLanguages);
    updateData({ languages: updatedLanguages });
    resetLanguageForm();
  };
  
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateData({ skills: updatedSkills });
  };
  
  const handleDeleteLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    updateData({ languages: updatedLanguages });
  };
  
  const renderSkill = ({ item, index }) => (
    <View 
      style={[
        styles.skillItem, 
        { backgroundColor: theme.surface, borderColor: theme.border }
      ]}
    >
      <Text style={[styles.skillText, { color: theme.text }]}>
        {item}
      </Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteSkill(index)}
      >
        <Feather name="x" size={18} color={theme.error} />
      </TouchableOpacity>
    </View>
  );
  
  const renderLanguage = ({ item, index }) => (
    <View 
      style={[
        styles.languageItem, 
        { backgroundColor: theme.surface, borderColor: theme.border }
      ]}
    >
      <View style={styles.languageContent}>
        <Text style={[styles.languageText, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.proficiencyText, { color: theme.textSecondary }]}>
          {getProficiencyName(item.proficiency)}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteLanguage(index)}
      >
        <Feather name="x" size={18} color={theme.error} />
      </TouchableOpacity>
    </View>
  );
  
  const getProficiencyName = (id) => {
    const level = proficiencyLevels.find(level => level.id === id);
    return level ? level.name : id;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.skillsSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('skills')}
        </Text>
        
        <View style={styles.skillInputRow}>
          <View style={styles.skillInputContainer}>
            <Input
              value={skillName}
              onChangeText={setSkillName}
              placeholder={t('enterSkill')}
              error={currentErrors.skillName}
              theme={theme}
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.addButton, 
              { backgroundColor: theme.primary }
            ]}
            onPress={handleAddSkill}
          >
            <Feather name="plus" size={22} color={theme.buttonText} />
          </TouchableOpacity>
        </View>
        
        {skills.length > 0 && (
          <FlatList
            data={skills}
            renderItem={renderSkill}
            keyExtractor={(_, index) => `skill-${index}`}
            numColumns={2}
            columnWrapperStyle={styles.skillsRow}
            scrollEnabled={false}
          />
        )}
      </View>
      
      <View style={styles.languagesSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('languages')}
        </Text>
        
        <View style={styles.languageForm}>
          <Input
            label={t('language')}
            value={languageName}
            onChangeText={setLanguageName}
            placeholder={t('enterLanguage')}
            error={currentErrors.languageName}
            theme={theme}
          />
          
          <View style={styles.proficiencySelector}>
            <Text style={[styles.proficiencyLabel, { color: theme.textSecondary }]}>
              {t('proficiency')}
            </Text>
            
            <View style={styles.proficiencyButtons}>
              {proficiencyLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.proficiencyButton,
                    proficiency === level.id && { 
                      backgroundColor: theme.primary,
                      borderColor: theme.primary
                    },
                    proficiency !== level.id && { 
                      backgroundColor: theme.surface,
                      borderColor: theme.border
                    }
                  ]}
                  onPress={() => setProficiency(level.id)}
                >
                  <Text
                    style={[
                      styles.proficiencyButtonText,
                      proficiency === level.id && { color: theme.buttonText },
                      proficiency !== level.id && { color: theme.text }
                    ]}
                  >
                    {level.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {currentErrors.proficiency && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {currentErrors.proficiency}
              </Text>
            )}
          </View>
          
          <Button
            title={t('addLanguage')}
            onPress={handleAddLanguage}
            color={theme.primary}
            textColor={theme.buttonText}
            icon="plus"
          />
        </View>
        
        {languages.length > 0 && (
          <FlatList
            data={languages}
            renderItem={renderLanguage}
            keyExtractor={(_, index) => `language-${index}`}
            scrollEnabled={false}
            style={styles.languagesList}
          />
        )}
      </View>
      
      {errors.skills && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.skills}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  skillsSection: {
    marginBottom: 30,
  },
  skillInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  skillInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillsRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
    width: '48%',
  },
  skillText: {
    flex: 1,
    fontSize: 14,
  },
  deleteButton: {
    padding: 2,
  },
  languagesSection: {
    marginBottom: 20,
  },
  languageForm: {
    marginBottom: 15,
  },
  proficiencySelector: {
    marginBottom: 15,
  },
  proficiencyLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  proficiencyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  proficiencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  proficiencyButtonText: {
    fontSize: 14,
  },
  languagesList: {
    marginTop: 5,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  languageContent: {
    flex: 1,
  },
  languageText: {
    fontSize: 16,
    marginBottom: 2,
  },
  proficiencyText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SkillsForm;
