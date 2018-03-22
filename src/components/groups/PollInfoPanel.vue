<template>
  <div class="info-panel-wrapper">
    <div class="group-info-panel">
      <generic-title>
        {{this.title}}
      </generic-title>
      <div class="panel-body">
        <div class="group-wrapper" v-if="admin === true">
          <div class="group-add" @click="showCreatePoll">
            <i class="fas fa-plus"></i>
            <span>{{$t("polls.create")}}</span>
          </div>
        </div>
        <Poll v-for="poll in this.polls" 
          :poll="poll" :key="poll.pollId"
          :admin="admin"
          @showPollDetail="showPollDetail($event)" 
          @showVotePoll="showVotePoll($event)"
          :groupId="groupDetails.groupId">
        </Poll>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from '../activities/Activity.vue';
  import Poll from '../activities/Poll.vue';
  import GenericTitle from '../layout_misc/GenericTitle.vue';

  export default {
    props: ['title', 'polls', 'admin', 'groupDetails'],
    components: {
      Activity,
      Poll,
      GenericTitle,
    },
    data() {
      return {};
    },
    methods: {
      showCreatePoll() {
        this.$emit('showCreatePoll');
      },
      showPollDetail(poll) {
        this.$emit('showPollDetail', poll);
      },
      showVotePoll(poll) {
        this.$emit('showVotePoll', poll);
      },
    },
  };
</script>