import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

// const SOCK_ENDPOINT = 'sockets';
// const SOCK_NAME = 'location-websocket';
const TOKEN = localStorage.getItem('NEXTUP_TOKEN');
const sock = new SockJS(`http://localhost:3000/ws?access_token=${TOKEN}`);
const ws = Stomp.over(sock);

ws.connect({
  Authorization: `Bearer ${TOKEN}`,
}, () => {
  ws.subscribe('/locations/event/1', msg => {
    window.console.log(msg);
  });
  ws.send('/location_sharing/event/1', JSON.stringify({
    location: {
      longitude: 0.12345,
      latitude: 0.2233334,
    },
    userId: 1,
  }));
});

export default {
  sock,
};
