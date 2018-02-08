<template>
    <div class="main-container">
      <detail-event v-if="dialogVisible" :isVisible="true" @close="closeDialog">
          </detail-event>
      <Sidebar></Sidebar>
      <div class="discover-wrapper">
        <div class="discover-recommended">
          <div class="discover-title">recommended</div>
          <div v-for="i in 3" :key="i">
            <div :class="['discover-row row-' +i]">
            <div v-for="j in 3" :key="j"  class="discover-activity">
            <div class="discover-graphic" @click="openDialog()">
              <div class="discover-overlay">
                <div class="discover-overlay-name">
                  Eventnaam
                </div>
                <div class="activity-date">
                    27/07
                </div>
                <div class="activity-date">
                    10:00 - 17:00
                </div> 
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
        <div class="discover-recommended">
          <div class="discover-title">others</div>
          <div v-for="i in 3" :key="i">
            <div :class="['discover-row row-' +i]">
            <div v-for="j in 3" :key="j"  class="discover-activity">
            <div class="discover-graphic" @click="openDialog()">
              <div class="discover-overlay">
                <div class="discover-overlay-name">
                  Eventnaam
                </div>
                <div class="activity-date">
                    27/07
                </div>
                <div class="activity-date">
                    10:00 - 17:00
                </div> 
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
      <chat-menu></chat-menu>
    </div>
</template>

<script>
import Sidebar from '../components/sidebars/Sidebar.vue';
import ChatMenu from '../components/sidebars/ChatMenu.vue';
import DetailEvent from '../components/groups/detailEvent.vue';
import PatternGenerator from '../services/patterngenerator';

export default {
  components: {
    Sidebar,
    ChatMenu,
    DetailEvent,
    PatternGenerator,
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
