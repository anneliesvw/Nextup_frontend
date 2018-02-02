<template>
	<div class="app-sidebar">
		<div class="groups">
			<div class="groups-header">Groups</div>
			<ol>
				<li v-for="group in groups" :key="group">
					<span>{{ group }}</span> 
					<el-checkbox checked="true"></el-checkbox>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      // todo via backend
      groups: ['Group1', 'Group2', 'Group3'],
    };
  },
};
</script>
