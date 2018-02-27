<template>
  <el-dialog :title="this.poll.name" class="invite-member-dialog" :visible.sync="dialogVisible">
    
    <el-button type="danger" @click="deletePoll">Delete Poll</el-button>

    <el-input v-model="this.dataPoll.name"></el-input>
    <el-button type="success" @click="updatePoll">Update Poll</el-button>
  </el-dialog>
</template>

<script>
import GroupsApi from '../../services/groupservice';

export default {
  components: {
  },
  props: ['isVisible', 'activeGroup', 'poll'],
  data() {
    return {
      dataPoll: this.poll,
    };
  },
  methods: {
    deletePoll() {
      GroupsApi.deletePollFromGroup(
        this.activeGroup.groupId,
        this.poll.pollId,
        () => {
          this.$notify({
            title: 'Poll Removed',
            message: 'Poll successfully removed.',
            type: 'success',
            duration: 2000,
          });
        },
        () => {
          this.$notify({
            title: 'Unable To Remove Poll',
            message: 'Unable to remove poll.',
            type: 'error',
            duration: 2000,
          });
        },
      );
    },
    updatePoll() {
      GroupsApi.updatePollFromGroup(
        this.activeGroup.groupId,
        this.poll,
        () => {
          this.$notify({
            title: 'Poll Updated',
            message: 'Poll successfully updated.',
            type: 'success',
            duration: 2000,
          });
        },
        () => {
          this.$notify({
            title: 'Unable To Update Poll',
            message: 'Unable to update poll.',
            type: 'error',
            duration: 2000,
          });
        },
      );
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isVisible;
      },
      set(newValue) {
        if (!newValue) {
          this.$emit('close');
        }
      },
    },
  },
};
</script>
