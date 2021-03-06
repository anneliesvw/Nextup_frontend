import Vue from 'vue';
import Router from 'vue-router';
import Main from '../containers/MainContainer.vue';
import Register from '../containers/users/RegisterContainer.vue';
import Groups from '../containers/GroupsContainer.vue';
import Users from '../containers/users/UsersContainer.vue';
import ConfirmEmail from '../containers/users/ConfirmEmail.vue';
import GroupDetail from '../containers/GroupDetailsContainer.vue';
import Event from '../components/events/EventPage.vue';
import Discover from '../containers/DiscoverContainer.vue';
import UserSettings from '../components/users/UserSettings.vue';

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
      path: '/group/detail/:groupId?',
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
      path: '/events/:id',
      name: 'Event',
      component: Event,
    },
    {
      path: '/Activities',
      name: 'Discover',
      component: Discover,
    },
    {
      path: '/Settings',
      name: 'UserSettings',
      component: UserSettings,
    },
  ],
});
