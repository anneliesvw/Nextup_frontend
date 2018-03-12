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
    <VotePollDialog
      :poll="this.pollDetail"
      v-if="votePollVisible"
      :isVisible="true"
      :activeGroup="this.activeGroup"
      @close="closeVotePoll"
    ></VotePollDialog>

    <div class="sidebar-wrapper">
      <GroupSidebar
        @groupSelected="onGroupSelected"
        @createClicked="onCreateGroup"
        :activeGroup="activeGroup">
      </GroupSidebar>
    </div>
    <div class="group-wall" v-if="activeGroup">
      <banner :title="activeGroup.name" :image="bannerImage" :editable="editing" @titleChanged="changeTitle($event)">
        <div class="banner-buttons">
            <el-button type="primary" @click="dialogVisible = true">{{$t("groups.invite")}}</el-button> 
            <el-button type="danger" @click="deleteGroup" v-if="editing">{{$t("groups.delete")}}</el-button>
            <el-button type="info" class="admin-edit" v-if="isAdmin && !editing" @click="editing = !editing">
              <i class="fas fa-edit"></i>
                Edit Group
            </el-button>
            <el-button type="success" @click="saveGroup()" v-if="editing">Save Changes</el-button>
          </div>
      </banner>
      <div class="group-panels">
        <InfoPanel :title="$t('events.title')"
          :events="activeGroup.events"
          :admin="isAdmin"
          :editing="editing"
          @showEventDialog="eventDialogVisible = true">
        </InfoPanel>
        <PollInfoPanel :title="$t('polls.title')" :polls="activeGroup.polls" :admin="isAdmin"
          @showPollDetail="showPollDetail($event)" 
          @showCreatePoll="setPollDialogVisible"
          @showVotePoll="showVotePoll($event)"
          :groupDetails="activeGroup"
        >
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
import { mapGetters, mapActions } from 'vuex';
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
import VotePollDialog from '../components/groups/VotePollDialog.vue';

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
    VotePollDialog,
  },
  computed: {
    ...mapGetters(['getUserDetails']),
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
    isAdmin() {
      return this.getUserDetails ?
        this.getUserDetails.userId === this.activeGroup.owner.userId
        : false;
    },
  },
  data() {
    return {
      dialogVisible: false,
      groupDialogVisible: false,
      eventDialogVisible: false,
      pollDialogVisible: false,
      pollDetailVisible: false,
      votePollVisible: false,
      pollDetail: '',
      editing: false,
      newTitle: '',
    };
  },
  methods: {
    ...mapActions(['updateGroup']),
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
    closeVotePoll() {
      this.votePollVisible = false;
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
      this.$router.push('/MyGroups');
    },
    showPollDetail(poll) {
      this.pollDetailVisible = true;
      this.pollDetail = poll;
    },
    changeTitle(val) {
      this.newTitle = val;
    },
    saveGroup() {
      this.editing = false;
      const groupInfo = { ...this.activeGroup };
      if (this.newTitle !== '') groupInfo.name = this.newTitle;
      this.updateGroup({ groupInfo });
    },
    showVotePoll(poll) {
      this.votePollVisible = true;
      this.pollDetail = poll;
    },
  },
};
</script>
