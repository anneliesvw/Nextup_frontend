<template>
  <div class="site-wrapper">
    <Navigation v-if="loggedIn"></Navigation>
    <router-view></router-view>
  </div>

</template>

<script>
  import Navigation from './components/header/Navigation.vue';

  export default {
    data() {
      return {
        loggedIn: false,
      };
    },
    components: {
      Navigation,
    },
    beforeCreate() {
      const token = localStorage.getItem('NEXTUP_TOKEN');
      if (token != null) {
        this.loggedIn = true;
      } else {
        this.$router.push('Register');
      }
    },
  };
</script>