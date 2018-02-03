import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginAttempt: '',
  },
  getters: {
    getLoginAttempt: state => state.loginAttempt,
  },
  mutations: {
    setLoginAttempt: (state, payload) => {
      state.loginAttempt = payload;
    },
  },
  actions: {
    setLoginAttempt: ({ commit }, payload) => {
      commit('setLoginAttempt', payload);
    },
  },
});
