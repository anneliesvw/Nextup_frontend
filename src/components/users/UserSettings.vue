<template>
  <div class="usersettings-container">

    <div class="usersettings-wrapper">

      <edit-name v-if="editNameVisible" :isENVisible="true" :userDetails="getUserDetails" @close="closeDialogName">
      </edit-name>
      <edit-password v-if="editPasswordVisible" :isEPVisible="true" @close="closeDialogPW">
      </edit-password>

      <div class="usersettings-img">
        <div class="usersettings-profilepic"></div>
      </div>

      <div class="usersettings-wrap-tab">
        <el-tabs class="usersettings-tab" tab-position="top" style="height: 200px;">

          <el-tab-pane label="general settings">
            <div class="usersettings-column">
              <div class="usersettings-label">Firstname</div>
              <div class="usersettings-text">{{getUserDetails.person.firstName}}</div>
              <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-label">Lastname</div>
              <div class="usersettings-text">{{getUserDetails.person.lastName}}</div>
              <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-label">Username</div>
              <div class="usersettings-text">{{getUserDetails.username}}</div>
              <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-label">Location</div>
              <div class="usersettings-text">{{getUserDetails.person.location.name}}</div>
              <el-button class="usersettings-button" type="text" @click="openDialogName">edit</el-button>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-line"></div>
              <div class="usersettings-label">password</div>
              <div class="usersettings-text">*******</div>
              <el-button class="usersettings-button" type="text" @click="openDialogPW">edit</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="groups">
            <group-item v-for="group in getGroups" :key="group.id" :groupName="group.name"></group-item>
          </el-tab-pane>

          <el-tab-pane label="preferences">
            <el-input class="usersettings-pref-input" v-model="newPreferenceText" v-on:keyup.enter.native="saveTag" placeholder="+ preference"></el-input>
            <div class="usersettings-preference-container">
              <div v-for="(pref) in getUserDetails.tags" :key="pref.tagId" class="usersettings-preference">
                <div class="usersettings-pref">{{pref.tagname}} </div>
                <div class="usersettings-remove" @click="removePreference(pref)">x</div>
              </div>
            </div>
          </el-tab-pane>


        </el-tabs>
      </div>

    </div>
    <chat-menu></chat-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ChatMenu from '../sidebars/ChatMenu.vue';
import EditName from './dialogs/EditName.vue';
import EditPassword from './dialogs/EditPassword.vue';
import GroupItem from './groupItem.vue';

export default {
  components: {
    ChatMenu,
    EditName,
    EditPassword,
    GroupItem,
  },

  data() {
    return {
      editNameVisible: false,
      editPasswordVisible: false,
      newPreferenceText: '',
    };
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