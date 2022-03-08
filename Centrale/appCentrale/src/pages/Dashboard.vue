<template>
  <div class="content">
    <div class="md-layout">
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
            <input
              @change="LoadTempDatas"
              type="date"
              id="start"
              name="trip-start"
              v-model="TemperatureChart.dates.dateDebut"
              value="2022-03-04"
              min="2022-01-01"
              max="2022-12-31"
            />

            <label for="start">Stop date:</label>
            <input
              @change="LoadTempDatas"
              type="date"
              id="stop"
              name="trip-stop"
              v-model="TemperatureChart.dates.datefin"
              value="2022-03-05"
              min="2022-01-01"
              max="2022-12-31"
            />

            <div class="md-list-item-content">
              <md-icon>settings_input_antenna</md-icon>
              <h4>Stations :</h4>
              <ul class="ChooseStation">
                <li v-for="(station, index) in ChoosenStations" :key="index">
                  <md-checkbox
                    v-model="tempStation"
                    @change="LoadTempDatas"
                    v-bind:value="station"
                    >{{ station }}</md-checkbox
                  >
                </li>
              </ul>
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="this.renderComponent"
      >
        <chart-card
          :chart-data="PressureChart.data"
          :chart-options="PressureChart.options"
          :chart-type="'Line'"
          data-background-color="orange"
        >
          <template slot="content">
            <h4 class="title">Pressure chart</h4>

            <label for="start">Start date:</label>
            <input
              @change="LoadPressureDatas"
              type="date"
              id="start"
              name="trip-start"
              v-model="PressureChart.dates.dateDebut"
              value="2022-03-04"
              min="2022-01-01"
              max="2022-12-31"
            />

            <label for="start">Stop date:</label>
            <input
              @change="LoadPressureDatas"
              type="date"
              id="stop"
              name="trip-stop"
              v-model="PressureChart.dates.datefin"
              value="2022-03-05"
              min="2022-01-01"
              max="2022-12-31"
            />

            <div class="md-list-item-content">
              <md-icon>settings_input_antenna</md-icon>
              <h4>Stations :</h4>
              <ul class="ChooseStation">
                <li v-for="(station, index) in ChoosenStations" :key="index">
                  <md-checkbox
                    v-model="pressureStation"
                    @change="LoadPressureDatas"
                    v-bind:value="station"
                    >{{ station }}</md-checkbox
                  >
                </li>
              </ul>
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="this.renderComponent"
      >
        <chart-card
          :chart-data="hygroChart.data"
          :chart-options="hygroChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Hygrometry chart</h4>

            <label for="start">Start date:</label>
            <input
              @change="LoadhygroDatas"
              type="date"
              id="start"
              name="trip-start"
              v-model="hygroChart.dates.dateDebut"
              value="2022-03-04"
              min="2022-01-01"
              max="2022-12-31"
            />

            <label for="start">Stop date:</label>
            <input
              @change="LoadhygroDatas"
              type="date"
              id="stop"
              name="trip-stop"
              v-model="hygroChart.dates.datefin"
              value="2022-03-05"
              min="2022-01-01"
              max="2022-12-31"
            />

            <div class="md-list-item-content">
              <md-icon>settings_input_antenna</md-icon>
              <h4>Stations :</h4>
              <ul class="ChooseStation">
                <li v-for="(station, index) in ChoosenStations" :key="index">
                  <md-checkbox
                    v-model="hygroStation"
                    @change="LoadhygroDatas"
                    v-bind:value="station"
                    >{{ station }}</md-checkbox
                  >
                </li>
              </ul>
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="this.renderComponent"
      >
        <chart-card
          :chart-data="brightChart.data"
          :chart-options="brightChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">brightness chart</h4>

            <label for="start">Start date:</label>
            <input
              @change="LoadbrightDatas"
              type="date"
              id="start"
              name="trip-start"
              v-model="brightChart.dates.dateDebut"
              value="2022-03-04"
              min="2022-01-01"
              max="2022-12-31"
            />

            <label for="start">Stop date:</label>
            <input
              @change="LoadbrightDatas"
              type="date"
              id="stop"
              name="trip-stop"
              v-model="brightChart.dates.datefin"
              value="2022-03-05"
              min="2022-01-01"
              max="2022-12-31"
            />

            <div class="md-list-item-content">
              <md-icon>settings_input_antenna</md-icon>
              <h4>Stations :</h4>
              <ul class="ChooseStation">
                <li v-for="(station, index) in ChoosenStations" :key="index">
                  <md-checkbox
                    v-model="brightStation"
                    @change="LoadbrightDatas"
                    v-bind:value="station"
                    >{{ station }}</md-checkbox
                  >
                </li>
              </ul>
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-if="this.renderComponent"
      >
        <chart-card
          :chart-data="WindChart.data"
          :chart-options="WindChart.options"
          :chart-type="'Line'"
          data-background-color="orange"
        >
          <template slot="content">
            <h4 class="title">Wind Velocity chart</h4>

            <label for="start">Start date:</label>
            <input
              @change="LoadwindDatas"
              type="date"
              id="start"
              name="trip-start"
              v-model="WindChart.dates.dateDebut"
              value="2022-03-04"
              min="2022-01-01"
              max="2022-12-31"
            />

            <label for="start">Stop date:</label>
            <input
              @change="LoadwindDatas"
              type="date"
              id="stop"
              name="trip-stop"
              v-model="WindChart.dates.datefin"
              value="2022-03-05"
              min="2022-01-01"
              max="2022-12-31"
            />

            <div class="md-list-item-content">
              <md-icon>settings_input_antenna</md-icon>
              <h4>Stations :</h4>
              <ul class="ChooseStation">
                <li v-for="(station, index) in ChoosenStations" :key="index">
                  <md-checkbox
                    v-model="windStation"
                    @change="LoadwindDatas"
                    v-bind:value="station"
                    >{{ station }}</md-checkbox
                  >
                </li>
              </ul>
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
      tempStation: [],
      pressureStation: [],
      hygroStation: [],
      brightStation: [],
      windStation: [],
      renderComponent: true,
      TemperatureChart: {
        dates: {
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
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
      PressureChart: {
        dates: {
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
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
      hygroChart: {
        dates: {
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
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
      brightChart: {
        dates: {
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
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
      WindChart: {
        dates: {
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
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
    };
  },
  computed: {
    ChoosenStations() {
      return this.$store.state.Stations;
    },
  },
  methods: {
    LoadTempDatas() {
      let max = -10000000000;
      let min = 10000000000;

      this.TemperatureChart.data.labels = [];
      this.TemperatureChart.data.series = [];

      this.tempStation.forEach((station) => {
        fetch(
          "http://" +
            station +
            ":8080/data/temperature/" +
            this.TemperatureChart.dates.dateDebut +
            "," +
            this.TemperatureChart.dates.datefin
        )
          .then((response) => response.json())
          .then((result) => {
            let localmax = Math.max(...result.temperature.value);
            let localmin = Math.min(...result.temperature.value);

            if (localmax > max) {
              max = localmax;
            }
            if (localmin < min) {
              min = localmin;
            }

            this.TemperatureChart.data.labels = result.temperature.date;
            this.TemperatureChart.data.series.push(result.temperature.value);
            this.TemperatureChart.options.low = min - 0.05 * min;
            this.TemperatureChart.options.high = max + 0.05 * max;

            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          });
      });
    },

    LoadPressureDatas() {
      let max = -10000000000;
      let min = 10000000000;

      this.PressureChart.data.labels = [];
      this.PressureChart.data.series = [];

      this.pressureStation.forEach((station) => {
        fetch(
          "http://" +
            station +
            ":8080/data/pressure/" +
            this.PressureChart.dates.dateDebut +
            "," +
            this.PressureChart.dates.datefin
        )
          .then((response) => response.json())
          .then((result) => {
            let localmax = Math.max(...result.pressure.value);
            let localmin = Math.min(...result.pressure.value);

            if (localmax > max) {
              max = localmax;
            }
            if (localmin < min) {
              min = localmin;
            }

            this.PressureChart.data.labels = result.pressure.date;
            this.PressureChart.data.series.push(result.pressure.value);
            this.PressureChart.options.low = min - 0.05 * min;
            this.PressureChart.options.high = max + 0.05 * max;

            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          });
      });
    },

    LoadhygroDatas() {
      let max = -10000000000;
      let min = 10000000000;

      this.hygroChart.data.labels = [];
      this.hygroChart.data.series = [];

      this.hygroStation.forEach((station) => {
        fetch(
          "http://" +
            station +
            ":8080/data/hygrometry/" +
            this.hygroChart.dates.dateDebut +
            "," +
            this.hygroChart.dates.datefin
        )
          .then((response) => response.json())
          .then((result) => {
            let localmax = Math.max(...result.hygrometry.value);
            let localmin = Math.min(...result.hygrometry.value);

            if (localmax > max) {
              max = localmax;
            }
            if (localmin < min) {
              min = localmin;
            }

            this.hygroChart.data.labels = result.hygrometry.date;
            this.hygroChart.data.series.push(result.hygrometry.value);
            this.hygroChart.options.low = min - 0.05 * min;
            this.hygroChart.options.high = max + 0.05 * max;

            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          });
      });
    },

    LoadbrightDatas() {
      let max = -10000000000;
      let min = 10000000000;

      this.brightChart.data.labels = [];
      this.brightChart.data.series = [];

      this.brightStation.forEach((station) => {
        fetch(
          "http://" +
            station +
            ":8080/data/brightness/" +
            this.brightChart.dates.dateDebut +
            "," +
            this.brightChart.dates.datefin
        )
          .then((response) => response.json())
          .then((result) => {
            let localmax = Math.max(...result.brightness.value);
            let localmin = Math.min(...result.brightness.value);

            if (localmax > max) {
              max = localmax;
            }
            if (localmin < min) {
              min = localmin;
            }

            this.brightChart.data.labels = result.brightness.date;
            this.brightChart.data.series.push(result.brightness.value);
            this.brightChart.options.low = min - 0.05 * min;
            this.brightChart.options.high = max + 0.05 * max;

            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          });
      });
    },

    LoadwindDatas() {
      let max = -10000000000;
      let min = 10000000000;

      this.WindChart.data.labels = [];
      this.WindChart.data.series = [];

      this.windStation.forEach((station) => {
        fetch(
          "http://" +
            station +
            ":8080/data/windvelocity/" +
            this.WindChart.dates.dateDebut +
            "," +
            this.WindChart.dates.datefin
        )
          .then((response) => response.json())
          .then((result) => {
            let values = [];
            result.windvelocity.value.forEach((value) => {
              values.push(value["avg"]);
            });

            let localmax = Math.max(...values);
            let localmin = Math.min(...values);

            if (localmax > max) {
              max = localmax;
            }
            if (localmin < min) {
              min = localmin;
            }

            this.WindChart.data.labels = result.windvelocity.date;
            this.WindChart.data.series.push(values);
            this.WindChart.options.low = min - 0.05 * min;
            this.WindChart.options.high = max + 0.05 * max;

            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          });
      });
    },
  },
};
</script>
<style scoped>
.ChooseStation {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
