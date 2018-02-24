<template>
  <div class="chat-element">
    <div class="chat-bubble" @click="toggleActive">
      <img src="https://i.imgur.com/iO1VTVZ.png" :alt="group.name">
    </div>
    <div class="notification" v-if="notifications>0">1</div>
    <div>{{group.name}}</div>
    <div class="chat-arrow" v-if="active" />
    <div class="chat-window" v-if="active">
      <div class="messages">
        <!-- TODO: use unique key -->
        <div v-for="(message, i) in messages" :key="i" class="message" :class="{ 'message-sent': message.myMessage, 'message-received': !message.myMessage }">{{ message.text}}</div>
      </div>
      <div class="message-box">
        <!-- TODO: add attribute type="textarea" if v-bind attribute meets character threshold -->
        <input type="text" class="message-input" v-model="text" @keyup.enter="submitMessage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: add notification functionality
  props: ['group'],
  sockets: {
    chatmessage(val) {
      if (!this.active) {
        this.notifications += 1;
      }
      this.messages.push({
        myMessage: true,
        text: val,
      });
      console.log(`received chatmessage event from socket ${val}`);
    },
  },
  data() {
    return {
      active: false,
      messages: [],
      text: '',
      notifications: 0,
    };
  },
  methods: {
    submitMessage() {
      this.$socket.emit('chatmessage', { room: `${this.group.groupId}_${this.group.name}`, message: this.text });
      this.text = '';
    },
    toggleActive() {
      this.active = !this.active;
      if (this.active) {
        this.notifications = 0;
      }
    },
  },
};
</script>
