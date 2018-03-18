<template>
  <div class="location-tracker">
    <div class="location-map">
      <div 
        v-show="currentUser"
        ref="titledialog" 
        class="current-user" 
        >
        {{currentUser ? currentUser.person.firstName : ''}}
      </div>
      <gmap-map :center="eventLocation" :zoom="7" style="">
        <gmap-marker 
          v-for="m in markers" 
          :position="m.position" 
          :clickable="true"
          :key="m.id"
          :draggable="false" 
          @mouseover="(e) => showTitle(e, m.user)"
          @mouseout="hideTitle"
          :optimized="false"
          >
        </gmap-marker>
        <gmap-marker
          :position="eventLocation"
          :label="'E'"
          >
        </gmap-marker>
      </gmap-map>

    </div>

  </div>
</template>

<script>
  import LocationSharingService from '../../services/locationsharingservice';

  export default {
    props: ['event'],
    data() {
      return {
        subscription: null,
        currentUser: null,
        locations: [],
      };
    },
    computed: {
      eventLocation() {
        return {
          lat: this.event.location.latitude,
          lng: this.event.location.longitude,
        };
      },
      markers() {
        return this.locations.map(l => ({
          user: l.user,
          id: l.id,
          position: {
            lat: l.location.latitude,
            lng: l.location.longitude,
          },
        }));
      },
      getCircle() {
        const svg = `
        <?xml version="1.0"?>
        <svg width="26px" height="26px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle stroke="#222" fill="blue" cx="50" cy="50" r="35"/>
        </svg>
        `;
        return `data:image/svg+xml;charset=UTF-8;base64,${btoa(svg)}`;
      },
    },
    methods: {
      showTitle(e, u) {
        const dialog = this.$refs.titledialog;
        this.currentUser = u;
        dialog.style.top = `${e.Ga.clientY}px`;
        dialog.style.left = `${e.Ga.clientX}px`;
      },
      hideTitle() {
        this.currentUser = null;
      },
    },
    mounted() {
      LocationSharingService.connectionPromise.then(d => {
        window.console.log(d);
        this.subscription = LocationSharingService.subscribeToEvent(this.event.eventId, msg => {
          window.console.log(msg);
          this.$set(this, 'locations', JSON.parse(msg.body));
        });
      });
    },
    beforeDestroy() {
      this.subscription.unsubscribe();
    },
  };
</script>
