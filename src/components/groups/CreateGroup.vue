<template>
  <el-dialog title="Create group" class="createGroup-dialog" 
    :visible.sync="dialogVisible">
    <div class="createGroup-form">
      <el-form label-position="top" class="createGroup-name">
        <div class="createGroup-graphic">
          <div class="createGroup-cirkel">
            <i class="fas fa-camera camera-icon"></i>
          </div>
        </div>
        <div class="createGroup-left">
            <el-form-item label="Name">
              <el-input class="createGroup-input"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input class="createGroup-input" type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="$emit('close')">Create group</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['isVisible'],
    data() {
      return {
        friends: [],
        members: [],
        memberToAdd: '',
      };
    },
    computed: {
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