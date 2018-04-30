<template>
<!-- https://www.sitepoint.com/6-incredible-svg-pattern-generators/ -->
    <div class="group-wrapper" @click="openGroup">
      <div class="group-container activity-container">
        <div 
          :class="{
            'activity-graphic': true,
            'has-graphic': this.group.avatarUrl ? true : false,
          }" 
          :style="randomImage">
          
        </div>
        <div class="group-bottom activity-bottom">
          <div class="group-details">
            <div class="group-name">
              {{group.name}}
            </div>
          </div>

          <div class="group-members">
            <AvatarList :users="group.users" :maxShown="5"></AvatarList>
          </div>


        </div>
      </div>
    </div>
</template>

<script>
// import GeoPattern from 'geopattern';
import PatternGenerator from '../../services/patterngenerator';
import AvatarList from '../layout_misc/AvatarList.vue';

export default {
  props: ['group'],
  components: {
    AvatarList,
  },
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