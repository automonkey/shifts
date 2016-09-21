var express = require('express');
var pug = require('pug');

module.exports = function() {

  var app = express();
  app.set('view engine', 'pug');

  app.get('/', function(req, res) {
    res.render('shiftEntry');
  });

  const icsData =
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n" +
    "BEGIN:VEVENT\n" +
    "UID:uid1@example.com\n" +
    "DTSTAMP:19970714T170000Z\n" +
    "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n" +
    "DTSTART:19970714T170000Z\n" +
    "DTEND:19970715T035959Z\n" +
    "SUMMARY:Bastille Day Party\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  app.post('/', function(req, res) {
    res.set('Content-Type', 'text/calendar');
    res.send(icsData);
  });

  return app;
}
