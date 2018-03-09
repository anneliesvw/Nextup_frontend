import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const API_ENDPOINT = `${API_URL}/api/invitations`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const loadInvitations = (onSuccess, onError) => {
  axios.get(`${API_ENDPOINT}`, getHeader()).then(onSuccess, onError);
};

const acceptInvite = (inviteId, onSuccess, onError) => {
  axios.put(`${API_ENDPOINT}/${inviteId}/accept`, null, getHeader()).then(onSuccess, onError);
};

const ignoreInvite = (inviteId, onSuccess, onError) => {
  axios.delete(`${API_ENDPOINT}/${inviteId}`, getHeader()).then(onSuccess, onError);
};

export default {
  loadInvitations,
  acceptInvite,
  ignoreInvite,
};
