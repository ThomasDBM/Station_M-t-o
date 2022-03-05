const Influx = require('influx')
const express = require('express')
const fs = require('fs');
const { log } = require('console');
const nmea = require('@drivetech/node-nmea')
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
  const date = new Date(content['date']).getTime()

  influx.writePoints([
    {
      measurement: 'temperature',
      fields: { date, values: content['temp'] }
    }
  ])
  influx.writePoints([
    {
      measurement: 'humidity',
      fields: {date, values: content['hygro'] }
    }
  ])
  influx.writePoints([
    {
      measurement: 'pressure',
      fields: { date, values: content['press'] }
    }
  ])

})

fs.readFile('/dev/shm/sensors','utf8', function(err, data){
  const content = JSON.parse(data);
  const date = new Date(content['date'].split('.')[0]).getTime()

  influx.writePoints([
    {
      measurement: 'luminosity',
      fields: { date, values: content['measure'][3]["value"] }
    }
  ])

  influx.writePoints([
    {
      measurement: 'luminosity',
      fields: { date, values: content['measure'][3]["value"] }
    }
  ])

  influx.writePoints([
    {
      measurement: 'wind',
      fields: { date, wind_heading:content['measure'][4]["value"], wind_avg: content['measure'][5]["value"], wind_max: content['measure'][6]["value"], wind_min: content['measure'][7]["value"] }
    }
  ])

})

fs.readFile('/dev/shm/gpsNmea','utf8', function(err, data){

  const content = nmea.parse('$'+data.split('$')[2].split('\n')[0])
  const date = new Date(content.datetime).getTime()

influx.writePoints([
  {
    measurement: 'gps',
    fields: { 
      time:date,
      latitude:parseFloat(content.loc["geojson"]["coordinates"][1]), 
      longitude:parseFloat(content.loc["geojson"]["coordinates"][0]), 
      altitude:parseFloat(0) 
  }
  }
])
}) 

  
  