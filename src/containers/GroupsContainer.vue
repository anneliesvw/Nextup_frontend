<template>
  <div>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="content-container">
        <div class="group-wrapper">
          <div class="group-add">
            <i class="fas fa-plus-circle"></i>
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
import Sidebar from '../components/sidebar/Sidebar.vue';

export default {
  components: {
    Group,
    Sidebar,
  },
};
</script>
