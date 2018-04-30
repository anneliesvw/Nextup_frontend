import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

// const SOCK_ENDPOINT = 'sockets';
// const SOCK_NAME = 'location-websocket';
const TOKEN = localStorage.getItem('NEXTUP_TOKEN');
const sock = new SockJS(`${process.env.API_ENDPOINT}/ws?access_token=${TOKEN}`);
const ws = Stomp.over(sock);
const connectionPromise = new Promise((resolve, reject) => {
  ws.connect({
    Authorization: `Bearer ${TOKEN}`,
  }, resolve, reject);
});


const subscribeToEvent = (eventId, callback) => ws.subscribe(`/locations/event/${eventId}`, callback);


export default {
  sock,
  subscribeToEvent,
  connectionPromise,
};
