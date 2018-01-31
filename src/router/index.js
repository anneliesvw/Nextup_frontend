import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/matthias/boodschap',
      name: 'Matthias',
      component: Main,
    },
  ],
});
