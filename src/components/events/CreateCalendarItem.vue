<template>
  <el-dialog title="Create Event" :visible.sync="showCreateEvent">
    <div class="create-event-form">
      <el-form label-position="top" class="create-event">
        <div class="create-event-graphic">
          <div class="create-event-circle">
            <i class="fas fa-camera camera-icon"></i>
          </div>
        </div>
        <div class="create-event-input">
            <el-form-item label="Title">
              <el-input placeholder="Enter title here"></el-input>
            </el-form-item>
            <el-form-item label="Date">
              <el-date-picker v-model="dateValue" type="datetimerange" start-placeholder="Start Date" end-placeholder="End date" :default-time="['12:00:00']" format="hh-mm dd-mm-yyyy">
              </el-date-picker>                
            </el-form-item>
            <el-form-item label="Location">
              <el-input placeholder=""></el-input>
            </el-form-item>      
            <el-form-item label="Description">
              <el-input type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
              </el-button>
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
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
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
};
</script>