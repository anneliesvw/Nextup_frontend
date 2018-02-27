<template>
  <el-dialog title="Edit name"
    :visible.sync="dialogVisible">
    <div class="edit-name-form">
      <el-form label-position="top" class="edit-name">
        <el-form-item label="Name">
              <el-input class="edit-name-input"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="$emit('close')">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['isENVisible'],
  data() {
    return {};
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isENVisible;
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