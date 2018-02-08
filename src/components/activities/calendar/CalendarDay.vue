<template>
  <div class="day-of-week">
    <div class="day-header">{{ formatDate(data) }}</div>
    <div class="day-content">
      <div class="day-hour" v-for="n in 24" :key="n">
        <!-- <div class="day-quarter-hour" v-for="m in 4" :key="m"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    formatDate(dateIn) {
      return `${dateIn.getDate()} / ${dateIn.getMonth() +
        1} / ${dateIn.getFullYear()}`;
    },
  },
};
</script>

