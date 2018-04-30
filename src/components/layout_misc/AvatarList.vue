<template>
  <div class="avatar-list"> 
    <div v-for="user in this.users.slice(0,maxShown)" :key="user.userId">
      <el-tooltip class="item" effect="dark" :content="user.person.firstName" placement="top-start">
        <div class="avatar-circle has-avatar" :style="computeStyle(user)" v-if="user.person.avatarUrl">
        </div>
        <div class="avatar-circle" v-else>
        </div>
      </el-tooltip>
    </div> 
    <div v-if="this.users.length > this.maxShown" class="avatar-circle avatar-plus" @click="showAllUsers">
      <div class="circle-description">
        +{{this.users.length - maxShown}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      default: [],
    },
    maxShown: {
      default: 5,
    },
  },
  data() {
    return {
      showAll: false,
    };
  },
  methods: {
    computeStyle(user) {
      window.console.log(`${process.env.OBJECT_STORE}/${user.person.avatarUrl}`);
      return user.person.avatarUrl ? { backgroundImage: `url(${process.env.OBJECT_STORE}/${user.person.avatarUrl})` } : {};
    },
    showAllUsers() {
      this.showAll = !this.showAll;
    },
  },
};
</script>
