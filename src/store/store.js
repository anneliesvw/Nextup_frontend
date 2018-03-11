import Vue from 'vue';
import Vuex from 'vuex';
import GroupsApi from '../services/groupservice';
import UserApi from '../services/userservice';
import AuthApi from '../services/authservice';
import EventApi from '../services/eventservice';
import InvitationApi from '../services/invitationservice';

const logger = window.console;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    loginAttempt: '',
    groups: [],
    personalEvents: [],
    suggestedEvents: [],
    userDetails: null,
    invitations: [],
  },
  getters: {
    getLoginAttempt: state => state.loginAttempt,
    getGroups: state => state.groups,
    getGroupById: state => id => state.groups.find(g => g.groupId === id),
    getUserDetails: state => state.userDetails,
    getInvitations: state => state.invitations,
    getGroupEvents: state => {
      const events = [];
      state.groups.map(g => g.events.map(e => events.push(e)));
      return events;
    },
    getEventById: (state, getters) => id =>
      state.personalEvents
        .concat(state.suggestedEvents)
        .concat(getters.getGroupEvents)
        .find(e => parseInt(e.eventId, 10) === parseInt(id, 10))
    ,
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
    deleteGroup: (state, group) => {
      const index = state.groups.indexOf(group);
      state.groups.splice(index, 1);
    },
    setUserDetails: (state, payload) => {
      state.userDetails = payload;
    },
    addPollToGroup: (state, payload) => {
      const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
      if (groupIndex >= 0) state.groups[groupIndex].polls.push(payload.pollInfo);
    },
    updatePoll: (state, payload) => {
      const groupIndex = state.groups.findIndex(g => payload.group === g.groupId);
      if (groupIndex >= 0) {
        const index = state.groups[groupIndex].polls.findIndex(p => payload.pollId === p.pollId);
        if (index >= 0) Vue.set(state.groups[groupIndex].polls, index, payload);
      }
    },
    addEventToGroup: (state, payload) => {
      const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
      if (groupIndex >= 0) state.groups[groupIndex].events.push(payload.eventInfo);
    },
    updateUser: (state, payload) => {
      state.userDetails = payload;
    },
    addAttendingUserToEvent: (state, payload) => {
      state.groups = state.groups.map(g => {
        const eventIndex = g.events.findIndex(e => e.eventId === payload.eventId);
        if (eventIndex >= 0) g.events[eventIndex].users.push(payload.userInfo);
        return g;
      });
    },
    removeAttendingUserFromEvent: (state, payload) => {
      state.groups = state.groups.map(g => {
        const eventIndex = g.events.findIndex(e => e.eventId === payload.eventId);
        if (eventIndex >= 0) {
          const userIndex = g.events[eventIndex].users.findIndex(u => u.userId === payload.userId);
          g.events[eventIndex].users.splice(userIndex, 1);
        }
        return g;
      });
    },
    setInvitations: (state, invitations) => {
      state.invitations = invitations;
    },
    removeInvite: (state, inviteId) => {
      const inviteIndex = state.invitations.findIndex(i => i.id === inviteId);
      state.invitations.splice(inviteIndex, 1);
    },
    addVoteToPollOption: (state, payload) => {
      const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
      if (groupIndex >= 0) {
        const group = state.groups[groupIndex];
        const pollIndex = group.polls.findIndex(p => payload.pollId === p.pollId);
        if (pollIndex >= 0) {
          const poll = group.polls[pollIndex];
          poll.pollOptions.forEach(p => {
            const userIndex = p.voters.findIndex(v => v.userId === state.userDetails.userId);
            if (userIndex >= 0) p.voters.splice(userIndex, 1);
          });
          const index = poll.pollOptions.findIndex(p => payload.pollOptionId === p.id);
          if (index >= 0) {
            const pollOption = poll.pollOptions[index];
            pollOption.voters.push(state.userDetails);
          }
        }
      }
    },
  },
  actions: {
    setLoginAttempt: ({ commit }, payload) => {
      commit('setLoginAttempt', payload);
    },
    loadGroups: ({ commit, state }) => {
      GroupsApi.getGroups(
        state.userDetails.userId,
        res => {
          commit('setGroups', res.data);
        },
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
    deleteGroup: ({ commit }, payload) => {
      GroupsApi.deleteGroup(
        payload.groupInfo,
        res => {
          logger.log('group succesfully deleted');
          commit('deleteGroup', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to delete group', err);
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
    deleteUserFromGroup: ({ commit }, payload) => {
      GroupsApi.deleteUserFromGroup(
        payload.userId,
        payload.groupId,
        res => {
          logger.log('user succesfully deleted from group.');
          commit('updateGroup', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to delete user from group', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    deleteTagFromUser: ({ commit }, payload) => {
      UserApi.deleteTagFromUser(
        payload.userId,
        payload.tagId,
        res => {
          logger.log('tag succesfully deleted from user.');
          commit('updateUser', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to delete tag from user', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    addPoll: ({ commit }, payload) => {
      GroupsApi.addPollToGroup(
        payload.poll,
        res => {
          logger.log('poll succesfully added to group');
          commit('addPollToGroup', {
            groupId: payload.poll.groupId,
            pollInfo: res.data,
          });
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to add poll to group', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    addTag: ({ commit }, payload) => {
      UserApi.addTagToUser(
        payload,
        res => {
          logger.log('tag succesfully added to user');
          commit('updateUser', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to add tag to user', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    removePoll: ({ commit }, payload) => {
      GroupsApi.deletePollFromGroup(
        payload.groupId,
        payload.pollId,
        res => {
          logger.log('poll succesfully deleted');
          commit('updateGroup', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to remove poll', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    updatePoll: ({ commit }, payload) => {
      GroupsApi.updatePollFromGroup(
        payload.groupId,
        payload.poll,
        res => {
          logger.log('poll succesfully updated');
          commit('updatePoll', payload.poll);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to update poll', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    updateUser: ({ commit }, payload) => {
      UserApi.updateUser(
        payload.user,
        res => {
          logger.log('user succesfully updated');
          commit('updateUser', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to update user', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    updatePassword: ({ commit }, payload) => {
      UserApi.updatePassword(
        payload,
        res => {
          logger.log('password succesfully updated');
          commit('updateUser', res.data);
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log('unable to update password', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    addEventToGroup: ({ commit }, payload) => {
      GroupsApi.addEventToGroup(
        payload.groupId,
        payload.eventInfo,
        res => {
          logger.log(`event successfully added to group ${payload.groupId}`);
          commit('addEventToGroup', {
            groupId: payload.groupId,
            eventInfo: res.data,
          });
          if (payload.onSuccess) payload.onSuccess(res);
        },
        err => {
          logger.log(`error whilst adding event to group with id ${payload.groupId}`, err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    loadUserDetails: ({ commit, dispatch }) => {
      AuthApi.getUserDetails(
        res => {
          logger.log('Current user details succesfully loaded.');
          commit('setUserDetails', res.data);
          dispatch('loadInvitations');
          dispatch('loadGroups');
        },
        err => {
          logger.log('Unable to load current user details', err);
        },
      );
    },
    addAttendingUserToEvent: ({ commit }, payload) => {
      EventApi.addAttendingUserToEvent(
        payload.eventId,
        () => {
          logger.log(`added user (${payload.userInfo.userId}) as attendee to event (${payload.eventId})`);
          commit('addAttendingUserToEvent', { eventId: payload.eventId, userInfo: payload.userInfo });
          if (payload.onSuccess) payload.onSuccess();
        },
        err => {
          logger.log(`Unable to add user (${payload.userInfo.userId}) to event (${payload.eventId})`, err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    removeAttendingUserFromEvent: ({ commit }, payload) => {
      EventApi.removeAttendingUserFromEvent(
        payload.eventId,
        () => {
          logger.log(`removed user (${payload.userInfo.userId}) as attendee from event (${payload.eventId})`);
          commit('removeAttendingUserFromEvent', { eventId: payload.eventId, userId: payload.userInfo.userId });
          if (payload.onSuccess) payload.onSuccess();
        },
        err => {
          logger.log(`Unable to remove user (${payload.userInfo.userId}) from event (${payload.eventId})`, err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    loadInvitations: ({ commit }) => {
      InvitationApi.loadInvitations(
        res => {
          logger.log('Invitations succesfully loaded.');
          commit('setInvitations', res.data);
        },
        err => {
          logger.log('Unable to load invitations', err);
        },
      );
    },
    acceptInvite: ({ commit }, payload) => {
      InvitationApi.acceptInvite(
        payload.inviteId,
        () => {
          logger.log('Invite succesfully accepted.');
          commit('removeInvite', payload.inviteId);
          if (payload.onSuccess) payload.onSuccess();
        },
        err => {
          logger.log('Unable to accept invite', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    ignoreInvite: ({ commit }, payload) => {
      InvitationApi.ignoreInvite(
        payload.inviteId,
        () => {
          logger.log('Invite succesfully ignored.');
          commit('removeInvite', payload.inviteId);
          if (payload.onSuccess) payload.onSuccess();
        },
        err => {
          logger.log('Unable to ingore invite', err);
          if (payload.onError) payload.onError(err);
        },
      );
    },
    voteOnPoll: ({ commit }, payload) => {
      logger.log(payload);
      GroupsApi.voteOnPoll(
        payload.groupId,
        payload.pollId,
        payload.pollOptionId,
        () => {
          logger.log('Voted succesfully');
          commit('addVoteToPollOption', payload);
          // commit('updateGroup', payload.group);
          if (payload.onSuccess) payload.onSuccess();
        },
        err => {
          logger.log('Voting failed');
          if (payload.onError) payload.onError(err);
        },
      );
    },
  },
});
