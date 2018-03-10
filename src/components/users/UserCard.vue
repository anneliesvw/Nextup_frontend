<template>
  <div class="usercard-wrapper">
    <img src="https://profile.actionsprout.com/default.jpeg" alt="user image">
    <div class="username">
      {{ user.person.firstName }} {{ user.person.lastName }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
};
</script>

