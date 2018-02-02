<template>
  <div>
    <Navigation></Navigation>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <Activity v-for="item in 10" :key="item"></Activity>
      </div>
    </div>
  </div>
</template>

<script>
import Activity from '../components/activities/Activity.vue';
import Navigation from '../components/header/Navigation.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';

export default {
  components: {
    Activity,
    Navigation,
    Sidebar,
  },
};
</script>
