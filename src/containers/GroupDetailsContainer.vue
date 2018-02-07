<template>
  <div class="group-detail-container main-container">
    <div class="sidebar-wrapper">
      <GroupSidebar>
      </GroupSidebar>
    </div>
    <div class="group-wall">
      <div class="group-banner" :style="bannerPlaceholder">
        <div class="banner-overlay">
          <div class="banner-title">
            U17 De Klinge
          </div>
          <div class="banner-buttons">
            <el-button type="primary">Invite Others</el-button>
            <el-button type="danger">Leave Group</el-button>
          </div>
        </div>
      </div>
      <div class="group-panels">
        <InfoPanel title="Events">
        </InfoPanel>
        <InfoPanel title="Polls">
        </InfoPanel>
      </div>
    </div>
    <ChatMenu>
    </ChatMenu>
  </div>  
</template>

<script>
  import GroupSidebar from '../components/sidebars/GroupSidebar.vue';
  import InfoPanel from '../components/groups/InfoPanel.vue';
  import ChatMenu from '../components/sidebars/ChatMenu.vue';
  import PatternGenerator from '../services/patterngenerator';

  export default {
    components: {
      GroupSidebar,
      InfoPanel,
      ChatMenu,
    },
    computed: {
      bannerPlaceholder() {
        return {
          backgroundImage: PatternGenerator.generateImage('rotzak'),
        };
      },
    },
    data() {
      return {};
    },
  };
</script>

<style scoped>

</style>