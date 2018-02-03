<template>
  <div>
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
import Sidebar from '../components/sidebar/Sidebar.vue';

export default {
  components: {
    Activity,
    Sidebar,
  },
};
</script>
