<template>
  <div class="info-panel-wrapper">
    <div class="group-info-panel">
      <div class="panel-title">
        {{this.title}}
      </div>
      <div class="panel-body">
        <Activity v-for="i in 3" :key="i"></Activity>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from '../activities/Activity.vue';
  
  export default {
    props: ['title'],
    components: {
      Activity,
    },
    data() {
      return {};
    },
  };
</script>