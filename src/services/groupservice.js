import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const GROUPS_URL = `${API_URL}/api/groups`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const getGroups = (onSucces, onError) => {
  axios.get(GROUPS_URL, getHeader()).then(onSucces, onError);
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
    `${GROUPS_URL}/${groupId}/users`,
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

export default {
  getGroups,
  getGroup,
  createGroup,
  addUserToGroup,
  deleteUserFromGroup,
  deleteGroup,
};

