<template>
    <div class="app-header">
      <div class="title">Next Up</div>
      <div class="links">
        <router-link :to="{name: 'Default'}" exact>My Activities</router-link>
        <router-link to="/MyGroups">My Groups</router-link>
        <router-link to="/Activities">Discover Activities</router-link>
      </div>
      <div class="user-info">
        <el-dropdown trigger="click">
          <div class="content-container">
            <div class="avatar"></div>
            <div class="el-dropdown-link name">
              Matthias Goossens <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Profile Settings </el-dropdown-item>
            <el-dropdown-item>Preferences</el-dropdown-item>
            <el-dropdown-item>Help & Feedback</el-dropdown-item>
            <el-dropdown-item :divided="true">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
</script>
