<template>
<div>
  <detail-event v-if="dialogVisible" :isVisible="true" @close="closeDialog">
    </detail-event>
    <carousel :clickable="true" class="discover-carousel" :perPage="1" :perPageCustom="[[768, 2], [1024, 3], [1340, 5], [1600, 6], [1900, 7]]" :paginationEnabled="false" :navigationEnabled="true">
          <slide v-on:click.native="openDialog" class="discover-tile" v-for="i in 10" :key="i">
            <carousel-event ></carousel-event>
          </slide>
        </carousel>
</div>
  
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import carouselEvent from './CarouselEvent.vue';
import DetailEvent from './../groups/detailEvent.vue';

export default {
  components: {
    Carousel,
    Slide,
    carouselEvent,
    DetailEvent,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      window.console.log('opendialog');
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>