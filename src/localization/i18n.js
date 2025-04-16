import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations
import en from './translations/en';
import ar from './translations/ar';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Check for user-saved language preference
      const savedLanguage = await AsyncStorage.getItem('user-language');
      
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      
      // Default to English if no locale detection available
      return callback('en');
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
      
      // Handle RTL for Arabic
      if (language === 'ar' && !I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      } else if (language !== 'ar' && I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
