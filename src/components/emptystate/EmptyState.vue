<template>
  <div class="emptystate" v-bind:class="sizeState"> 
    <div class="emptystate-icon"><i class="fas fa-" + this.icon></i></div>
    <div class="emptystate-title" v-bind="this.title"></div>
    <div class="emptystate-text" v-bind="this.text"></div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: true,
    },
  },
  computed: {
    sizeState() {
      return {
        'emptystate-sm': this.size === 'small',
        'emptystate-md': this.size === 'medium',
        'emptystate-lg': this.size === 'large',
      };
    },
  },
};
</script>
