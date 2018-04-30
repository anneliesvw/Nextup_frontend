<template>
  <div class="banner-image" :style="backgroundImage">
    <div class="banner-overlay">
      <div class="banner-title" v-if="!editable || editable === false">
        {{ title }}
      </div>
      <div class="banner-title" v-if="editable === true">
        <input v-model="editableTitle" @change="$emit('titleChanged', editableTitle)">
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'image', 'editable'],
  data() {
    return {
      editableTitle: '',
    };
  },
  computed: {
    backgroundImage() {
      return {
        backgroundImage: this.image,
      };
    },
  },
  mounted() {
    this.editableTitle = this.title;
  },
};
</script>

