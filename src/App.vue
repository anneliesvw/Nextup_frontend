<template>
  <div class="site-wrapper">
    <Navigation v-if="loggedIn"></Navigation>
    <router-view></router-view>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import LoginEvents from './events/loginevents';
import Navigation from './components/header/Navigation.vue';
import AuthService from './services/authservice';

export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(['setLoginAttempt']),
    tryLogin(loginInfo) {
      window.console.log(loginInfo);
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
    checkToken() {
      const token = localStorage.getItem('NEXTUP_TOKEN');
      window.console.log(token);
      if (token != null) {
        this.loggedIn = true;
      } else {
        this.$router.push('Register');
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('loadGroups');
    this.$store.dispatch('loadUserDetails');
    // this.checkToken();
  },
  beforeDestroy() {
    LoginEvents.bus.$off(LoginEvents.TRY_LOGIN, this.tryLogin);
  },
  mounted() {
    this.checkToken();
    window.console.log('api', process.env.API_ENDPOINT);
    LoginEvents.bus.$on(LoginEvents.TRY_LOGIN, this.tryLogin);
  },
};
</script>
