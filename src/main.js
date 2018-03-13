import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// import VueSocketio from 'vue-socket.io';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale/lang/en';
import router from './router';
import store from './store/store';
import App from './App.vue';
import './styles/index.scss';
import lang from './lang/lang';

// TODO: change URL
// Vue.use(VueSocketio, 'https://nextup-chat.herokuapp.com');
// Vue.use(VueSocketio, 'http://localhost:3001');
// Vue.use(VueSocketio, process.env.CHAT_ENDPOINT);
Vue.use(ElementUI, { locale });
Vue.use(VueI18n);
const i18n = new VueI18n(lang);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'places',
  },
});

/* eslint-disable */
export const app = new Vue({
  router,
  store,
  i18n,
  el: '#app',
  render: h => h(App),
});
