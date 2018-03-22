<template>
<div class="app-wrapper">
  <div class="site-wrapper" v-if="loadingDone && !getGroupsLoading">
    <Navigation v-if="userdetailsLoaded != null && loggedIn"></Navigation>
    <div class="site-main">
      <div class="site-content" >
        <router-view v-if="loadingDone"></router-view>
      </div>
      <chat-menu v-if="loggedIn"></chat-menu>
    </div>
  </div>
  <div class="apploading" v-else>
    <div class="loading-info">
      <div class="icon">
        <i class="fas fa-circle-notch fa-spin"></i>
      </div>
      <div class="content">
        Loading: Please wait ...
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginEvents from './events/loginevents';
import Navigation from './components/header/Navigation.vue';
import AuthService from './services/authservice';
import ChatMenu from './components/sidebars/ChatMenu.vue';
import LocationService from './services/locationsharingservice';
import ChatService from './services/chatservice';

export default {
  data() {
    return {
      loggedIn: false,
      loadingDone: false,
    };
  },
  components: {
    Navigation,
    ChatMenu,
  },
  computed: {
    ...mapGetters(['getGroupsLoading']),
    userdetailsLoaded() {
      return this.$store.getters.getUserDetails;
    },
  },
  watch: {
    loggedIn(newvalue) {
      if (newvalue) {
        this.$store.dispatch('loadUserDetails');
        /* this.$store.dispatch('loadInvitations');
        this.$store.dispatch('loadGroups'); */
      }
    },
  },
  methods: {
    ...mapActions(['setLoginAttempt']),
    logout() {
      localStorage.removeItem('NEXTUP_TOKEN');
      this.loggedIn = false;
      window.console.log('logging out');
      this.$router.push('/register');
    },
    tryLogin(loginInfo) {
      AuthService.tryLogin(
        loginInfo.username,
        loginInfo.password,
        d => {
          localStorage.setItem('NEXTUP_TOKEN', d.data.access_token);
          this.$router.push('/');
          ChatService.init();
          this.loggedIn = true;
          this.setLoginAttempt('success');
        },
        e => {
          this.setLoginAttempt('failed');
          this.$store.commit('setGroupsLoading', false);
          window.console.log('failed to login.', e);
        },
      );
    },
  },
  beforeCreate() {
    const that = this;
    this.$store.dispatch('loadUserDetails').then(() => {
      window.console.log('token verified');
      this.loggedIn = true;
      this.$store.dispatch('loadGroups');
      ChatService.init();
      that.loadingDone = true;
    }).catch(() => {
      that.logout();
      that.loadingDone = true;
      this.$store.commit('setGroupsLoading', false);
    });
  },
  beforeDestroy() {
    LoginEvents.bus.$off(LoginEvents.TRY_LOGIN, this.tryLogin);
    LoginEvents.bus.$off(LoginEvents.LOGOUT, this.logout);
  },
  mounted() {
    window.console.log(LocationService);
    LoginEvents.bus.$on(LoginEvents.TRY_LOGIN, this.tryLogin);
    LoginEvents.bus.$on(LoginEvents.LOGOUT, this.logout);
  },
};
</script>
