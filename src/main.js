import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueSocketio from 'vue-socket.io';
import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/en';
import router from './router';
import store from './store/store';
import App from './App.vue';
import './styles/index.scss';

// TODO: change URL
Vue.use(VueSocketio, 'https://nextup-chat.herokuapp.com');
// Vue.use(VueSocketio, 'http://localhost:3001');
Vue.use(ElementUI, { locale });

/* eslint-disable */
const app = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App),
});
