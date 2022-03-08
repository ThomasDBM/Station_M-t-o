<template>
  <div>
    <l-map
      id="map"
      :center="center"
      :zoom="zoom"
      class="map"
      ref="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer ref="tilelayer" :url="url"></l-tile-layer>
      <Pointer v-for="(station,index) in this.$store.state.Stations" :key="index" :station="station"></Pointer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import Pointer from './Marker.vue'

export default {
  components: {
    LMap,
    LTileLayer,
    Pointer,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.1193089, 6.1757156],
      zoom: 12
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    onChange() {
      console.log("changemment de sonde 2:");

      this.updateCoordStations();

      this.renderComponent = false;
      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
  },
};
</script>
