import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // dummyvalue: 0,
  },
  getters: {
    // dummyGetter: state => {
    //   return 0;
    // }
  },
  mutations: {
    // dummyMutation: (state, payload) => {
    //   state.dummyvalue++;
    // }
  },
  actions: {
    // dummyAction: ({ commit }, payload) => {
    //   commit('dummyMutation', payload);
    // }
  },
});
