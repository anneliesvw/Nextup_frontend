<template>
  <el-dialog title="Create group" class="createGroup-dialog" 
    :visible.sync="dialogVisible">
    <div class="createGroup-form">
      <el-form label-position="top" class="createGroup-name">
        <div class="createGroup-graphic" :style="backgroundPattern">
          <div class="createGroup-cirkel">
            <i class="fas fa-camera camera-icon"></i>
          </div>
        </div>
        <div class="createGroup-left">
            <el-form-item label="Name">
              <el-input class="createGroup-input" v-model="groupInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input 
                class="createGroup-input" 
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
  import GroupsApi from '../../services/groupservice';
  import PatternGenerator from '../../services/patterngenerator';

  export default {
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
      backgroundPattern() {
        return {
          backgroundImage: PatternGenerator.generateImage(this.groupInfo.name || ''),
        };
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
        GroupsApi.createGroup(
          this.groupInfo,
          res => {
            window.console.log('Group created', res.data);
            this.$notify({
              title: 'Group Created',
              message: `Group '${res.data.name}' successfully created.`,
              type: 'success',
              duration: 2000,
            });
            this.$emit('created', res.data);
            this.$emit('close');
          },
          () => {
            this.$notify({
              title: 'Unable To Create Group',
              message: 'Unable to create group.',
              type: 'error',
              duration: 2000,
            });
            this.$emit('close');
          },
        );
      },
      addMember() {
        this.members.push({
          name: this.memberToAdd,
        });
        this.memberToAdd = '';
      },
      removeMember(index) {
        // TODO: remove right
        this.members.splice(index, 1);
      },
      querySearch(queryString, cb) {
        const results = queryString ?
          this.friends.filter(this.createFilter(queryString)) :
          this.friends;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return friend =>
          friend.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      },
      loadAll() {
        return [{
          value: 'Robbe12',
        }, {
          value: 'Matjas',
        }, {
          value: 'Mahen',
        }, {
          value: 'Annelies',
        }];
      },
    },
    mounted() {
      this.friends = this.loadAll();
    },
  };
</script>