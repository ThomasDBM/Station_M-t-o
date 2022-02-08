
var express = require('express');
var router = express.Router();

/* GET data measures */
router.get('/:measure/:date', function(req, res, next) {

  // Récuperer les mesures demandées
  let listMeasure = req.params.measure.split(',');

  // Récuperer les dates si présentes
  let dates = req.params.date.split(',');

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://localhost:27017/', function(err, client) {
    if (err) {
      throw err;
    }
    const db = client.db('test');
    
    db.collection('measures_station').find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.json(result);
    });

  });
});

module.exports = router;
