import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'es'];

i18n
  .use(HttpApi) // load translations using http (defaultpublic/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // fallback language is english.
    detection: {
      checkWhitelist: true, // options for language detection
    },
    debug: true,
    whitelist: availableLanguages,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      wait: true,
    },
  });

export default i18n;