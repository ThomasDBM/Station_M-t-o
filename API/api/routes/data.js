
var express = require('express');
var Influx = require('influx');
var router = express.Router();

/* GET data measures */
router.get('/:measure/:date?', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');

  let dates = [];
  // Si la date est fournie
  if (req.params.length == 2) {
    // Récuperer les dates si présentes
    let dates = req.params.date.split(',');
  }

  // s'il n'y a pas ou qu'une date mettre la date courante
  if (dates.length < 2) {
    dates.push("CURRENT_TIMESTAMP");
  }

  // Connection à la base de donnée
  const influx = new Influx.InfluxDB('http://localhost:8086/measures_station')

  // création de la requête
  let queryString = '';

  // s'il n'y a qu'une date (date courante)
  if (dates.length == 1) {
    queryString = `
    select * from ${listMeasure} 
    where date >= ${dates[0]}
  `;
  } else {
    queryString = `
    select * from ${listMeasure} 
    where date >= ${dates[0]} && date <= ${dates[1]}
  `;
  }

  influx.query(queryString)
  .then( result => res.status(200).json(result) )
  .catch( error => {
    if (error.code == "400")
      res.status(400).json({ error })
    else if (error.code == "404")
    res.status(404).json({ error })
    else
      res.status(500).json({ error })
  });

});

module.exports = router;
