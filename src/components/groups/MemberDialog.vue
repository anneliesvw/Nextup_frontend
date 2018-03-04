<template>
  <el-dialog title="Invite Others" class="invite-member-dialog" :visible.sync="dialogVisible">
    <div class="invite-member-body">
      <div class="invite-member-input">
        <el-input 
          v-model="username" 
          placeholder="invite others by entering their email">
          <el-button slot="append" type="primary" class="appended-input" @click="addUser">Invite</el-button>
        </el-input>
      </div>
      <div class="no-members-message" v-if="!activeGroup || activeGroup.users.size <= 0">
        {{this.activeGroup}}
        <EmptyState
          icon="meh"
          title="No members"
          text="start adding members by inviting people via the input above."
          size="large"
        >
        </EmptyState>
      </div>
      <div class="member-list" v-else>
        <div class="member-list-item" v-for="user in activeGroup.users" :key="user.userId">
          <div>
            {{user.username}}
          </div>
          <div class="member-remove" @click="removeUser(user.userId)">
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import EmptyState from '../emptystate/EmptyState.vue';

export default {
  components: {
    EmptyState,
  },
  props: ['isVisible', 'friends', 'members', 'activeGroup'],
  data() {
    return {
      username: '',
      allfriends: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const results = queryString
        ? this.allfriends.filter(this.createFilter(queryString))
        : this.allfriends;
      cb(results);
    },
    createFilter(queryString) {
      return member =>
        member.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    addUser() {
      const payload = {
        groupId: this.activeGroup.groupId,
        username: this.username,
        onSuccess: () => {
          this.$notify({
            title: 'User Added',
            message: 'User successfully added.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Add User',
            message: 'Unable to add user.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('addUserToGroup', payload);
    },
    removeUser(user) {
      const payload = {
        userId: user,
        groupId: this.activeGroup.groupId,
        onSuccess: () => {
          this.$notify({
            title: 'User Removed',
            message: 'User successfully removed.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Remove User',
            message: 'Unable to remove user.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('deleteUserFromGroup', payload);
    },
    addfriend() {
      this.members.unshift({ value: this.state1 });
      this.state1 = '';
      // TODO: nieuwe member uit de lijst halen
    },
    removefriend(index) {
      this.members.splice(index, 1);
    },
  },
  mounted() {
    this.allfriends = this.friends;
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
};
</script>
