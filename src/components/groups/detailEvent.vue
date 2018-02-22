<template>
  <el-dialog title="Event name" class="discover-dialog" :visible.sync="dialogVisible">
    <div class="discover-dialog-graphic"></div>
    <div class="discover-dialog-body">
      <div class="discover-dialog-img">
      </div>
      <div class="discover-dialog-date">
        ZATERDAG 07/02 | 17:00 - 20:00
      </div>
      <div class="discover-dialog-place">
        Boerenstraat 79, 1000 Boerendorp aka Ruisbroek
      </div>
      <div class="discover-dialog-friends"></div>
      <div class="discover-dialog-info">
        Leuke info over het event Leuke info over het event Leuke info over het event Leuke info over het event Leuke info over het
        event Leuke info over het event Leuke info over het event Leuke info over het event
      </div>
      <el-checkbox v-model="checked" class="discover-dialog-present">present</el-checkbox>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['isVisible'],
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isVisible;
      },
      set(newValue) {
        if (!newValue) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {},
};
</script>
