<template>
  <el-dialog title="Create group" class="createGroup-dialog" 
    :visible.sync="dialogVisible">
    <div class="create-group-form">
      <el-form label-position="top" class="createGroup-name">
        <div class="create-group-graphic">
          <div class="create-group-cirkel">
            <i class="fas fa-camera camera-icon"></i>
          </div>
        </div>
        <div class="create-group-left">
            <el-form-item label="Name">
              <el-input class="create-group-input"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input class="create-group-input" type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="$emit('close')">Create group</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['isVisible'],
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
};
</script>
