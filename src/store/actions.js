import GroupsApi from '../services/groupservice';

const logger = window.console;
const actions = {
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
};

export default actions;
