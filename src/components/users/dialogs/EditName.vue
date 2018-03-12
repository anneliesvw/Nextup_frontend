<template>
  <el-dialog title="Edit name" :visible.sync="dialogVisible">
    <div class="edit-name-form">
      <el-form label-position="top" class="edit-name-form">
        <el-form-item label="Firstname">
          <el-input class="edit-name-input" v-model="userInfo.person.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Lastname">
          <el-input class="edit-name-input" v-model="userInfo.person.lastName"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input class="edit-name-input" v-model="userInfo.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Location">
          <gmap-autocomplete class="google-maps-autocomplete" @place_changed="onSetLocation" v-model="userInfo.person.location.name">
          </gmap-autocomplete>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" class="update-user-btn" @click="updateUser">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['isENVisible', 'userDetails'],
  data() {
    return {
      originalState: this.userDetails,
      userInfo: { ...this.userDetails },
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isENVisible;
      },
      set(newValue) {
        if (!newValue) {
          this.userInfo = Object.assign({}, this.originalState);
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    close() {
      this.userInfo = Object.assign({}, this.originalState);
      this.$emit('close');
    },
    onSetLocation(place) {
      this.userInfo.person.location.longitude = place.geometry.location.lng();
      this.userInfo.person.location.latitude = place.geometry.location.lat();
      this.userInfo.person.location.name = place.formatted_address;
    },
    updateUser() {
      const payload = {
        user: this.userInfo,
        onSuccess: () => {
          this.$notify({
            title: 'User Updated',
            message: 'User successfully updated.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Update User',
            message: 'Unable to update User.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('updateUser', payload);
      this.$emit('close');
    },
  },
};
</script>