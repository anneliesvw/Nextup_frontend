import Vue from 'vue';
import Vuex from 'vuex';
import GroupsApi from '../services/groupservice';

const logger = window.console;
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
  mutations: {
    setLoginAttempt: (state, payload) => {
      state.loginAttempt = payload;
    },
    addGroup: (state, group) => {
      state.groups.push(group);
    },
    setGroups: (state, groups) => {
      state.groups = groups;
    },
    updateGroup: (state, group) => {
      const groupIndex = state.groups.findIndex(g => group.groupId === g.groupId);
      if (groupIndex >= 0) Vue.set(state.groups, groupIndex, group);
    },
  },
  actions: {
    setLoginAttempt: ({ commit }, payload) => {
      commit('setLoginAttempt', payload);
    },
    loadGroups: ({ commit }) => {
      GroupsApi.getGroups(
        res => commit('setGroups', res.data),
        err => window.console.log('failed to load groups.', err),
      );
    },
    addGroup: ({ commit }, payload) => {
      GroupsApi.createGroup(
        payload.groupInfo,
        res => {
          logger.log('group successfully saved');
          commit('addGroup', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to save group', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    addUserToGroup: ({ commit }, payload) => {
      GroupsApi.addUserToGroup(
        payload.username,
        payload.groupId,
        res => {
          logger.log('user succesfully added to group.');
          commit('updateGroup', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to add user to group', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
  },
});
