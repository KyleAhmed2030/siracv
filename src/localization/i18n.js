import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en';
import arTranslation from './translations/ar';

// Configure i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false // not needed for react
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;