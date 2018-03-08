<template>
  <div class="site-wrapper">
    <Navigation v-if="loggedIn"></Navigation>
    <div class="site-main">
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
  methods: {
    ...mapActions(['setLoginAttempt']),
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
    }, () => {
      localStorage.removeItem('NEXTUP_TOKEN');
      this.loggedIn = false;
      window.console.log('token could not be verified');
      this.$router.push('Register');
    });
  },
  beforeDestroy() {
    LoginEvents.bus.$off(LoginEvents.TRY_LOGIN, this.tryLogin);
  },
  mounted() {
    LoginEvents.bus.$on(LoginEvents.TRY_LOGIN, this.tryLogin);
  },
};
</script>
