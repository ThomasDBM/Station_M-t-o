
var express = require('express');
var Influx = require('influx');
var router = express.Router();


const app = express()

// Connection à la base de donnée
const influx = new Influx.InfluxDB('http://localhost:8086/measures_station')
//2022-02-09T10:01:46Z

/* GET data measures */
router.get('/:measure/:date?', function(req, res, next) {
/*
  // Tests avec une fausse base et quelques données
  influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('measures_station')) {
      console.log('creer');
      return influx.createDatabase('measures_station');
    }
  });

  influx.writePoints([
    {
      measurement: 'temperature',
      fields: { values: 1000, date:1644397306 }
    }
  ], {
    database: 'measures_station',
  });
  influx.writePoints([
    {
      measurement: 'humidity',
      fields: {values: 2000, date:1644397306 }
    }
  ], {
    database: 'measures_station',
  });
  influx.writePoints([
    {
      measurement: 'pressure',
      fields: { values: 3000, date:1644397306 }
    }
  ], {
    database: 'measures_station',
  })
  .catch(error => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  });*/


  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');

  let dates = [];
  console.log(req.params);
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

  console.log(dates);

  // création de la requête
  let queryString = '';

  // s'il n'y a aucunes dates
  if (dates.length == 0) {
    queryString = `
    select max(date) as date, value from ${req.params.measure}
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

    console.log(result);

    // Ordonner le résultat :
    for (let i=0; i < result['groupRows'].length; i++) {

      measure_name = result['groupRows'][i]['name'];

      //console.log(result['groupRows'][i]);

      // Si clé déja présente
      if (measures[measure_name] == undefined) {
          measures[measure_name] = {
            'date' : [],
            'value' : []
          }

      }

      // si la clé est windvelocity
      if (measure_name == 'windvelocity') {
        measures[measure_name]['date'].push(new Date(result['groupRows'][i]['rows'][0]['date']).toISOString());
        measures[measure_name]['value'].push([result['groupRows'][i]['rows'][0]['avg'], result['groupRows'][i]['rows']['min'], result['groupRows'][i]['rows']['max']]);
      } // si la clé est GPS
      else if (measure_name == 'gpsposition') {
        measures[measure_name]['date'].push(new Date(result['groupRows'][i]['rows'][0]['date']).toISOString());
        measures[measure_name]['value'].push([result['groupRows'][i]['rows'][0]['lat'], result['groupRows'][i]['rows']['lon'], result['groupRows'][i]['rows']['alt']]);
      } else {
        measures[measure_name]['date'].push(new Date(result['groupRows'][i]['rows'][0]['date']).toISOString());
        measures[measure_name]['value'].push(result['groupRows'][i]['rows'][0]['value']);
      }

  };
  //console.log(measures);
  res.json(measures)
  })
  /*
  .catch( error => {

    if (result.statusCode == 304) {
      console.log("erreur 404");
      res.status(404).text("Measure not found")
    }
    if (result.statusCode == 400) {
      console.log("erreor 400")
      res.status(400).text("Invalid date supplied")
    }
    res.status(500).json({ error })
  })*/;

});

module.exports = router;
