<template>
  <div class="group-detail-container main-container">
    <CreateEvent
      v-if="eventDialogVisible"
      :isVisible="true"
      :activeGroup="activeGroup"
      @close="closeEventDialog">
    </CreateEvent>
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
    <CreatePoll
      v-if="pollDialogVisible"
      :activeGroup="this.activeGroup"
      :isVisible="true"
      @close="closePollDialog">
    </CreatePoll>
    <PollDialog 
      :poll="this.pollDetail"
      v-if="pollDetailVisible"
      :isVisible="true"
      :activeGroup="this.activeGroup"
      @close="closePollDetail">
    </PollDialog>

    <div class="sidebar-wrapper">
      <GroupSidebar
        @groupSelected="onGroupSelected"
        @createClicked="onCreateGroup"
        :activeGroup="activeGroup">
      </GroupSidebar>
    </div>
    <div class="group-wall" v-if="activeGroup">
      <banner :title="activeGroup.name" :image="bannerImage">
        <div class="banner-buttons">
            <el-button type="primary" @click="dialogVisible = true">Invite Others</el-button> 
            <!-- TODO: BELANGRIJK!! -->
            <!-- Degene die leave group uitwerkt zet deze lijn code bij de onsuccess aub, de chat dankt u -->
            <!-- this.$socket.emit('leaveroom', `${GROUPID}_${NAME}`); -->
            <!-- met juiste waarden voor id en name -->
            <!-- <el-button type="danger">Leave Group</el-button> -->
            <!-- beste maker van de chat, dit zou niet mogen bepaalt worden door de frontend, is backend logica. Martin Fowler dankt u -->
            <el-button type="danger" @click="deleteGroup">Delete Group</el-button>
          </div>
      </banner>
      <div class="group-panels">
        <InfoPanel title="Events" 
          :events="activeGroup.events"
          @showEventDialog="eventDialogVisible = true">
        </InfoPanel>
        <PollInfoPanel title="Polls" :polls="activeGroup.polls" 
          @showPollDetail="showPollDetail($event)" 
          @showCreatePoll="setPollDialogVisible">
        </PollInfoPanel>
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
  </div>  
</template>

<script>
import GroupSidebar from '../components/sidebars/GroupSidebar.vue';
import MemberDialog from '../components/groups/MemberDialog.vue';
import InfoPanel from '../components/groups/InfoPanel.vue';
import PollInfoPanel from '../components/groups/PollInfoPanel.vue';
import PatternGenerator from '../services/patterngenerator';
import GroupDialog from '../components/groups/CreateGroup.vue';
import EmptyState from '../components/emptystate/EmptyState.vue';
import CreateEvent from '../components/events/CreateEvent.vue';
import CreatePoll from '../components/groups/CreatePoll.vue';
import PollDialog from '../components/groups/PollDialog.vue';
import Banner from '../components/layout_misc/Banner.vue';

export default {
  components: {
    GroupSidebar,
    InfoPanel,
    MemberDialog,
    GroupDialog,
    EmptyState,
    CreateEvent,
    PollInfoPanel,
    CreatePoll,
    PollDialog,
    Banner,
  },
  computed: {
    bannerPlaceholder() {
      return {
        backgroundImage: this.activeGroup.avatarUrl ?
          `url(${this.activeGroup.avatarUrl})` : PatternGenerator.generateImage(this.activeGroup.name),
      };
    },
    bannerImage() {
      return this.activeGroup.avatarUrl ?
        `url(${process.env.OBJECT_STORE}/${this.activeGroup.avatarUrl})` : PatternGenerator.generateImage(this.activeGroup.name);
    },
    activeGroup() {
      return this.$store.getters.getGroupById(parseInt(this.$route.params.groupId, 10));
    },
  },
  data() {
    return {
      dialogVisible: false,
      groupDialogVisible: false,
      eventDialogVisible: false,
      pollDialogVisible: false,
      pollDetailVisible: false,
      pollDetail: '',
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
    closeEventDialog() {
      this.eventDialogVisible = false;
    },
    setPollDialogVisible() {
      this.pollDialogVisible = true;
    },
    closePollDialog() {
      this.pollDialogVisible = false;
    },
    closePollDetail() {
      this.pollDetailVisible = false;
    },
    onGroupSelected(group) {
      this.$router.push(`/group/detail/${group.groupId}`);
    },
    deleteGroup() {
      // clone so onsuccess has data
      const infoclone = { ...this.activeGroup };
      const payload = {
        groupInfo: this.activeGroup.groupId,
        onSuccess: () => {
          this.$socket.emit(
            'deleteroom',
            `${infoclone.groupId}_${infoclone.name}`,
          );
          this.$notify({
            title: 'Group Deleted',
            message: `Group '${infoclone.name}' successfully deleted.`,
            type: 'success',
            duration: 2000,
          });
          this.$emit('close');
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Delete Group',
            message: 'Unable to delete group.',
            type: 'error',
            duration: 2000,
          });
          this.$emit('close');
        },
      };
      this.$store.dispatch('deleteGroup', payload);
    },
    showPollDetail(poll) {
      this.pollDetailVisible = true;
      this.pollDetail = poll;
    },
  },
};
</script>
