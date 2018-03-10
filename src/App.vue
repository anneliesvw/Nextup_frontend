<template>
  <div class="site-wrapper">
    <Navigation v-if="userdetailsLoaded != null && loggedIn"></Navigation>
    <div class="site-main" v-if="userdetailsLoaded != null || !loggedIn">
      <div class="site-content">
        <router-view></router-view>
      </div>
      <chat-menu v-if="loggedIn"></chat-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginEvents from './events/loginevents';
import Navigation from './components/header/Navigation.vue';
import AuthService from './services/authservice';
import ChatMenu from './components/sidebars/ChatMenu.vue';

export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  components: {
    Navigation,
    ChatMenu,
  },
  computed: {
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
      this.$router.push('Register');
    },
    tryLogin(loginInfo) {
      AuthService.tryLogin(
        loginInfo.username,
        loginInfo.password,
        d => {
          localStorage.setItem('NEXTUP_TOKEN', d.data.access_token);
          this.$router.push('/');
          this.loggedIn = true;
          this.setLoginAttempt('success');
        },
        e => {
          this.setLoginAttempt('failed');
          window.console.log('failed to login.', e);
        },
      );
    },
  },
  beforeCreate() {
    AuthService.getUserDetails(() => {
      window.console.log('token verified');
      this.loggedIn = true;
      this.$store.dispatch('loadGroups');
      this.$store.dispatch('loadUserDetails');
    }, () => {
      this.logout();
    });
  },
  beforeDestroy() {
    LoginEvents.bus.$off(LoginEvents.TRY_LOGIN, this.tryLogin);
    LoginEvents.bus.$off(LoginEvents.LOGOUT, this.logout);
  },
  mounted() {
    LoginEvents.bus.$on(LoginEvents.TRY_LOGIN, this.tryLogin);
    LoginEvents.bus.$on(LoginEvents.LOGOUT, this.logout);
  },
};
</script>
