<template>
  <div>
    <div class="groups-container">
      <!--Sidebar></Sidebar-->
      <CreateEvent 
        v-if="dialogVisible"
        :isVisible="true"
        @close="closeDialog"
        >
      </CreateEvent>
      <div class="content-container">
        <div class="group-wrapper">
          <div class="group-add" @click="openDialog">
            <i class="fas fa-plus"></i>
            <span>Create group</span>
          </div>
        </div>
        <Group v-for="item in 5" :key="item"></Group>
      </div>
    </div>
  </div>
</template>

<script>
import Group from '../components/groups/Group.vue';
import CreateGroup from '../components/groups/CreateGroup.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';
import CreateEvent from '../components/events/CreateEvent.vue';

export default {
  components: {
    CreateGroup,
    Group,
    Sidebar,
    CreateEvent,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>
