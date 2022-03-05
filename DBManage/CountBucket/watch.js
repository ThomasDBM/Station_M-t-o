const Influx = require('influx')
const express = require('express')
const chokidar = require('chokidar');


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


  chokidar.watch('/dev/shm/rainCounter.log').on('all', (event, path) => {
    const date = Date.now()
        influx.writePoints([
        {
            measurement: 'rainfall',
            fields: { date, value:1}
        }
    ])
  });
