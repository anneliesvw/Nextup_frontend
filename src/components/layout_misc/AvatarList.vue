<template>
  <div class="voters"> 
    <div v-for="user in showAll ? this.users : this.users.slice(0,5)" :key="user.userId">
      <el-tooltip class="item" effect="dark" :content="user.person.firstName" placement="top-start">
      <div class="voter-circle"></div>
      </el-tooltip>
    </div> 
    <div v-if="this.users.length > 0" class="voter-plus" @click="showAllUsers">
      <i v-if="showAll" class="fas fa-minus"></i>
      <i v-else class="fas fa-plus"></i>
    </div>
    <div v-else class="voter-plus">
      <i class="fas fa-ban"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      showAll: false,
    };
  },
  methods: {
    showAllUsers() {
      this.showAll = !this.showAll;
    },
  },
};
</script>
