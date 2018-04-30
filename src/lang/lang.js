import store from '../store/store';
import en from './languages/en.json';
import nl from './languages/nl.json';

const locale = store.state.language;

const messages = {
  en,
  nl,
};

const i18n = {
  locale,
  messages,
};

export default i18n;
