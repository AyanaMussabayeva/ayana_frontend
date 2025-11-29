import { createInstance } from "i18next"
import commonData from "../locales/en/common.json"
import homeData from "../locales/en/home.json"
import aboutData from "../locales/en/about.json"
import researchData from "../locales/en/research.json"
import careerData from "../locales/en/career.json"
import standupData from "../locales/en/standup.json"
import musicData from "../locales/en/music.json"
import mediaData from "../locales/en/media.json"
import blogData from "../locales/en/blog.json"

// Create a new i18next instance
const i18n = createInstance()

// Initialize the i18next instance
i18n.init({
  lng: "en", // Default language
  fallbackLng: "en",
  resources: {
    en: {
      common: commonData,
      home: homeData,
      about: aboutData,
      research: researchData,
      career: careerData,
      standup: standupData,
      music: musicData,
      media: mediaData,
      blog: blogData,
    },
  },
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n

