<template>
  <div class="poll-option">
    <el-radio :label="option.id" class="option-radio">
      <div class="option-details">
        <div class="description">
          {{option.description}}
        </div>
        <div class="percentage">
          <div class="fill" :style="'width: 35%;'">

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
    props: ['option'],
    components: {
      AvatarList,
    },
  };
</script>

<style scoped>

</style>