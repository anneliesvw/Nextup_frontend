<template>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="dashboard-container">
        <!--calendar-list></calendar-list-->
        <!-- <location-tracker></location-tracker> -->
        <generic-title>Upcoming Events</generic-title>
        <div class="dashboard-activities">
          <Activity 
            class="dashboard-activity"
            v-for="event in events" 
            :key="event.eventId"
            :event="event">
          </Activity>
        </div>
      </div>
    </div>
</template>

<script>
import LocationTracker from '../components/events/LocationTracker.vue';
import Activity from '../components/activities/Activity.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';
import CalendarList from '../components/activities/calendar/CalendarList.vue';
import GenericTitle from '../components/layout_misc/GenericTitle.vue';

export default {
  components: {
    Activity,
    Sidebar,
    CalendarList,
    LocationTracker,
    GenericTitle,
  },
  computed: {
    events() {
      const events = this.$store.getters.getGroupEvents;
      return events.sort((a, b) => a.startDate > b.startDate);
    },
  },
};
</script>
