<template>
  <div class="activity-wrapper" @click="() => this.$emit('showVotePoll', this.poll)">
      <div class="activity-container">
        <div class="activity-graphic" :style="backgroundPattern">

        </div>
        <div class="activity-bottom">
          <div class="edit-button" @click.stop @click="() => this.$emit('showPollDetail', this.poll)">
            <i class="fas fa-pencil-alt"></i>
          </div>
          <div class="activity-toggle">
                <el-switch v-model="poll.closed" active-color="#ff4949" inactive-color="#13ce66" disabled>
                </el-switch>
            </div>
            <div class="activity-details">
                <div class="activity-owner">
                    {{poll.name}}
                </div>
                <div class="activity-date">
                    {{ date }}
                </div>
            
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import PatternGenerator from '../../services/patterngenerator';

  export default {
    props: ['poll'],
    computed: {
      backgroundPattern() {
        const pattern = PatternGenerator.generateImage(`${Math.random() * 2345}`);
        return {
          backgroundImage: pattern,
        };
      },
      date() {
        return moment(this.poll.deadline).format('HH:mm DD/MM/YYYY');
      },
    },
  };
</script>
