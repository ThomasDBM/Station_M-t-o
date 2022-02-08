const Influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')

const app = express()

const influx = new Influx.InfluxDB('http://127.0.0.1:8086/measures_station');

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('measures_station')) {
      return influx.createDatabase('measures_station');
    }
  })
  .then(() => {
    http.createServer(app).listen(3000, function () {
      console.log('Listening on port 3000')
    })
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })

influx.queryRaw('select * from measures_station').then(rawData => {
    console.log(rawData)
})

  
  