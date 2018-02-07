<template>
  <div>
    <div class="groups-container">
      <!--Sidebar></Sidebar-->
      <CreateGroup 
        v-if="dialogVisible"
        :isVisible="true"
        @close="closeDialog"
        @created="addGroup"
        >
      </CreateGroup>
      <div class="content-container">
        <div class="group-wrapper">
          <div class="group-add" @click="openDialog">
            <i class="fas fa-plus"></i>
            <span>Create group</span>
          </div>
        </div>
        <Group 
          v-for="group in groups" 
          :key="group.groupId"
          :group="group">
        </Group>
      </div>
    </div>
  </div>
</template>

<script>
import GroupsApi from '../services/groupservice';
import Group from '../components/groups/Group.vue';
import CreateGroup from '../components/groups/CreateGroup.vue';
import Sidebar from '../components/sidebars/Sidebar.vue';

export default {
  components: {
    CreateGroup,
    Group,
    Sidebar,
  },
  data() {
    return {
      dialogVisible: false,
      groups: [],
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    addGroup(g) {
      this.groups.push(g);
    },
  },
  mounted() {
    // TODO: Loading screen.
    GroupsApi.getGroups(
      res => {
        this.groups = res.data;
        window.console.log(res);
      },
      err => {
        window.console.log('kleinen error in de groepsapi', err);
      },
    );
  },
};
</script>
