import i18next from 'i18next';

import en from './locales/en';
import ru from './locales/ru';

i18next.init({
  lng: 'ru-RU',
  fallbackLng: 'en',
  resources: {
    en,
    ru,
  },
});

export default i18next;
