<template>
  <div>
    <div class="groups-container">
      <!--Sidebar></Sidebar-->
      <!-- <div class="content-container">
        <div class="group-wrapper">
          <div class="group-add">
            <i class="fas fa-plus"></i>
            <span>Create group</span>
          </div>
        </div>
        <Group v-for="item in 5" :key="item"></Group>
      </div> -->
      <empty-state 
        size="large"
        icon="calendar-times"
        title="You don't have any activities planned"
        text="If you attend activities from your groups they will be shown here. You can also import your own agenda to show other activities you have planned. ">
        </empty-state>
    </div>
  </div>
</template>

<script>
import Group from '../components/groups/Group.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import EmptyState from '../components/emptystate/EmptyState.vue';

export default {
  components: {
    Group,
    Sidebar,
    EmptyState,
  },
};
</script>
