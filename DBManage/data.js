
var express = require('express');
var Influx = require('influx');
var router = express.Router();

const app = express();

// Connection à la base de donnée
const influx = new Influx.InfluxDB('http://localhost:8086/measures_station')
//2022-02-09T10:01:46Z

function temperatureGet(promesse){


      let value = [];
      let date = [];
      let temperature = {date:[],value:[]}


      for (let index = 0; index < promesse['groupRows'][0]['rows'].length; index++) {
          value.push(promesse['groupRows'][0]['rows'][index]["values"]);
          date.push(promesse['groupRows'][0]['rows'][index]["date"]);
      }

      temperature["date"].push(date);
      temperature["value"].push(value);
      console.log(temperature)

      return temperature;
}

function hygrometryGet(date,measure){

}

function pressureGet(date,measure){

}

function rainfallGet(date,measure){

}

function brightnessGet(date,measure){

}

function winddirectionGet(date,measure){

}

function windvelocityGet(date,measure){

}

function gpspositionGet(date,measure){

}

function dateGet(req){

  let dates = [];

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

  return dates;
}

function QueryToSent(dates, element){

  // création de la requête
  let queryString = '';

  // s'il n'y a aucunes dates
  if (dates.length == 0) {
    queryString = `
    select * from ${element}
    GROUP BY * ORDER BY DESC LIMIT 1;
  `;
  } else {
    queryString = `
    select * from ${element}
    where date >= ${dates[0]} and date <= ${dates[1]}
  `;
  }
  return queryString;
}

/* GET data measures */
router.get('/:measure/:date?', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');
  let date = dateGet(req);
  let measure = {};
  let promises = [];
  for (let index = 0; index < listMeasure.length; index++) {

    if(listMeasure[index] == "temperature") {

      let queryString = QueryToSent(date,"temperature");
      
      promises.push(influx.query(queryString))
    }
  }
    Promise.all(promises).then(promesses => {

      promesses.forEach(promesse => {

        temperatureGet(promesse);

      })
      
    });

});

module.exports = router;
