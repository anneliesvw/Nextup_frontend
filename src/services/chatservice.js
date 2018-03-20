import io from 'socket.io-client';

const CHAT_URL = process.env.CHAT_ENDPOINT;
const socket = io(CHAT_URL, { query: { token: localStorage.getItem('NEXTUP_TOKEN') } });

socket.on('connect', () => window.console.log('connected to chat socket'));

const subscribeToEvents = (groupId, savedMessages, chatmessage) => {
  socket.emit('getMyMessages', groupId);
  socket.on('error', () => window.console.log('socket error, check logs'));
  socket.on('savedMessages', dbEntry => {
    if (dbEntry && groupId === dbEntry.roomname) {
      savedMessages(dbEntry.messages);
    }
  });
  socket.on('chatMessage', dbEntry => {
    chatmessage(dbEntry);
  });
};


const sendMessage = messageObject => {
  socket.emit('chatMessage', messageObject);
};

export default {
  subscribeToEvents,
  sendMessage,
};

