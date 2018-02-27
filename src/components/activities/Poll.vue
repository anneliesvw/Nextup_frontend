<template>
  <div class="activity-wrapper" @click="() => this.$emit('showPollDetail', this.poll)">
      <div class="activity-container">
        <div class="activity-graphic" :style="backgroundPattern">

        </div>
        <div class="activity-bottom">
          <div class="activity-toggle">
                <el-switch v-model="poll.closed" active-color="#ff4949" inactive-color="#13ce66" disabled>
                </el-switch>
            </div>
            <div class="activity-details">
                <div class="activity-owner">
                    {{poll.name}}
                </div>
                <div class="activity-date">
                    {{poll.deadline}}
                </div>
            
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
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
    },
  };
</script>
