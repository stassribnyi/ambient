import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../public/locales/en/translation.json';
import uk from '../public/locales/uk/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

i18n.services.formatter?.add('capitalize', (value: string) => value[0].toUpperCase() + value.slice(1));

export default i18n;
