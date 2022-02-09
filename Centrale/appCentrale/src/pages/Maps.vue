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
      <Pointer v-for="Station in Stations" :key="Station.id" :marker="Station" ></Pointer>
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
    Pointer
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.1193089, 6.1757156],
      zoom: 12,
      Stations: [
        {id: 1, coordinates: [ 49.114910, 6.178810 ]},
        {id: 2, coordinates: [ 49.133290, 6.154370 ]},
        {id: 3, coordinates: [ 49.102160, 6.158850 ]},
        {id: 4, coordinates: [ 49.136010, 6.199630 ]},
        {id: 5, coordinates: [ 49.105563, 6.182234 ]},
      ]
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>
