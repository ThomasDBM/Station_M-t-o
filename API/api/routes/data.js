
var express = require('express');
var Influx = require('influx');
var router = express.Router();

const app = express();

// Connection à la base de donnée
const influx = new Influx.InfluxDB('http://localhost:8086/measures_station')
//2022-02-09T10:01:46Z

function measureGet(nameMeasure,promesse,measure){

      let measureValueDate = {date:[],value:[]}

      if (promesse['groupRows'][0]) {

      for (let index = 0; index < promesse['groupRows'][0]['rows'].length; index++) {
        measureValueDate["date"].push(new Date(promesse['groupRows'][0]['rows'][index]["date"]));
        measureValueDate["value"].push(promesse['groupRows'][0]['rows'][index]["values"]);
      }
        
      }


      measure[nameMeasure] = measureValueDate;

      return measure;
}

function winddirectionGet(promesse,measure){

  let measureValueDate = {date:[],value:[]}


  for (let index = 0; index < promesse['groupRows'][0]['rows'].length; index++) {
    measureValueDate["date"].push(new Date(promesse['groupRows'][0]['rows'][index]["date"]));
    measureValueDate["value"].push(promesse['groupRows'][0]['rows'][index]["wind_heading"]);
  }

  measure["winddirection"] = measureValueDate;

  return measure;

}

function windvelocityGet(promesse,measure){

  let measureValueDate = {date:[],value:[]}


  for (let index = 0; index < promesse['groupRows'][0]['rows'].length; index++) {

    measureValueDate["date"].push(new Date(promesse['groupRows'][0]['rows'][index]["date"]));
    measureValueDate["value"].push({});
    measureValueDate["value"][index]["avg"] = promesse['groupRows'][0]['rows'][index]["wind_avg"];
    measureValueDate["value"][index]["min"] = promesse['groupRows'][0]['rows'][index]["wind_min"];
    measureValueDate["value"][index]["max"] = promesse['groupRows'][0]['rows'][index]["wind_max"];

  }

  measure["windvelocity"] = measureValueDate;

  return measure;

}

function gpspositionGet(promesse,measure){

  let measureValueDate = {date:[],value:[]}

  console.log(promesse);
  for (let index = 0; index < promesse['groupRows'][0]['rows'].length; index++) {

    measureValueDate["date"].push(new Date(promesse['groupRows'][0]['rows'][index]["date"]));
    measureValueDate["value"].push({});
    measureValueDate["value"][index]["lat"] = promesse['groupRows'][0]['rows'][index]["latitude"];
    measureValueDate["value"][index]["lon"] = promesse['groupRows'][0]['rows'][index]["longitude"];
    measureValueDate["value"][index]["alt"] = promesse['groupRows'][0]['rows'][index]["altitude"];

  }

  measure["gpsposition"] = measureValueDate;

  return measure;

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

function QuerySent(dates, element,  promises){

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

  promises.push(influx.query(queryString))

  return promises;
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

      promises = QuerySent(date,"temperature", promises);
      
    }else if (listMeasure[index] == "hygrometry") {

      promises = QuerySent(date,"humidity",promises);
      
    } else if (listMeasure[index] == "pressure" ) {

      promises = QuerySent(date, "pressure", promises);
      
    } else if (listMeasure[index] == "rainfall") {

      promises = QuerySent(date, "rainfall", promises);
      
    } else if (listMeasure[index] == "brightness") {

      promises = QuerySent(date, "luminosity", promises);
      
    } else if (listMeasure[index] == "winddirection") {
      
      promises = QuerySent(date, "wind", promises);

    } else if (listMeasure[index] == "windvelocity") {

      promises = QuerySent(date, "wind", promises);
      
    } else {
      
      promises = QuerySent(date, "gps", promises);
    }

  }
    Promise.all(promises).then(promesses => {

      for (let index = 0; index < promesses.length; index++) {
        if (listMeasure[index]== "winddirection") {

          measure = winddirectionGet(promesses[index],measure);
          
        }else if (listMeasure[index] == "windvelocity") {

          measure = windvelocityGet(promesses[index],measure);
          
        } else if (listMeasure[index] == "gpsposition") {

          measure = gpspositionGet(promesses[index],measure);
          
        } else {
         
          measure = measureGet(listMeasure[index],promesses[index],measure);

        }
        
      }

    res.send(measure);
      
    });

});

module.exports = router;
