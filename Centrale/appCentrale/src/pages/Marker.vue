<template>
  <l-marker :lat-lng="this.coordinates">
    <l-icon ref="icon">
      <md-icon>location_on</md-icon>
    </l-icon>
  </l-marker>
</template>

<script>
import { LIcon, LMarker } from "vue2-leaflet";
export default {
  components: { LIcon, LMarker },
  props: {
    station: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      coordinates: [0, 0],
    };
  },
  mounted() {
    fetch("http://" + this.station + ":8080/data/gpsposition")
      .then((response) => response.json())
      .then((result) => {
        this.coordinates = [
          result.gpsposition["value"][0].lat,
          result.gpsposition["value"][0].lon,
        ];
      });
  },
};
</script>
