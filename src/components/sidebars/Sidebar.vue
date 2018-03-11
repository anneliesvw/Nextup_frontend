<template>
	<div class="app-sidebar">
		<div class="groups">
			<div class="groups-header">{{$t("sidebar.title")}}</div>
			<ol>
				<li v-for="group in groups" :key="group.groupId">
					<span>{{ group.name }}</span> 
					<el-checkbox :checked="true" @change="(e) => filterGroup(e, group.groupId)"></el-checkbox>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
export default {
  computed: {
    groups() {
      return this.$store.getters.getGroups;
    },
  },
  methods: {
    filterGroup(event, groupId) {
      const payload = {
        event,
        groupId,
      };
      this.$emit('filterGroup', payload);
    },
  },
};
</script>
