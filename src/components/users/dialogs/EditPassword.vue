<template>
  <el-dialog class="edit-password-dialog" title="Edit password" :visible.sync="dialogVisible">
    <div class="edit-password-form">
      <el-form label-position="top" class="edit-password">

          <el-form-item label="old password">
            <div class="edit-password-group">
            <el-input class="edit-password-input" :type="textType" v-model="oldPass"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
          </el-form-item>
          <el-form-item label="new password">
            <div class="edit-password-group">
            <el-input class="edit-password-input" :type="textType" v-model="newPass"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
          </el-form-item>
          <el-form-item label="new password again">
            <div class="edit-password-group">
            <el-input class="edit-password-input" :type="textType" @keyup.native="checkInput" v-model="newPassAgain"></el-input>
            <el-button v-on:click.native="isLookingChange" type="info" class="edit-password-btn">
              <div class="edit-password-img">
                <img alt="monkey" :src="source" class="edit-password-monkey1"/>
              </div>
            </el-button>
            </div>
            <el-alert v-if="inputWrong" title="password has to be the same" type="error">
              </el-alert>
          </el-form-item>
          

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="updatePassword">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['isEPVisible'],
  data() {
    return {
      inputWrong: false,
      oldPass: '',
      newPass: '',
      newPassAgain: '',
      textType: 'password',
      islooking: false,
      source:
        'https://cdn.thinglink.me/api/image/1010252198820446210/1240/10/scaletowidth',
    };
  },
  methods: {
    checkInput() {
      if (!(this.newPass === this.newPassAgain)) {
        this.inputWrong = true;
      } else {
        this.inputWrong = false;
      }
    },
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
    updatePassword() {
      const payload = {
        changePassword: {
          oldPassword: this.oldPass,
          newPassword: this.newPass,
        },
        onSuccess: () => {
          this.$notify({
            title: 'Password Updated',
            message: 'Password successfully updated.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Update Password',
            message: 'Unable to update Password.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('updatePassword', payload);
      this.$emit('close');
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