<template>
  <div>
    <md-table v-model="tableDatas" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="measure">{{ item.mesure }}</md-table-cell>
        <md-table-cell md-label="date">{{ item.date }}</md-table-cell>
        <md-table-cell md-label="value">{{ item.value }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    sonde: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: [],
      tableDatas: [
        {
          mesure: "none",
          date: "none",
          value: "none",
        },
      ],
    };
  },
  methods: {
    getDatas() {
      fetch(
        "http://" +
          this.sonde +
          ":8080/data/temperature,hygrometry,pressure,rainfall,brightness,winddirection,windvelocity,gpsposition"
      )
        .then((response) => response.json())
        .then((result) => {
          this.tableDatas[0]["mesure"] = "temperature";
          this.tableDatas[0]["date"] = result["temperature"]["date"][0];
          this.tableDatas[0]["value"] = result["temperature"]["value"][0];
          this.tableDatas[1] = {
            mesure: "hygrometry",
            date: result["hygrometry"]["date"][0],
            value: result["hygrometry"]["value"][0],
          };
          this.tableDatas[2] = {
            mesure: "pressure",
            date: result["pressure"]["date"][0],
            value: result["pressure"]["value"][0],
          };
          this.tableDatas[3] = {
            mesure: "rainfall",
            date: result["rainfall"]["date"][0],
            value: result["rainfall"]["value"][0],
          };
          this.tableDatas[4] = {
            mesure: "brightness",
            date: result["brightness"]["date"][0],
            value: result["brightness"]["value"][0],
          };
          this.tableDatas[5] = {
            mesure: "wind direction",
            date: result["winddirection"]["date"][0],
            value: result["winddirection"]["value"][0],
          };
          this.tableDatas[6] = {
            mesure: "wind velocity",
            date: result["windvelocity"]["date"][0],
            value: result["windvelocity"]["value"][0]["min"],
          };
          this.tableDatas[7] = {
            mesure: "position",
            date: result["gpsposition"]["date"][0],
            value:
              result["gpsposition"]["value"][0]["lon"] +
              "," +
              result["gpsposition"]["value"][0]["lat"],
          };
        });
    },
  },
  mounted() {
    this.getDatas();
  },
};
</script>
