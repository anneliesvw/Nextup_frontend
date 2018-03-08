<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <!--calendar-list></calendar-list-->
        Welkom, je hebt niks te doen. Spijtig.
      </div>
    </div>
  </div>
</template>

<script>
import Activity from '../components/activities/Activity.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';
import CalendarList from '../components/activities/calendar/CalendarList.vue';

export default {
  components: {
    Activity,
    Sidebar,
    CalendarList,
  },
  beforeCreate() {
    this.$store.dispatch('loadGroups');
    this.$store.dispatch('loadUserDetails');
  },
};
</script>
