<template>
<div>
  <detail-event v-if="dialogVisible" :isVisible="true" @close="closeDialog">
    </detail-event>
    <carousel :clickable="true" class="discover-carousel" :perPageCustom="[[768, 2], [1024, 3], [1920,4]]" @pagechange.stop.prevent :paginationEnabled="false" :navigationEnabled="true">
          <slide @click="openDialog" class="discover-tile" v-for="i in 10" :key="i">
            <!--carousel-event ></carousel-event-->
            <activity
              :event="{
                name: 'testje',
                startDate: '11jan',
                endDate: '12jan',
              }"
            >
            </activity>
          </slide>
        </carousel>
</div>
  
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import carouselEvent from './CarouselEvent.vue';
import Activity from '../activities/Activity.vue';

export default {
  components: {
    Carousel,
    Slide,
    carouselEvent,
    Activity,
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
  },
};
</script>