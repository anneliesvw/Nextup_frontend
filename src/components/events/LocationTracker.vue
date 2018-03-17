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
    props: ['eventId'],
    data() {
      return {
        subscription: null,
        currentUser: null,
        eventLocation: {
          lat: 50.0,
          lng: 50.0,
        },
        locations: [
          {
            id: 1,
            location: {
              longitude: 51.00001,
              latitude: 50.02,
            },
            user: {
              username: 'mahenvermeulen@msn.com',
              person: {
                firstName: 'mahen',
                lastName: 'vermeulen',
              },
            },
          },
          {
            id: 2,
            location: {
              longitude: 50.01,
              latitude: 50.4000002,
            },
            user: {
              username: 'mahenvermeulen@msn.com',
              person: {
                firstName: 'annelies',
                lastName: 'van wallendael',
              },
            },
          },
          {
            id: 3,
            location: {
              longitude: 50.04,
              latitude: 50.0000005,
            },
            user: {
              username: 'mahenvermeulen@msn.com',
              person: {
                firstName: 'matthias',
                lastName: 'goossens',
              },
            },
          },
        ],
      };
    },
    computed: {
      markers() {
        return this.locations.map(l => ({
          user: l.user,
          id: l.id,
          position: {
            lat: l.location.longitude,
            lng: l.location.latitude,
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
      // TODO: LocationSharing
      LocationSharingService.connectionPromise.then(d => {
        window.console.log(d);
        this.subscription = LocationSharingService.subscribeToEvent(this.eventId, msg => {
          window.console.log(msg);
        });
      });
    },
    beforeDestroy() {
      this.subscription.unsubscribe();
    },
  };
</script>

<style scoped>

</style>