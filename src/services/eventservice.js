import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const EVENTS_URL = `${API_URL}/api/events`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const getEvent = (eventId, onSucces, onError) => {
  axios.get(`${EVENTS_URL}/${eventId}`, null, getHeader()).then(onSucces, onError);
};

export default {
  getEvent,
};
