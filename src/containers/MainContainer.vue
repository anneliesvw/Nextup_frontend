<template>
    <div class="main-container">
      <Sidebar @filterGroup="filterGroup($event)"></Sidebar>
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
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    this.groups = this.$store.getters.getGroups.map(g => g.groupId);
  },
  computed: {
    events() {
      const events = this.$store.getters.getGroupEvents;
      return events.filter(e => this.groups.findIndex(g => g === e.groupOwner.groupId) >= 0)
        .sort((a, b) => a.startDate > b.startDate);
    },
  },
  methods: {
    filterGroup(groupId) {
      window.console.log(groupId);
      const groupIndex = this.groups.findIndex(g => g === groupId);
      if (groupIndex < 0) this.groups.splice(groupIndex, 1);
      else this.groups.push(groupId);
    },
  },
};
</script>
