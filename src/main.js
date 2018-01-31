import Vue from 'vue';
import router from './router';
// import store from './store';
import App from './App.vue';
import './styles/index.scss';

/* eslint-disable */
const app = new Vue({
  router,
  // store,
  el: '#app',
  render: h => h(App),
});

