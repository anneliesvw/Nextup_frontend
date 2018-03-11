<template>
  <el-dialog :title="$t('events.create')" :visible.sync="showCreateEvent">
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
              <el-switch v-model="eventInfo.isPrivate" active-text="Private" inactive-text="Public">
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
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="onCreateEvent">Create Event</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ImageUploader from '../ImageUploader.vue';
import PatternGenerator from '../../services/patterngenerator';


export default {
  props: ['isVisible', 'activeGroup'],
  components: {
    ImageUploader,
  },
  data() {
    return {
      eventInfo: {
        name: '',
        avatarUrl: null,
        isPrivate: false,
        location: null,
        startDate: null,
        endDate: null,
        description: null,
      },
      dateValue: '',
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
    onCreateEvent() {
      const payload = {
        groupId: this.activeGroup.groupId,
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
      this.$store.dispatch('addEventToGroup', payload);
    },
    onSetLocation(place) {
      this.eventInfo.location = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        name: place.formatted_address,
      };
    },
  },
};
</script>