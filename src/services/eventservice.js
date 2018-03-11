import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const EVENTS_URL = `${API_URL}/api/events`;

const getHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`,
  },
});

const getEvent = (eventId, onSuccess, onError) => {
  axios.get(`${EVENTS_URL}/${eventId}`, null, getHeader()).then(onSuccess, onError);
};

const addAttendingUserToEvent = (eventId, onSuccess, onError) => {
  axios.post(`${EVENTS_URL}/${eventId}/attend`, null, getHeader()).then(onSuccess, onError);
};

const removeAttendingUserFromEvent = (eventId, onSuccess, onError) => {
  axios.post(`${EVENTS_URL}/${eventId}/notgoing`, null, getHeader()).then(onSuccess, onError);
};

const updateEvent = (eventId, eventData, onSuccess, onError) => {
  axios.put(`${EVENTS_URL}/${eventId}`, eventData, getHeader()).then(onSuccess, onError);
};

export default {
  getEvent,
  addAttendingUserToEvent,
  removeAttendingUserFromEvent,
  updateEvent,
};
