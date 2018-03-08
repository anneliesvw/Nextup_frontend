<template>
  <div class="banner-image" :style="backgroundImage">
    <div class="banner-overlay">
      <div class="banner-title">
        {{ title }}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'image'],
  computed: {
    backgroundImage() {
      return {
        backgroundImage: this.image,
      };
    },
  },
};
</script>

