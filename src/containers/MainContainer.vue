<template>
  <div class="site-wrapper">
    <Navigation></Navigation>
    <div class="content-container">
      <Activity v-for="item in 10" :key="item"></Activity>
    </div>
  </div>

</template>

<script>
  import Activity from '../components/activities/Activity.vue';
  import Navigation from '../components/header/Navigation.vue';

  export default {
    components: {
      Activity,
      Navigation,
    },
  };
</script>