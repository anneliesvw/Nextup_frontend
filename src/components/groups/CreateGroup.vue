<template>
  <el-dialog title="Create group" class="create-group-dialog" 
    :visible.sync="dialogVisible">
    <div class="create-group-form">
      <el-form label-position="top" class="create-group-name">
        <ImageUploader
          :placeHolder="backgroundImage"
          imageType="groups"
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
                v-model="groupInfo.description"></el-input>
            </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="createGroup">Create group</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import PatternGenerator from '../../services/patterngenerator';
  import ImageUploader from '../ImageUploader.vue';

  export default {
    components: {
      ImageUploader,
    },
    props: ['isVisible'],
    data() {
      return {
        groupInfo: {
          name: '',
          description: '',
        },
        friends: [],
        members: [],
        memberToAdd: '',
      };
    },
    computed: {
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
    },
  };
</script>
