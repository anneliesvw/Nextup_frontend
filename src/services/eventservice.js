import axios from 'axios';

const API_URL = process.env.API_ENDPOINT;
const EVENTS_URL = `${API_URL}/api/events`;
const USERS_URL = `${API_URL}/api/users`;


const getBearer = () => `Bearer ${localStorage.getItem('NEXTUP_TOKEN')}`;
const getHeader = () => ({
  headers: {
    Authorization: getBearer(),
  },
});

const getEvent = (eventId, onSuccess, onError) => {
  window.console.log('in service', eventId);
  axios.get(`${EVENTS_URL}/${eventId}`, getHeader()).then(onSuccess, onError);
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

const updateUserEvent = (userId, eventId, eventData, onSuccess, onError) => {
  axios.put(`${EVENTS_URL}/user/${userId}/event/${eventId}`, eventData, getHeader()).then(onSuccess, onError);
};

const addEventToUser = (userId, event, onSucces, onError) => {
  axios.post(
    `${EVENTS_URL}/user/${userId}`,
    event,
    getHeader(),
  ).then(onSucces, onError);
};

const deleteEventFromUser = (userId, eventId, onSuccess, onError) => {
  axios.delete(`${EVENTS_URL}/user/${userId}/event/${eventId}`, getHeader()).then(onSuccess, onError);
};

const getByFilterObject = (filterObject, onSuccess, onError) => {
  window.console.log(filterObject);
  axios.post(
    `${EVENTS_URL}/public_events`,
    filterObject,
    getHeader(),
  ).then(onSuccess, onError);
};

const getEventsForUser = (userId, onSuccess, onError) => {
  axios.get(`${USERS_URL}/${userId}/events`, getHeader()).then(onSuccess, onError);
};

export default {
  getEvent,
  addAttendingUserToEvent,
  removeAttendingUserFromEvent,
  updateEvent,
  addEventToUser,
  deleteEventFromUser,
  updateUserEvent,
  getByFilterObject,
  getEventsForUser,
};
