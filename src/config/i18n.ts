import i18n from 'i18next';
import { DEFAULT_LANGUAGE } from 'constants/app';
import LangEn from 'locales/en.json';

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  resources: {
    en: {
      translation: LangEn,
    },
  },
});
