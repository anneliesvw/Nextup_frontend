import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// import VueSocketio from 'vue-socket.io';
import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/en';
import router from './router';
import store from './store/store';
import App from './App.vue';
import './styles/index.scss';

Vue.use(ElementUI, { locale });

/* eslint-disable */
export const app = new Vue({
  router,
  store,
  i18n,
  el: '#app',
  render: h => h(App),
});
