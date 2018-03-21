import Vue from 'vue';
import Vuex from 'vuex';
import { app } from '../main';

Vue.use(Vuex);

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
  deleteGroup: (state, groupId) => {
    const index = state.groups.findIndex(g => g.groupId === groupId);
    if (index >= 0) state.groups.splice(index, 1);
  },
  setUserDetails: (state, payload) => {
    state.userDetails = payload;
  },
  addPollToGroup: (state, payload) => {
    const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
    if (groupIndex >= 0) state.groups[groupIndex].polls.push(payload.pollInfo);
  },
  updatePoll: (state, payload) => {
    window.console.log(payload);
    payload.pollOptions.forEach(p => {
      if (p.voters == null) p.voters = [];
    });
    const groupIndex = state.groups.findIndex(g => payload.group === g.groupId);
    if (groupIndex >= 0) {
      const index = state.groups[groupIndex].polls.findIndex(p => payload.pollId === p.pollId);
      if (index >= 0) Vue.set(state.groups[groupIndex].polls, index, payload);
    }
  },
  removePoll: (state, payload) => {
    const groupIndex = state.groups.findIndex(g => g.groupId === payload.groupId);
    if (groupIndex >= 0) {
      const group = state.groups[groupIndex];
      const pollIndex = group.polls.findIndex(p => p.pollId === payload.pollId);
      if (pollIndex >= 0) state.groups[groupIndex].polls.splice(pollIndex, 1);
    }
  },
  addEventToGroup: (state, payload) => {
    const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
    if (groupIndex >= 0) state.groups[groupIndex].events.push(payload.eventInfo);
  },
  addEventToUser: (state, payload) => {
    state.userDetails.ownedEvents.push(payload.eventInfo);
  },
  removeEventFromGroup: (state, payload) => {
    const groupIndex = state.groups.findIndex(g => payload.groupId === g.groupId);
    const eventIndex = state.groups[groupIndex].events.findIndex(e => e.eventId === payload.eventId);
    if (eventIndex >= 0) state.groups[groupIndex].events.splice(eventIndex, 1);
  },
  removeEventFromUser: (state, payload) => {
    const index = state.userDetails.ownedEvents.findIndex(e => payload.eventId === e.eventId);
    if (index >= 0) state.userDetails.ownedEvents.splice(index, 1);
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
  changeLanguage: (state, lang) => {
    state.language = lang;
    app.$i18n.locale = lang;
  },
  updateEvent: (state, payload) => {
    state.groups = state.groups.map(g => {
      const eventIndex = g.events.findIndex(e => e.eventId === payload.eventId);
      g.events[eventIndex] = payload;
      return g;
    });
  },
  updateUserEvent: (state, payload) => {
    window.console.log(payload);
    const index = state.userDetails.ownedEvents.findIndex(e => payload.eventId === e.eventId);
    if (index >= 0) state.userDetails.ownedEvents[index] = payload;
  },
};

export default mutations;
