<template>
  <div class="discover-events">
    <div class="discover-filters">
      <div class="filter-container">
        <div class="category-filter event-filter">
          <div class="filter-label">
            Category
            <button class="clear-filter" @click="clearTags">Clear</button>
          </div>
          <div class="filter-controls">
            <tags-autocomplete v-model="filterObject.tags">
            </tags-autocomplete>
          </div>
        </div>
        <div class="location-filter event-filter">
          <div class="filter-label">
            Location
            <button class="clear-filter" @click="clearLocation">Clear</button>
          </div>
          <div class="filter-controls">
            <gmap-autocomplete 
                class="google-maps-autocomplete"
                @place_changed="onSetLocation"
                :value="locationValue">
            </gmap-autocomplete>
          </div>
        </div>
        <div class="date-filter event-filter">
          <div class="filter-label">
            Date Between
            <button class="clear-filter" @click="clearDates">
              Clear
            </button>
          </div>
          <div class="filter-control">
            <el-date-picker 
              type="datetime" 
              format="HH:mm dd/MM/yyyy" 
              placeholder="Earliest date"
              v-model="filterObject.earliestDate">
            </el-date-picker>
            <el-date-picker 
              type="datetime" 
              format="HH:mm dd/MM/yyyy" 
              placeholder="Latest date"
              v-model="filterObject.latestDate">
            </el-date-picker>   
          </div>
        </div>
        <el-button type="primary" @click="onGetEvents">Filter Events</el-button>
      </div>
    </div>
    <div class="discover-results">
      <div class="results-wrapper" v-if="events">
        <Activity v-for="event in events" :key="event.eventId" :event="event">

        </Activity>
      </div>
      <EmptyState v-else
        title="No Events"
        icon="filter"
        size="large"
        text="Please enter some criteria above to start looking for events">
      </EmptyState>
    </div>
  </div>
  <!--div class="discover-wrapper">
    <div class="discover-recommended">
      <div class="discover-title">{{$t("discover.main")}}</div>
      <div class="discover-intrest">
        <carousel-events></carousel-events>
      </div>
    </div>
    <div class="discover-recommended">
      <div class="discover-title">{{$t("discover.location")}}</div>
      <div class="discover-intrest">
        <carousel-events></carousel-events>
      </div>
    </div>
    <div class="discover-recommended">
      <div class="discover-title">{{$t("discover.interests")}}</div>
      <div class="discover-category" v-for="i in 5" :key="i">
        <div class="discover-category-title">category name</div>
        <div class="discover-intrest">
        <carousel-events></carousel-events>
      </div>
      </div>
      
    </div>
  </div-->
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Sidebar from '../components/sidebars/Sidebar.vue';
import CarouselEvents from '../components/events/CarouselEvents.vue';
import EmptyState from '../components/emptystate/EmptyState.vue';
import TagsAutocomplete from '../components/inputs/TagsAutocomplete.vue';
import EventsApi from '../services/eventservice';
import Activity from '../components/activities/Activity.vue';

export default {
  components: {
    Activity,
    Carousel,
    Slide,
    Sidebar,
    CarouselEvents,
    EmptyState,
    TagsAutocomplete,
  },
  data() {
    return {
      events: null,
      locationValue: '',
      filterObject: {
        tags: [],
        earliestDate: null,
        latestDate: null,
        locationFilter: null,
      },
      dialogVisible: false,
      categoryInputValue: '',
      locationFilter: null,
      categoryInputVisible: false,
    };
  },
  methods: {
    clearLocation() {
      this.filterObject.locationFilter = null;
      this.locationValue = '';
    },
    clearTags() {
      this.filterObject.tags = [];
    },
    clearDates() {
      this.filterObject.earliestDate = null;
      this.filterObject.latestDate = null;
    },
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    slideRight() {
      const element = this.$refs.goLeft;
      element.scrollLeft += 250;
    },
    slideLeft() {
      const element = this.$refs.goLeft;
      element.scrollLeft -= 250;
    },
    filterEvents(ex) {
      window.console.log(ex);
    },
    onSetLocation(place) {
      this.locationValue = place.formatted_address;
      this.filterObject.locationFilter = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        name: place.formatted_address,
      };
    },
    onGetEvents() {
      window.console.log('lol');
      EventsApi.getByFilterObject(
        this.filterObject,
        res => {
          window.console.log(res);
          this.events = res.data;
        },
        err => {
          window.console.log(err);
        },
      );
    },
  },
};
</script>