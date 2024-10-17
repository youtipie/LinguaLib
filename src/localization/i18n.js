import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, uk } from "./translations";

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
        uk: { translation: uk },
    },
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;