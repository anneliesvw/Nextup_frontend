<template>
  <div class="user-message simple-user-message">
      <div class="title">
          {{this.message.title}}
      </div>
      <div class="message">
          {{this.message.body}}
      </div>
  </div>
</template>
<script>
  export default {
    props: ['message'],
  };
</script>
