<template>
  <el-dialog title="Create group" class="createGroup-dialog" :visible.sync="dialogVisible">
    <div class="create-group-form">
      <el-form label-position="top" class="createGroup-name">
        <div class="create-group-left">
          <el-form-item label="member">
            <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="Please Input"></el-autocomplete>
            <i class="fas fa-plus" @click="addfriend"></i>
          </el-form-item>
        </div>

      </el-form>
      <div v-for="(member, index) in members" :key="index">
        <div>{{member.value}}</div>
        <i class="fas fa-minus" @click="removefriend(index)"></i>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="$emit('close')">Create group</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['isVisible', 'friends', 'members'],
  data() {
    return {
      state1: '',
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
