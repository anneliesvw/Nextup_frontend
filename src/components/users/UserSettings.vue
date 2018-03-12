<template>
  <div class="usersettings-container">
    <div class="usersettings-wrapper">

    <edit-name v-if="editNameVisible" :isENVisible="true" :userDetails="getUserDetails" @close="closeDialogName">
    </edit-name>
    <edit-password v-if="editPasswordVisible" :isEPVisible="true" @close="closeDialogPW">
    </edit-password>

    <ImageUploader 
      imageType="users"
      v-model="userAvatar"
    >
      
    </ImageUploader>

    <div class="usersettings-wrap-tab">
      <!--div class="usersettings-preference-container">
            <div v-for="(pref) in getUserDetails.tags" :key="pref.tagId" class="usersettings-preference">
              <div class="usersettings-pref">{{pref.tagname}} </div>
              <div class="usersettings-remove" @click="removePreference(pref)">x</div>
            </div>
      </div-->
      <div class="usersettings-column">
        <div class="usersettings-label">Firstname</div>
        <div class="usersettings-text">{{getUserDetails.person.firstName}}</div>
        <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button>
        <div class="usersettings-label">Lastname</div>
        <div class="usersettings-text">{{getUserDetails.person.lastName}}</div>
        <div></div>
        <!-- <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button> -->
        <div class="usersettings-label">Username</div>
        <div class="usersettings-text">{{getUserDetails.username}}</div>
        <div></div>
        <!-- <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button> -->
        <div class="usersettings-label">Location</div>
        <div class="usersettings-text">{{getUserDetails.person.location.name}}</div>
        <div></div>

        <div class="usersettings-label">Preferences</div>
        <div class="usersettings-text"><el-tag v-for="tag in getUserDetails.tags" :key="tag.tagname">{{tag.tagname}}</el-tag></div>
        <div></div>
        <!-- <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button> -->
        <div class="usersettings-line usersettings-password-line" v-for="i in 3" :key="i"></div>
        <div class="usersettings-label">password</div>
        <div class="usersettings-text">*******</div>
        <el-button class="usersettings-button" type="text" @click="openDialogPW">edit</el-button>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EditName from './dialogs/EditName.vue';
import EditPassword from './dialogs/EditPassword.vue';
import GroupItem from './groupItem.vue';
import ImageUploader from '../ImageUploader.vue';
// import UserService from '../../services/userservice';

export default {
  components: {
    EditName,
    EditPassword,
    GroupItem,
    ImageUploader,
  },
  data() {
    return {
      userAvatar: this.$store.getters.getUserDetails.person.avatarUrl,
      editNameVisible: false,
      editPasswordVisible: false,
      newPreferenceText: '',
    };
  },
  watch: {
    userAvatar(newValue) {
      const userInfo = JSON.parse(JSON.stringify(this.getUserDetails));
      userInfo.person.avatarUrl = newValue;
      window.console.log(userInfo);
      const payload = {
        user: userInfo,
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
    },
  },
  methods: {
    openDialogName() {
      this.editNameVisible = true;
    },
    closeDialogName() {
      this.editNameVisible = false;
    },
    openDialogPW() {
      this.editPasswordVisible = true;
    },
    closeDialogPW() {
      this.editPasswordVisible = false;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addNewPreference() {
      this.preferences.push(this.newPreferenceText);
      this.newPreferenceText = '';
    },
    saveTag() {
      const payload = {
        tag: {
          tagname: this.newPreferenceText,
        },
        userId: this.getUserDetails.userId,
        onSuccess: () => {
          this.$notify({
            title: 'Preference Added',
            message: 'Preference successfully added.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Add preference',
            message: 'Unable to add preference.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('addTag', payload);
      this.newPreferenceText = '';
    },
    removePreference(pref) {
      const payload = {
        userId: this.getUserDetails.userId,
        tagId: pref.tagId,
        onSuccess: () => {
          this.$notify({
            title: 'Preference Deleted',
            message: 'Preference successfully deleted.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To delete preference',
            message: 'Unable to delete preference.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('deleteTagFromUser', payload);
    },
  },
  computed: {
    ...mapGetters(['getUserDetails', 'getGroups']),
  },
};
</script>