
var express = require('express');
var Influx = require('influx');
var router = express.Router();

/* GET data measures */
router.get('/:measure/:date', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');

  // Récuperer les dates si présentes
  let dates = req.params.date.split(',');


  // Connection à la base de donnée
  const influx = new Influx.InfluxDB('http://user:password@host:8088/measures_station')

  influx.query(`
    select * from ${listMeasure} 
    where date = ${dates[0]}
  `)
  .then( result => response.status(200).json(result) )
  .catch( error => response.status(500).json({ error }) );

});

module.exports = router;
