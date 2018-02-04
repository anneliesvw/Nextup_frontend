<template>
  <div class="chat-wrapper">
    <!-- TODO: key vfor -->
    <chat-element v-for="testchat in testData" :key="testchat.name" :data="testchat" >
    </chat-element>
    <!-- TODO: create new chat functionality -->
    <div class="new-chat chat-bubble">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>
<script>
import ChatElement from './ChatElement.vue';

export default {
  data() {
    return {
      // TODO: use API
      testData: [
        {
          name: 'Trump',
          url: 'https://i.imgur.com/iO1VTVZ.png',
          messages: [
            {
              myMessage: true,
              text: 'bla bla bla',
            },
            {
              myMessage: false,
              text: 'zeer zeker',
            },
          ],
        },
      ],
    };
  },
  components: {
    ChatElement,
  },
};
</script>
