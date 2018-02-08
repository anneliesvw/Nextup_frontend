import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';
import Register from '../containers/users/RegisterContainer.vue';
import Groups from '../containers/GroupsContainer.vue';
import Users from '../containers/users/UsersContainer.vue';
import ConfirmEmail from '../containers/users/ConfirmEmail.vue';
import GroupDetail from '../containers/GroupDetailContainer.vue';
import Events from '../containers/EventsContainer.vue';
import Discover from '../containers/DiscoverContainer.vue';

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
      path: '/group/detail',
      name: 'GroupDetail',
      component: GroupDetail,
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
    {
      path: '/group/event',
      name: 'Event',
      component: Events,
    },
    {
      path: '/Activities',
      name: 'Discover',
      component: Discover,
    },
  ],
});
