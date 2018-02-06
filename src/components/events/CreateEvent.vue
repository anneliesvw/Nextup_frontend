<template>
  <el-dialog title="Create Event" class="createEvent-dialog" :visible.sync="showCreateEvent">
    <div class="createEvent-form">
      <el-form label-position="top" class="createEvent-name">
        <div class="createEvent-graphic">
          <div class="createEvent-circle">
            <i class="fas fa-camera camera-icon"></i>
          </div>
        </div>
        <div class="createEvent-left">
            <el-form-item label="Title">
              <el-input class="creatEvent-input"></el-input>
            </el-form-item>
            <el-form-item label="Accessibility">
              <el-switch v-model="publicValue" active-color="#ff4949" inactive-color="#13ce66" active-text="Private" inactive-text="Public">
              </el-switch>
            </el-form-item>
            <el-form-item label="Date">
              <el-date-picker v-model="dateValue" type="datetimerange" start-placeholder="Start Date" end-placeholder="End date" :default-time="['12:00:00']" format="hh-mm dd-mm-yyyy">
              </el-date-picker>                
            </el-form-item>      
            <el-form-item label="Description">
              <el-input class="createEvent-input" type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
              </el-button>
            </el-form-item>
            <el-form-item label="Max. participants">
              <el-input-number v-model="participantsValue" :step="10"></el-input-number>
            </el-form-item>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['isVisible'],
  data() {
    return {
      dateValue: '',
      publicValue: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      participantsValue: 5,
    };
  },
  computed: {
    showCreateEvent: {
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
      const results = queryString
        ? this.friends.filter(this.createFilter(queryString))
        : this.friends;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return friend =>
        friend.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    loadAll() {
      return [
        {
          value: 'Robbe12',
        },
        {
          value: 'Matjas',
        },
        {
          value: 'Mahen',
        },
        {
          value: 'Annelies',
        },
      ];
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus(_);
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push(this.inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
  mounted() {
    this.friends = this.loadAll();
  },
};
</script>
