<template>
  <div class="activity-wrapper" @click="openEvent">
      <div class="activity-container">
        <div 
        :class="{
          'activity-graphic': true,
          'has-graphic': this.event.avatarUrl ? true : false
        }" 
        :style="backgroundPattern">
        </div>
        <div class="activity-bottom">
            <div class="activity-toggle">
                <input type="checkbox">
            </div>
            <div class="activity-details">
                <div class="activity-owner">
                  {{ event ? event.name : '' }}
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
import moment from 'moment';
import PatternGenerator from '../../services/patterngenerator';

export default {
  props: ['event'],
  computed: {
    startDate() {
      return moment(this.event.startDate).format('DD/MM/YYYY HH:mm');
    },
    endDate() {
      return moment(this.event.endDate).format('DD/MM/YYYY HH:mm');
    },
    backgroundPattern() {
      const pattern = this.event.avatarUrl ?
        `url(${process.env.OBJECT_STORE}/${this.event.avatarUrl})` : PatternGenerator.generateImage(`${Math.random() * 2345}`);
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
    openEvent() {
      this.$router.push(`/events/${this.event.eventId}`);
    },
  },
};
</script>
