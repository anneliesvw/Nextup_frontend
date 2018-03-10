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
        <el-form-item label="Preferences">
          <el-tag
            :key="tag"
            v-for="tag in userInfo.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.tagname}}
          </el-tag>
          <el-autocomplete
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelect"
          >
            <i
              class="el-icon-close el-input__icon"
              slot="suffix"
              @click="handleCloseEdit">
            </i>
          </el-autocomplete>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="updateUser">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TagApi from '../../../services/tagservice';

const logger = window.console;

export default {
  props: ['isENVisible', 'userDetails'],
  data() {
    return {
      originalState: this.userDetails,
      userInfo: { ...this.userDetails },
      inputVisible: false,
      inputValue: '',
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
    handleClose(tag) {
      this.userInfo.tags.splice(this.userInfo.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const { inputValue } = this;
      if (inputValue) {
        this.userInfo.tags.push({ tagname: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    querySearch(queryString, cb) {
      TagApi.getTags(
        queryString,
        res => {
          logger.log('Similar tags succesfully loaded.');
          const results = [];
          res.data.forEach(e => results.push({ value: e.tagname }));
          cb(results);
        },
        err => {
          logger.log('Unable to load similar tags', err);
        },
      );
    },
    handleSelect(item) {
      this.inputValue = item.value;
      this.handleInputConfirm();
    },
    handleCloseEdit() {
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
};
</script>