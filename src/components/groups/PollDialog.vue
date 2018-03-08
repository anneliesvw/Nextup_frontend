<template>
  <el-dialog :title="this.poll.name" class="update-poll-dialog" :visible.sync="dialogVisible">
    <div class="update-poll-form">
      <el-button type="danger" @click="deletePoll">Delete Poll</el-button>
      <el-form label-position="top" class="create-event">
        <el-form-item label="Title">
          <el-input v-model="dataPoll.name"></el-input>
        </el-form-item>

        <el-form-item label="Poll Options">
              <div class="polloption-add">
                <el-input placeholder="Enter option here" v-model="newOption" class="polloption-name"></el-input>
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
          <el-switch v-model="dataPoll.closed" active-color="#ff4949" inactive-color="#13ce66" active-text="Closed" inactive-text="Open">
          </el-switch>
        </el-form-item>
        <el-form-item label="Deadline">
          <el-date-picker v-model="dataPoll.deadline" type="datetime" start-placeholder="Deadline" format="HH:mm dd/MM/yyyy">
          </el-date-picker>                
        </el-form-item>    
        <el-form-item label="Description">
          <el-input v-model="dataPoll.description" type="textarea" :autosize="{minRows: 4, maxRows: 5}"></el-input>
        </el-form-item>
        <el-button type="success" @click="updatePoll">Update Poll</el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: ['isVisible', 'activeGroup', 'poll'],
  data() {
    return {
      dataPoll: { ...this.poll },
      options: [...this.poll.pollOptions],
      newOption: '',
    };
  },
  methods: {
    deletePoll() {
      const payload = {
        groupId: this.activeGroup.groupId,
        pollId: this.poll.pollId,
        onSuccess: () => {
          this.$notify({
            title: 'Poll Removed',
            message: 'Poll successfully removed.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Remove Poll',
            message: 'Unable to remove poll.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('removePoll', payload);
      this.$emit('close');
    },
    updatePoll() {
      this.dataPoll.pollOptions = this.options;
      const payload = {
        groupId: this.activeGroup.groupId,
        poll: this.dataPoll,
        onSuccess: () => {
          this.$notify({
            title: 'Poll Updated',
            message: 'Poll successfully updated.',
            type: 'success',
            duration: 2000,
          });
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Update Poll',
            message: 'Unable to update poll.',
            type: 'error',
            duration: 2000,
          });
        },
      };
      this.$store.dispatch('updatePoll', payload);
      this.$emit('close');
    },
    addOption() {
      const addOption = {
        description: this.newOption,
      };
      this.options.push(addOption);
    },
    removeOption(option) {
      const index = this.options.indexOf(option);
      this.options.splice(index, 1);
    },
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
