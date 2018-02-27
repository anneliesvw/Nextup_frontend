<template>
  <el-dialog class="edit-password-dialog" title="Edit password" :visible.sync="dialogVisible">
    <div class="edit-password-form">
      <el-form label-position="top" class="edit-password">

          <el-form-item label="old password">
            <div class="edit-password-group">
            <el-input class="edit-password-input" :type="textType"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
          </el-form-item>
          <el-form-item label="new password">
            <div class="edit-password-group">
            <el-input class="edit-password-input" type="password"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
          </el-form-item>
          <el-form-item label="new password again">
            <div class="edit-password-group">
            <el-input class="edit-password-input" type="password"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
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
  props: ['isEPVisible'],
  data() {
    return {
      textType: 'password',
      islooking: false,
      source:
        'https://cdn.thinglink.me/api/image/1010252198820446210/1240/10/scaletowidth',
    };
  },
  methods: {
    isLookingChange() {
      if (!this.isLooking) {
        this.textType = 'text';

        this.source =
          'https://cdn.shopify.com/s/files/1/1061/1924/products/Monkey_Face_Emoji_large.png?v=1480481036';
        this.isLooking = !this.isLooking;
      } else {
        this.textType = 'password';
        this.source =
          'https://cdn.thinglink.me/api/image/1010252198820446210/1240/10/scaletowidth';
        this.isLooking = !this.isLooking;
      }
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isEPVisible;
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