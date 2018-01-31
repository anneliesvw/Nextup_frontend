<template>
    <div class="content-container">
      <Activity v-for="item in 10" :key="item"></Activity>
      
    </div>
</template>

<script>
  import Activity from '../components/activities/Activity.vue';

  export default {
    components: {
      Activity,
    },
  };
</script>




