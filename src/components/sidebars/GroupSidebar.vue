<template>
  <div class="group-sidebar">
    <div class="sidebar-title">
      My Groups
    </div>
    <div class="group-links">
      <template v-for="group in groups">
        <div :class="{
          'group-link': true,
          'group-link-active': group === activeGroup
        }"
        :key="group"
        @click="setActiveGroup(group)">
          {{group}}
        </div>
      </template>
    </div>
    <div class="group-buttons">
      <el-button type="primary">Create Group</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeGroup: '',
        groups: [
          'U17 De Klinge',
          'group2',
          'group3',
          'group4',
          'group5',
        ],
      };
    },
    methods: {
      setActiveGroup(group) {
        this.activeGroup = group;
      },
    },
  };
</script>

<style scoped>

</style>