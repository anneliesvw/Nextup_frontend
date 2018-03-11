import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const GROUPS_URL = `${API_URL}/api/groups`;
const INVITATIONS_URL = `${API_URL}/api/invitations`;
const EVENTS_URL = `${API_URL}/api/events`;
const USERS_URL = `${API_URL}/api/users`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const getGroups = (userId, onSucces, onError) => {
  axios.get(`${USERS_URL}/${userId}/groups`, getHeader()).then(onSucces, onError);
};

const getGroup = (groupId, onSucces, onError) => {
  axios.get(`${GROUPS_URL}/${groupId}`, null, getHeader()).then(onSucces, onError);
};

const createGroup = (groupInfo, onSucces, onError) => {
  axios.post(
    GROUPS_URL,
    groupInfo,
    getHeader(),
  ).then(onSucces, onError);
};

const deleteGroup = (groupInfo, onSucces, onError) => {
  axios.delete(
    `${GROUPS_URL}/${groupInfo}`,
    getHeader(),
  ).then(onSucces, onError);
};

const addUserToGroup = (username, groupId, onSucces, onError) => {
  axios.post(
    `${INVITATIONS_URL}/group/${groupId}`,
    {
      username,
    },
    getHeader(),
  ).then(onSucces, onError);
};

const deleteUserFromGroup = (userId, groupId, onSucces, onError) => {
  axios.delete(
    `${GROUPS_URL}/${groupId}/users/${userId}`,
    getHeader(),
  ).then(onSucces, onError);
};

const getPollsFromGroup = (groupId, onSucces, onError) => {
  axios.get(
    `${GROUPS_URL}/${groupId}/polls`,
    getHeader(),
  ).then(onSucces, onError);
};

const addPollToGroup = (payload, onSucces, onError) => {
  axios.post(
    `${GROUPS_URL}/${payload.groupId}/polls`,
    payload,
    getHeader(),
  ).then(onSucces, onError);
};

const deletePollFromGroup = (groupId, pollId, onSucces, onError) => {
  axios.delete(
    `${GROUPS_URL}/${groupId}/polls/${pollId}`,
    getHeader(),
  ).then(onSucces, onError);
};

const updatePollFromGroup = (groupId, poll, onSucces, onError) => {
  poll.group = groupId;
  axios.put(
    `${GROUPS_URL}/${groupId}/polls/${poll.pollId}`,
    poll,
    getHeader(),
  ).then(onSucces, onError);
};

const getEventsFromGroup = (groupId, onSucces, onError) => {
  axios.get(
    `${EVENTS_URL}/group/${groupId}`,
    getHeader(),
  ).then(onSucces, onError);
};

const addEventToGroup = (groupId, event, onSucces, onError) => {
  axios.post(
    `${EVENTS_URL}/group/${groupId}`,
    event,
    getHeader(),
  ).then(onSucces, onError);
};

const voteOnPoll = (groupId, pollId, pollOptionId, onSuccess, onError) => {
  axios.put(
    `${GROUPS_URL}/${groupId}/polls/${pollId}/${pollOptionId}`,
    null,
    getHeader(),
  ).then(onSuccess, onError);
};

export default {
  getGroups,
  getGroup,
  createGroup,
  addUserToGroup,
  deleteUserFromGroup,
  deleteGroup,
  getPollsFromGroup,
  addPollToGroup,
  deletePollFromGroup,
  updatePollFromGroup,
  getEventsFromGroup,
  addEventToGroup,
  voteOnPoll,
};

