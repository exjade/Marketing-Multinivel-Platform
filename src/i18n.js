import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
.use(initReactI18next) // passes i18n down to react-i18next
.use(LanguageDetector)// passes i18next language  detector to know the user browser language
.use(HttpApi)
.init({
  // the translations
  // (tip move them in a JSON file and import them,
  // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
  supportedLngs: ['en', 'pt', 'es', 'fr'],
  fallbackLng: 'es',
  detection: {
    order: ['cookie', 'path', 'htmlTag', 'localStorage', 'subdomain'],
    caches: ['cookie'],
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/translation.json',
  }
});


export default i18n;