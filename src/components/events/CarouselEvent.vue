<template>
  <carousel class="discover-carousel" :paginationEnabled="false" :navigationEnabled="true">
          <slide class="discover-tile" v-for="i in 10" :key="i">
            <div class="discover-tile__media">
              <div class="discover-tile__img"></div>
            </div>
            <div class="discover-tile__details">
              <div class="discover-tile__title">
                Top Gear
              </div>
            </div>
          </slide>
        </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {};
  },
};
</script>