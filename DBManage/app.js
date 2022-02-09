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


fs.readFile('dev/shm/tph.log','utf8', function(err, data){

  const content = JSON.parse(data);
  const date = new Date(content['date'].split('.')[0]).getTime()

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

fs.readFile('dev/shm/sensors','utf8', function(err, data){
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

fs.readFile('dev/shm/gpsNmea','utf8', function(err, data){
  const content = data.split(',');

  influx.writePoints([
    {
      measurement: 'gps_GGA',
      fields: { latitude:parseFloat(content[2]), longitude:parseFloat(content[4]), altitude:parseFloat(content[9]) }
    }
  ])
}) 

fs.readFile('dev/shm/rainCounter.log','utf8', function(err, data){
  const content = data.split('.');
  const contentDateSplit = content[0].split('T')
  const time = new Date(contentDateSplit [0] +' '+ contentDateSplit[1]).getTime();
  



  influx.queryRaw('select * from rainfall').then(results => {

    if(results["results"][0]["series"]){

      const lengthResult = results["results"][0]["series"][0]["values"].length
      const lasTimestampMeausre = results["results"][0]["series"][0]["values"][lengthResult-1][1]
    

      const duree = (time - lasTimestampMeausre)/60000

      var timestampMeasure = parseInt(lasTimestampMeausre) 
      const rainValue = duree/6.8

      for (let i = 0; i < duree; i++) {

        timestampMeasure = timestampMeasure + 60000

        influx.writePoints([
          {
            measurement: 'rainfall',
            fields: { date:timestampMeasure, value:rainValue }
          }
        ])
      }  
    }else{

      influx.writePoints([
        {
          measurement: 'rainfall',
          fields: { date:time, value:3.8 }
        }
      ])

    }
  })
})

  
  