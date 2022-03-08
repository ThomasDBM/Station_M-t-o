<template>
  <div class="content">
    <div class="md-layout">
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
        v-for="(station,index) in ChoosenStations" :key="index"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Last Datas of {{station}}</h4>
            <p class="category">lasts datas from the station</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="red" v-bind:sonde=station></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  OrderedTable,
} from "@/components";

export default {
  components: {
    OrderedTable,
  },
  data() {
    return {
      string : null,
      renderComponent : true,
    };
  },
  computed : {
    ChoosenStations(){
      return this.$store.state.Stations;
    }
  },
  methods : {
    onChange(){
      console.log("changemment de sonde :")

      this.changeTempChart();

      this.renderComponent = false;
        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        })
    },
  }
};
</script>

