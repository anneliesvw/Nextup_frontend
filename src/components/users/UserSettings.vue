<template>
  <div class="usersettings-container">

    <div class="usersettings-wrapper">

      <edit-name v-if="editNameVisible" :isENVisible="true" @close="closeDialogName">
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
              <div class="usersettings-label">name</div>
              <div class="usersettings-text">Matthias Goossens</div>
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
            <group-item v-for="i in 20" :key="i"></group-item>
          </el-tab-pane>

          <el-tab-pane label="preferences">
            <el-input class="usersettings-pref-input" v-model="newPreferenceText" v-on:keyup.enter.native="addNewPreference" placeholder="+ preference"></el-input>
            <div class="usersettings-preference-container">
              <div v-for="pref in preferences" :key="pref" class="usersettings-preference">
                <div class="usersettings-pref">{{pref}} </div>
                <div class="usersettings-remove" @click="removePreference(pref)">x</div>
              </div>
            </div>
          </el-tab-pane>


        </el-tabs>
      </div>

    </div>
  </div>
</template>
<script>
import EditName from './dialogs/EditName.vue';
import EditPassword from './dialogs/EditPassword.vue';
import GroupItem from './groupItem.vue';

export default {
  components: {
    EditName,
    EditPassword,
    GroupItem,
  },

  data() {
    return {
      editNameVisible: false,
      editPasswordVisible: false,
      newPreferenceText: '',
      preferences: ['pref1', 'pref2'],
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
    removePreference(index) {
      this.preferences.splice(index, 1);
    },
  },
};
</script>