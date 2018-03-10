<template>
  <div class="chat-element">
    <div class="chat-bubble" @click="setMyselfActive">
      <img :src="avatarUrl" :alt="group.name">
    </div>
    <div class="notification" v-if="notifications>0">1</div>
    <div class="chat-group-name">{{group.name}}</div>
    <div class="chat-arrow" v-if="active" />
    <div class="chat-window" v-if="active">
      <div id="messagebox" class="messages">
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
  props: ['group', 'activechat'],
  sockets: {
    savedmessage(val) {
      if (val.room === `${this.group.groupId}_${this.group.name}`) {
        this.$nextTick(() => this.addMessage(val));
      }
    },
    chatmessage(val) {
      if (val.room === `${this.group.groupId}_${this.group.name}`) {
        if (!this.active) {
          this.notifications += 1;
        }
        this.addMessage(val);
      }
    },
  },
  data() {
    return {
      messages: [],
      text: '',
      notifications: 0,
    };
  },
  computed: {
    ...mapGetters(['getUserDetails']),
    active() {
      return this.activechat === this.group.groupId;
    },
    avatarUrl() {
      return this.group.avatarUrl ? `${process.env.OBJECT_STORE}/${this.group.avatarUrl}` : 'https://i.imgur.com/iO1VTVZ.png';
    },
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
    addMessage(messageObject) {
      this.messages.push({
        myMessage: messageObject.message.from === this.getUserDetails.userId,
        text: messageObject.message.text,
        name: this.getUserById(messageObject.message.from)[0] ? this.getUserById(messageObject.message.from)[0].person.firstName : 'unknown',
      });
    },
    setMyselfActive() {
      this.$emit('activechat', this.group.groupId === this.activechat ? -1 : this.group.groupId);
    },
  },
  updated() {
    const container = this.$el.querySelector('#messagebox');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },
};
</script>
