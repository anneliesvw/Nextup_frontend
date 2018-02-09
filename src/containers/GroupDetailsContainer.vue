<template>
  <div class="group-detail-container main-container">
    <MemberDialog
      v-if="dialogVisible"
      :isVisible="true"
      @close="closeDialog"
      :activeGroup="activeGroup">
    </MemberDialog>
    <GroupDialog
      v-if="groupDialogVisible"
      :isVisible="true"
      @close="closeGroupDialog">
    </GroupDialog>

    <div class="sidebar-wrapper">
      <GroupSidebar
        @groupSelected="onGroupSelected"
        @createClicked="onCreateGroup"
        :activeGroup="activeGroup">
      </GroupSidebar>
    </div>
    <div class="group-wall" v-if="activeGroup">
      <div class="group-banner" :style="bannerPlaceholder">
        <div class="banner-overlay">
          <div class="banner-title">
            {{activeGroup.name}}
          </div>
          <div class="group-members">
            //TODO
          </div>
          <div class="banner-buttons">
            <el-button type="primary" @click="dialogVisible = true">Invite Others</el-button>
            <el-button type="danger">Leave Group</el-button>
          </div>
        </div>
      </div>
      <div class="group-panels">
        <InfoPanel title="Events">
        </InfoPanel>
        <InfoPanel title="Polls">
        </InfoPanel>
      </div>
    </div>
    <div class="no-group-selected" v-else>
      <EmptyState
        size="large"
        title="No Group Selected"
        text="please select a group through the menu on the left side"
        icon="hand-point-left"
      >

      </EmptyState>
    </div>
    <ChatMenu>
    </ChatMenu>
  </div>  
</template>

<script>
  import GroupSidebar from '../components/sidebars/GroupSidebar.vue';
  import MemberDialog from '../components/groups/MemberDialog.vue';
  import InfoPanel from '../components/groups/InfoPanel.vue';
  import ChatMenu from '../components/sidebars/ChatMenu.vue';
  import PatternGenerator from '../services/patterngenerator';
  import GroupDialog from '../components/groups/CreateGroup.vue';
  import EmptyState from '../components/emptystate/EmptyState.vue';

  export default {
    components: {
      GroupSidebar,
      InfoPanel,
      ChatMenu,
      MemberDialog,
      GroupDialog,
      EmptyState,
    },
    computed: {
      bannerPlaceholder() {
        return {
          backgroundImage: PatternGenerator.generateImage('rotzak'),
        };
      },
      activeGroup() {
        return this.$store.getters.getGroupById(parseInt(this.$route.params.groupId, 10));
      },
    },
    data() {
      return {
        dialogVisible: false,
        groupDialogVisible: false,
      };
    },
    methods: {
      closeDialog() {
        this.dialogVisible = false;
      },
      onCreateGroup() {
        this.groupDialogVisible = true;
      },
      closeGroupDialog() {
        this.groupDialogVisible = false;
      },
      onGroupSelected(group) {
        this.$router.push(`/group/detail/${group.groupId}`);
      },
    },
  };
</script>
