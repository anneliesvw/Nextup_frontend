import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Main from '../containers/MainContainer.vue';
import CreateGroup from '../containers/CreateGroup.vue';

Vue.use(Router);
Vue.use(ElementUI);

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
  ],
});
