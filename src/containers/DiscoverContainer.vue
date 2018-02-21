<template>
  <div class="discover-container">
    <detail-event v-if="dialogVisible" :isVisible="true" @close="closeDialog">
    </detail-event>
    <div class="discover-wrapper">
      <div class="discover-recommended">
        <div class="discover-title">recommended</div>
        <carousel class="discover-carousel" :perPage="1" :perPageCustom="[[768, 2], [1024, 3], [1340, 5], [1600, 6], [1900, 7]]" :paginationEnabled="false" :navigationEnabled="true">
          <slide class="discover-tile" v-for="i in 10" :key="i">
            <div class="discover-tile-img"></div>
            <div class="discover-tile-title">Top Gear</div>
            <!-- <div class="discover-tile__media">
              <div class="discover-tile__img"></div>
            </div>
            <div class="discover-tile__details">
              <div class="discover-tile__title">
                Top Gear
              </div>
            </div> -->
          </slide>
        </carousel>
        
      </div>
    </div>
    <chat-menu></chat-menu>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Sidebar from '../components/sidebars/Sidebar.vue';
import ChatMenu from '../components/sidebars/ChatMenu.vue';
import DetailEvent from '../components/groups/detailEvent.vue';
import PatternGenerator from '../services/patterngenerator';
import CarouselEvent from '../components/events/CarouselEvent.vue';

export default {
  components: {
    Carousel,
    Slide,
    Sidebar,
    ChatMenu,
    DetailEvent,
    PatternGenerator,
    CarouselEvent,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    slideRight() {
      const element = this.$refs.goLeft;
      element.scrollLeft += 250;
    },
    slideLeft() {
      const element = this.$refs.goLeft;
      element.scrollLeft -= 250;
    },
  },
  computed: {
    backgroundPattern() {
      const pattern = PatternGenerator.generateImage(`${Math.random() * 2345}`);
      return {
        backgroundImage: pattern,
      };
    },
  },
};
</script>