var bodyParser = require('body-parser');
var express = require('express');
var pug = require('pug');

const entryProcessor = require('./entryProcessor');

module.exports = function() {

  var app = express();
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded( { extended: true } ));

  app.get('/', function(req, res) {
    res.render('shiftEntry');
  });

  app.post('/', function(req, res) {
    res.set('Content-Type', 'text/calendar');
    res.send(entryProcessor.generateIcsData(req.body.dateEntry));
  });

  return app;
}
