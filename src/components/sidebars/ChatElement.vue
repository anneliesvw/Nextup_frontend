<template>
  <div class="chat-element">
    <div class="chat-bubble" @click="active = !active">
      <img :src="data.url" :alt="data.name">
    </div>
    <div class="notification">1</div>
    <div>{{data.name}}</div>
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
  props: ['data'],
  data() {
    return {
      active: false,
      messages: this.data.messages,
      text: '',
    };
  },
  methods: {
    submitMessage() {
      this.messages.push({
        myMessage: true,
        text: this.text,
      });
      this.text = '';
    },
  },
};
</script>
