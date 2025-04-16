import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

/**
 * Component for selecting application language
 */
const LanguageSelector = ({ onLanguageChange, compact = false }) => {
  const { i18n, t } = useTranslation();
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];
  
  useEffect(() => {
    // Update selected language if i18n language changes externally
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelectLanguage = (languageCode) => {
    setSelectedLanguage(languageCode);
    onLanguageChange(languageCode);
    setIsOpen(false);
  };
  
  const getLanguageName = (code) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : 'English';
  };
  
  const getLanguageFlag = (code) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.flag : '🇺🇸';
  };
  
  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.code && {
          backgroundColor: currentTheme.primary + '20', // Add transparency
        },
      ]}
      onPress={() => handleSelectLanguage(item.code)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={[styles.languageName, { color: currentTheme.text }]}>
        {item.name}
      </Text>
      {selectedLanguage === item.code && (
        <Feather name="check" size={18} color={currentTheme.primary} />
      )}
    </TouchableOpacity>
  );
  
  // Render compact version for settings
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.compactButton}>
          <Text style={[styles.compactText, { color: currentTheme.text }]}>
            {getLanguageName(selectedLanguage)}
          </Text>
          <Feather name="chevron-right" size={18} color={currentTheme.textSecondary} />
        </TouchableOpacity>
        
        <Modal
          visible={isOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[
                  styles.modalContent,
                  { backgroundColor: currentTheme.background }
                ]}>
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
                      {t('selectLanguage')}
                    </Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Feather name="x" size={24} color={currentTheme.text} />
                    </TouchableOpacity>
                  </View>
                  
                  <FlatList
                    data={languages}
                    keyExtractor={(item) => item.code}
                    renderItem={renderLanguageItem}
                    style={styles.languageList}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
  
  // Render full version for welcome screen
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.selector,
          { borderColor: currentTheme.border }
        ]}
        onPress={toggleModal}
      >
        <Text style={styles.flag}>{getLanguageFlag(selectedLanguage)}</Text>
        <Text style={[styles.selectedLanguage, { color: currentTheme.text }]}>
          {getLanguageName(selectedLanguage)}
        </Text>
        <Feather name="chevron-down" size={18} color={currentTheme.textSecondary} />
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[
                styles.modalContent,
                { backgroundColor: currentTheme.background }
              ]}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
                    {t('selectLanguage')}
                  </Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <Feather name="x" size={24} color={currentTheme.text} />
                  </TouchableOpacity>
                </View>
                
                <FlatList
                  data={languages}
                  keyExtractor={(item) => item.code}
                  renderItem={renderLanguageItem}
                  style={styles.languageList}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  selectedLanguage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageList: {
    maxHeight: 250,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  languageName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  // Compact styles for settings screen
  compactContainer: {
    flex: 1,
  },
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  compactText: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default LanguageSelector;
