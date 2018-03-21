<template>
  <el-dialog title="Create group" class="create-group-dialog" 
    :visible.sync="dialogVisible">
    <div class="create-group-form">
      <el-form label-position="top" class="create-group-name">
        <ImageUploader
          :placeHolder="backgroundImage"
          imageType="groups"
          v-model="groupInfo.avatarUrl"
        >         
        </ImageUploader>
        <div class="create-group-left">
            <el-form-item label="Name">
              <el-input class="create-group-input" v-model="groupInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input 
                class="create-group-input" 
                type="textarea" 
                :autosize="{minRows: 4, maxRows: 5}" 
                v-model="groupInfo.description">
              </el-input>
            </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button class="create-group-btn" type="primary" @click="updateGroupMethod" v-if="updateForGroupId">Update group</el-button>
      <el-button class="create-group-btn" type="primary" @click="createGroup" v-if="!updateForGroupId">Create group</el-button>
      <el-button class="delete-group-btn" type="danger" @click="deleteGroupMethod" v-if="updateForGroupId">
        <i class="fas fa-trash"></i>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PatternGenerator from '../../services/patterngenerator';
import ImageUploader from '../ImageUploader.vue';

export default {
  sockets: {},
  components: {
    ImageUploader,
  },
  props: ['isVisible', 'updateForGroupId'],
  mounted() {
    if (this.updateForGroupId) {
      this.groupInfo = { ...this.getGroupById(this.updateForGroupId) };
    }
  },
  data() {
    return {
      groupInfo: {
        avatarUrl: null,
        name: '',
        description: '',
      },
      tempChanges: {},
      friends: [],
      members: [],
      memberToAdd: '',
    };
  },
  computed: {
    ...mapGetters(['getGroupById']),
    backgroundImage() {
      return PatternGenerator.generateImage(this.groupInfo.name || '');
    },
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
  methods: {
    ...mapActions(['updateGroup', 'deleteGroup']),
    createGroup() {
      const payload = {
        groupInfo: this.groupInfo,
        onSuccess: res => {
          this.$notify({
            title: 'Group Created',
            message: `Group '${res.data.name}' successfully created.`,
            type: 'success',
            duration: 2000,
          });
          this.$emit('close');
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Create Group',
            message: 'Unable to create group.',
            type: 'error',
            duration: 2000,
          });
          this.$emit('close');
        },
      };
      this.$store.dispatch('addGroup', payload);
    },
    updateGroupMethod() {
      const payload = {
        groupInfo: this.groupInfo,
        onSuccess: () => {
          this.$notify({
            title: 'Group Updated',
            message: `Group '${this.groupInfo.name}' successfully updated.`,
            type: 'success',
            duration: 2000,
          });
          this.$emit('close');
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Update Group',
            message: 'Unable to update group.',
            type: 'error',
            duration: 2000,
          });
          this.$emit('close');
        },
      };
      this.updateGroup(payload);
    },
    deleteGroupMethod() {
      this.$confirm("This will permanently delete the group and all it's events. Continue?", 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        const payload = {
          groupInfo: this.updateForGroupId,
          onSuccess: () => {
            this.$notify({
              title: this.$t('notify.createGroup.onSucces.title'),
              message: this.$t('notify.createGroup.onSucces.message', { name: res.data.name }),
              type: 'success',
              duration: 2000,
            });
            this.$emit('close');
            this.$router.push('/mygroups');
          },
          onError: () => {
            this.$notify({
              title: this.$t('notify.createGroup.onError.title'),
              message: this.$t('notify.createGroup.onError.message'),
              type: 'error',
              duration: 2000,
            });
            this.$emit('close');
          },
        };
        this.deleteGroup(payload);
      });
    },
  },
};
</script>
