<template>
  <div class="friend-item-container">
    <div class="friend-item-detailimg">
      <div class="friend-item-image">
        <div class="friend-item-img"></div>
        <div class="friend-item-tag">{{groupName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['groupName'],
  };
</script>