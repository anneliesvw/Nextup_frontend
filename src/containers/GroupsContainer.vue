<template>
  <div>
    <div class="groups-container">
      <!--Sidebar></Sidebar-->
      <CreateGroup 
        v-if="dialogVisible"
        :isVisible="true"
        @close="closeDialog"
        >
      </CreateGroup>
      <div class="content-container">
        <div class="group-wrapper">
          <div class="group-add" @click="openDialog">
            <i class="fas fa-plus"></i>
            <span>{{$t("groups.create", this.$store.state.language)}}</span>
          </div>
        </div>
        <Group 
          v-for="group in groups" 
          :key="group.groupId"
          :group="group"
        >
        </Group>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  computed: {
    groups() {
      return this.$store.getters.getGroups;
    },
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
