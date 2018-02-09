<template>
  <div class="group-sidebar">
    <div class="sidebar-title">
      My Groups
    </div>
    <div class="group-links">
      <template v-for="group in groups">
        <div :class="{
          'group-link': true,
          'group-link-active': activeGroup && group.groupId === activeGroup.groupId
        }"
        :key="group.groupId"
        @click="setActiveGroup(group)">
          {{group.name}}
        </div>
      </template>
    </div>
    <div class="group-buttons">
      <el-button type="primary" @click="() => this.$emit('createClicked')">Create Group</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['activeGroup'],
    computed: {
      groups() {
        return this.$store.getters.getGroups;
      },
    },
    methods: {
      setActiveGroup(group) {
        this.$emit('groupSelected', group);
      },
    },
    beforeDestroy() {
      window.console.log('ciao ze');
    },
  };
</script>