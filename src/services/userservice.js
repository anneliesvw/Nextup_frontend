import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const API_ENDPOINT = `${API_URL}/api/users`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const updateUser = (userDetails, onSuccess, onError) => {
  axios.put(`${API_ENDPOINT}/update`, userDetails, getHeader()).then(onSuccess, onError);
};

const addTagToUser = (payload, onSucces, onError) => {
  axios
    .post(`${API_ENDPOINT}/${payload.userId}/tags`, payload.tagname, getHeader())
    .then(onSucces, onError);
};

const deleteTagFromUser = (userId, tagname, onSucces, onError) => {
  axios.delete(`${API_ENDPOINT}/${userId}/users/${tagname}`, getHeader()).then(onSucces, onError);
};
export default {
  updateUser,
  addTagToUser,
  deleteTagFromUser,
};
