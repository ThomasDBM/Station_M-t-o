<template>
  <l-marker
    :key="marker.id"
    :lat-lng="marker.coordinates"
  >
    <l-icon ref="icon">
      <md-icon>location_on</md-icon>
    </l-icon>
  </l-marker>
</template>

<script>
import { LIcon, LMarker } from 'vue2-leaflet'
export default {
  components: { LIcon, LMarker },
  props: {
    marker: {
      type: Object,
      required: true
    }
  }
}
</script>