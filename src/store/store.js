import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    loginAttempt: '',
    groups: [],
  },
  getters: {
    getLoginAttempt: state => state.loginAttempt,
    getGroups: state => state.groups,
    getGroupById: state => id => state.groups.find(g => g.groupId === id),
  },
  mutations,
  actions,
});
