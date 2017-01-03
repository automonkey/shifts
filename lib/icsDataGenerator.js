const dateString = require('./icsDateStringGenerator')
    , uuid = require('./uuidGenerator');

module.exports.generate = date => {

  const from = dateString.generateIcsString(date.from);
  const to = dateString.generateIcsString(date.to);

  return "" +
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n" +
    "BEGIN:VEVENT\n" +
    "UID:" + uuid() + "@shifts.benyon.io" + "\n" +
    "DTSTAMP:19970714T170000Z\n" +
    "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n" +
    "DTSTART;TZID=Europe/London:" + from  + "\n" +
    "DTEND;TZID=Europe/London:" + to + "\n" +
    "SUMMARY:Bastille Day Party\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";
};
