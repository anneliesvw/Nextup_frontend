<template>
  <div class="info-panel-wrapper">
    <div class="group-info-panel">
      <!-- <div class="panel-title">
        {{this.title}}
      </div> -->
      <generic-title> {{ this.title }} </generic-title>
      <div class="panel-body">
        <div class="group-wrapper" v-if="admin === true">
          <div class="group-add" @click="() => this.$emit('showEventDialog', true)">
            <i class="fas fa-plus"></i>
            <span>{{$t("events.create")}}</span>
          </div>
        </div>
        <Activity 
          v-for="event in events" 
          :key="event.eventId" 
          :event="event"
        ></Activity>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from '../activities/Activity.vue';
  import GenericTitle from '../layout_misc/GenericTitle.vue';
  
  export default {
    props: ['title', 'events', 'admin', 'editing'],
    components: {
      Activity,
      GenericTitle,
    },
    data() {
      return {};
    },
  };
</script>