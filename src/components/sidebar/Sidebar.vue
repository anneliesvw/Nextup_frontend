<template>
	<div class="app-sidebar">
		<div class="groups">
			<ol>
				<li v-for="group in groups" :key="group">
					<span>{{ group }}</span> 
					<el-checkbox></el-checkbox>
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
      groups: ['group1', 'group2', 'group3'],
    };
  },
};
</script>
