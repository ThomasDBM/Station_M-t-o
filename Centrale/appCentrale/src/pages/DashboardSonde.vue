<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33 ChooseStation"
      >
        <h4>Choose a Station :  </h4>
        <li v-for="(station,index) in ChoosenStations" :key="index">
          <md-checkbox v-model="string" @change="onChange" v-bind:value="station">{{station}}</md-checkbox>
        </li>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="string != null && renderComponent"
      >
        <chart-card
          :chart-data="TemperatureChart.data"
          :chart-options="TemperatureChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Temperature chart</h4>

            <label for="start">Start date:</label>
            <input type="date" id="start" name="trip-start"
                  v-model="TemperatureChart.dates.dateDebut"
                  value="2022-03-04"
                  min="2022-01-01" max="2022-12-31">

            <label for="start">Stop date:</label>
            <input type="date" id="stop" name="trip-stop"
                  v-model="TemperatureChart.dates.datefin"
                  value="2022-03-05"
                  min="2022-01-01" max="2022-12-31">
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              just updated
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
        v-if="string != null && renderComponent"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Last Datas</h4>
            <p class="category">lasts datas from the station</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="red" v-bind:sonde=this.string></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChartCard,
  OrderedTable,
} from "@/components";

export default {
  components: {
    ChartCard,
    OrderedTable,
  },
  data() {
    return {
      string : null,
      renderComponent : true,
      tableDatas : [],
      TemperatureChart: {
        dates: {
          dateDebut: new Date(),
          datefin: new Date(),
        },
        data: {
          labels: [],
          series: [],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
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

    changeTempChart() {
      console.log("http://"+this.string+":8080/data/temperature/"+this.TemperatureChart.dates.dateDebut+","+this.TemperatureChart.dates.datefin)
      fetch("http://"+this.string+":8080/data/temperature/"+this.TemperatureChart.dates.dateDebut+","+this.TemperatureChart.dates.datefin)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
    }
  }
};
</script>
<style scoped>

  .ChooseStation{
    display : flex;
    flex-direction: row;
    justify-content: space-around;
  }

</style>
