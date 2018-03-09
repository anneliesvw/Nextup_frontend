import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const API_ENDPOINT = `${API_URL}/api/tags`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const getTags = (tag, onSuccess, onError) => {
  axios.get(`${API_ENDPOINT}?name=${tag}`, getHeader()).then(onSuccess, onError);
};

export default {
  getTags,
};
