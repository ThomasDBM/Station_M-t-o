<template>
  <div class="content">
    <div class="md-layout">
      <!--<div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33 ChooseStation"
      >
        <h4>Choose a Station :  </h4>
        <li v-for="(station,index) in ChoosenStations" :key="index">
          <md-checkbox v-model="string" @change="onChange" v-bind:value="station">{{station}}</md-checkbox>
        </li>
      </div>-->

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="this.renderComponent"
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
            <input @change="LoadDatas" type="date" id="start" name="trip-start"
                  v-model="TemperatureChart.dates.dateDebut"
                  value="2022-03-04"
                  min="2022-01-01" max="2022-12-31">

            <label for="start">Stop date:</label>
            <input @change="LoadDatas" type="date" id="stop" name="trip-stop"
                  v-model="TemperatureChart.dates.datefin"
                  value="2022-03-05"
                  min="2022-01-01" max="2022-12-31">

            <div class="md-list-item-content ">
                <drop-down class="ChooseStation">
                  <md-button
                    slot="title"
                    class="md-button md-just-icon md-simple"
                    data-toggle="dropdown"
                  >
                    <md-icon>settings_input_antenna</md-icon>
                  </md-button>
                  <ul class="dropdown-menu">
                    <li v-for="(station,index) in ChoosenStations" :key="index">
                      <md-checkbox v-model="stations" @change="LoadDatas" v-bind:value="station">{{station}}</md-checkbox>
                    </li>
                  </ul>
                </drop-down>
              </div>
          </template>

          
        </chart-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  //StatsCard,
  ChartCard,
  //NavTabsCard,
  //NavTabsTable,
  //OrderedTable,
} from "@/components";

export default {
  components: {
    //StatsCard,
    ChartCard,
    //NavTabsCard,
    //NavTabsTable,
    //OrderedTable,
  },
  data() {
    return {
      stations:[],
      renderComponent:true,
      TemperatureChart: {
        dates:{
          dateDebut: 0,
          datefin: 0,
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
          high: 0, 
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
    LoadDatas(){
      console.log("reload datas:")

      let max = 0;
      let min = 0;

      console.log("debut :"+this.TemperatureChart.dates.dateDebut)
      console.log("fin :"+this.TemperatureChart.dates.datefin)

      this.TemperatureChart.data.labels = [];
      this.TemperatureChart.data.series = [];

      this.stations.forEach(station => {
        console.log(station)
        fetch("http://"+station+":8080/data/temperature/"+this.TemperatureChart.dates.dateDebut+","+this.TemperatureChart.dates.datefin)
        .then(response => response.json())
        .then(result => {

          let localmax = Math.max(...result.temperature.value);
          let localmin = Math.min(...result.temperature.value);

          console.log("max : "+localmax);
          console.log("min : "+ localmin);

          if (localmax > max){
            max = localmax;
          }
          if (localmin < min){
            min = localmin;
          }

          this.TemperatureChart.data.labels = result.temperature.date;
          this.TemperatureChart.data.series.push(result.temperature.value);
          this.TemperatureChart.options.low = min-10;
          this.TemperatureChart.options.high = max+10;

          this.renderComponent = false;
          this.$nextTick(() => {
            // Add the component back in
            this.renderComponent = true;
          })
        })

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
    align-items: center;
  }
</style>
