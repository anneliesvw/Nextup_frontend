<template>
  <div class="createGroup-wrapper">
    <Navigation></Navigation>
    <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>
    <div class="createGroup-dialogDiv">
      <el-dialog title="Create group" :visible.sync="dialogVisible" class="createGroup-dialog" width="80%">
        <div class="createGroup-form">
          <el-form label-position="top" class="createGroup-name">
            <div class="createGroup-graphic">
              <div class="createGroup-cirkel">
                <i class="fas fa-camera camera-icon"></i>
              </div>
            </div>
            <div class="createGroup-left">
              <div>
                <el-form-item label="Name">
                  <el-input class="createGroup-input"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input class="createGroup-input" type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
                </el-form-item>
              </div>
              <div class="createGroup-membercontainer">
                <el-form-item label="Members">
                  <div class="createGroup-addMember">
                    <el-autocomplete class="createGroup-member" :fetch-suggestions="querySearch" v-model="memberToAdd"></el-autocomplete>
                    <i class="fas fa-user-plus" @click="addMember()"></i>
                  </div>
                  <div v-for="(member, index) in members" :key="index" class="createGroup-memberdiv">
                    <div class="createGroup-member">{{member.name}}</div>
                    <i class="fas fa-minus" @click="removeMember(index)"></i>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Create group</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Navigation from '../components/header/Navigation.vue';

  export default {
    components: {
      Navigation,
    },
    data() {
      return {
        friends: [],
        members: [],
        memberToAdd: '',
        dialogVisible: false,
      };
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