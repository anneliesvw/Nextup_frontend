<template>
  <el-dialog :title="updatingEvent ? 'Update Event' : 'Create Event'" :visible.sync="showCreateEvent">
    <div class="create-event-form">
      <el-form label-position="top" class="create-event">
        <ImageUploader
          :placeHolder="backgroundImage"
          imageType="events"
          v-model="eventInfo.avatarUrl"
        >         
        </ImageUploader>
        <div class="create-event-input">
            <el-form-item label="Title">
              <el-input placeholder="Enter title here" v-model="eventInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="Accessibility">
              <el-switch v-model="eventInfo.private" active-text="Private" inactive-text="Public">
              </el-switch>
            </el-form-item>
            <el-form-item label="Start Date">
              <el-date-picker v-model="eventInfo.startDate" type="datetime" format="HH:mm dd/MM/yyyy">
              </el-date-picker>                
            </el-form-item>
            <el-form-item label="End Date">
              <el-date-picker v-model="eventInfo.endDate" type="datetime" format="HH:mm dd/MM/yyyy">
              </el-date-picker> 
            </el-form-item>
            <el-form-item label="Location">            
              <gmap-autocomplete 
                class="google-maps-autocomplete"
                @place_changed="onSetLocation">
              </gmap-autocomplete>
            </el-form-item>      
            <el-form-item label="Description">
              <el-input type="textarea" :autosize="{minRows: 4, maxRows: 5}" v-model="eventInfo.description"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-tag
                :key="tag.tagname"
                v-for="tag in eventInfo.tags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag.tagname}}
              </el-tag>
              <el-autocomplete
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue.tagname"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @select="handleSelect"
              >
                <i
                  class="el-icon-close el-input__icon"
                  slot="suffix"
                  @click="handleCloseEdit">
                </i>
              </el-autocomplete>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="onUpdateEvent" v-if="updatingEvent">Update Event</el-button>
      <el-button type="primary" @click="onCreateEvent" v-else>Create Event</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ImageUploader from '../ImageUploader.vue';
import PatternGenerator from '../../services/patterngenerator';
import TagApi from '../../services/tagservice';

const logger = window.console;

export default {
  props: {
    isVisible: Boolean,
    activeGroup: {
      type: Object,
      default: () => {},
    },
    eventData: Object,
    isUserEvent: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ImageUploader,
  },
  data() {
    return {
      eventInfo: {
        name: '',
        avatarUrl: null,
        private: false,
        location: null,
        startDate: null,
        endDate: null,
        description: null,
        tags: [],
      },
      dateValue: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: {
        tagId: null,
        tagname: '',
      },
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
    updatingEvent() {
      return this.eventData;
    },
    userDetails() {
      return this.$store.getters.getUserDetails;
    },
  },
  methods: {
    onCreateEvent() {
      const payload = {
        // groupId: this.activeGroup.groupId,
        eventInfo: this.eventInfo,
        onSuccess: res => {
          this.$notify({
            title: 'Event Created',
            message: `Event '${res.data.id}' successfully created.`,
            type: 'success',
            duration: 2000,
          });
          this.$emit('close');
        },
        onError: () => {
          this.$notify({
            title: 'Unable To Create Event',
            message: 'Failed to created event',
            type: 'error',
            duration: 2000,
          });
          this.$emit('close');
        },
      };
      if (this.isUserEvent) {
        payload.groupId = this.userDetails.userId;
        this.$store.dispatch('addEventToUser', payload);
      } else {
        payload.groupId = this.activeGroup.groupId;
        this.$store.dispatch('addEventToGroup', payload);
      }
    },
    onUpdateEvent() {
      this.$store.dispatch('updateEvent', {
        eventData: this.eventInfo,
        eventId: this.eventData.eventId,
      });
      this.$emit('close');
    },
    onSetLocation(place) {
      this.eventInfo.location = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        name: place.formatted_address,
      };
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose(tag) {
      this.eventInfo.tags.splice(this.eventInfo.tags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      const { inputValue } = this;
      if (inputValue.tagname) {
        this.eventInfo.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = {};
    },
    querySearch(queryString, cb) {
      TagApi.getTags(
        queryString,
        res => {
          logger.log('Similar tags succesfully loaded.');
          const results = [];
          if (res.data !== '') res.data.forEach(e => results.push({ id: e.tagId, value: e.tagname }));
          cb(results);
        },
        err => {
          logger.log('Unable to load similar tags', err);
        },
      );
    },
    handleSelect(item) {
      this.inputValue = { tagId: item.id, tagname: item.value };
      this.handleInputConfirm();
    },
    handleCloseEdit() {
      this.inputVisible = false;
      this.inputValue = {};
    },
  },
  mounted() {
    if (this.updatingEvent) {
      this.eventInfo = this.eventData;
    }
  },
};
</script>