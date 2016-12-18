const bodyParser = require('body-parser');
const express = require('express');
const pug = require('pug');

const entryProcessor = require('./entryProcessor');

module.exports = function() {

  const app = express();
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded( { extended: true } ));
  app.use(express.static('public'));

  app.get('/', function(req, res) {
    res.render('shiftEntry');
  });

  app.post('/', function(req, res) {
    let result = entryProcessor.generateIcsData(req.body.dateEntry);
    if (result.errors.length > 0) {
      res.status(400).render('shiftEntry', {entry: req.body.dateEntry, error: result.errors[0]});
      return;
    }
    res.set('Content-Type', 'text/calendar');
    res.send(result.data);
  });

  return app;
};