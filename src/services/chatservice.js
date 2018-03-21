import io from 'socket.io-client';

const CHAT_URL = process.env.CHAT_ENDPOINT;
let socket = {};

const init = () => {
  socket = io(CHAT_URL, { query: { token: localStorage.getItem('NEXTUP_TOKEN') } });
  socket.on('connect', () => window.console.log('connected to chat socket'));
};

const subscribeToEvents = (groupId, savedMessages, chatmessage) => {
  socket.emit('getMyMessages', groupId);
  socket.on('error', () => window.console.log('socket error, check logs'));
  socket.on('savedMessages', dbEntry => {
    if (dbEntry && groupId === dbEntry.roomname) {
      savedMessages(dbEntry.messages);
    }
  });
  socket.on('chatMessage', dbEntry => {
    window.console.log(dbEntry);
    if (dbEntry && groupId === dbEntry.roomname) {
      chatmessage(dbEntry);
    }
  });
};


const sendMessage = messageObject => {
  socket.emit('chatMessage', messageObject);
};

export default {
  subscribeToEvents,
  sendMessage,
  init,
};

