<template>
  <div class="chat-wrapper">
    <chat-element v-for="group in getGroups" :key="group.groupId" :group="group" @activechat="setActiveChat" :activechat="activechat">
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
    data() {
      return {
        activechat: -1,
      };
    },
    computed: {
      ...mapGetters(['getGroups']),
    },
    methods: {
      setActiveChat(id) {
        this.activechat = id;
      },
    },
    components: {
      ChatElement,
    },
  };
</script>