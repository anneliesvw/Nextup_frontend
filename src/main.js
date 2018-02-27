import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueSocketio from 'vue-socket.io';
import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/en';
import router from './router';
import store from './store/store';
import App from './App.vue';
import './styles/index.scss';

Vue.use(VueSocketio, 'https://nextup-chat.herokuapp.com');
Vue.use(ElementUI, { locale });

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'places',
  },
});

/* eslint-disable */
const app = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App),
});
