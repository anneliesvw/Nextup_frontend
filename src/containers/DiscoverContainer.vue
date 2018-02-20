<template>
  <div class="discover-container">
    <detail-event v-if="dialogVisible" :isVisible="true" @close="closeDialog">
    </detail-event>
    <div class="discover-wrapper">
      <div class="discover-recommended">
        <div class="discover-title">recommended</div>
        <div class="discover-contain">
          <div class="discover-arrow left" @click="slideLeft">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="discover-row" ref="goLeft">
            <div class="discover-row__inner">
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
              <div class="discover-tile">
                <div class="discover-tile__media">
                  <div class="discover-tile__img"></div>
                </div>
                <div class="discover-tile__details">
                  <div class="discover-tile__title">
                    Top Gear
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="discover-arrow right" @click="slideRight">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

        <!-- <div v-for="i in 3" :key="i">
          <div :class="['discover-row row-' +i]">
            <div v-for="j in 3" :key="j" class="discover-activity">
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
        </div> -->
      </div>
      <div class="discover-recommended">
        <div class="discover-title">others</div>
        <div v-for="i in 3" :key="i">
          <div :class="['discover-row row-' +i]">
            <div v-for="j in 3" :key="j" class="discover-activity">
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