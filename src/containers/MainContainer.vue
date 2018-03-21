<template>
    <div class="main-container">
      <CreateEvent
        v-if="eventDialogVisible"
        :isVisible="true"
        :isUserEvent="true"
        @close="closeEventDialog">
      </CreateEvent>
      <!--Sidebar @filterGroup="filterGroup($event)"></Sidebar-->
      <div class="app-sidebar">
        <div class="groups">
          <div class="groups-header">
            {{$t("sidebar.title")}}
          </div>
          <div class="checkboxes">
            <el-checkbox-group v-model="groups">
                <el-checkbox 
                  v-for="group in allGroups" 
                  :key="group.groupId"
                  :label="group.groupId">
                  {{group.name}}
                </el-checkbox>
              </el-checkbox-group>
          </div>
        </div>
      </div>
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
            v-for="event in allEvents" 
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
import EventService from './../services/eventservice';

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
      attendingPublicEvents: [],
    };
  },
  mounted() {
    this.groups = this.$store.getters.getGroups.map(g => g.groupId);
    EventService.getEventsForUser(
      this.$store.getters.getUserDetails.userId,
      res => {
        this.attendingPublicEvents = res.data;
      },
    );
  },
  computed: {
    events() {
      let events = this.$store.getters.getGroupEvents;
      events = events.filter(e => this.groups.findIndex(g => g === e.groupOwner.groupId) >= 0);
      events = events.concat(this.$store.getters.getUserEvents);
      events.concat(this.attendingPublicEvents);
      events.sort((a, b) => a.startDate > b.startDate);
      // const uniqueList = [...new Set(events)];
      // return uniqueList;
      return events;
    },
    allEvents() {
      const all = [...this.events];
      this.attendingPublicEvents.forEach(e => {
        const eventIndex = this.events.findIndex(event => event.eventId === e.eventId);
        if (eventIndex < 0) all.push(e);
      });
      all.sort((a, b) => a.startDate > b.startDate);
      return all;
    },
    allGroups() {
      return this.$store.getters.getGroups;
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
