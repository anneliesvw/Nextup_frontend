import io from 'socket.io-client';

const CHAT_URL = process.env.CHAT_ENDPOINT;
const socket = io(CHAT_URL);

socket.on('connect', () => window.console.log('connected socket2'));

const subscribeToEvents = (groupId, chatmessage) => {
  socket.on('error', () => console.log('fdfs'));
  socket.on('savedmessage', message => {
    if (groupId === message.room) chatmessage(message.message);
  });
};

const connectToRoom = groupId => {
  window.console.log('joining room', groupId);
  socket.emit('joinroom', groupId);
};

export default {
  subscribeToEvents,
  connectToRoom,
};

