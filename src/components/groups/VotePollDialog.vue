<template>
  <el-dialog :title="this.poll.name" class="update-poll-dialog" :visible.sync="dialogVisible">
    <generic-title>Description </generic-title>
    <div class="vote-poll-description">
      {{this.poll.description}}
    </div>
    <generic-title>Options</generic-title>
    <el-radio-group v-model="choice" class="vote-poll-group">
      <div  v-for="option in this.options" :key="option.id" class="vote-poll-option">
        <el-radio :label="option.id">{{option.description}}</el-radio>
        <avatar-list :users="option.voters"></avatar-list>
      </div>
  </el-radio-group>
    <div class="vote-poll-button">
      <el-button type="primary" @click="voteOnPoll">Vote</el-button>
    </div>
  </el-dialog>
</template>

<script>
import GenericTitle from '../layout_misc/GenericTitle.vue';
import AvatarList from '../layout_misc/AvatarList.vue';

export default {
  components: {
    GenericTitle,
    AvatarList,
  },
  props: ['isVisible', 'activeGroup', 'poll'],
  data() {
    return {
      options: [...this.poll.pollOptions],
      choice: '',
    };
  },
  methods: {
    voteOnPoll() {
      const payload = {
        groupId: this.activeGroup.groupId,
        pollId: this.poll.pollId,
        pollOptionId: this.choice,
        onSuccess: () => {
          this.$notify({
            title: 'You Voted',
            message: 'Your vote was registered!',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Oops!',
            message: 'Unable to register your vote.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('voteOnPoll', payload);
      // this.$emit('close');
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
