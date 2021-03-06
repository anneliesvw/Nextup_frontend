<template>
  <div class="event-wrapper" v-if="eventData">
    <div class="event-content">
      <banner :title="eventData.name" :image="backgroundImage">
        <div>
          <el-button type="primary" @click="attendEvent" v-if="!isUserAttending && this.eventData.groupOwner">Attend</el-button>
          <el-button type="success" @click="removeAttendance" v-if="isUserAttending && this.eventData.groupOwner">Attending</el-button>
          <el-button type="info" class="admin-edit" v-if="isAdmin" @click="editing = !editing">
            <i class="fas fa-edit"></i>
            {{$t("eventPage.buttons.edit")}}
          </el-button>
          <el-button type="danger" class="admin-edit" v-if="isAdmin" @click="removeActivity()">
            <i class="fas fa-trash"></i>
            {{$t("eventPage.buttons.delete")}}
          </el-button>
        </div>
      </banner>
      <generic-title>{{$t("eventPage.titles.general")}}</generic-title>
      <div class="event-general-info event-generic">
        <i class="far fa-calendar-alt fa-1x"></i>
        <div class="event-startDate">
          {{ startDate }} | {{ endDate }}
        </div>
        <i class="fas fa-users fa-1x" v-if="this.eventData.groupOwner"></i>
        <div class="event-organiser" v-if="this.eventData.groupOwner">
          {{ eventData.groupOwner.name }}
        </div>
        <i class="fas fa-map-marker"></i>
        <div class="event-location">
          {{ eventData.location.name}}
        </div>
        <i class="fas fa-bullhorn" v-if="!eventData.private"></i>
        <div v-if="!eventData.private">{{$t("eventPage.isPublic")}}</div>
        <i class="fas fa-user-secret" v-if="eventData.private"></i>
        <div v-if="eventData.private">{{$t("eventPage.isPrivate")}}</div>
        <i class="fas fa-tags"></i>
        <div v-if="eventData.tags.length > 0">
          <el-tag v-for="tag in eventData.tags" :key="tag.tagname">{{tag.tagname}}</el-tag>
        </div>
        <span v-else>{{$t("eventPage.noTags")}}</span>
      </div>
      <generic-title>{{$t("eventPage.titles.location")}}</generic-title>
      <div class="event-generic event-location-tracker">
        <location-tracker :event="eventData"></location-tracker>
      </div>
      <generic-title>{{$t("eventPage.titles.description")}}</generic-title>
      <div class="event-description event-generic">
        {{ eventData.description }}
      </div>
      <div v-if="this.eventData.groupOwner">
        <generic-title>{{$t("eventPage.titles.attending")}}</generic-title>
        <div class="event-members event-generic">
          <user-card v-for="user in eventData.users" :key="user.userId" :user="user"></user-card>
        </div>
      </div>
      <create-event :event-data="editableObject" :isVisible="true" v-if="editing" @close="editing = false"></create-event>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import GenericTitle from '../layout_misc/GenericTitle.vue';
import Banner from '../layout_misc/Banner.vue';
import PatternGenerator from '../../services/patterngenerator';
import UserCard from '../users/UserCard.vue';
import CreateEvent from '../events/CreateEvent.vue';
import LocationTracker from './LocationTracker.vue';
import EventService from './../../services/eventservice';

export default {
  components: {
    LocationTracker,
    GenericTitle,
    Banner,
    UserCard,
    CreateEvent,
  },
  data() {
    return {
      editing: false,
      eventData: null,
      public: false,
    };
  },
  mounted() {
    this.eventData = this.getEventById(parseInt(this.$route.params.id, 10)) ||
    EventService.getEvent(parseInt(this.$route.params.id, 10), g => {
      this.eventData = g.data; this.public = true;
    });
  },
  computed: {
    ...mapGetters(['getEventById', 'getUserDetails', 'getGroupById']),
    backgroundImage() {
      return this.eventData.avatarUrl ? `url(${process.env.OBJECT_STORE}/${this.eventData.avatarUrl})` : PatternGenerator.generateImage(`${Math.random() * 2345}`);
    },
    startDate() {
      return moment(this.eventData.startDate).format('DD/MM/YYYY HH:mm');
    },
    endDate() {
      return moment(this.eventData.endDate).format('DD/MM/YYYY HH:mm');
    },
    isUserAttending() {
      return this.getUserDetails && this.eventData.groupOwner ?
        this.eventData.users.find(u => u.userId === this.getUserDetails.userId)
        : false;
    },
    isAdmin() {
      if (!this.eventData.groupOwner) return true;
      if (!this.getGroupById(this.eventData.groupOwner.groupId)) return false;
      return this.getUserDetails && this.eventData.groupOwner ?
        this.getUserDetails.userId === this.getGroupById(this.eventData.groupOwner.groupId)
          .owner.userId
        : false;
    },
    editableObject() {
      const obj = { ...this.eventData };
      obj.startDate = new Date(this.eventData.startDate);
      obj.endDate = new Date(this.eventData.endDate);
      return obj;
    },
  },
  methods: {
    ...mapActions(['addAttendingUserToEvent', 'removeAttendingUserFromEvent']),
    attendEvent() {
      this.addAttendingUserToEvent({
        eventId: this.eventData.eventId,
        userInfo: this.getUserDetails,
        onSuccess: () => {
          window.console.log('added user to event');
          if (this.public) {
            this.eventData.users.push(this.getUserDetails);
          }
        },
        onError: () => window.console.log('error adding user to event'),
      });
    },
    removeAttendance() {
      this.removeAttendingUserFromEvent({
        eventId: this.eventData.eventId,
        userInfo: this.getUserDetails,
        onSuccess: () => {
          window.console.log('removed user from event');
          if (this.public) {
            const userIndex = this.eventData.users
              .findIndex(u => u.userId === this.getUserDetails.userId);
            this.eventData.users.splice(userIndex, 1);
          }
        },
        onError: () => window.console.log('error removing user from event'),
      });
    },
    removeActivity() {
      this.$confirm('This will permanently delete the event. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        if (this.eventData.groupOwner) {
          this.$store.dispatch('removeEventFromGroup', {
            groupId: this.eventData.groupOwner.groupId,
            eventId: this.eventData.eventId,
          });
          this.$router.push('/mygroups');
        } else {
          this.$store.dispatch('removeEventFromUser', {
            groupId: this.getUserDetails.userId,
            eventId: this.eventData.eventId,
          });
          this.$router.push('/');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled',
        });
      });
    },
  },
};
</script>