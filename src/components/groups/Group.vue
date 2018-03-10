<template>
<!-- https://www.sitepoint.com/6-incredible-svg-pattern-generators/ -->
    <div class="group-wrapper" @click="openGroup">
      <div class="group-container">
        <div 
          :class="{
            'group-graphic': true,
            'has-graphic': this.group.avatarUrl ? true : false,
          }" 
          :style="randomImage">
          
        </div>
        <div class="group-bottom">
          <div class="group-details">
            <div class="group-name">
              {{group.name}}
            </div>
          </div>

          <div class="group-members">
            <div v-for="item in 5" :key="item" class="group-member-circle" v-bind:style="{'z-index': item, 'right': item*20-20 + 'px'}"></div>
          </div>


        </div>
      </div>
    </div>
</template>

<script>
// import GeoPattern from 'geopattern';
import PatternGenerator from '../../services/patterngenerator';

export default {
  props: ['group'],
  data() {
    return {
    };
  },
  methods: {
    openGroup() {
      this.$router.push(`/group/detail/${this.group.groupId}`);
    },
  },
  computed: {
    randomImage() {
      return {
        backgroundImage: this.group.avatarUrl ?
          `url(${process.env.OBJECT_STORE}/${this.group.avatarUrl})` : PatternGenerator.generateImage(this.group.name),
      };
    },
  },
};
</script>