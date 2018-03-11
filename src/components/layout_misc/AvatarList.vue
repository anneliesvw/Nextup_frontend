<template>
  <div class="avatar-list"> 
    <div v-for="user in this.users.slice(0,5)" :key="user.userId">
      <el-tooltip class="item" effect="dark" :content="user.person.firstName" placement="top-start">
      <div class="avatar-circle"></div>
      </el-tooltip>
    </div> 
    <div v-if="this.users.length > 5" class="avatar-plus" @click="showAllUsers">
      + {{this.users.length - 5}}
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
