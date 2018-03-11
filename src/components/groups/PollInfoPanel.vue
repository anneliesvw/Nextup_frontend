<template>
  <div class="info-panel-wrapper">
    <div class="group-info-panel">
      <generic-title>
        {{this.title}}
      </generic-title>
      <div class="panel-body">
        <div class="group-wrapper">
          <div class="group-add" @click="showCreatePoll">
            <i class="fas fa-plus"></i>
            <span>{{$t("polls.create", this.$store.state.language)}}</span>
          </div>
        </div>
        <Poll v-for="poll in this.polls" :poll="poll" :key="poll.pollId" @showPollDetail="showPollDetail($event)" @showVotePoll="showVotePoll($event)"></Poll>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from '../activities/Activity.vue';
  import Poll from '../activities/Poll.vue';
  import GenericTitle from '../layout_misc/GenericTitle.vue';

  export default {
    props: ['title', 'polls'],
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