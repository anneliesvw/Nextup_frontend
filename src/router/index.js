import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';
import Register from '../containers/RegisterContainer.vue';
import Groups from '../containers/GroupsContainer.vue';

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
    {
      path: '/mygroups',
      name: 'MyGroups',
      component: Groups,
    },
  ],
});
