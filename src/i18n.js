

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import translationFR from './locales/fr/translation.json';
import translationJP from './locales/jp/translation.json';
import translationAR from './locales/ar/translation.json';

// Tercüme dosyaları
const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  fr:{
    translation:translationFR,
  },
  jp:{
    translation:translationJP,
  },
  ar:{
    translation:translationAR,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // Varsayılan dil
    fallbackLng: 'tr', // Yedek dil
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
