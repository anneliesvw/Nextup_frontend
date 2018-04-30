<template>
  <div class="chat-element">
    <div class="chat-bubble" @click="setMyselfActive">
      <img :src="avatarUrl" :alt="group.name">
    </div>
    <div class="notification" v-if="notification"></div>
    <div class="chat-group-name">{{group.name}}</div>
    <div class="chat-arrow" v-if="active" />
    <div class="chat-window" v-if="active">
      <div class="window-title">{{group.name}}</div>
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
        <el-input type="textarea" class="message-input" v-model="text" 
          @keyup.enter.native="submitMessage"
          :placeholder='$t("chat.input.enterMessage")'
          :rows="2">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatService from './../../services/chatservice';

export default {
  mounted() {
    ChatService.subscribeToEvents(
      this.group.groupId,
      messages => {
        window.console.log('received saved messages in room', this.group.groupId, messages);
        messages.forEach(msg => this.addMessage(msg));
      },
      msg => {
        window.console.log('received chat message', msg);
        this.addMessage(msg.message);
        if (!this.active) {
          this.notification = true;
        }
      },
    );
  },
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
      notification: false,
    };
  },
  computed: {
    ...mapGetters(['getUserDetails']),
    active() {
      if (this.activechat === this.group.groupId) this.notification = false;
      return this.activechat === this.group.groupId;
    },
    avatarUrl() {
      return this.group.avatarUrl ? `${process.env.OBJECT_STORE}/${this.group.avatarUrl}` : 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png';
    },
  },
  methods: {
    submitMessage() {
      const txt = this.text.trim();
      if (!txt || txt.length === 0) {
        this.text = '';
        return;
      }
      window.console.log('sending chat message', this.text);
      ChatService.sendMessage({
        roomname: this.group.groupId,
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
        this.notification = false;
      }
    },
    getUserById(id) {
      return this.group.users.filter(u => u.userId === parseInt(id, 10));
    },
    addMessage(message) {
      this.messages.push({
        myMessage: message.from === this.getUserDetails.userId,
        text: message.text,
        name: this.getUserById(message.from)[0] ? this.getUserById(message.from)[0].person.firstName : 'unknown',
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
