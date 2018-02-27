<template>
  <div class="chat-wrapper">
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
        window.console.log('socket connected');
        const groupsclone = this.getGroups;
        window.console.log(groupsclone);
      },
      chatmessage(val) {
        window.console.log(`received chatmessage event from socket ${val}`);
      },
    },
    computed: {
      ...mapGetters(['getGroups']),
    },
    watch: {
      getGroups(groups) {
        groups.forEach(group => {
          this.$socket.emit('joinroom', `${group.groupId}_${group.name}`);
          window.console.log(`joined room ${group.groupId}_${group.name}`);
        });
      },
    },
    components: {
      ChatElement,
    },
  };
</script>