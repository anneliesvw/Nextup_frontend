<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <Activity v-for="item in 10" :key="item"></Activity>
      </div>
      <chat-menu></chat-menu>
    </div>
  </div>
</template>

<script>
import Activity from '../components/activities/Activity.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';
import ChatMenu from '../components/sidebars/ChatMenu.vue';

export default {
  components: {
    Activity,
    Sidebar,
    ChatMenu,
  },
};
</script>
