<template>
	<div class="app-sidebar">
		<div class="groups">
			<div class="groups-header">Groups</div>
			<ol>
				<li v-for="group in groups" :key="group.groupId">
					<span>{{ group.name }}</span> 
					<el-checkbox :checked="true"></el-checkbox>
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
};
</script>
