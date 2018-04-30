<template>
  <div class="center-content">
    <SimpleUserMessage 
      :message="currentComponent">

    </SimpleUserMessage>
  </div>
</template>

<script>
  import SimpleUserMessage from '../../components/usermessages/SimpleUserMessage.vue';

  export default {
    components: {
      SimpleUserMessage,
    },
    data() {
      return {
        messages: {
          registrationComplete: {
            title: 'Confirm E-mail',
            body: 'Your registration has been completed. Please check your inbox to confirm your e-mail.',
          },
          backupMessage: {
            title: 'Wrong Route.',
            body: 'This route doesn\'t seem to be correct.',
          },
        },
      };
    },
    computed: {
      currentComponent() {
        const comp = this.$route.params.component;
        return this.messages[comp] ? this.messages[comp] : this.messages.backupMessage;
      },
    },
  };
</script>
