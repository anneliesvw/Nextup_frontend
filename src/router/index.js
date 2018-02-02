import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';
import Register from '../containers/RegisterContainer.vue';

Vue.use(Router);

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
