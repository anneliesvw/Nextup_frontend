<template>
  <div class="chat-wrapper">
    <!-- TODO: key vfor -->
    <chat-element v-for="group in getGroups" :key="group.groupId" :group="group">
    </chat-element>
    <!-- TODO: create new chat functionality -->
    <div class="new-chat chat-bubble">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import ChatElement from './ChatElement.vue';

  export default {
    sockets: {
      connect() {
        console.log('socket connected');
        this.getGroups.forEach(group => {
          this.$socket.emit('joinroom', `${group.groupId}_${group.name}`);
        });
      },
      chatmessage(val) {
        console.log(`received chatmessage event from socket ${val}`);
      },
    },
    data() {
      return {
        // TODO: use API
        testData: [{
          name: 'Trump',
          url: 'https://i.imgur.com/iO1VTVZ.png',
          messages: [{
            myMessage: true,
            text: 'bla bla bla',
          },
          {
            myMessage: false,
            text: 'zeer zeker',
          },
          ],
        }],
      };
    },
    computed: {
      ...mapGetters(['getGroups']),
    },
    components: {
      ChatElement,
    },
  };
</script>