import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from 'pages/UI/Bootstrap/AdminLTE/locales/en/translation.json';
import translationTR from 'pages/UI/Bootstrap/AdminLTE/locales/tr/translation.json';
import translationDE from 'pages/UI/Bootstrap/AdminLTE/locales/de/translation.json';
import translationES from 'pages/UI/Bootstrap/AdminLTE/locales/es/translation.json';
import translationFR from 'pages/UI/Bootstrap/AdminLTE/locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  },
  es: {
    translation: translationES
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(initReactI18next as any) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true
    }
  } as any);

export default i18n;
