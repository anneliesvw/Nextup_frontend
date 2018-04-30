<template>
  <div class="center-content">
    <div v-if="isLoading"> 

    </div>
    <template v-else>
      <SimpleUserMessage 
        :message="this.messages.emailConfirmed"
        v-if="emailConfirmed">
      </SimpleUserMessage>
      <SimpleUserMessage 
        :message="this.messages.confirmationError"
        v-else>
      </SimpleUserMessage>
    </template>
  </div>
</template>
<script>
  import SimpleUserMessage from '../../components/usermessages/SimpleUserMessage.vue';
  import AuthService from '../../services/authservice';

  export default {
    components: {
      SimpleUserMessage,
    },
    data() {
      return {
        isLoading: true,
        emailConfirmed: false,
        messages: {
          emailConfirmed: {
            title: 'E-mail confirmed',
            body: 'Your e-mail has been confirmed',
          },
          confirmationError: {
            title: 'Something went wrong.',
            body: 'Unable to confirm email.',
          },
        },
      };
    },
    mounted() {
      window.console.log(this.$route.params.token);
      AuthService.confirmEmail(
        this.$route.params.token,
        d => {
          window.console.log(d);
          this.isLoading = false;
          this.emailConfirmed = true;
        },
        e => {
          window.console.log(e);
          this.isLoading = false;
        },
      );
    },
  };
</script>