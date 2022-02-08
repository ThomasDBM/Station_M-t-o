const Influx = require('influx')
const express = require('express')
const fs = require('fs');
const { log } = require('console');

const app = express()

const influx = new Influx.InfluxDB('http://127.0.0.1:8086/measures_station');

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('measures_station')) {
      return influx.createDatabase('measures_station');
    }
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })


fs.readFile('/dev/shm/tph.log','utf8', function(err, data){

  const content = JSON.parse(data);
  const date = content['date']

  influx.writePoints([
    {
      measurement: 'temperature',
      fields: { values: content['temp'] }
    }
  ])
  influx.writePoints([
    {
      measurement: 'humidity',
      fields: {values: content['hygro'] }
    }
  ])
  influx.writePoints([
    {
      measurement: 'pressure',
      fields: { values: content['press'] }
    }
  ])

})

fs.readFile('/dev/shm/sensors','utf8', function(err, data){
  const content = JSON.parse(data);

  influx.writePoints([
    {
      measurement: 'luminosity',
      fields: { values: content['measure'][3]["value"] }
    }
  ])

  influx.writePoints([
    {
      measurement: 'luminosity',
      fields: { values: content['measure'][3]["value"] }
    }
  ])

  influx.writePoints([
    {
      measurement: 'wind',
      fields: { wind_heading:content['measure'][4]["value"], wind_avg: content['measure'][5]["value"], wind_max: content['measure'][6]["value"], wind_min: content['measure'][7]["value"] }
    }
  ])

})

fs.readFile('/dev/shm/gpsNmea','utf8', function(err, data){
  const content = data.split(',');

  influx.writePoints([
    {
      measurement: 'gps_GGA',
      fields: { latitude:parseFloat(content[2]), longitude:parseFloat(content[4]), altitude:parseFloat(content[9]) }
    }
  ])
})

fs.readFile('/dev/shm/gpsNmea','utf8', function(err, data){
  const content = data.split(':');

  influx.writePoints([
    {
      measurement: 'gps_GGA',
      fields: { latitude:parseFloat(content[2]), longitude:parseFloat(content[4]), altitude:parseFloat(content[9]) }
    }
  ])
})
  
  