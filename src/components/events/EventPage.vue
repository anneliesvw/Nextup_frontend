<template>
  <div class="event-wrapper" v-if="eventData">
    <!-- <div class="event-header-image">
      <img src="http://screenpicks.com/wp-content/uploads/2010/09/alg_resize_jersey-shore.jpg" alt="event image">
    </div> -->
    <div class="event-content">
      <banner :title="eventData.name" :image="backgroundImage"></banner>
      <generic-title>Info</generic-title>
      <div class="event-startDate">{{ eventData.startDate }}</div>
      <div class="event-description">{{ eventData.description }}</div>
      <div class="event-announcements"></div>
      <div class="event-discution"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GenericTitle from '../layout_misc/GenericTitle.vue';
import Banner from '../layout_misc/Banner.vue';

export default {
  components: {
    GenericTitle,
    Banner,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['getEventById']),
    eventData() {
      return this.getEventById(parseInt(this.$route.params.id, 10));
    },
    backgroundImage() {
      return "url('http://screenpicks.com/wp-content/uploads/2010/09/alg_resize_jersey-shore.jpg')";
    },
  },
};
</script>