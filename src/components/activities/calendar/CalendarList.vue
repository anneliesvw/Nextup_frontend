<template>
  <div class="max-width calendar-wrapper">
    <div class="calendar-hours">
      <div class="calendar-hour" v-for="n in 24" :key="n">{{ n }}:00</div>
    </div>
    <div class="days-wrapper">
      <calendar-day v-for="day in getDaysOfThisWeek()" :key="day.toUTCString()" :data="day"></calendar-day>
    </div>
    <!-- <el-select v-model="value" placeholder="Select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
  </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';

export default {
  components: {
    CalendarDay,
  },
  data() {
    return {
      test: 'fdfd',
    };
  },
  methods: {
    formatDate(dateIn) {
      return `${dateIn.getDate()} / ${dateIn.getMonth() +
        1} / ${dateIn.getFullYear()}`;
    },
    getMondayOfWeek(dateIn) {
      const monday = dateIn;
      while (monday.getDay() !== 1) {
        monday.setDate(monday.getDate() - 1);
      }
      console.log(monday);
      return monday;
    },
    getDaysOfThisWeek() {
      const days = [];
      const monday = this.getMondayOfWeek(new Date());
      days.push(monday);
      for (let i = 1; i <= 6; i += 1) {
        // TODO: check why +1
        const newDate = new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + i,
        );
        days.push(newDate);
      }
      return days;
    },
  },
  computed: {
    today() {
      return new Date();
    },
  },
};
</script>