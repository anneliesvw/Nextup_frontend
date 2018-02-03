<template>
  <div class="chat-wrapper">
    <div class="chat-element" v-for="n in 5" :key="n">
      <div class="chat-bubble">
        <img src="https://i.imgur.com/iO1VTVZ.png" alt="matjas">
      </div>
      <div>Matjas</div>
    </div>
    <div class="new-chat">
      <div>New chat</div>
      <input placeholder="Event/group">
    </div>
  </div>
</template>

<script>
export default {};
</script>
