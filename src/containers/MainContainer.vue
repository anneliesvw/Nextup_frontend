<template>
    <div class="main-container">
      <CreateEvent
        v-if="eventDialogVisible"
        :isVisible="true"
        :activeGroup="activeGroup"
        :isUserEvent="true"
        @close="closeEventDialog">
      </CreateEvent>
      <Sidebar @filterGroup="filterGroup($event)"></Sidebar>
      <div class="dashboard-container">
        <!--calendar-list></calendar-list-->
        <!-- <location-tracker></location-tracker> -->
        <generic-title>Upcoming Events</generic-title>
        <div class="dashboard-activities">
          <div class="event-wrapper">
            <div class="event-add" @click="eventDialogVisible = true">
              <i class="fas fa-plus"></i>
              <span>{{$t("events.create")}}</span>
            </div>
          </div>
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
import CreateEvent from '../components/events/CreateEvent.vue';

export default {
  components: {
    Activity,
    Sidebar,
    CalendarList,
    LocationTracker,
    GenericTitle,
    CreateEvent,
  },
  data() {
    return {
      groups: [],
      eventDialogVisible: false,
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
    filterGroup(payload) {
      if (payload.event) {
        this.groups.push(payload.groupId);
      } else {
        const groupIndex = this.groups.findIndex(g => g === payload.groupId);
        this.groups.splice(groupIndex, 1);
      }
    },
    closeEventDialog() {
      this.eventDialogVisible = false;
    },
  },
};
</script>
