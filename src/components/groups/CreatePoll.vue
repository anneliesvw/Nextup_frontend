<template>
  <el-dialog :title="$t('polls.create')" :visible.sync="dialogVisible">
    <div class="create-event-form">
      <el-form label-position="top" class="create-event">
        <div class="create-event-input">
            <el-form-item label="Title">
              <el-input placeholder="Enter title here" v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="Poll Options">
              <div class="polloption-add">
                <el-input placeholder="Enter option here" v-model="newOption" class="polloption-name"></el-input>
                <!-- <el-date-picker v-model="dateValue" class="polloption-name" type="datetimerange" start-placeholder="Start Date" end-placeholder="End date" :default-time="['12:00:00']" format="hh:mm dd/MM/yyyy">
                </el-date-picker> -->
                <el-button type="primary" @click="addOption">Add option</el-button>
              </div>
            </el-form-item>

            <div class="option-list">
              <div class="option-list-item" v-for="option in options" :key="option.id">
                <el-input :value="option.description" disabled>
                </el-input>
                <el-button slot="append" class="appended-input" type="danger" @click="removeOption(option)">Delete</el-button>
              </div> 
            </div>

            <el-form-item label="Visible for members">
              <el-switch v-model="isClosed" active-color="#ff4949" inactive-color="#13ce66" active-text="No" inactive-text="Yes">
              </el-switch>
            </el-form-item>
            <el-button class="create-poll-btn" type="primary" @click="savePoll">Create poll</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['isVisible', 'activeGroup'],
  data() {
    return {
      title: '',
      isClosed: '',
      options: [],
      newOption: '',
      dateValue: '',
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
    addOption() {
      const addOption = {
        description: this.newOption,
        // date: this.dateValue,
      };
      this.options.push(addOption);
      this.newOption = '';
    },
    removeOption(option) {
      const index = this.options.indexOf(option);
      this.options.splice(index, 1);
    },
    savePoll() {
      const that = this;
      const payload = {
        poll: {
          groupId: this.activeGroup.groupId,
          name: this.title,
          closed: this.isClosed,
          pollOptions: this.options,
        },
        onSuccess: () => {
          this.$notify({
            title: that.$t('notify.createPoll.onSucces.title'),
            message: that.$t('notify.createPoll.onSucces.message'),
            type: 'success',
            duration: 2000,
          });
          this.$emit('close');
        },
        onError: () => {
          this.$notify({
            title: that.$t('notify.createPoll.onError.title'),
            message: that.$t('notify.createPoll.onError.message'),
            type: 'error',
            duration: 2000,
          });
          this.$emit('close');
        },
      };
      this.$store.dispatch('addPoll', payload);
    },
  },
  mounted() {},
};
</script>
