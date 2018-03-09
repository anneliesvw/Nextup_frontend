<template>
    <div class="app-header">
      <div class="title">Next Up</div>
      <div class="links">
        <router-link :to="{name: 'Default'}" exact>My Activities</router-link>
        <router-link to="/MyGroups">My Groups</router-link>
        <router-link to="/Activities">Discover Activities</router-link>
      </div>

      <div class="invitation-info">
        <el-dropdown trigger="click" :hide-on-click="false">
          <div class="content-container">
            <div class="el-dropdown-link name">
              <el-badge v-if="invitations.length > 0" :value="invitations.length" class="item">
                <i v-if="invitations.length > 0" class="far fa-bell fa-2x"></i>
              </el-badge>
              <i v-if="invitations.length < 1" class="far fa-bell-slash fa-2x"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="invitations.length < 1" :disabled="true">No invitations</el-dropdown-item>
            <el-dropdown-item v-for="i in invitations" :key="i.id">
              <div class="invitation-container">
                <div class="invitation-text">
                  You are invited to 
                  <span v-if="i.invitationType == 'GROUP'">
                    join {{i.group.name}}
                  </span> 
                  <span v-else>
                    attend {{i.event.name}}
                  </span>
                  by {{i.inviter.person.firstName}}
                    </div>
                <div class="invitation-buttons">
                  <el-button size="mini" class="invite-accept-button" round @click="acceptInvite(i)"><i class="fas fa-check"></i></el-button>
                  <el-button size="mini" round><i class="fas fa-times" @click="ignoreInvite(i)"></i></el-button>
                </div>
              </div>             
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="user-info">
        <el-dropdown trigger="click">
          <div class="content-container">
            <div class="avatar"></div>
            <div class="el-dropdown-link name">
              {{this.user.person.firstName + " " + this.user.person.lastName}} <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link class="app-header-nav" to="/Settings"><el-dropdown-item>Profile settings</el-dropdown-item></router-link>
            <el-dropdown-item>Preferences</el-dropdown-item>
            <el-dropdown-item>Help & Feedback</el-dropdown-item>
            <el-dropdown-item :divided="true">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>

export default {
  methods: {
    acceptInvite(i) {
      const payload = {
        inviteId: i.id,
        onSuccess: () => {
          this.$notify({
            title: 'Invite accepted',
            message: 'You accepted the invite',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Accept Invite',
            message: 'Unable to accept invite.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('acceptInvite', payload);
    },
    ignoreInvite(i) {
      const payload = {
        inviteId: i.id,
        onSuccess: () => {
          this.$notify({
            title: 'Invite ignored',
            message: 'You ignored the invite',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Ignore Invite',
            message: 'Unable to ignore invite.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('ignoreInvite', payload);
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUserDetails;
    },
    invitations() {
      return this.$store.getters.getInvitations;
    },
  },
};
</script>
