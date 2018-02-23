<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <calendar-item 
        v-if="dialogVisible"
        :isVisible="true"
        @close="closeDialog"
        >
        </calendar-item>
        <el-button @click="openDialog">calender item</el-button>
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
import CalendarItem from '../components/events/CreateCalendarItem.vue';

export default {
  components: {
    Activity,
    Sidebar,
    ChatMenu,
    CalendarItem,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>
