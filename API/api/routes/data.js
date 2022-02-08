
var express = require('express');
var router = express.Router();

import { InfluxDB, measures_station } from '@influxdata/influxdb-client';
import {url, token, org} from '../javascripts/env';


/* GET data measures */
router.get('/:measure/:date', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');

  // Récuperer les dates si présentes
  let dates = req.params.date.split(',');


  // Connection à la base de donnée
  // Get a query client configured for your org
  const queryApi = new InfluxDB({url, token}).getQueryApi(org);

  // To avoid SQL injection, use a string literal for the query.
  const fluxQuery = `from(bucket:"air_sensor")
                      |> range(start: 0) 
                      |> filter(fn: (r) => r._measurement == "temperature")`
  queryApi
   .queryRaw(fluxQuery)
   .then(result => {
     console.log(result);
     console.log('\nQueryRaw SUCCESS')

     res.json(result);
   })
   .catch(error => {
     console.error(error)
     console.log('\nQueryRaw ERROR')
   })

});

module.exports = router;
