import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./I18n/en.json"
import gu from "./I18n/gu.json"
import hi from  "./I18n/hi.json"

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources:{
     en:{ translation:en},
     gu:{translation:gu},
     hi:{translation:hi}
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    },
  });

export default i18n;