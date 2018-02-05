import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';
import CreateGroup from '../containers/CreateGroup.vue';
import Register from '../containers/users/RegisterContainer.vue';
import Groups from '../containers/GroupsContainer.vue';
import Users from '../containers/users/UsersContainer.vue';
import ConfirmEmail from '../containers/users/ConfirmEmail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Main,
    },
    {
      path: '/group/create',
      name: 'CreateGroup',
      component: CreateGroup,
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
    {
      path: '/users/:component',
      name: 'Users',
      component: Users,
    },
    {
      path: '/confirmEmail/:token',
      name: 'ConfirmEmail',
      component: ConfirmEmail,
    },
  ],
});
