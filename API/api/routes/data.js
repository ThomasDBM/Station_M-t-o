
var express = require('express');
var Influx = require('influx');
var router = express.Router();


const app = express()

// Connection à la base de donnée
const influx = new Influx.InfluxDB('http://localhost:8086/measures_station')
//2022-02-09T10:01:46Z

/* GET data measures */
router.get('/:measure/:date?', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');


  // Vérifier si les mesures sont correctes
  influx.getMeasurements().then(names => {
    console.log('My measurement names are: ' + names.join(', '))

    for (let i=0; i < listMeasure.length; i++) {
      if (names.includes(listMeasure[i])) {
      } else {
        console.log('pourquoi ?');
        return res.status(404).text("Measure not found");
      }
    }
  });



  let dates = [];
  // Si la date est fournie
  if (req.params.date != undefined) {
    // Récuperer les dates si présentes
    dates = req.params.date.split(',');
    
    for (let i=0; i < dates.length; i++) {
      dates[i] = new Date(dates[i]).getTime();
    }
    // s'il n'y a qu'une date
    if (dates.length == 1) {
      dates.push(new Date().getTime());
    }
  }

  // création de la requête
  let queryString = '';

  // s'il n'y a aucunes dates
  if (dates.length == 0) {
    queryString = `
    select * from ${req.params.measure}
    GROUP BY * ORDER BY DESC LIMIT 1;
  `;
  } else {
    queryString = `
    select * from ${req.params.measure}
    where date >= ${dates[0]} and date <= ${dates[1]}
  `;
  }

  let measures = {};

  influx.query(queryString)
  .then( result => {

    let measure_name = "";

    // Ordonner le résultat :
    for (let i=0; i < result['groupRows'].length; i++) {

      measure_name = result['groupRows'][i]['name'];

      if (measure_name == 'gps_GGA') {
        measure_name = 'gpsposition';
      }
      if (measure_name == 'luminosity') {
        measure_name = 'brightness';
      }

      // Si clé déja présente
      if (measures[measure_name] == undefined) {

        if (measure_name == 'wind') {
          measures['winddirection'] = [];
          measures['windvelocity'] = [];
        } else {
          measures[measure_name] = [];
        }
      }

      for (let j=0; j < result['groupRows'][i]['rows'].length; j++) {
        // si la clé est windvelocity
        if (measure_name == 'wind') {

          measures['winddirection'].push(
            {
              'date' : new Date(result['groupRows'][i]['rows'][j]['date']).toISOString(),
              'value' : result['groupRows'][i]['rows'][j]['wind_heading']
            });
          
          measures['windvelocity'].push(
            {
              'date' : new Date(result['groupRows'][i]['rows'][j]['date']).toISOString(),
              'avg' : result['groupRows'][i]['rows'][j]['wind_avg'],
              'max' : result['groupRows'][i]['rows'][j]['wind_max'],
              'min' : result['groupRows'][i]['rows'][j]['wind_min']
            });
        } // si la clé est GPS
        else if (measure_name == 'gpsposition') {
          measures[measure_name].push(
          {
            'latitude' : result['groupRows'][i]['rows'][j]['latitude'],
            'longitude' : result['groupRows'][i]['rows'][j]['longitude'],
            'altitude' : result['groupRows'][i]['rows'][j]['altitude']
          });

        } else {
          measures[measure_name].push(
          {
            'date' : new Date(result['groupRows'][i]['rows'][j]['date']).toISOString(),
            'value' : result['groupRows'][i]['rows'][j]['values']
          }); 
        }
      }

  };
  res.json(measures)
  });

});

module.exports = router;
