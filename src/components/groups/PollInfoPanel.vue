<template>
  <div class="info-panel-wrapper">
    <div class="group-info-panel">
      <div class="panel-title">
        {{this.title}}
      </div>
      <div class="panel-body">
        <div class="group-wrapper">
          <div class="group-add" @click="showCreatePoll">
            <i class="fas fa-plus"></i>
            <span>Create poll</span>
          </div>
        </div>
        <Poll v-for="poll in this.polls" :poll="poll" :key="poll.pollId" @showPollDetail="showPollDetail($event)"></Poll>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from '../activities/Activity.vue';
  import Poll from '../activities/Poll.vue';
  
  export default {
    props: ['title', 'polls'],
    components: {
      Activity,
      Poll,
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
    },
  };
</script>