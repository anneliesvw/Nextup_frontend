import io from 'socket.io-client';

const CHAT_URL = process.env.CHAT_ENDPOINT;
const socket = io(CHAT_URL, { query: { token: localStorage.getItem('NEXTUP_TOKEN') } });

socket.on('connect', () => window.console.log('connected socket2'));

const subscribeToEvents = (groupId, savedMessages, chatmessage) => {
  socket.emit('getMyMessages', groupId);
  window.console.log('subscribing to events for group', groupId);
  socket.on('error', () => console.log('socket error, check logs'));
  socket.on('savedMessages', dbEntry => {
    window.console.log('savedmessages received ', dbEntry);
    if (dbEntry && groupId === dbEntry.roomname) {
      window.console.log('matching ids', groupId, dbEntry.roomname);
      savedMessages(dbEntry.messages);
    }
  });
  socket.on('chatMessage', dbEntry => {
    chatmessage(dbEntry);
  });
};


const sendMessage = messageObject => {
  window.console.log('emitting', messageObject);
  socket.emit('chatMessage', messageObject);
};

export default {
  subscribeToEvents,
  sendMessage,
};

