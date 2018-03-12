<template>
  <div class="activity-wrapper">
      <div class="activity-container">
        <div 
        :class="{
          'activity-graphic': true,
          'has-graphic': this.event.avatarUrl ? true : false
        }" 
        :style="backgroundPattern">
        </div>
        <div class="activity-remove" v-if="deletable === true" @click="removeActivity()">
          <i class="fas fa-trash-alt"></i>
        </div>
        <div class="activity-bottom">
            <div class="activity-toggle">
                <input type="checkbox">
            </div>
            <div class="activity-details">
                <div class="activity-owner">
                  <router-link :to="{ name: 'Event', params: { id: event.eventId }}">
                    {{ event ? event.name : '' }}
                  </router-link>
                </div>
                <div class="activity-date">
                    {{ startDate }}  |  {{ endDate }}
                </div>
            
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import PatternGenerator from '../../services/patterngenerator';

export default {
  props: ['event', 'deletable'],
  computed: {
    startDate() {
      return moment(this.event.startDate).format('DD/MM/YYYY HH:mm');
    },
    endDate() {
      return moment(this.event.endDate).format('DD/MM/YYYY HH:mm');
    },
    backgroundPattern() {
      const pattern = PatternGenerator.generateImage(`${Math.random() * 2345}`);
      return {
        backgroundImage: pattern,
      };
    },
  },
  endDate() {
    return moment(this.event.endDate).format('DD/MM/YYYY HH:mm');
  },
  backgroundPattern() {
    const pattern = PatternGenerator.generateImage(`${Math.random() * 2345}`);
    return {
      backgroundImage: pattern,
    };
  },
  methods: {
    ...mapActions(['removeEventFromGroup']),
    removeActivity() {
      this.$confirm('This will permanently delete the event. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.removeEventFromGroup({
          groupId: this.event.groupOwner.groupId,
          eventId: this.event.eventId,
        });
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
