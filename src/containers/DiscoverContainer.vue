<template>
  <div class="discover-container">

    <div class="discover-wrapper">
      <div class="discover-recommended">
        <div class="discover-title">Discover events</div>
        <div class="discover-intrest">
          <carousel-events></carousel-events>
        </div>
      </div>
      <div class="discover-recommended">
        <div class="discover-title">Location</div>
        <div class="discover-intrest">
          <carousel-events></carousel-events>
        </div>
      </div>
      <div class="discover-recommended">
        <div class="discover-title">Interests</div>
        <div class="discover-category" v-for="i in 5" :key="i">
          <div class="discover-category-title">category name</div>
          <div class="discover-intrest">
          <carousel-events></carousel-events>
        </div>
        </div>
        
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
import CarouselEvents from '../components/events/CarouselEvents.vue';

export default {
  components: {
    Carousel,
    Slide,
    Sidebar,
    ChatMenu,
    DetailEvent,
    PatternGenerator,
    CarouselEvents,
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