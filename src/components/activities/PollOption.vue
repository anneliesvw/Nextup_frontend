<template>
  <div class="poll-option">
    <el-radio :label="option.id" class="option-radio">
      <div class="option-details">
        <div class="description">
          {{option.description}}
        </div>
        <div class="percentage">
          <div class="fill" :style="{
            width: `${percentage}%`,
          }">

          </div>
        </div>
        
      </div>
    </el-radio>
    <avatar-list :users="option.voters"></avatar-list>
  </div>
</template>

<script>
  import AvatarList from '../layout_misc/AvatarList.vue';

  export default {
    props: ['option', 'totalVoters'],
    components: {
      AvatarList,
    },
    computed: {
      percentage() {
        return (this.option.voters.length / this.totalVoters) * 100;
      },
    },
  };
</script>

<style scoped>

</style>