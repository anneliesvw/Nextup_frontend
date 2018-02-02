import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Main from '../containers/MainContainer.vue';
import Register from '../containers/RegisterContainer.vue';

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Main,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
});
