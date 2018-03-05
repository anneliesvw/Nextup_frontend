<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <!--calendar-list></calendar-list-->
        Welkom, je hebt niks te doen. Spijtig.
      </div>
      <chat-menu></chat-menu>
    </div>
  </div>
</template>

<script>
import Activity from '../components/activities/Activity.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';
import ChatMenu from '../components/sidebars/ChatMenu.vue';
import CalendarList from '../components/activities/calendar/CalendarList.vue';

export default {
  components: {
    Activity,
    Sidebar,
    ChatMenu,
    CalendarList,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
