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
        <div v-for="(message, i) in messages" 
          :key="i" class="message" 
          :class="{ 'message-sent': message.myMessage, 'message-received': !message.myMessage }">
          <div class="message-name" v-if="!message.myMessage">{{ message.name }}</div>
          <div class="message-content">{{ message.text }}</div>
        </div>
      </div>
      <div class="message-box">
        <!-- TODO: add attribute type="textarea" if v-bind attribute meets character threshold -->
        <input type="text" class="message-input" v-model="text" @keyup.enter="submitMessage">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['group'],
  sockets: {
    chatmessage(val) {
      if (!this.active) {
        this.notifications += 1;
      }
      window.console.log(val.from);
      this.messages.push({
        myMessage: val.from === this.getUserDetails.userId,
        text: val.text,
        name: this.getUserById(val.from)[0].person.firstName || 'unknown',
      });
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
  computed: {
    ...mapGetters(['getUserDetails']),
  },
  methods: {
    submitMessage() {
      this.$socket.emit('chatmessage', {
        room: `${this.group.groupId}_${this.group.name}`,
        message: {
          from: this.getUserDetails.userId,
          text: this.text,
        },
      });
      this.text = '';
    },
    toggleActive() {
      this.active = !this.active;
      if (this.active) {
        this.notifications = 0;
      }
    },
    getUserById(id) {
      return this.group.users.filter(u => u.userId === parseInt(id, 10));
    },
  },
};
</script>
