<template>
    <div class="app-header">
      <div class="title">Next Up</div>
      <div class="links">
        <router-link :to="{name: 'Default'}" exact>{{ $t("navigation.activities")}}</router-link>
        <router-link to="/MyGroups">{{ $t("navigation.groups")}}</router-link>
        <router-link to="/Activities">{{ $t("navigation.discover")}}</router-link>
      </div>

      <div class="invitation-info" v-if="invitations.length > 0">
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
            <div class="avatar-circle" :style="{
              backgroundImage: userAvatarImage
              }"></div>
            <div class="el-dropdown-link name">
              {{this.user.person.firstName + " " + this.user.person.lastName}} <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-select v-model="locale" class="language-picker" @change="changeLanguage">
              <el-option
                v-for="item in languages"
                :key="item.short"
                :label="item.long"
                :value="item.short">
              </el-option>
            </el-select>
            <router-link class="app-header-nav" to="/Settings"><el-dropdown-item>{{$t("settings.profile")}}</el-dropdown-item></router-link>
            <el-dropdown-item>{{$t("settings.preferences")}}</el-dropdown-item>
            <el-dropdown-item>{{$t("settings.help")}}</el-dropdown-item>
            <el-dropdown-item :divided="true">
              <span @click="doLogout">{{$t("settings.logout")}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
import LoginEvents from '../../events/loginevents';

export default {
  data() {
    return {
      locale: this.$i18n.locale,
      languages: [
        {
          short: 'en',
          long: 'English',
        },
        {
          short: 'nl',
          long: 'Nederlands',
        },
      ],
    };
  },
  methods: {
    doLogout() {
      window.console.log('doLogout');
      LoginEvents.bus.$emit(LoginEvents.LOGOUT);
    },
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
    changeLanguage(lang) {
      window.console.log(lang);
      this.$store.dispatch('changeLanguage', lang);
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUserDetails;
    },
    userAvatarImage() {
      return this.user.person.avatarUrl ? `url(${process.env.OBJECT_STORE}/${this.user.person.avatarUrl})` : 'url(http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png)';
    },
    invitations() {
      return this.$store.getters.getInvitations;
    },
  },
};
</script>
