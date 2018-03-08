<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        Welkom, je hebt niks te doen. Spijtig.
        <!--Activity v-for="item in 10" :key="item"></Activity-->
      </div>
    </div>
  </div>
</template>

<script>
import Activity from '../components/activities/Activity.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';

export default {
  components: {
    Activity,
    Sidebar,
  },
  beforeCreate() {
    this.$store.dispatch('loadGroups');
    this.$store.dispatch('loadUserDetails');
  },
};
</script>
