<template>
  <el-dialog title="Create Event" :visible.sync="showCreateEvent">
    <div class="create-event-form">
      <el-form label-position="top" class="create-event">
        <ImageUploader
          :placeHolder="backgroundImage"
          imageType="events"
        >         
        </ImageUploader>
        <div class="create-event-input">
            <el-form-item label="Title">
              <el-input placeholder="Enter title here" v-model="eventInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="Accessibility">
              <el-switch v-model="publicValue" active-color="#ff4949" inactive-color="#13ce66" active-text="Private" inactive-text="Public">
              </el-switch>
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
            <el-form-item label="Max. participants">
              <el-input-number v-model="participantsValue" :step="10" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="Price">
              <el-input placeholder="Please input" v-model="price" class="price-input">
                <el-select v-model="valuta" slot="append" placeholder="Select">
                  <el-option label="€" value="1"></el-option>
                  <el-option label="$" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '../ImageUploader.vue';
import PatternGenerator from '../../services/patterngenerator';

export default {
  props: ['isVisible'],
  components: {
    ImageUploader,
  },
  data() {
    return {
      eventInfo: {
        title: '',
      },
      dateValue: '',
      publicValue: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      participantsValue: 0,
      price: '',
      valuta: '',
    };
  },
  computed: {
    backgroundImage() {
      return PatternGenerator.generateImage(this.eventInfo.title || '');
    },
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
