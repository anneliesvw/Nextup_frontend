<template>
  <div class="activity-wrapper">
      <div class="activity-container poll-card">
        <div class="poll-graphic">
          <div class="poll-title">
            {{poll.name}}
          </div>
          <el-radio-group 
            v-model="choice" 
            class="vote-poll-group" 
            :disabled="poll.closed">
            <poll-option 
              v-for="pollOption in poll.pollOptions"
              :key="pollOption.id"
              :option="pollOption"
              :totalVoters="totalVoters">
            </poll-option>
          </el-radio-group>
        </div>
        <div class="activity-bottom" v-if="admin">
          <div class="edit-button" @click.stop @click="() => this.$emit('showPollDetail', this.poll)">
            <i class="fas fa-pencil-alt"></i>
          </div>
          <!--div class="activity-toggle">
                <el-switch v-model="poll.closed" active-color="#ff4949" inactive-color="#13ce66" disabled>
                </el-switch>
          </div-->
        </div>
        
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import PollOption from './PollOption.vue';

  export default {
    props: ['poll', 'groupId', 'admin'],
    components: {
      PollOption,
    },
    computed: {
      totalVoters() {
        let voters = 0;
        this.poll.pollOptions.forEach(o => {
          voters += o.voters.length;
        });
        return voters;
      },
      date() {
        return moment(this.poll.deadline).format('HH:mm DD/MM/YYYY');
      },
      choice: {
        get() {
          const uId = this.$store.getters.getUserDetails.userId;
          let oId = '';
          this.poll.pollOptions.forEach(o => {
            const i = o.voters.findIndex(u => uId === u.userId);
            if (i >= 0) {
              oId = o.id;
            }
          });
          return oId;
        },
        set(newValue) {
          this.voteOnPoll(newValue);
        },
      },
    },
    methods: {
      voteOnPoll(optionId) {
        const payload = {
          groupId: this.groupId,
          pollId: this.poll.pollId,
          pollOptionId: optionId,
          onSuccess: () => {
            this.$notify({
              title: this.$t('notify.poll.onSucces.title'),
              message: this.$t('notify.poll.onSucces.message'),
              type: 'success',
              duration: 2000,
            });
          },
          onError: () => {
            this.$notify({
              title: this.$t('notify.poll.onError.title'),
              message: this.$t('notify.poll.onError.message'),
              type: 'error',
              duration: 2000,
            });
          },
        };
        this.$store.dispatch('voteOnPoll', payload);
      },
    },
  };
</script>
