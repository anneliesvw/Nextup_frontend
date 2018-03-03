import Vue from 'vue';

const mutations = {
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
};

export default mutations;
